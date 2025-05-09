import React, { useEffect, useState } from "react";
import Post from "./Post";
import {
  FeedInterface,
  FeedScope,
  PartialReturn,
  PostInterface,
} from "../datamodels";
//import DataWrapper from "@dataWrapper";

interface FeedProps {
  feedScope: FeedScope;
}

const Feed: React.FC<FeedProps> = (props: FeedProps) => {
  const [feed, setFeed] = useState<FeedInterface | null>(null);
  const [posts, setPosts] = useState<PartialReturn<PostInterface>[]>([]);

  useEffect(() => {
    const loadFeed = async () => {
      const feedToLoad = (await DataWrapper.getCurrentUser())!.feeds[
        props.feedScope
      ]!;
      //setFeed((await DataWrapper.getFeed(feedToLoad))!); //if we are to use the express server, we must fetch using localhost:3001/feed/feedID...
      const feed:FeedInterface = await fetch("http://localhost:3001/feed/:" + feedToLoad);
      setFeed(feed);
      setPosts(feed!.getPosts("TEST", 1));
    };
    loadFeed();
  });

  if (!feed) return <div>Loading feed...</div>;

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post key={post.id} postData={post} />
      ))}
    </div>
  );
};

export default Feed;
