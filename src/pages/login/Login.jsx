import { useEffect, useState } from "react";
import "./Login.css";
import { validateEmail, validatePassword } from "./utils";
import { useNavigate, useOutletContext } from "react-router";

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState({});
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
    setErrors({
      email: isValidEmail
        ? Boolean(email)
        : "Please enter a valid email address",
      password: isLogin
        ? false
        : isValidPassword
          ? Boolean(password)
          : "Password must be at least 6 characters long and contain at least 1 number and 1 letter",
      rePassword: isValidRePassword
        ? Boolean(rePassword && password)
        : "Passwords do not match",
    });
    setIsValidForm(
      Boolean(
        email &&
          password &&
          (isLogin ? true : rePassword && isValidPassword) &&
          isValidEmail &&
          isValidRePassword,
      ),
    );
  }, [email, password, rePassword, isLogin]);
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
              signUp(email, password)
                .then(() => {
                  navigate("/");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } catch (e) {
            console.error(e);
          }

          setEmail("");
          setPassword("");
          setRePassword("");
        }}
      >
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
