import axios from "axios";
import { useEffect, useState } from "react";

function GetItem() {
  const [data, setData] = useState([]);

  const handleClick = () => {
    window.location.href = "/";
  };

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
      <div className="flex space-x-4">
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
        <div className="bg-cyan-600 h-screen w-screen rounded-md">
          <div className="block justify-center ml-24 mt-10 space-y-4">
            
              {data?.map((item, index) => (
              <ul key={index}>
                <li className="bg-white p-3 rounded-md mb-2">
                  {item.title}
                </li>
                <li className="bg-white p-3 rounded-md mb-2">
                  {item.price}
                </li>
                <li className="bg-white p-3 rounded-md mb-2">
                  {item.offer_price}
                </li>
                <li className="bg-white p-3 rounded-md mb-2">
                  {item.category}
                </li>
                <li className="bg-white p-3 rounded-md mb-2">
                  {item.photo}
                </li>
                
                </ul>
              ))}
          
          </div>
        </div>
      </div>
    </>
  );
}

export default GetItem;
