import addItem from "../userModels/admin.js";


export const createItem = async (req, res) => {
  try {
    const { title, price, offer_price, category,brand } = req.body;
    const image = req.file ? req.file.path : null;
    if (!title || !price || !offer_price || !category || !brand) {
      return res
        .status(401)
        .json({ success: false, msg: "all fields should be filed" });
    }

    const newItem = new addItem({ title, price, offer_price, category,brand ,image });
    await newItem.save();
    return res
      .status(201)
      .json({ success: true, msg: "item added successfully", newItem });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, msg: `an eternal error occured ${error}` });
  }
};

export const getItem = async (req, res) => {
  try {
    const items = await addItem.find();
    if (!items) {
      return res.status(401).json({ success: false, msg: "items not found" });
    }
    return res
      .status(201)
      .json({ success: true, msg: "all items are here", items });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: `an eternal error occured ${error}` });
  }
};


const getLikedItems = async (userId) => {
  try {
    const likedItems = await LikedItem.findOne({ userId })
      .populate('items') // Populate the items field with the actual additem documents
      .exec();

    if (!likedItems) {
      return []; // Return an empty array if no liked items are found
    }

    return likedItems.items; // Return the populated items
  } catch (error) {
    console.error('Error fetching liked items:', error);
    throw error; // Handle the error as needed
  }
};





export const updateItem = async (req, res) => {
  try {
    console.log('Request received:', req.params, req.body);
    const itemId = req.params.id;
    const { title, price, offer_price,brand, category } = req.body;
    console.log(req.body)
    const image = req.file ? req.file.path : null;

    const updateData = { title, price, offer_price,brand, category };
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
    console.error('Error updating item:', error);
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
