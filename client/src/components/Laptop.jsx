import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Laptop() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await axios.get("http://localhost:3000/api/get-item");
        const val = items.data.items;
        const fashionItems = val.filter(item => item.category === "Laptop");
        console.log(fashionItems);
        setData(fashionItems);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    fetchData();
  }, []);

  const handleNav1 = () => {
    navigate('/Fashion');
  };
  const handleNav2 = () => {
    navigate('/Mobile');
  };
  const handleNav3 = () => {
    navigate('/Books');
  };

  return (
    <>
      <div className="flex space-x-2">
        <div className="bg-red-200 w-64 h-screen flex flex-col justify-start text-start space-y-8 rounded-md p-3 ">
          <h1 className="text-blue-500 font-extrabold bg-slate-700 p-3 w-full cursor-pointer">
            Dashboard
          </h1>

          <h1 className="text-blue-500 font-extrabold bg-white p-3 mt-3 rounded-md cursor-pointer">
            Fashion
          </h1>
          <h1 className="text-blue-500 font-extrabold bg-white p-3 rounded-md cursor-pointer">
            Laptop
          </h1>
          <h1 className="text-blue-500 font-extrabold bg-white p-3 rounded-md cursor-pointer">
            Mobile
          </h1>
          <h1 className="text-blue-500 font-extrabold bg-white p-3 rounded-md cursor-pointer">
            Book
          </h1>
        </div>
        <div className="flex-1 bg-cyan-600 p-6 overflow-auto h-screen ">
          <div className="flex justify-center bg-white p-3 mb-3 list-none space-x-9 font-bold">
            <li onClick={handleNav1}  className="hover:text-blue-500 hover:scale-105 transition-transform duration-300 cursor-pointer">
              Fashion
            </li>
            <li className="hover:text-blue-500 hover:scale-105 transition-transform duration-300 cursor-pointer">
              Laptop
            </li>
            <li onClick={handleNav2}  className="hover:text-blue-500 hover:scale-105 transition-transform duration-300 cursor-pointer">
              Mobile
            </li>
            <li onClick={handleNav3} className="hover:text-blue-500 hover:scale-105 transition-transform duration-300 cursor-pointer">
              Book
            </li>
          </div>

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
                    <span className="font-bold">Category: </span>
                    {item.category}
                  </li>
                  <li>
                    <span className="font-bold">Photo: </span>
                    <img
                      src={`http://localhost:3000/` + item.image?.split("\\").pop()}
                      alt={item.image}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Laptop;
