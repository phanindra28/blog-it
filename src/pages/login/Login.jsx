import { useEffect, useState } from "react";
import "./Login.css";
import { validateEmail, validatePassword, validateUsername } from "./utils";
import { useNavigate, useOutletContext } from "react-router";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase.js";

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState({});
  const [username, setUserName] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);

  const { signIn, signUp, currentUser } = useOutletContext();
  const navigate = useNavigate();

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setRePassword("");
  };
  useEffect(() => {
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    const isValidRePassword = isLogin
      ? true
      : password && rePassword
        ? password === rePassword
        : true;
    const isValidUsername = validateUsername(username);
    setErrors({
      email: isValidEmail
        ? Boolean(email)
        : "Please enter a valid email address",
      password: isLogin
        ? false
        : isValidPassword
          ? Boolean(password)
          : "Password must be at least 6 characters long and contain at least 1 number and 1 letter",
      username: isLogin
        ? false
        : isValidUsername
          ? Boolean(username)
          : "Username must be at least 3 characters long and can contain alphanumeric characters",
      rePassword: isValidRePassword
        ? Boolean(rePassword && password)
        : "Passwords do not match",
    });
    setIsValidForm(
      Boolean(
        email &&
          password &&
          (isLogin ? true : rePassword && isValidPassword && isValidUsername) &&
          isValidEmail &&
          isValidRePassword,
      ),
    );
  }, [email, password, rePassword, isLogin, username]);
  if (currentUser) {
    return <div className={"blog not-found"}>You are already logged In.</div>;
  }
  return (
    <div className={"login-page"}>
      <div className={"login-container"}>
        <div
          className={`item ${isLogin ? "active" : ""}`}
          onClick={() => {
            setIsLogin(true);
            clearForm();
          }}
        >
          Login
        </div>
        <div
          className={`item ${isLogin ? "" : "active"}`}
          onClick={() => {
            setIsLogin(false);
            clearForm();
          }}
        >
          Sign Up
        </div>
      </div>
      <form
        className={"login-form"}
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          try {
            if (isLogin) {
              signIn(email, password)
                .then(() => {
                  navigate("/");
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              const usersRef = collection(db, "users");
              const q = query(usersRef, where("username", "==", username));
              const querySnapshot = await getDocs(q);
              if (!querySnapshot.empty) {
                setErrors((prev) => ({
                  ...prev,
                  username: "Username already taken",
                }));
                return;
              }
              signUp(email, password)
                .then(() => {
                  const customId = Math.floor(
                    100000 + Math.random() * 900000,
                  ).toString();
                  return setDoc(doc(db, "users", customId), {
                    email,
                    username,
                  });
                })
                .then(() => {
                  navigate("/");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            setEmail("");
            setPassword("");
            setRePassword("");
            setUserName("");
          } catch (e) {
            console.error(e);
          }
        }}
      >
        {!isLogin && (
          <>
            <label htmlFor={"email"}>Enter Username:</label>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                autoComplete={"off"}
                name={"username"}
                onChange={(e) => setUserName(e.target.value)}
              />
              {errors.username && (
                <div className={"error"}>{errors.username}</div>
              )}
            </div>
          </>
        )}
        <label htmlFor={"email"}>Enter Email:</label>
        <div>
          <input
            type="email"
            placeholder="Email"
            name={"email"}
            value={email}
            autoComplete={"off"}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className={"error"}>{errors.email}</div>}
        </div>
        <label htmlFor={"password"}>Enter Password:</label>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            autoComplete={"off"}
            name={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className={"error"}>{errors.password}</div>}
        </div>
        {!isLogin && (
          <>
            <label htmlFor={"password"}>Re-enter Password:</label>
            <div>
              <input
                type="password"
                placeholder="Re-enter Password"
                value={rePassword}
                autoComplete={"off"}
                name={"rePassword"}
                onChange={(e) => setRePassword(e.target.value)}
              />
              {errors.rePassword && (
                <div className={"error"}>{errors.rePassword}</div>
              )}
            </div>
          </>
        )}
        <div className={"submit"}>
          <button type={"submit"} disabled={!isValidForm}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
