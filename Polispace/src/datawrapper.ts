import { PostInterface, UserInterface, PostClassification, CommentInterface } from "./datamodels";
import { Role } from "./datamodels";

//we need a datawrapper that has mock data of a user

export const DataWrapper = (() => {
    //this wrapper will have a map which stores key user ID and val can be userinterface type
    const userData: Map<string, UserInterface> = new Map([
        ["1", { userId: "1", username: "Alice", email: "alice@example.com", passwordHash: "hashed_pw", role: Role.Poster, feeds: {} }],
        ["2", { userId: "2", username: "Bob", email: "bob@example.com", passwordHash: "hashed_pw", role: Role.Commenter, feeds: {} }],
    ]);

    //gonna do the same thing for a mock post obj

    const postData: Map<string, PostInterface> = new Map([
        ["1", {
            postId: "1",
            authorId: "2",
            title: "some title here",
            contentType: PostClassification,
            primaryContent: "skdlsjf",
            textContent: "poll : who is better, ur mom or ur mom",
            category: "policy",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            //idk how to add the 3 call back function we defined
        }]
    ])
    //same thing for comments, where post ID for comments will match post

    const commentData: Map<string, CommentInterface> = new Map([
        [
            "1", {
                commentId: "1",
                postId: "1",
                authorId: "1", //user 1 commented on user 2's post
                content: "lol f u",
                createdAt: Date.now(), //using this to mock stuff
                updatedAt: Date.now()
            }
        ]
    ]);

    return {
        async getUser(userId: string): Promise<UserInterface | undefined> {
            return new Promise(resolve => setTimeout(() => resolve(users.get(userId)), 300));
        },
        async getPost(postId: string): Promise<PostInterface | undefined> {
            return new Promise(resolve => setTimeout(() => resolve(posts.get(postId)), 300));
        },
        async getComments(postId: string): Promise<CommentInterface[]> {
            return new Promise(resolve => setTimeout(() => resolve(Array.from(comments.values()).filter(c => c.postId === postId)), 300));
        },
    };
})();




export default DataWrapper;




