import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const LikedItems = () => {
  const [likedItems, setLikedItems] = useState([]);
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Location state id:', id);
        const response = await axios.get('http://localhost:3000/api/get-items');
        console.log('Full API Response:', response);

        if (response.data && response.data.items) {
          const allItems = response.data.items;
          console.log('Fetched items:', allItems);

          // Filter items based on some criteria, e.g., user ID
          const filteredItems = allItems.filter(item => item.userId === id);
          setLikedItems(filteredItems);
        } else {
          console.error('Invalid API response structure:', response.data);
          alert('Failed to fetch liked items. Invalid response structure.');
        }
      } catch (error) {
        console.error('Error fetching liked items:', error);
        alert('Failed to fetch liked items. Please try again later.');
      }
    };
    fetchData();
  }, [id]);

  console.log('Liked items state:', likedItems);

  if (!Array.isArray(likedItems) || likedItems.length === 0) {
    return <div>No liked items found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {likedItems.map((item) => (
        <div key={item._id} className="bg-white p-4 rounded-md shadow-md">
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
            <li>
              <span className="font-bold">Category: </span>
              {item.category}
            </li>
            <li>
              <span className="font-bold">Brand: </span>
              {item.brand}
            </li>
            <li>
              <img
                src={`http://localhost:3000/${item.image?.split("\\").pop()}`}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md"
              />
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default LikedItems;
