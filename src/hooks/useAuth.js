import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      // let username = "";
      // if (currentUser) {
      //   const userQuery = query(
      //     collection(db, "users"),
      //     where("email", "==", currentUser.email),
      //   );
      //   getDocs(userQuery)
      //     .then((userSnapshot) => {
      //       if (!userSnapshot.empty) {
      //         const { username: name } = userSnapshot.docs[0].data();
      //         username = name;
      //         setUser({ ...currentUser, username });
      //       }
      //     })
      //     .catch((userError) => {
      //       console.error("Error fetching user:", userError);
      //       setUser(currentUser);
      //     });
      // } else {
      setUser(currentUser);
      // }
      setLoading(false);
    });
  }, []);
  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = async () => {
    await signOut(auth);
  };
  return {
    signUp,
    signIn,
    logOut,
    user,
    loading,
  };
};
