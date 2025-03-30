import React from "react";

const CreatePost = () => {
  return (
    <div className="bg-green-500">
      <div className="bg-green-500 min-h-screen mx-4">
        <h1 className="mx-4">Create a post here</h1>
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
      </div>
    </div>
  );
};

export default CreatePost;
