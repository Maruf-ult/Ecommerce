import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function GetItem() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/')
  };

  const UpdateItem = (id) =>{
    navigate('/update-item',{state:{id:id}});
  }

  const DeleteItem = async (id)=>{
    if (window.confirm("Are you sure, you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:3000/api/delete-item/${id}`);
         setData(data.filter(item => item._id !== id));
        toast.success("Item deleted successfully");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete item");
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await axios.get("http://localhost:3000/api/get-item");
        const val = items.data.items;
        console.log(val);
        setData(val);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex space-x-2">
        <div className="bg-red-200 w-64 h-screen flex flex-col justify-start text-start space-y-8 rounded-md p-3">
          <h1
            onClick={handleClick}
            className="text-blue-500 font-extrabold bg-white p-3 mt-3 rounded-md cursor-pointer"
          >
            Add Item
          </h1>
          <h1 className="text-blue-500 font-extrabold bg-white p-3 rounded-md cursor-pointer">
            All Item
          </h1>
        </div>
        <div className="flex-1 bg-cyan-600 p-6 overflow-auto h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md">
                <ul className="space-y-2">
                  <li>
                    <span className="font-bold">Title: </span>
                    {item.title}
                  </li>
                  <li>
                    <span className="font-bold">Price: </span>
                    {item.price}
                  </li>
                  <li>
                    <span className="font-bold">Offer Price: </span>
                    {item.offer_price}
                  </li>
                  <li>
                    <span className="font-bold">Brand: </span>
                    {item.brand}
                  </li>
                  <li>
                    <span className="font-bold">Category: </span>
                    {item.category}
                  </li>
                  <li>
                   
                   <img
  src={`http://localhost:3000/` + item.image?.split('\\').pop()}
  alt={item.image}
  className="w-full h-48 object-cover rounded-md"
/>

                  </li>
                </ul>
                <div className="flex justify-start space-x-4 mt-2">
                  <button onClick={()=>UpdateItem(item._id)} className="bg-blue-500 text-white p-2 w-24 rounded-md ">update</button>
                  <button onClick={()=>DeleteItem(item._id)} className="bg-red-500 text-white p-2 w-24 rounded-md">delete</button>
             </div>
              </div>
            ))}
           
          </div>
        </div>
      </div>
    </>
  );
}

export default GetItem;
