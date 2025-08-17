import { Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import "./Layout.css";
import Loader from "../../components/loader/Loader.jsx";

export default function Layout() {
  const { signIn, signUp, logOut, user, loading } = useAuth();
  const getLinks = () => {
    if (user) {
      return (
        <ul>
          <li>
            <a href={"/"}>Home</a>
          </li>
          <li>
            <a href={"/blogs/new"}>Create new Blog</a>
          </li>
          <li>
            {" "}
            <button onClick={logOut}>Logout</button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            <a href={"/"}>Home</a>
          </li>
          <li>
            <a href={"/login"}>Login/SignUp</a>
          </li>
        </ul>
      );
    }
  };
  return (
    <div>
      <Loader isLoading={loading} />
      <header className={"app-header"}>
        <h2>BlogIt</h2>
        <nav>{getLinks()}</nav>
      </header>
      <Outlet
        context={{
          signIn,
          signUp,
          logOut,
          loading,
          currentUser: user,
        }}
      />
    </div>
  );
}
