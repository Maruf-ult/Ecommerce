import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth,db } from "./firebase";
import { setDoc,doc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [pass,setPass] = useState("")

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/Login");
  };

  const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
         await createUserWithEmailAndPassword(auth,email,pass)
         const user = auth.currentUser;
         console.log(user)
         if(user){
          await setDoc(doc(db,"Users",user.uid),{
            name:name,
            email:user.email,
          })
         }
         toast.success('user registered successfully')
        } catch (error) {
          toast.error(error.message, { duration: 2000 }); 
        }
  }


  return (
    <>
      <div className="h-screen w-screen bg-cyan-900 relative flex">
        <div className="flex-col justify-start space-y-5 mt-20 ml-24">
          <h1 className="font-extrabold text-8xl">
           <span className="text-slate-300">HI</span>  <span className="text-sky-500">THERE</span>
          </h1>
          <h1 className="font-extrabold text-8xl text-slate-300">WELCOME TO</h1>
          <h1 className="font-extrabold text-8xl text-sky-500">Ecommerce</h1>
        </div>

        <div className="flex  items-center justify-center ml-40 mb-16 ">
          <div className="flex flex-col bg-slate-300 h-96 w-96 justify-center items-center text-center space-y-6 rounded-lg">
            <h1 className="font-bold  text-3xl ">Sign up</h1>
            <input
              type="text"
              placeholder="name"
              onChange={(e)=>setName(e.target.value)}
              required
              className="p-3 w-64 rounded-md"
            />
            <input
              type="email"
              placeholder="email"
              onChange={(e)=>setEmail(e.target.value)}
              required
              className=" p-3 w-64 rounded-md"
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e)=>setPass(e.target.value)}
              required
              className="p-3 w-64 rounded-md"
            />

            <div className="flex space-x-9">
              <button onClick={handleSubmit} className="bg-sky-500 py-2 w-64 rounded-md  text-white ">
                Create account
              </button>
            </div>
            <p className="pl-24 font-light">
              Already Registered{" "}
              <button
                onClick={handleNavigation}
                className="text-sky-500 font-bold underline"
              >
                Login
              </button>{" "}
            </p>
          </div>
        </div>
      </div>
      <Toaster></Toaster>
    </>
  );
}

export default Home;
