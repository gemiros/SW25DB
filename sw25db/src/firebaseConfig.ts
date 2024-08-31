import "firebase/firestore";
import {
  getDocsFromCache,
  getFirestore,
  loadBundle,
  namedQuery,
} from "firebase/firestore";
import firebase from "firebase/compat/app";

const isTest = false;
const hostingUrl = isTest
  ? "http://localhost:5000"
  : "https://sw25datas.web.app";
const functionUrl = isTest
  ? "http://localhost:5001/sw25datas/us-central1"
  : "https://us-central1-sw25datas.cloudfunctions.net";

const QUERY_NAME = "monsterDB_query";
export const firebaseConfig = {
  projectId: "sw25datas",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const hourSeconds = 10 * 60 * 1000;
export const getData = async () => {
  const monsterData = await localStorage.getItem("monsterData");
  const cacheDate = await localStorage.getItem("cacheDate");
  let isReload = false;
  const now = new Date();
  if (cacheDate) {
    let current = new Date(cacheDate);
    current = new Date(current.getTime() + hourSeconds);
    if (current < now) {
      isReload = true;
    }
  }
  if (!monsterData || isReload) {
    console.log("reload");
    localStorage.clear();
    const res = await loadFirestoreBundle();
    localStorage.setItem("monsterData", JSON.stringify(res));
    localStorage.setItem("cacheDate", now.toISOString());
    return res;
  } else {
    console.log("not reload");
    return JSON.parse(monsterData);
  }
};

export const loadFirestoreBundle = async () => {
  const bundle = await fetch(`${hostingUrl}/createBundle`);
  const db = getFirestore();
  if (bundle.body === null) {
    console.warn("BUndle has no data");
    return [];
  }
  await loadBundle(db, bundle.body);
  const query = await namedQuery(db, QUERY_NAME);
  if (query == null) {
    console.warn(`Bundle does not have namedQuery: ${QUERY_NAME}`);
    return [];
  }
  const snapshot = await getDocsFromCache(query);
  let res: monster.monster[] = [];
  snapshot.forEach((doc) => {
    let data = doc.data();
    data.id = doc.id;

    res.push(data as unknown as monster.monster);
  });
  return res;
};

export const postData = async (data: monster.monster) => {
  localStorage.clear();
  try {
    const db = await fetch(`${functionUrl}/postData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(db.body);
  } catch (error) {
    console.log(error);
  }
};

export const editData = async (data: monster.monster) => {
  localStorage.clear();
  const db = await fetch(`${functionUrl}/editData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(db.body);
};
