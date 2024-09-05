import express from 'express'
import { createItem,getItem } from "../userModules/module.js";
import upload from '../handleImage/moduleImg.js';


const router = express.Router();


router.post('/api/add-item',upload.single('image'),createItem)
router.get('/api/get-item',getItem)


export default router;