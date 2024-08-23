import "firebase/firestore";
import {
  getDocsFromCache,
  getFirestore,
  loadBundle,
  namedQuery,
} from "firebase/firestore";
import firebase from "firebase/compat/app";

const QUERY_NAME = "monsterDB_query";
export const firebaseConfig = {
  projectId: "sw25datas",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const loadFirestoreBundle = async (baseUrl: string) => {
  const bundle = await fetch(`${baseUrl}/createBundle`);
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
