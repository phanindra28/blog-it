import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactQuillWrapper from "./ReactQuillWrapper.jsx";

function Editor({
  readOnly = false,
  onChange = () => {},
  name = "",
  value = "",
  setValue = () => {},
}) {
  return (
    <div>
      <ReactQuill
        theme="snow" // Or "bubble" for a different theme
        value={value}
        onChange={function () {
          setValue(...arguments);
          onChange(...arguments);
        }}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["image", "code-block"],
          ],
        }}
        style={{ height: "500px", minHeight: "500px", boxSizing: "border-box" }}
        readOnly={readOnly}
      />
      <input type={"hidden"} name={name} value={value} />
    </div>
  );
}

export default Editor;
