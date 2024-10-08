import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Mobile() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [likes, setLikes] = useState({});
  const [saves,setSaves] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await axios.get("http://localhost:3000/api/get-item");
        const val = items.data.items;
        const fashionItems = val.filter(item => item.category === "Books");
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
    navigate('/Laptop');
  };
  const handleNav3 = () => {
    navigate('/Books');
  };
  const handleNav = ()=>{
    navigate('/Home')
  }

  const nav1=()=>{
    navigate('/liked-items')
  }

  const nav2=()=>{
    navigate('/saved-items')
  }

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleLike = async (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: !prevLikes[id],
    }));

    try {
      await axios.post("http://localhost:3000/api/create-like", { id });
      console.log(`Item with id ${id} liked successfully`);
    } catch (error) {
      console.error('Error liking the item:', error);
    }

  };

  const toggleSave =async (id) =>{
    setSaves((prevSaves) =>({
      ...prevSaves,
      [id]:!prevSaves[id],
    }));
    try {
      await axios.post("http://localhost:3000/api/create-save",{id})
      console.log(`Item with id ${id} saved successfully`);                     
    } catch (error) {
     console.error('Error liking the item:', error);
       alert(error)
    }
  };

  const filteredItems = data.filter((item) => {
    if (!selectedRange) {
       return true; 
    }
   else if (selectedRange === "10-200$") {
     return item.price >= 10 && item.price < 200;
   } else if (selectedRange === "200-300$") {
     return item.price >= 200 && item.price < 300;
   } else if (selectedRange === "300-100000000") {
    return item.offer_price >= 300 && item.offer_price<1000000000; }}
 )
  

  return (
    <>
      <div className="flex space-x-2">
        <div className="bg-red-200 w-64 h-screen flex flex-col justify-start text-start rounded-md p-3 ">
          <h1 onClick={handleNav} className="text-blue-500 font-extrabold bg-slate-700 p-3  w-full cursor-pointer">
            Dashboard
          </h1>

          <h1 onClick={toggleOptions} className="text-blue-500 font-extrabold bg-white p-3 mt-5 rounded-md cursor-pointer">
            Amount
          </h1>
          <h1 onClick={nav2} className="text-blue-500 font-extrabold bg-white p-3 mt-6  cursor-pointer">
            saved items 
          </h1>
          <h1 onClick={nav1} className="text-blue-500 font-extrabold bg-white p-3 mt-6  cursor-pointer">
            liked items 
          </h1>
          {showOptions && (
  <div className="bg-white mt-1 space-y-1 ">
    <div
      className="flex justify-center bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer "
      onClick={() => handleRangeChange({ target: { value: '10-200' } })}
    >
      <h1 className="text-blue-500 font-extrabold p-2 rounded-md">
        10-200$
      </h1>
    </div>
    <div
      className="flex justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer"
      onClick={() => handleRangeChange({ target: { value: '200-300' } })}
    >
      <h1 className="text-blue-500 font-extrabold p-2 rounded-md">
        200-300$
      </h1>
    </div>
    <div
      className="flex justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer"
      onClick={() => handleRangeChange({ target: { value: '300-100000000' } })}
    >
      <h1 className="text-blue-500 font-extrabold p-2 rounded-md">
      300-100000000$
      </h1>
    </div>
  </div>
)}
        </div>
        <div className="flex-1 bg-cyan-600 p-6 overflow-auto h-screen ">
          <div className="flex justify-center bg-white p-3 mb-3 list-none space-x-9 font-bold">
            <li onClick={handleNav1}  className="hover:text-blue-500 hover:scale-105 transition-transform duration-300 cursor-pointer">
              Fashion
            </li>
            <li onClick={handleNav2} className="hover:text-blue-500 hover:scale-105 transition-transform duration-300 cursor-pointer">
              Laptop
            </li>
            <li className="hover:text-blue-500 hover:scale-105 transition-transform duration-300 cursor-pointer">
              Mobile
            </li>
            <li onClick={handleNav3} className="hover:text-blue-500 hover:scale-105 transition-transform duration-300 cursor-pointer">
              Books
            </li>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems?.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md">
                <ul className="space-y-2">
                  <li>
                    <span className="font-bold">Title: </span>
                    {item.title}
                  </li>
                  <li>
                    <span className="font-bold">Price: </span>
                    {item.price}$
                  </li>
                  <li>
                    <span className="font-bold">Offer Price: </span>
                    {item.offer_price}$
                  </li>
                  {/* <li>
                    <span className="font-bold">Category: </span>
                    {item.category}
                  </li> */}
                  <li>
                    <span className="font-bold">Brand: </span>
                    {item.brand}
                  </li>
                  <li>
                  
                    <img
                      src={`http://localhost:3000/` + item.image?.split("\\").pop()}
                      alt={item.image}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </li>
                </ul>
                <div className="flex justify-center text-center space-x-8 mt-3">
                <button onClick={()=>toggleLike(item._id)} className="bg-blue-500 text-white w-20 h-9 rounded-md"> {likes[item._id] ? "liked" : "like"}</button>
                <button onClick={()=>toggleSave(item._id)} className="bg-blue-500 text-white  w-20 h-9 rounded-md"> {saves[item._id] ? "saved" : "save"}</button>
                     <button className="bg-green-500 text-white  w-28 h-9 rounded-md">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Mobile;
