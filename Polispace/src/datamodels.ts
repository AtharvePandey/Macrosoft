// Data Models for Polispace Application
// These models represent the core entities in the Polispace and their relationships.

export {
  Role,
  type UserInterface,
  FeedScope,
  type FeedInterface,
  PostClassification,
  type PostInterface,
  type CommentInterface,
  type UserReactionInterface,
  type ReactionInterface,
  type PartialReturn,
};

enum Role {
  Poster,
  Commenter,
}

interface UserInterface {
  userId: string; // Unique identifier for the user. Hidden from users, is like a primary key.
  username: string; // User's display name
  email: string; // User's email address
  passwordHash: string; // Hashed password for security (we can hash out account management later. heh.)
  role: Role; // User role in the system. To keep titles netural we use poster/commentor to reflect user privileges.
  feeds: Partial<Record<FeedScope, string>>; // Feeds that the user is a part of.
}

enum FeedScope {
  Local,
  State,
  Federal,
}

interface FeedInterface {
  feedID: string; // Unique identifier for the feed.
  feedLevel: FeedScope; // Scope of the feed.
  regionID: string; // ID of region represented by the feed.
  getPosts(start: string, amount: number): PartialReturn<PostInterface>[]; // Returns batch of last amount posts before start.
}

enum PostClassification {
  Text,
  Image,
  Video,
  Poll,
}

interface PostInterface {
  postId: string; // Unique identifier for the post.
  authorId: string; // ID of the user who created the post
  title: string; // Title of the post
  contentType: PostClassification; // Type of content
  primaryContent?: string; // TBD: Should contain the information needed to create non-text items in the post, like a video or poll options.
  textContent?: string; // The textual content of the post
  category: string; // Category of the post (e.g., 'policy', 'event'), can be defined or completely arbitrary upon discussion
  createdAt: Date; // ISO timestamp of creation
  updatedAt?: Date; // ISO timestamp of last update (nullable)

  getReactionAmounts(): Map<ReactionInterface, number>;
  getReactions(): PartialReturn<UserReactionInterface>[];
  getComments(start: string, amount: number): PartialReturn<CommentInterface>[]; // Returns batch of last amount comments before start.
}

interface CommentInterface {
  commentId: string; // Unique identifier for the comment
  postId: string; // ID of the associated post
  authorId: string; // ID of the user who made the comment
  content: string; // Comment text
  createdAt: Date; // ISO timestamp of creation
  updatedAt?: Date; // ISO timestamp of last update (nullable)
}

interface UserReactionInterface {
  reactionId: string; // Unique identifier for the reaction
  userId: string; // ID of the user who reacted
  reaction: ReactionInterface; // Reaction reacted with.
}

interface ReactionInterface {
  emoji: string; // Emoji reaction (e.g., '👍', '❤️', '😠')
}

interface PartialReturn<T> {
  item?: T;
  id: string; // ID to grab.
  fetch(): T; // Sets item to full Returned Comment, Post, etc.
}
