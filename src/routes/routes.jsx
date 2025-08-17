import React from "react";
import { Login } from "../pages/login/Login.jsx";
import Layout from "../pages/layout/Layout.jsx";
import Blog from "../pages/blog/Blog.jsx";
import BlogLoader from "../pages/blog/BlogLoader";
import CreateBlog from "../pages/create-blog/CreateBlog.jsx";
import HomeLoader from "../pages/home/HomeLoader";
import Home from "../pages/home/Home.jsx";
import { redirect } from "react-router";

export const routes = [
  {
    path: "/",
    id: "root",
    element: <Layout />,
    children: [
      {
        index: true,
        loader: HomeLoader,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "blogs",
        children: [
          {
            index: true,
            loader: () => {
              return redirect(`/blogs/new`);
            },
          },
          {
            path: "new",
            element: <CreateBlog />,
          },
          {
            path: ":id",
            loader: BlogLoader,
            element: <Blog />,
          },
        ],
      },
    ],
  },
];
