import "firebase/firestore";
import {
  getDocsFromCache,
  getFirestore,
  loadBundle,
  namedQuery,
} from "firebase/firestore";
import firebase from "firebase/compat/app";

// const hostingUrl ='http://localhost:5001/sw25datas/us-central1/getDatas'
// const hostingUrl = 'http://localhost:5000'
const hostingUrl = "https://sw25datas.web.app";
const functionUrl = "https://us-central1-sw25datas.cloudfunctions.net/postData";
const QUERY_NAME = "monsterDB_query";
export const firebaseConfig = {
  projectId: "sw25datas",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

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
  const db = await fetch(`${functionUrl}/postData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(db.body);
};
