import React, { forwardRef, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
// Polyfill for findDOMNode to support React 19
if (typeof window !== "undefined") {
  if (!ReactDOM.findDOMNode) {
    ReactDOM.findDOMNode = (component) => {
      if (component && component.nodeType === 1) {
        return component;
      }
      if (component && component.current && component.current.nodeType === 1) {
        return component.current;
      }
      if (component && component._reactInternalFiber) {
        return component._reactInternalFiber.child.stateNode;
      }
      if (component && component.querySelector) {
        return component.querySelector(".quill");
      }
      return null;
    };
  }
}

// Create a wrapper component
const ReactQuillWrapper = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const [QuillComponent, setQuillComponent] = React.useState(null);

  useEffect(() => {
    // Dynamically import react-quill only on client side
    if (typeof window !== "undefined") {
      import("react-quill").then((module) => {
        setQuillComponent(() => module.default);
      });
    }
  }, []);

  if (!QuillComponent) {
    return (
      <div ref={containerRef} className="quill-loading">
        Loading editor...
      </div>
    );
  }

  return <QuillComponent {...props} ref={ref} />;
});

ReactQuillWrapper.displayName = "ReactQuillWrapper";

export default ReactQuillWrapper;
