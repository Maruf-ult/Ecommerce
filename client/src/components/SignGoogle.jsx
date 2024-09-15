
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import googleLogo from './google.png';  
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function SignGoogle() {
  
  const navigate = useNavigate();

  const googleLogin =()=>{
      
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider).then(async (result)=>{
      console.log(result);
      if(result.user){
           toast.success('Logged in successfully')
           navigate('/Home')
      }
      else{
        toast.error('An error occured',{duration:2000})
      }
    });
  }


  return (
    <>
    <div>
       
       <p className="font-light">-or continue with-</p>
       <img onClick={googleLogin} src={googleLogo} alt="Google Sign-In" className='w-64 h-16 cursor-pointer  '/>
    </div>
    <Toaster></Toaster>
    </>
  );
}

export default SignGoogle;
