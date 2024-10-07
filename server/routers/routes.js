import express from 'express'
import { createItem,getItem,PostCartItem,getCartItems,updateItem,delteItem,getLikedItems,PostlikeItem,PostSaveItem,getSavedItems} from "../userModules/module.js";
import upload from '../handleImage/moduleImg.js';


const router = express.Router();


router.post('/api/add-item',upload.single('image'),createItem)
router.get('/api/get-item',getItem)
router.get('/api/liked-items',getLikedItems)
router.post('/api/create-like',PostlikeItem)
router.post('/api/create-save',PostSaveItem)
router.get('/api/saved-items',getSavedItems)
router.post('/api/create-cart',PostCartItem)
router.get('/api/added-items',getCartItems)
router.patch('/api/update-item/:id', upload.single('image'), updateItem);
router.delete('/api/delete-item/:id',delteItem)

export default router;