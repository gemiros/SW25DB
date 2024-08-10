import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const COLLECTION_NAME = "monsterDB";
const QUERY_NAME = "latest-monster-data";
const MAX_AGE = 60 * 60 * 24;
const S_MAXAGE = 60 * 60 * 24;

admin.initializeApp({
  projectId: "sw25datas",
});
const db = admin.firestore();

// 登録する
export const createBundle = functions.https.onRequest(async (req, res) => {
  console.log(`Fetch from Firestore [collection=${COLLECTION_NAME}]...`);
  const monsters = await db.collection(COLLECTION_NAME).get();
  // 取得したデータからデータバンドルと名前付きクエリを作成する
  console.log(`Create a named query [queryName=${QUERY_NAME}]`);
  const builder = db.bundle();
  const bundleBuffer = builder.add(QUERY_NAME, monsters).build();

  // 何度もこの関数が呼ばれないようにブラウザと CDN にキャッシュ時間を指示する
  res.set("Cache-Control", `public, max-age=${MAX_AGE}, s-maxage=${S_MAXAGE}`);

  // テストで Client JS から直接呼び出す場合は CORS 対応しておく
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // データバンドルを返す
  res.end(bundleBuffer);
});
