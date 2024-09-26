import { useLocation } from 'react-router-dom';

function SavedItems() {
  const location = useLocation();
  const { likedItems } = location.state || { likeddItems: [] };

  return (
    <div className="flex-1 bg-cyan-600 p-6 overflow-auto h-screen">
      <div className="flex justify-center bg-white p-3 mb-3 list-none space-x-9 font-bold">
        <li className="hover:text-blue-500 hover:scale-105 transition-transform duration-300 cursor-pointer">Fashion</li>
        <li className="hover:text-blue-500 hover:scale-105 transition-transform duration-300 cursor-pointer">Laptop</li>
        <li className="hover:text-blue-500 hover:scale-105 transition-transform duration-300 cursor-pointer">Mobile</li>
        <li className="hover:text-blue-500 hover:scale-105 transition-transform duration-300 cursor-pointer">Books</li>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedItems.length > 0 ? (
          likedItems.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-md">
              <ul className="space-y-2">
                <li><span className="font-bold">Title: </span>{item.title}</li>
                <li><span className="font-bold">Price: </span>{item.price}$</li>
                <li><span className="font-bold">Offer Price: </span>{item.offer_price}$</li>
                <li><span className="font-bold">Category: </span>{item.category}</li>
                <li><span className="font-bold">Brand: </span>{item.brand}</li>
                <li><img src={`http://localhost:3000/${item.image?.split("\\").pop()}`} alt={item.image} className="w-full h-48 object-cover rounded-md" /></li>
              </ul>
            </div>
          ))
        ) : (
          <p>No saved items</p>
        )}
      </div>
    </div>
  );
}

export default SavedItems;
