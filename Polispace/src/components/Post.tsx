import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import { PostInterface, PartialReturn, CommentInterface } from "../datamodels";

interface PostProps {
  postData: PartialReturn<PostInterface>;
}

const Post: React.FC<PostProps> = ({ postData }) => {
  const [post, setPost] = useState<PostInterface | null>(null);
  const [comments, setComments] = useState<PartialReturn<CommentInterface>[]>(
    []
  );

  useEffect(() => {
    const loadPost = async () => {
      const fullPost = postData.fetch();
      setPost(fullPost);
      setComments(fullPost.getComments("", 5)); // Get first 5 comments
    };
    loadPost();
  }, [postData]);

  if (!post) return <div>Loading post...</div>;

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="text-gray-600 font-bold">{post.title}</h3>
      <p className="text-gray-600 text-sm mb-2">Posted by {post.authorId}</p>
      <p className="text-gray-800 mb-4">{post.textContent}</p>

      <div className="border-t pt-3 space-y-3">
        <h4 className="text-gray-600 font-medium text-sm">Comments:</h4>
        {comments.map((comment) => (
          <Comment key={comment.id} commentData={comment.fetch()} />
        ))}
      </div>
    </div>
  );
};

export default Post;
