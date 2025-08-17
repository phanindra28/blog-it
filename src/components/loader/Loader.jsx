import "./Loader.css";

export default function Loader({ isLoading }) {
  if (isLoading) {
    return (
      <>
        <div className={"background"}></div>
        <div className="loader"></div>
      </>
    );
  } else {
    return <></>;
  }
}
