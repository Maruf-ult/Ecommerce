import axios from 'axios';
import { useEffect, useState } from 'react';

const SavedItems = () => {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const fetchLikedItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/saved-items');
        const items = response.data.savedItems;
        console.log('Fetched saved items:', items);
        setSavedItems(Array.isArray(items) ? items : []); // Ensure it's an array
      } catch (error) {
        console.error('Error fetching liked items:', error);
        alert('Failed to fetch liked items. Please try again later.');
      }
    };

    fetchLikedItems();
  }, []);

  if (!Array.isArray(savedItems) || savedItems.length === 0) {
    return <div>No liked items found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-400">
       <h2 className="text-xl font-bold mb-4 text-center bg-sky-400  p-4 border-black rounded-md ">
          Saved Items
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 pr-10 pl-10">
     
        {savedItems?.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-md shadow-md flex">
            <img
              src={`http://localhost:3000/${item.image?.split("\\").pop()}`}
              alt={item.title}
              className="w-48 h-56 object-cover rounded-md"
            />
            <ul className="space-y-2 ml-4">
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
              <li>
                <span className="font-bold">Category: </span>
                {item.category}
              </li>
              <li>
                <span className="font-bold">Brand: </span>
                {item.brand}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedItems;
