
import { useNavigate } from 'react-router-dom';

function Home() {

     const navigate = useNavigate();
   
     const handleNavigation =()=>{
         navigate('/Login')
     }

     return (
       <>
         <div className="h-screen w-screen bg-emerald-200 relative flex">
           <div className="flex-col justify-start space-y-5 mt-20 ml-24">
             <h1 className="font-extrabold text-8xl">
               HI <span className="text-sky-500">THERE</span>
             </h1>
             <h1 className="font-extrabold text-8xl">WELCOME TO</h1>
             <h1 className="font-extrabold text-8xl text-sky-500">
               Ecommerce
             </h1>
           </div>
   

     <div className="flex  items-center justify-center ml-40 mb-16 ">

      <div className="flex flex-col bg-slate-200 h-96 w-96 justify-center items-center text-center space-y-6 rounded-lg">

         <h1 className='font-bold  text-3xl '>Sign up</h1>
        <input type="text" name="name" id=""  placeholder="name" className="p-3 w-64 rounded-sm" />
        <input type="email" placeholder="email" className=" p-3 w-64 rounded-sm" />
        <input type="password" placeholder="password" className="p-3 w-64 rounded-sm" />
        
        <div className="flex space-x-9">
                <button className="bg-sky-500 py-2 w-64 rounded-md  text-white ">Create account</button>

           </div>
           <p className='pl-24 font-light'>Already Registered  <button onClick={handleNavigation} className='text-sky-500 font-bold underline'>Login</button> </p>      
      
      </div>
    
           
    
    </div>

        
         </div>
       </>
     );
   }
   
   export default Home;
   