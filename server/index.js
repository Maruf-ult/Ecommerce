import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbCn from './database/dbCon.js';
import router from './routers/routes.js';

dotenv.config();
const app = express();
dbCn();


app.use(cors());
app.use(express.json());
app.use(router);
app.use(express.static("images"));
const port = process.env.PORT || 3000;


app.listen(port,()=>{
      console.log(`server is running on ${port}`)
})

