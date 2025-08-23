import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export default async function BlogLoader({ params }) {
  try {
    const { id } = params;
    if (!id) return {};

    const blogRef = doc(db, "blogs", id);
    const blogSnap = await getDoc(blogRef);

    if (!blogSnap.exists()) return {};

    const data = blogSnap.data();
    let username = "Anonymous";

    try {
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", data.email),
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const { username: name } = userSnapshot.docs[0].data();
        username = name;
      }
    } catch (userError) {
      console.error("Error fetching user:", userError);
    }

    return {
      ...data,
      id,
      username,
    };
  } catch (e) {
    console.error("Error in BlogLoader:", e);
    return {};
  }
}
