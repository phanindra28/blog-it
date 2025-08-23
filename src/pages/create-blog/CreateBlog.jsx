import "./CreateBlog.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useOutletContext } from "react-router";
import Editor from "../../components/editor/Editor.jsx";
import { useState } from "react";
export default function CreateBlog() {
  const [content, setContent] = useState("");
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
            try {
              await setDoc(doc(db, "blogs", customId), {
                title,
                body: btoa(encodeURIComponent(content)),
                email: currentUser.email,
                likes: 0,
                views: 0,
                createdAt: new Date(),
              });
              form.reset();
              setContent("");
            } catch (e) {
              console.log(e);
            }
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
        <div className={"editor"}>
          <Editor value={content} setValue={setContent} name={"content"} />
        </div>
        <div className={"submit"}>
          <button type={"submit"}>Submit</button>
        </div>
      </form>
    </div>
  );
}
