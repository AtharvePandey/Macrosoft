// Data Models for Polispace Application
// These models represent the core entities in the Polispace and their relationships.

/**
 * @typedef {Object} User
 * @property {string} userId - Unique identifier for the user. Hidden from users, is like a primary key.
 * @property {string} username - User's display name
 * @property {string} email - User's email address
 * @property {string} passwordHash - Hashed password for security (we can hash out account management later. heh.)
 * @property {"poster" | "commenter"} role - User role in the system. To keep titles netural we use poster/commentor to reflect user privileges.
 */
class User {
    /**
     * @param {string} userId 
     * @param {string} username 
     * @param {string} email 
     * @param {string} passwordHash 
     * @param {"poster" | "commenter"} role 
     */
    constructor(userId, username, email, passwordHash, role) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
    }
}

/**
 * @typedef {Object} Post
 * @property {string} postId - Unique identifier for the post.
 * @property {string} authorId - ID of the user who created the post
 * @property {string} title - Title of the post
 * @property {"text" | "image" | "video" | "poll"} contentType - Type of content
 * @property {string | null} textContent - The textual content of the post 
 * @property {string | null} primaryContent - TBD: Should contain the information needed to create non-text items in the post, like a video or poll options.
 * @property {string} category - Category of the post (e.g., 'policy', 'event'), can be defined or completely arbitrary upon discussion
 * @property {string} createdAt - ISO timestamp of creation
 * @property {string | null} updatedAt - ISO timestamp of last update (nullable)
 */
class Post {
    /**
     * @param {string} postId 
     * @param {string} authorId 
     * @param {string} title 
     * @param {"text" | "image" | "video" | "poll"} contentType 
     * @param {string | null} textContent 
     * @param {string | null} primaryContent 
     * @param {Array<string> | null} options 
     * @param {string} category 
     * @param {string} createdAt 
     * @param {string | null} [updatedAt=null] 
     */
    constructor(postId, authorId, title, contentType, textContent, primaryContent, options, category, createdAt, updatedAt = null) {
        this.postId = postId;
        this.authorId = authorId;
        this.title = title;
        this.contentType = contentType;
        // if the content type of the post is not only text, all the information we need to construct the post should be in the primaryContent field.
        this.primaryContent = contentType !== "text" ? primaryContent : null;
        // but, a post can always have text content.
        this.textContent = textContent;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

/**
 * @typedef {Object} Comment
 * @property {string} commentId - Unique identifier for the comment
 * @property {string} postId - ID of the associated post
 * @property {string} authorId - ID of the user who made the comment
 * @property {string} content - Comment text
 * @property {string} createdAt - ISO timestamp of creation
 * @property {string | null} updatedAt - ISO timestamp of last update (nullable)
 */
class Comment {
    /**
     * @param {string} commentId 
     * @param {string} postId 
     * @param {string} authorId 
     * @param {string} content 
     * @param {string} createdAt 
     * @param {string | null} [updatedAt=null] 
     */
    constructor(commentId, postId, authorId, content, createdAt, updatedAt = null) {
        this.commentId = commentId;
        this.postId = postId;
        this.authorId = authorId;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

/**
 * @typedef {Object} Reaction
 * @property {string} reactionId - Unique identifier for the reaction
 * @property {string} userId - ID of the user who reacted
 * @property {"post" | "comment"} targetType - Type of entity reacted to
 * @property {string} targetId - ID of the post or comment being reacted to
 * @property {string} emoji - Emoji reaction (e.g., '👍', '❤️', '😠')
 * @property {string} createdAt - ISO timestamp of reaction creation
 */
class Reaction {
    /**
     * @param {string} reactionId 
     * @param {string} userId 
     * @param {"post" | "comment"} targetType 
     * @param {string} targetId 
     * @param {string} emoji 
     * @param {string} createdAt 
     */
    constructor(reactionId, userId, targetType, targetId, emoji, createdAt) {
        this.reactionId = reactionId;
        this.userId = userId;
        this.targetType = targetType;
        this.targetId = targetId;
        this.emoji = emoji;
        this.createdAt = createdAt;
    }
}
