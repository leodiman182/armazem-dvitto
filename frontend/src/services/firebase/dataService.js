import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

async function getData (docHash) {
  return getDoc(doc(db, "db", docHash)).then(docSnap => {
    if (!docSnap.exists()) {
      console.log("Document not found!");
    }
    return docSnap.data().data;
  });
}

export default getData;