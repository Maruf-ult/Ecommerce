import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateItem() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  const [item, setItem] = useState({
    title: "",
    price: "",
    offer_price: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    navigate("/get-item");
  };

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setItem({ ...item, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", item.title);
    formData.append("price", item.price);
    formData.append("offer_price", item.offer_price);
    formData.append("category", item.category);
    if (item.image) {
      formData.append("image", item.image);
    }

    try {
      const updateUser = await axios.patch(
        `http://localhost:3000/api/update-item/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const res = updateUser.data;
      console.log(res);
      if (res.success) {
        toast.success(res.msg);
        setItem({
          title: "",
          price: "",
          offer_price: "",
          category: "",
          image: null,
        });
        navigate("/get-item");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex space-x-4">
        <div className="bg-red-200 w-64 h-screen flex flex-col justify-start text-start space-y-8 rounded-md p-3">
          <h1 className="text-blue-500 font-extrabold bg-white p-3 mt-3 rounded-md cursor-pointer w-56">
            Add Item
          </h1>
          <h1
            onClick={handleNavigate}
            className="text-blue-500 font-extrabold bg-white p-3 rounded-md cursor-pointer w-56"
          >
            All Item
          </h1>
        </div>
        <div className="bg-cyan-600 h-screen w-screen rounded-md">
          <h1 className="ml-24 pt-10 font-extrabold text-3xl">Update Item</h1>
          <div className="block justify-center ml-24 mt-20 space-y-4">
            <div className="flex flex-col space-y-9">
              <input
                onChange={handleChange}
                className="p-2 rounded-sm w-72"
                type="text"
                name="title"
                value={item.title}
                placeholder="title"
              />
              <input
                onChange={handleChange}
                className="p-2 rounded-sm w-72"
                type="number"
                name="price"
                value={item.price}
                placeholder="price"
              />
              <input
                onChange={handleChange}
                className="p-2 rounded-sm w-72"
                type="number"
                name="offer_price"
                value={item.offer_price}
                placeholder="offer_price"
              />
         
              <select
                onChange={handleChange}
                className="p-2 rounded-sm w-72"
                name="category"
                value={item.category}
                
              >
              <option value="">select category</option>
              <option value="electronics">Fashion</option>
              <option value="fashion">Laptop</option>
              <option value="home">Mobile</option>
              <option value="books">Books</option>
              </select>
              <input
                onChange={handleFileChange}
                className="rounded-sm cursor-pointer"
                type="file"
                name="image"
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleSubmit}
                  className="p-3 w-32 bg-green-300 rounded-md"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={handleNavigate}
                  className="p-3 w-32 bg-red-500 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default UpdateItem;
