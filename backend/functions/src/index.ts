import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as cors from "cors";

const COLLECTION_NAME = "monsterDB";
const BUNDLE_ID = "monsterDB_bundle";
const QUERY_NAME = "monsterDB_query";
// const MAX_AGE = 60 * 60 * 24;
// const S_MAXAGE = 60 * 60 * 24;
const MAX_AGE = 60 * 10;
const S_MAXAGE = 60 * 10;

admin.initializeApp({
  projectId: "sw25datas",
});
const db = admin.firestore();
const corsHandler = cors({
  origin: true,
});
// Bundleのキャッシュを保持するための変数
let bundleCache: string | null = null;

// 登録取得する
export const createBundle = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const bundle = db.bundle(BUNDLE_ID);
    const snap = await db.collection(COLLECTION_NAME).get();
    const r = bundle.add(QUERY_NAME, snap).build();

    res.set("Content-Type", "application/json");
    res.status(200).send(r);
    return;
  });
});

export const getDatas = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    res.set(
      "Cache-Control",
      `public, max-age=${MAX_AGE}, s-maxage=${S_MAXAGE}`
    );

    functions.logger.info("cache", bundleCache);
    if (bundleCache) {
      functions.logger.info("Using cache: ", {
        cache: bundleCache,
      });
      res.set("Content-Type", "application/json");
      res.status(200).send(bundleCache);
      return;
    }

    try {
      const snapshot = await db.collection(COLLECTION_NAME).get();
      const documents = snapshot.docs.map((doc) => doc.data());
      const jsonData = JSON.stringify(documents);

      bundleCache = jsonData;
      functions.logger.info("New cache created: ", {
        cache: bundleCache,
      });

      res.set("Content-Type", "application/json");
      res.status(200).send(jsonData);
    } catch (error) {
      console.error("Error getting documents: ", error);
      res.status(500).json("Error getting documents");
    }
  });
});

// データを投稿する関数
export const postData = functions.https.onRequest(async (req, res) => {
  try {
    const newData = req.body;
    const docRef = await db.collection(COLLECTION_NAME).add(newData);
    // バンドルキャッシュをクリア
    const bundle = db.bundle(BUNDLE_ID);
    const snap = await db.collection(COLLECTION_NAME).get();
    bundle.add(QUERY_NAME, snap).build();
    res.status(201).send(`Document written with ID: ${docRef.id}`);
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).send("Error adding document");
  }
});

// データを編集する関数
export const editData = functions.https.onRequest(async (req, res) => {
  try {
    const docId = req.query.id as string;
    const updatedData = req.body;

    await db.collection(COLLECTION_NAME).doc(docId).update(updatedData);
    // バンドルキャッシュをクリア
    bundleCache = null;
    res.status(200).send("Document updated successfully");
  } catch (error) {
    console.error("Error updating document: ", error);
    res.status(500).send("Error updating document");
  }
});

// データを削除する関数
export const deleteData = functions.https.onRequest(async (req, res) => {
  try {
    const docId = req.query.id as string;

    await db.collection(COLLECTION_NAME).doc(docId).delete();
    // バンドルキャッシュをクリア
    bundleCache = null;
    res.status(200).send("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document: ", error);
    res.status(500).send("Error deleting document");
  }
});
