import "./CreateBlog.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useOutletContext } from "react-router";
export default function CreateBlog() {
  const { currentUser } = useOutletContext();
  if (!currentUser) {
    return (
      <div className={"create-blog not-found"}>
        Kindly Login to create a new blog
      </div>
    );
  }
  return (
    <div className={"create-blog"}>
      <div>Create a new Blog</div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const form = e.target;
          const title = form.title.value;
          const content = form.content.value;
          if (title && content) {
            const customId = Math.floor(
              100000 + Math.random() * 900000,
            ).toString();
            await setDoc(doc(db, "blogs", customId), {
              title,
              body: content,
              email: currentUser.email,
              likes: 0,
              views: 0,
              createdAt: new Date(),
            });
          }
        }}
        className={"form-container"}
      >
        <label htmlFor={"title"}>Title:</label>
        <input
          className={"title"}
          type={"text"}
          name={"title"}
          placeholder={"Add Title"}
        />

        <label htmlFor={"title"}>Content:</label>
        <textarea
          className={"title"}
          name={"content"}
          placeholder={"Add Title"}
          rows={20}
        />
        <div className={"submit"}>
          <button type={"submit"}>Submit</button>
        </div>
      </form>
    </div>
  );
}
