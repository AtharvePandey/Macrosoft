import express from 'express';
import type { Request, Response } from 'express';
import cors from "cors";
import DataWrapper from '../src/datawrapper';

const dataWrapper: typeof DataWrapper = DataWrapper;

const app: express.Application = express();

const port = 3001; //making this port cause idk what other parts of the applications use

app.use(cors());
app.use(express.json());

app.get('/currUser', async (req: Request, res: Response) => {
    try {
        res.send(await dataWrapper.getCurrentUser());
    } catch (error) {
        res.status(404).send("can't get current user lol");
    }
});

// /user/atharve --> where atharve will be the user we are searching for

app.get('/user/:user', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        res.status(404).send("user is null, try querying again"); //user not found? actually this should be done in the physical datawrapper class...
    }
    try {
        res.send(await dataWrapper.getUser(user));
    } catch {
        res.status(404).send("user not in the db");
    }
});

// /feed/12 where 12 is gonna be id of the feed
app.get('/feed/:feedID', async (req: Request, res: Response) => {
    const { feed } = req.body;
    if (!feed) {
        res.status(404).send("can't find the feed id womp womp"); //its jover
    }
    try {
        res.send(await dataWrapper.getFeed(feed)); //we are so barack
    } catch {
        res.status(404).send("feed not found"); //its so jover
    }
});

// /feed/12 where 12 is gonna be id of the feed
app.get('/post/:postID', async (req: Request, res: Response) => {
    const { post } = req.body;
    if (!post) {
        res.status(404).send("can't find the post womp womp"); //its jover
    }
    try {
        res.send(await dataWrapper.getPost(post)); //we are so barack
    } catch {
        res.status(404).send("post not found"); //its so jover
    }
});

//add app.post stuff after we change the datawrapper thingie

app.post('/user', async (req: Request, res: Response) => {
    const user = req.body;
    if (!user || !user.userId) {
        return res.status(400).send("Invalid user data");
    }
    try {
        await dataWrapper.addUser(user.userId, user);
        res.status(201).send("User added successfully");
    } catch (err) {
        res.status(500).send("Error adding user");
    }
});

app.post('/post', async (req: Request, res: Response) => {
    const post = req.body;
    if (!post || !post.postId) {
        return res.status(400).send("Invalid post data");
    }
    try {
        await dataWrapper.addPost(post.postId, post);
        res.status(201).send("Post added successfully");
    } catch (err) {
        res.status(500).send("Error adding post");
    }
});

app.post('/comment', async (req: Request, res: Response) => {
    const comment = req.body;
    if (!comment || !comment.commentId) {
        return res.status(400).send("Invalid comment data");
    }
    try {
        await dataWrapper.addComment(comment.commentId, comment);
        res.status(201).send("Comment added successfully");
    } catch (err) {
        res.status(500).send("Error adding comment");
    }
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});