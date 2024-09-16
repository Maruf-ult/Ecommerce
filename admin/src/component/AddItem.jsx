import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const navigate = useNavigate();
  const [item, setItem] = useState({
    title: "",
    price: "",
    offer_price: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setItem({ ...item, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', item.title);
    formData.append('price', item.price);
    formData.append('offer_price', item.offer_price);
    formData.append('category', item.category);
    formData.append('image', item.image);

    try {
      const addUser = await axios.post(
        "http://localhost:3000/api/add-item",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      const response = addUser.data;
      console.log(response);
      toast.success('Item created successfully');
      // Clear the input fields
      setItem({
        title: "",
        price: "",
        offer_price: "",
        category: "",
        image: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    navigate('/get-item')
  };

  return (
    <>
      <div className="flex space-x-4">
        <div className="bg-red-200 w-64 h-screen flex flex-col justify-start text-start space-y-8 rounded-md p-3">
          <h1 className="text-blue-500 font-extrabold bg-white p-3 mt-3 rounded-md cursor-pointer w-56">
            Add Item
          </h1>
          <h1 onClick={handleClick} className="text-blue-500 font-extrabold bg-white p-3 rounded-md cursor-pointer w-56">
            All Item
          </h1>
        </div>
        <div className="bg-cyan-600 h-screen w-screen rounded-md">
          <div className="block justify-center ml-24 mt-10 space-y-4">
            <h1 className="font-bold">Title:</h1>
            <input
              onChange={handleChange}
              className="p-2 rounded-sm w-72"
              type="text"
              name="title"
              value={item.title}
            />

            <h1 className="font-bold">Price:</h1>
            <input
              onChange={handleChange}
              className="p-2 rounded-sm w-72"
              type="number"
              name="price"
              value={item.price}
            />

            <h1 className="font-bold">Offer price:</h1>
            <input
              onChange={handleChange}
              className="p-2 rounded-sm w-72"
              type="number"
              name="offer_price"
              value={item.offer_price}
            />

            <h1 className="font-bold">Category:</h1>
            <select
              onChange={handleChange}
              className="p-2 rounded-sm w-72"
              name="category"
              value={item.category}
            >
              <option value="">select category</option>
              <option value="Fashion">Fashion</option>
              <option value="Laptop">Laptop</option>
              <option value="Mobile">Mobile</option>
              <option value="Books">Books</option>
              
            </select>

            <h1 className="font-bold">Image:</h1>
            <input
              onChange={handleFileChange}
              className="rounded-sm cursor-pointer"
              type="file"
              name="image"
            />

            <div className="flex space-x-4">
              <button onClick={handleSubmit} className="p-3 w-32 bg-green-300 rounded-md">
                Submit
              </button>
              <button className="p-3 w-32 bg-red-500 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default AddItem;
