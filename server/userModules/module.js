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

// Function to like an item
export const PostlikeItem = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, msg: "Item ID is required" });
    }

    // Assuming the addItem model has a 'likes' field to keep count of likes
    const item = await addItem.findById(id);
    if (!item) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    item.likes = item.likes ? item.likes + 1 : 1;
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
    if (!id) {
      return res
        .status(400)
        .json({ success: false, msg: "Item ID is required" });
    }

    const item = await addItem.findById(id);

    if (!id) {
      return res.status(400).json({ success: false, msg: "item not found" });
    }

    item.saves = item.saves ? item.saves + 1 : 1;
    await item.save();
    return res
      .status(200)
      .json({ success: true, msg: "Item saved successfully", item});
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, msg: `An internal error occurred: ${error}` });
  }
};


export const getSavedItems = async(req,res)=>{
  try {
      const savedItems = await addItem.find({saves:{$gt:0}})
      if(!savedItems||savedItems.length===0){
        return res.status(404).json({success:false,msg:"No saved items found"})
      }
      return res.status(200).json({
        success: true,
        msg: "saved items retrieved successfully",
        savedItems,
      });

  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, msg: `An internal error occurred: ${error}` });
  }
}




// Controller function to get liked items
export const getLikedItems = async (req, res) => {
  try {
    const likedItems = await addItem.find({ likes: { $gt: 0 } });
    if (!likedItems || likedItems.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "No liked items found" });
    }
    return res.status(200).json({
      success: true,
      msg: "Liked items retrieved successfully",
      likedItems,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, msg: `An internal error occurred: ${error}` });
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
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, msg: "Item ID is required" });
    }

    const item = await addItem.findById(id);

    if (!id) {
      return res.status(400).json({ success: false, msg: "item not found" });
    }

    item.cart = item.cart ? item.cart + 1 : 1;
    await item.save();
    return res
      .status(200)
      .json({ success: true, msg: "Item added successfully", item});
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, msg: `An internal error occurred: ${error}` });
  }
};


export const getCartItems = async(req,res)=>{
  try {
      const addedItems = await addItem.find({cart:{$gt:0}})
      if(!addedItems||addedItems.length===0){
        return res.status(404).json({success:false,msg:"No added items found"})
      }
      return res.status(200).json({
        success: true,
        msg: "added items retrieved successfully",
        addedItems,
      });

  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, msg: `An internal error occurred: ${error}` });
  }
}
