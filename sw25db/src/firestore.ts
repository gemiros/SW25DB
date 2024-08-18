import {
  getDocsFromCache,
  getFirestore,
  loadBundle,
  namedQuery,
} from "firebase/firestore";
const QUERY_NAME = "latest-monster-data";

export async function getLatestMonstersFromBundle(): Promise<any[]> {
  console.log("Get latest monsters from Bundle...");
  const db = getFirestore();
  console.log("db");

  const bundle = await fetch(
    "https://us-central1-sw25datas.cloudfunctions.net/createBundle"
  );
  console.log(bundle);

  if (bundle.body == null) {
    console.log();
    console.warn("Bundle has no data");
    return [];
  }

  await loadBundle(db, bundle.body);
  const query = await namedQuery(db, QUERY_NAME);
  if (query == null) {
    console.log(`Bundle does not have namedQuery: ${QUERY_NAME}`);
    return [];
  }

  // const monstarsQuery = query.withConverter(Conver)
  const snapshot = await getDocsFromCache(query);

  return snapshot.docs.map((doc) => doc.data());
}
