import Like from "../../assets/icons/like.svg";
import Icon from "../../assets/icons/eye.svg";
import Arrow from "../../assets/icons/arrow-right.svg";
import "./BlogCard.css";
export default function BlogCard(props) {
  const { title, body, views, likes, id } = props;
  const decode = (str) => {
    try {
      return decodeURIComponent(atob(str));
    } catch (err) {
      console.log(err);
      return str;
    }
  };
  return (
    <div className={"blog-card"}>
      <h2 className={"title"}>{title}</h2>
      <div
        className={"body"}
        dangerouslySetInnerHTML={{ __html: decode(body) }}
      />
      <div>
        <span className={"meta-data"}>
          <img src={Like} alt={"like"} />
          &nbsp;{likes}&nbsp;
        </span>
        <span className={"meta-data"}>
          <img src={Icon} alt={"Views"} />
          &nbsp;{views}&nbsp;
        </span>
        <a style={{ float: "right" }} href={`/blogs/${id}`}>
          <span className={"meta-data"}>
            Read More <img src={Arrow} alt={"Arrow"} />
          </span>
        </a>
      </div>
    </div>
  );
}
