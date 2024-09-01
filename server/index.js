import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbCn from './database/dbCon.js';

dotenv.config();
const app = express();
dbCn();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;


app.listen(port,()=>{
      console.log(`server is running on ${port}`)
})

