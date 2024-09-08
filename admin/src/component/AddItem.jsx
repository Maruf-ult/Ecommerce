import { useState } from "react";
import axios from "axios";

function AddItem() {
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick =()=>{
      window.location.href='/get-item'
  }


  return (
    <>
      <div className="flex space-x-4">
        <div className="bg-red-200 w-64 h-screen flex flex-col justify-start text-start space-y-8 rounded-md p-3">
          <h1 className="text-blue-500 font-extrabold bg-white p-3 mt-3 rounded-md cursor-pointer">
            Add Item
          </h1>
          <h1 onClick={handleClick} className="text-blue-500 font-extrabold bg-white p-3 rounded-md cursor-pointer">
            All Item
          </h1>
        </div>
        <div className="bg-cyan-600 h-screen w-screen rounded-md">
          <div className="block justify-center ml-24 mt-10 space-y-4">
            <h1>Title:</h1>
            <input
              onChange={handleChange}
              className="p-2 rounded-sm w-72"
              type="text"
              name="title"
              value={item.title}
            />

            <h1>Price:</h1>
            <input
              onChange={handleChange}
              className="p-2 rounded-sm w-72"
              type="number"
              name="price"
              value={item.price}
            />

            <h1>Offer price:</h1>
            <input
              onChange={handleChange}
              className="p-2 rounded-sm w-72"
              type="number"
              name="offer_price"
              value={item.offer_price}
            />

            <h1>Category:</h1>
            <input
              onChange={handleChange}
              className="p-2 rounded-sm w-72"
              type="text"
              name="category"
              value={item.category}
            />

            <h1>Image:</h1>
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
    </>
  );
}

export default AddItem;
