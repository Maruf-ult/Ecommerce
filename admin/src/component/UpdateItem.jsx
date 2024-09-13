// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";
// import axios from "axios";

// function UpdateItem() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = location.state || {};

//   const [item, setItem] = useState({
//     title: "",
//     price: "",
//     offer_price: "",
//     category: "",
//     image: null,
//   });

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/get-item/${id}`);
//         setItem(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchItem();
//   }, [id]);

//   const handleNavigate = () => {
//     navigate('/get-item');
//   };

//   const handleChange = (e) => {
//     setItem({ ...item, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setItem({ ...item, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', item.title);
//     formData.append('price', item.price);
//     formData.append('offer_price', item.offer_price);
//     formData.append('category', item.category);
//     if (item.image) {
//       formData.append('image', item.image);
//     }

//     try {
//       const updateUser = await axios.patch(
//         `http://localhost:3000/api/update-item/${id}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );
//       const res = updateUser.data;
//       console.log(res);
//       if (res.success) {
//         toast.success(res.msg);
//         navigate("/get-item");
//       }
//     } catch (error) {
//       console.log(error);
//       alert(error);
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center bg-slate-400 border-4 border-transparent rounded-md shadow-lg w-96 m-auto my-20">
//         <form className="my-20 mx-24">
//           <input
//             className="my-2 border-4 p-1 border-transparent rounded"
//             type="text"
//             name="title"
//             value={item.title}
//             onChange={handleChange}
//             placeholder="title"
//           />
//           <input
//             className="my-2 border-4 p-1 border-transparent rounded"
//             type="number"
//             name="price"
//             value={item.price}
//             onChange={handleChange}
//             placeholder="price"
//           />
//           <input
//             className="my-2 border-4 p-1 border-transparent rounded"
//             type="number"
//             name="offer_price"
//             value={item.offer_price}
//             onChange={handleChange}
//             placeholder="offer_price"
//           />
//           <input
//             className="my-2 border-4 p-1 border-transparent rounded"
//             type="text"
//             name="category"
//             value={item.category}
//             onChange={handleChange}
//             placeholder="category"
//           />
//           <input
//             onChange={handleFileChange}
//             className="rounded-sm cursor-pointer"
//             type="file"
//             name="image"
//           />
//           <div className="my-4">
//             <button
//               onClick={handleNavigate}
//               className="bg-red-500 border-4 border-transparent rounded-md font-bold px-2"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="bg-green-300 border-4 border-transparent rounded-md font-bold ml-6 px-2"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//       <Toaster />
//     </>
//   );
// }

// export default UpdateItem;
