import React from "react";
import DataWrapper from "@dataWrapper";
import { PostInterface } from "src/datamodels";

const CreatePost = () => {
  //here we just have to capture user input data, and then use DataWrapper.addPost() function
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
        <div>
          {/* 
          <div>
            <input thingie> enter xyz  <>
            `{
              datawrapper.add(the var we entered thingie in)
            }

            return success message
          
          <>
           //above is good example of how we can use the new datawrapper which is incorporated with firebase db
          */}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
