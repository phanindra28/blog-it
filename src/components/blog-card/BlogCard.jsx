import Like from "../../assets/icons/like.svg?react";
// import Icon from "../../assets/icons/eye.svg";
import Arrow from "../../assets/icons/arrow-right.svg";
import "./BlogCard.css";
import { decode, handleLike } from "../../utils/utils.js";
import { useNavigate, useOutletContext } from "react-router";
import { useEffect, useState } from "react";
export default function BlogCard(props) {
  const { title, body, likes, id } = props;
  const [isLiked, setIsLiked] = useState(false);
  const { currentUser, setLoading } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    setIsLiked(likes.includes(currentUser?.username));
  }, [currentUser, likes]);
  return (
    <div className={"blog-card"}>
      <h2 className={"title"}>{title}</h2>
      <div
        className={"body"}
        dangerouslySetInnerHTML={{ __html: decode(body) }}
      />
      <div>
        <span className={"meta-data"}>
          <Like
            cursor={currentUser?.username ? "pointer" : "not-allowed"}
            color={likes?.includes(currentUser?.username) ? "#ff0000" : "#999"}
            onClick={() => {
              if (currentUser?.username) {
                try {
                  setLoading(true);
                  handleLike(likes, currentUser?.username, isLiked, id)
                    .then(() => {
                      setIsLiked(!isLiked);
                      navigate("/", { replace: true });
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
        {/*<span className={"meta-data"}>*/}
        {/*  <img src={Icon} alt={"Views"} />*/}
        {/*  &nbsp;{views}&nbsp;*/}
        {/*</span>*/}
        <a style={{ float: "right" }} href={`/blogs/${id}`}>
          <span className={"meta-data"}>
            Read More <img src={Arrow} alt={"Arrow"} />
          </span>
        </a>
      </div>
    </div>
  );
}
