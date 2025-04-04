import React from "react";
import Post from "./Post";
import { FeedInterface, PostInterface } from "../datamodels";

interface FeedProps {
  feed: FeedInterface;
}

const Feed: React.FC<FeedProps> = ({ feed }) => {
  // In a real implementation, this should come from feed.getPosts()
  const mockPosts: PartialReturn<PostInterface>[] = [
    {
      id: "post-1",
      fetch: () => ({
        postId: "post-1",
        authorId: "user-1",
        title: "Sample Post",
        contentType: 0, // Text
        textContent: "This is a sample post content",
        category: "policy",
        createdAt: new Date(),
        getReactionAmounts: () => new Map(),
        getReactions: () => [],
        getComments: () => []
      })
    }
  ];

  return (
    <div className="space-y-6">
      {mockPosts.map(post => (
        <Post key={post.id} postData={post} />
      ))}
    </div>
  );
};

export default Feed;