import addItem from "../userModels/admin.js";
export const createItem = async (req, res) => {
  try {
    const { title, price, offer_price, category, brand } = req.body;
    const image = req.file ? req.file.path : null;
    if (!title || !price || !offer_price || !category || !brand) {
      return res
        .status(401)
        .json({ success: false, msg: "All fields should be filled" });
    }

    const newItem = new addItem({
      title,
      price,
      offer_price,
      category,
      brand,
      image,
    });
    await newItem.save();
    return res
      .status(201)
      .json({ success: true, msg: "Item added successfully", newItem });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, msg: `An internal error occurred: ${error}` });
  }
};

export const getItem = async (req, res) => {
  try {
    const items = await addItem.find();
    if (!items) {
      return res.status(401).json({ success: false, msg: "Items not found" });
    }
    return res
      .status(201)
      .json({ success: true, msg: "All items are here", items });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: `An internal error occurred: ${error}` });
  }
};


export const PostlikeItem = async (req, res) => {
  try {
    const { id} = req.body;
   
    
   
    if (!id ) {
      return res
        .status(400)
        .json({ success: false, msg: "Item ID and User ID are required" });
    }

    const item = await addItem.findById(id);
    const items = await addItem.find();
    if (!item) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }
 
     console.log(items.like)

//     if (items.likes.includes(id)) {
//       console.log(items.likes)
//       items.likes = items.likes.filter(like => like !== id);
//       await addItem.save();
      
//       return res.status(200).json({ success: true, msg: "like removed successfully", item });
//     }
// else{
  item.likes.push(id);
    await item.save();
    return res
      .status(200)
      .json({ success: true, msg: "Item liked successfully", item });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, msg: `An internal error occurred: ${error}` });
  }
};

export const PostSaveItem = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id ) {
      return res
        .status(400)
        .json({ success: false, msg: "Item ID and User ID are required" });
    }

    const item = await addItem.findById(id);

    if (!item) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    
    
    // if (item.saves.includes(id)) {
    //   item.saves = item.saves.filter(save => save !== id);
    //   await item.save();

    //   return res.status(200).json({ success: true, msg: "Save removed successfully", item });
    // }else
    item.saves.push(id);
    await item.save();

    return res
      .status(200)
      .json({ success: true, msg: "Item saved successfully", item });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, msg: `An internal error occurred: ${error}` });
  }
};

export const getSavedItems = async (req, res) => {
  try {
    
    const savedItems = await addItem.find({ saves: { $ne: [] } });

    if (!savedItems || savedItems.length === 0) {
      return res.status(404).json({ success: false, msg: "No saved items found" });
    }

    return res.status(200).json({
      success: true,
      msg: "Saved items retrieved successfully",
      savedItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, msg: `An internal error occurred: ${error}` });
  }
};




export const getLikedItems = async (req, res) => {
  try {
    
    const likedItems = await addItem.find({ likes: { $ne: [] } });

    if (!likedItems || likedItems.length === 0) {
      return res.status(404).json({ success: false, msg: "No liked items found" });
    }

    return res.status(200).json({
      success: true,
      msg: "Liked items retrieved successfully",
      likedItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, msg: `An internal error occurred: ${error}` });
  }
};

export const updateItem = async (req, res) => {
  try {
    console.log("Request received:", req.params, req.body);
    const itemId = req.params.id;
    const { title, price, offer_price, brand, category } = req.body;
    console.log(req.body);
    const image = req.file ? req.file.path : null;

    const updateData = { title, price, offer_price, brand, category };
    if (image) {
      updateData.image = image;
    }

    const data = await addItem.findByIdAndUpdate(
      itemId,
      { $set: updateData },
      { new: true }
    );

    if (!data) return res.status(401).json({ msg: "Item not found" });
    return res
      .status(201)
      .json({ success: true, msg: "Item updated successfully", data });
  } catch (error) {
    console.error("Error updating item:", error);
    return res
      .status(400)
      .json({ success: false, msg: `An internal error occurred: ${error}` });
  }
};

export const delteItem = async (req, res) => {
  try {
    const itemid = req.params.id;
    const item = await addItem.findByIdAndDelete(itemid);
    if (!item) return res.status(401).json({ msg: "user not found" });
    return res
      .status(200)
      .json({ success: true, msg: "Data deleted successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: `an eternal error occured ${error}` });
  }
};




export const PostCartItem = async (req, res) => {
  try {
    const { id, userId } = req.body;

    if (!id || !userId) {
      return res
        .status(400)
        .json({ success: false, msg: "Item ID and User ID are required" });
    }

    const item = await addItem.findById(id);

    if (!item) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    
    if (item.cart.includes(userId)) {
      return res.status(400).json({ success: false, msg: "Item already in the cart" });
    }

 
    item.cart.push(userId);
    await item.save();

    return res.status(200).json({
      success: true,
      msg: "Item added to the cart successfully",
      item,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      msg: `An internal error occurred: ${error}`,
    });
  }
};



export const getCartItems = async (req, res) => {
  try {
    
    const addedItems = await addItem.find({ cart: { $ne: [] } });

    if (!addedItems || addedItems.length === 0) {
      return res.status(404).json({ success: false, msg: "No added items found" });
    }

    return res.status(200).json({
      success: true,
      msg: "Added items retrieved successfully",
      addedItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      msg: `An internal error occurred: ${error}`,
    });
  }
};
