export const testUsers = [
    {
        userId: "1a2b3c4d-5678-ijkl-9mnopqrstuvw",
        username: "Amuro Ray",
        email: "amuroRay@efsf.gov",
        passwordHash: "hashedpassword123",
        role: "poster"
    },
    {
        userId: "4z5y6x7w-4321-qpon-mlkjihgfedcb",
        username: "Char Aznable",
        email: "char@neozeon.com",
        passwordHash: "hashedpassword456",
        role: "commenter"
    }
];

export const testPosts = [
    {
        postId: "post-001",
        authorId: "1a2b3c4d-5678-ijkl-9mnopqrstuvw",
        title: "Side 7 Urban Development Plan",
        contentType: "text",
        textContent: "The Federation is investing in improved residential sectors and public transit for Side 7. Expect new green spaces and better zero-G transport options!",
        category: "infrastructure",
        createdAt: "0079-03-13T14:00:00Z",
        updatedAt: null
    }
];

export const testComments = [
    {
        commentId: "comment-001",
        postId: "post-001",
        authorId: "4z5y6x7w-4321-qpon-mlkjihgfedcb",
        content: "A noble goal, but shouldn't we focus on Side 3’s autonomy first?",
        createdAt: "0079-03-13T15:00:00Z",
        updatedAt: null
    }
];

export const testReactions = [
    {
        reactionId: "reaction-001",
        userId: "4z5y6x7w-4321-qpon-mlkjihgfedcb",
        targetType: "post",
        targetId: "post-001",
        emoji: "🌱",
        createdAt: "0079-03-13T15:10:00Z"
    },
    {
        reactionId: "reaction-002",
        userId: "1a2b3c4d-5678-ijkl-9mnopqrstuvw",
        targetType: "comment",
        targetId: "comment-001",
        emoji: "😤",
        createdAt: "0079-03-13T15:15:00Z"
    }
];
