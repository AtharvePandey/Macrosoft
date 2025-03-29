import React from "react";

const Settings = () => {
  return (
    <div className="bg-blue-600">
      <h2>Welcome to the Settings Page</h2>
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
  );
};

export default Settings;
