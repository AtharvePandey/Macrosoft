import {
  PostInterface,
  UserInterface,
  PostClassification,
  CommentInterface,
  FeedInterface,
  FeedScope,
  ReactionInterface,
  PartialReturn,
} from "./datamodels";
import { Role } from "./datamodels";

//we need a datawrapper that has mock data of a user
const userData: Map<string, UserInterface> = new Map([
  [
    "TEST1",
    {
      userId: "1",
      username: "Alice",
      email: "alice@example.com",
      passwordHash: "hashed_pw",
      role: Role.Poster,
      feeds: {
        [FeedScope.Local]: "TEST",
      },
    },
  ],
  [
    "TEST2",
    {
      userId: "2",
      username: "Bob",
      email: "bob@example.com",
      passwordHash: "hashed_pw",
      role: Role.Commenter,
      feeds: {
        [FeedScope.Local]: "TEST",
      },
    },
  ],
]);

//mock feed
const feedData: Map<string, FeedInterface> = new Map([
  [
    "TEST",
    {
      feedID: "TEST",
      feedLevel: FeedScope.Local,
      regionID: "Washington, D.C.",
      getPosts(_start: string, _amount: number) {
        return [
          {
            item: postData.get("TEST")!,
            id: "TEST",
            fetch() {
              return this.item;
            },
          } as PartialReturn<PostInterface>,
          {
            item: postData.get("TEST2")!,
            id: "TEST2",
            fetch() {
              return this.item;
            },
          } as PartialReturn<PostInterface>,
        ];
      },
    },
  ],
]);

//gonna do the same thing for a mock post obj
const postData: Map<string, PostInterface> = new Map([
  [
    "TEST",
    {
      postId: "1",
      authorId: "2",
      title: "Test post title!",
      contentType: PostClassification.Poll,
      primaryContent: "skdlsjf",
      textContent: "Test content here. Everyone to be given free puppies by the state.",
      category: "policy",
      createdAt: new Date(),
      updatedAt: new Date(),
      getComments(_start, _amount) {
        return [
          {
            item: commentData.get("TEST")!,
            id: "TEST",
            fetch() {
              return this.item;
            },
          } as PartialReturn<CommentInterface>,
        ];
      },
      getReactionAmounts() {
        return new Map<ReactionInterface, number>();
      },
      getReactions() {
        return [];
      },
    },
  ],
  [
    "TEST2",
    {
      postId: "2",
      authorId: "1",
      title: "Another test title???",
      contentType: PostClassification.Text,
      primaryContent: "skdlsjf",
      textContent: "Another test post? In this economy???",
      category: "policy",
      createdAt: new Date(),
      updatedAt: new Date(),
      getComments(_start, _amount) {
        return [];
      },
      getReactionAmounts() {
        return new Map<ReactionInterface, number>();
      },
      getReactions() {
        return [];
      },
    },
  ],
]);

//same thing for comments, where post ID for comments will match post
const commentData: Map<string, CommentInterface> = new Map([
  [
    "TEST",
    {
      commentId: "1",
      postId: "1",
      authorId: "1", //user 1 commented on user 2's post
      content: "lol f u",
      createdAt: new Date(), //using this to mock stuff
      updatedAt: new Date(),
    },
  ],
]);

async function getFromCollection<T>(
  collection: Map<string, T>,
  id: string
): Promise<T | undefined> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(collection.get(id)), 300)
  );
}

function addToCollection<T>(collection: Map<string, T>, id: string, value: T) {
  collection.set(id, value);
}

const DataWrapper = (() => ({
  getCurrentUser: () => getFromCollection(userData, "TEST1")!,
  getFeed: (feedId: string) => getFromCollection(feedData, feedId),
  getUser: (userId: string) => getFromCollection(userData, userId),
  getPost: (postId: string) => getFromCollection(postData, postId),
  async getComments(postId: string): Promise<CommentInterface[]> {
    // THIS SHOULD BE CHANGED TO GRAB FROM LIST OF COMMENT IDS IN POST DATASTRUCTURE

    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            Array.from(commentData.values()).filter(
              (c: CommentInterface) => c.postId === postId
            )
          ),
        300
      )
    );
  },
  addUser: (id: string, user: UserInterface) =>
    addToCollection(userData, id, user),
  addPost: (id: string, post: PostInterface) =>
    addToCollection(postData, id, post),
  addComment: (id: string, comment: CommentInterface) =>
    addToCollection(commentData, id, comment),

}))();

export default DataWrapper;
