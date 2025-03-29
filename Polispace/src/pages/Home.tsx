import React from "react";
import Comment from "../components/Comment";

const Home = () => {
  return (
    <div className="bg-red-400">
      <h2>Welcome to the Home Page</h2>
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
  );
};

export default Home;
