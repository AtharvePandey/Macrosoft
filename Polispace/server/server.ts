import express, { Request, Response } from 'express';
import cors from "cors";
import DataWrapper from '../src/datawrapper';

const dataWrapper: typeof DataWrapper = DataWrapper;

const app: express.Application = express();

const port = 3001; //making this port cause idk what other parts of the applications use

app.use(cors());

// /user/atharve --> where atharve will be the user we are searching for

app.get('/user/:user', (req:Request, res:Response) => {
    const {user} = req.body;
    if(!user){
        res.status(404).send("user is null, try querying again"); //user not found? actually this should be done in the physical datawrapper class...
    }
    try{
        res.send(dataWrapper.getUser(user));
    }catch{
        res.status(404).send("user not in the db");
    }
});

// /feed/12 where 12 is gonna be id of the feed
app.get('/feed/:feedID', (req:Request, res:Response) => {
    const {feed} = req.body;
    if(!feed){
        res.status(404).send("can't find the feed id womp womp"); //its jover
    }
    try{
        res.send(dataWrapper.getFeed(feed)); //we are so barack
    }catch{
        res.status(404).send("feed not found"); //its so jover
    }
});

// /feed/12 where 12 is gonna be id of the feed
app.get('/post/:postID', (req:Request, res:Response) => {
    const {post} = req.body;
    if(!post){
        res.status(404).send("can't find the post womp womp"); //its jover
    }
    try{
        res.send(dataWrapper.getPost(post)); //we are so barack
    }catch{
        res.status(404).send("post not found"); //its so jover
    }
});

//add app.post stuff after we change the datawrapper thingie


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });