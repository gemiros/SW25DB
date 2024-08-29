import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as cors from "cors";

const COLLECTION_NAME = "monsterDB";
// const COLLECTION_NAME = "monsterDBTest";
const BUNDLE_ID = "monsterDB_bundle";
const QUERY_NAME = "monsterDB_query";
// const MAX_AGE = 60 * 60 * 24;
// const S_MAXAGE = 60 * 60 * 24;
const MAX_AGE = 0;
// const S_MAXAGE = 60 * 10;

admin.initializeApp({
  projectId: "sw25datas",
});
const db = admin.firestore();
const corsHandler = cors({
  origin: true,
});

// 登録取得する
export const createBundle = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const bundle = db.bundle(BUNDLE_ID);
    const snap = await db.collection(COLLECTION_NAME).get();
    const r = bundle.add(QUERY_NAME, snap).build();
    res.set(
      "Cache-Control",
      // `public, max-age=${MAX_AGE}, s-maxage=${S_MAXAGE}`
      `public, max-age=${MAX_AGE}`
    );
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    // res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Content-Type", "application/json");
    res.status(200).send(r);
    return;
  });
});

// データを投稿する関数
export const postData = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      res.set("Access-Control-Allow-Origin", "*");
      res.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.set("Content-Type", "application/json");
      const newData = req.body;
      delete newData["id"];
      console.log("info", newData);
      console.log(JSON.stringify(newData));
      const docId = `${newData.Top.race}_Lv${newData.Top.lv}_${newData.Top.name}`;
      console.log(docId);
      const docRef = await db
        .collection(`${COLLECTION_NAME}`)
        .doc(docId)
        .set(newData);
      console.log(docRef);
      res.status(201).send(`Document written with ID: ${docId}`);
      // res.status(201).send(`Document written with ID: testSucceed`);
    } catch (error) {
      console.error("Error adding document: ", error);
      res.status(500).send("Error adding document");
    }
  });
});

// データを編集する関数
export const editData = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const docId = req.body.id;
      console.log(docId);
      console.log(req.body);
      res.set("Access-Control-Allow-Origin", "*");
      res.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.set("Content-Type", "application/json");
      const updatedData = req.body;
      delete updatedData["id"];
      console.log("info", updatedData);
      console.log(JSON.stringify(updatedData));
      await db.collection(COLLECTION_NAME).doc(docId).update(updatedData);
      res.status(201).send(`Document written with ID: ${docId}`);
    } catch (error) {
      console.error("Error updating document: ", error);
      res.status(500).send("Error updating document");
    }
  });
});

// データを削除する関数
export const deleteData = functions.https.onRequest(async (req, res) => {
  try {
    const docId = req.query.id as string;
    await db.collection(COLLECTION_NAME).doc(docId).delete();
    res.status(200).send("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document: ", error);
    res.status(500).send("Error deleting document");
  }
});
