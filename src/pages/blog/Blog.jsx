import { useLoaderData } from "react-router";
import "./Blog.css";
import moment from "moment";
import Icon from "../../assets/icons/eye.svg";
import Like from "../../assets/icons/like.svg";
export default function Blog() {
  const { title, likes, body, views, username, createdAt } = useLoaderData();
  if (!title) {
    return <div className={"blog not-found"}>Blog Not found</div>;
  }
  return (
    <div className={"blog"}>
      <div className={"header"}>
        <div className={"title"}>{title}</div>
        <div className={"meta-data"}>
          <div>
            <span style={{ paddingRight: "1rem" }}>
              Written By: <strong>{username}</strong> &nbsp;
            </span>
            <span style={{ paddingRight: "1rem" }}>
              Posted on:{" "}
              <strong>
                {moment(createdAt.seconds * 1000).format("DD MMM, YYYY HH:mm")}
              </strong>
              &nbsp;
            </span>
          </div>
          <div>
            <span
              style={{
                display: "inline-flex",
                paddingRight: "1rem",
                alignItems: "center",
              }}
            >
              <img src={Like} alt={"like"} />
              &nbsp;{likes}&nbsp;
            </span>
            <span
              style={{
                display: "inline-flex",
                paddingRight: "1rem",
                alignItems: "center",
              }}
            >
              <img src={Icon} alt={"Views"} />
              &nbsp;{views}&nbsp;
            </span>
          </div>
        </div>
      </div>
      <div className={"content"}>{body}</div>
      {/*<h1>Blog</h1>*/}
      {/*<div><img src={Icon} alt={"eye"}/>*/}
      {/*    <img src={Like} alt={"like"} style={{color: "red"}}/></div>*/}
    </div>
  );
}
