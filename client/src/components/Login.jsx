// import { faG } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import toast, { Toaster } from "react-hot-toast";
import SignGoogle from "./SignGoogle.jsx";

function Login() {
   
  const [email,setEmail] =useState("")
  const [pass,setPass] = useState("")

  const navigate = useNavigate();

  const handleNav = () => {
    navigate("/");
  };


  const handleSubmit =async (e)=>{
    e.preventDefault();
    try {
       await signInWithEmailAndPassword(auth,email,pass)
       toast.success('logged in successfully')    
       navigate('/Home')
    } catch (error) {
      toast.error(error.message, { duration: 2000 }); 
    }
  }


  return (
    <>
      <div className="h-screen w-screen bg-cyan-900 relative flex">
        <div className="flex-col justify-start space-y-5 mt-20 ml-24">
          <h1 className="font-extrabold text-8xl">
           <span className="text-slate-300">HI</span> <span className="text-sky-500">THERE</span>
          </h1>
          <h1 className="font-extrabold text-8xl  text-slate-300">WELCOME TO</h1>
          <h1 className="font-extrabold text-8xl text-sky-500">Ecommerce</h1>
        </div>

        <div className="flex items-center justify-center ml-40 mb-16">
          <div className="flex flex-col bg-slate-300 h-96 w-96 justify-center items-center text-center space-y-5 pb-6 rounded-lg">
            <h1 className="font-bold text-3xl">Sign in</h1>
            <input
              type="email"
              placeholder="email"
              className="p-3 w-64 rounded-md"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}

            />
            <input
              type="password"
              placeholder="password"
              className="p-3 w-64 rounded-md"
              value={pass}
              onChange={(e)=>setPass(e.target.value)}
            />

            <div className="flex flex-col space-y-2">
              <button onClick={handleSubmit} className="bg-sky-500 py-2 w-64 rounded-sm text-white ml-1">
                Login
              </button>
              <p className="pl-20 font-light">
                New here?{" "}
                <button
                  onClick={handleNav}
                  className="text-sky-500 font-bold underline"
                >
                  Create account
                </button>
              </p>
            </div>
            <SignGoogle/>
          </div>
        </div>
      </div>
      <Toaster></Toaster>
    </>
  );
}


export default Login;
