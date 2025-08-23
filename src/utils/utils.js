import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

export const decode = (str) => {
  try {
    return decodeURIComponent(atob(str));
  } catch (err) {
    console.log(err);
    return str;
  }
};

export const handleLike = (likes, username, isLiked, id) => {
  return updateDoc(doc(db, "blogs", id), {
    likes: isLiked
      ? likes.filter((like) => like !== username)
      : Array.from(new Set([...likes, username])),
  });
};
