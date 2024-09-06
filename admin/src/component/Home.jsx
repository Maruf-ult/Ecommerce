import React from 'react';

function Home() {
  return (
    <>
      <div className="flex space-x-4">
        <div className="bg-red-200 w-64 h-screen flex flex-col justify-start text-start  space-y-8 rounded-md p-3">
          <h1 className="text-blue-500 font-extrabold bg-white p-3 mt-3 rounded-md">Add Item</h1>
          <h1 className="text-blue-500 font-extrabold bg-white p-3 rounded-md">All Item</h1>
        </div>
        <div className='bg-cyan-600 h-screen w-screen rounded-md'>
             Home
        </div>
      </div>

    </>
  );
}

export default Home;
