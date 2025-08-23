import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import "./Blog.css";
import moment from "moment";
// import Icon from "../../assets/icons/eye.svg?react";
import Like from "../../assets/icons/like.svg?react";
import { decode, handleLike } from "../../utils/utils.js";
import { useEffect, useState } from "react";
export default function Blog() {
  const { title, likes, body, username, createdAt, id } = useLoaderData();
  const [isLiked, setIsLiked] = useState(false);
  const { currentUser, setLoading } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    setIsLiked(likes.includes(currentUser?.username));
  }, [currentUser, likes]);
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
            <span className={"icon"}>
              <Like
                cursor={currentUser?.username ? "pointer" : "not-allowed"}
                color={isLiked ? "red" : "#999"}
                onClick={() => {
                  if (currentUser?.username) {
                    try {
                      setLoading(true);
                      handleLike(likes, currentUser?.username, isLiked, id)
                        .then(() => {
                          setIsLiked(!isLiked);
                          navigate("/blogs/" + id, { replace: true });
                        })
                        .finally(() => {
                          setLoading(false);
                        });
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }}
              />
              &nbsp;{likes.length}&nbsp;
            </span>
            {/*<span className={"icon"}>*/}
            {/*  <Icon/>*/}
            {/*  &nbsp;{views}&nbsp;*/}
            {/*</span>*/}
          </div>
        </div>
      </div>
      <div
        className={"content"}
        dangerouslySetInnerHTML={{ __html: decode(body) }}
      />
    </div>
  );
}
