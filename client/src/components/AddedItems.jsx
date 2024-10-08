import axios from 'axios';
import { useEffect, useState } from 'react';

const AddedItems = () => {
  const [addedItems, setAddedItems] = useState([]);
  const [totalOfferPrice, setTotalOfferPrice] = useState(0);

  useEffect(() => {
    const fetchAddedItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/added-items');
        const items = response.data.addedItems;
        console.log('Fetched saved items:', items);
        setAddedItems(Array.isArray(items) ? items : []);

        // Calculate the sum of all offer prices
        const total = items.reduce((acc, item) => acc + item.offer_price, 0);
        setTotalOfferPrice(total);
      } catch (error) {
        console.error('Error fetching liked items:', error);
        alert('Failed to fetch liked items. Please try again later.');
      }
    };

    fetchAddedItems();
  }, []);

  if (!Array.isArray(addedItems) || addedItems.length === 0) {
    return <div>No liked items found.</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-400"> 
    
      <h2 className="text-xl font-bold mb-4 text-center bg-blue-500 mr-96 ml-96 p-4">
        Total Price: ${totalOfferPrice}
      </h2>
      <div className="flex flex-col space-y-4">
        {addedItems?.map((item) => (
          <div key={item._id} className="bg-gray-200 p-4 rounded-md shadow-md flex">
            <img
              src={`http://localhost:3000/${item.image?.split("\\").pop()}`}
              alt={item.title}
              className="w-48 h-48 object-cover rounded-md mr-4"
            />
            <ul className="flex flex-col justify-between ml-10">
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

export default AddedItems;
