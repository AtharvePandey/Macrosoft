import React from "react";

const Settings = () => {
  return (
    <div className="bg-blue-600">
      <div className="bg-blue-600 min-h-screen mx-4">
        <h1 className="mx-4">Welcome to the Settings Page</h1>
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

export default Settings;
