import mongoose from "mongoose";

const additemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters long']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  offer_price: {
    type: Number,
    required: [true, 'Offer Price is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  brand: {
    type: String,
    required: [true, 'Brand is required']
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  likes: {
    type: [String], 
    default: [],
  },
  saves: {
    type: [String], 
    default: [],
  },
  cart: {
    type: [String],  
    default: [],
  }
});

const addItem = mongoose.model('additem', additemSchema);
export default addItem;
