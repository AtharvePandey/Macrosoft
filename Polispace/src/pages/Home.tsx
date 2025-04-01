import React from "react";
import Comment from "../components/Comment";

const Home = () => {
  return (
    <div className="bg-red-400">
      <div className="bg-red-400 min-h-screen mx-4">
        <h1 className="mx-4">Welcome to the Home Page</h1>
        <nav>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/Settings">Settings</a>
          </li>
          <li>
            <a href="/CreatePost">Create a Post</a>
          </li>
        </nav>
        <Comment />
      </div>
    </div>
  );
};

export default Home;
