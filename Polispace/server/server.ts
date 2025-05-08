import express, { Request, Response } from 'express';
import {DataWrapper} from '../src/datawrapper';

const app: express.Application = express();

const port = 3001; //making this port cause idk what other parts of the applications use

app.get('/', (req:Request, res:Response) => {
    
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });