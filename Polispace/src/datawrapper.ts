import { db } from "../firebase.ts"; //from firebase docs i found
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore"; //from firebase docs i found
import {
  PostInterface,
  UserInterface,
  CommentInterface,
  FeedInterface,
  FeedScope,
  PostClassification,
} from "./datamodels";
import { Role } from "./datamodels";

//Predefined mock data to seed the DB if necessary
const mockData = {
  users: {
    TEST1: {
      userId: "1",
      username: "Alice",
      email: "alice@example.com",
      passwordHash: "hashed_pw",
      role: Role.Poster,
      feeds: {
        [FeedScope.Local]: "TEST",
      },
    },
    TEST2: {
      userId: "2",
      username: "Bob",
      email: "bob@example.com",
      passwordHash: "hashed_pw",
      role: Role.Commenter,
      feeds: {
        [FeedScope.Local]: "TEST",
      },
    },
  },
  posts: {
    TEST: {
      postId: "1",
      authorId: "2",
      title: "Test post title!",
      contentType: PostClassification.Poll,
      primaryContent: "skdlsjf",
      textContent: "Test content here. Everyone to be given free puppies by the state.",
      category: "policy",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    TEST2: {
      postId: "2",
      authorId: "1",
      title: "Another test title???",
      contentType: PostClassification.Text,
      primaryContent: "skdlsjf",
      textContent: "Another test post? In this economy???",
      category: "policy",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  feeds: {
    TEST: {
      feedID: "TEST",
      feedLevel: FeedScope.Local,
      regionID: "Washington, D.C.",
    },
  },
  comments: {
    TEST: {
      commentId: "1",
      postId: "1",
      authorId: "1",
      content: "lol f u",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
};

async function addMockData() {
  for (const [key, user] of Object.entries(mockData.users)) {
    const ref = doc(db, "users", key);
    if (!(await getDoc(ref)).exists()) await setDoc(ref, user);
  }
  for (const [key, post] of Object.entries(mockData.posts)) {
    const ref = doc(db, "posts", key);
    if (!(await getDoc(ref)).exists()) await setDoc(ref, post);
  }
  for (const [key, feed] of Object.entries(mockData.feeds)) {
    const ref = doc(db, "feeds", key);
    if (!(await getDoc(ref)).exists()) await setDoc(ref, feed);
  }
  for (const [key, comment] of Object.entries(mockData.comments)) {
    const ref = doc(db, "comments", key);
    if (!(await getDoc(ref)).exists()) await setDoc(ref, comment);
  }
}

const DataWrapper = (() => {
  return {
    async init() { //populates db with some data to start with
      await addMockData(); //via this function
    },

    //literally found all of this online on firebase docs
    //you basically ask the db if its there, and if so, just return
    //after casting it to the appropriate interfase
    async getCurrentUser(): Promise<UserInterface | null> {
      const docRef = doc(db, "users", "TEST1");
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as UserInterface) : null;
    },

    async getUser(userId: string): Promise<UserInterface | null> {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as UserInterface) : null;
    },

    async getPost(postId: string): Promise<PostInterface | null> {
      const docRef = doc(db, "posts", postId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as PostInterface) : null;
    },

    async getFeed(feedId: string): Promise<FeedInterface | null> {
      const docRef = doc(db, "feeds", feedId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as FeedInterface) : null;
    },

    async getComments(postId: string): Promise<CommentInterface[]> {
      const q = query(collection(db, "comments"), where("postId", "==", postId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as CommentInterface);
    },

    //whenever someone wants to set something or add to db,
    //just do DataWrapper.addFunc()
    async addUser(user: UserInterface): Promise<void> {
      const ref = doc(db, "users", user.userId);
      await setDoc(ref, user);
    },

    async addPost(post: PostInterface): Promise<void> {
      const ref = doc(db, "posts", post.postId);
      await setDoc(ref, post);
    },

    async addFeed(feed: FeedInterface): Promise<void> {
      const ref = doc(db, "feeds", feed.feedID);
      await setDoc(ref, feed);
    },

    async addComment(comment: CommentInterface): Promise<void> {
      const ref = doc(db, "comments", comment.commentId);
      await setDoc(ref, comment);
    },
  };
})();

export default DataWrapper;
