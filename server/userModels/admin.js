import mongoose from "mongoose";

const additem = new mongoose.Schema({
      title:{
          type:String,
          required: [true, 'Title is required'],
          minlength: [3, 'Name must be at least 3 characters long']
      },
      price:{
          type:Number,
          required:[true,'Price is required'],
        
      },
      offer_price:{
            type:Number,
            required:[true,'Offer Price is required'],
      },
      category:{
           type:String,
           required: [true, 'Category is required'],
      },
      image:{
          type:String,
          required: [true, 'Image is required'],
      }

})

const addItem = mongoose.model('additem',additem)
export default addItem;