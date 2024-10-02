import express from 'express'
import { createItem,getItem,updateItem,delteItem,getLikedItems } from "../userModules/module.js";
import upload from '../handleImage/moduleImg.js';


const router = express.Router();


router.post('/api/add-item',upload.single('image'),createItem)
router.get('/api/get-item',getItem)
router.get('/api/get-liked-items/:id',getLikedItems)
router.patch('/api/update-item/:id', upload.single('image'), updateItem);
router.delete('/api/delete-item/:id',delteItem)

export default router;