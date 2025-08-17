import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebase";
export default async function HomeLoader() {
  try {
    const q = query(
      collection(db, "blogs"),
      orderBy("createdAt", "desc"),
      limit(6),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (e) {
    console.error("Error in HomeLoader:", e);
    return [];
  }
}
