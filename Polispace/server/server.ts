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
        dataWrapper.getUser(req.body);
    }catch{
        res.status(404).send("user not in the db");
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });