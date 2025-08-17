import { useLoaderData, useNavigation } from "react-router";
import BlogCard from "../../components/blog-card/BlogCard.jsx";
import "./Home.css";
import Loader from "../../components/loader/Loader.jsx";

export default function Home() {
  const data = useLoaderData();
  const { state } = useNavigation();
  return (
    <>
      <Loader isLoading={state === "loading"} />
      <div className={"home"}>
        {data.map((blog) => (
          <div key={blog.id}>
            <BlogCard {...blog} />
          </div>
        ))}
      </div>
    </>
  );
}
