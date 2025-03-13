import React, { useState } from "react";

function Comment() {
  const [text, setText] = useState("");

  const handler = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handler}
        placeholder="Enter text here"
      />
      <p>You entered: {text}</p>
    </div>
  );
}

export default Comment;
