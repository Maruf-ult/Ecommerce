import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faG } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate('/');
  };

  return (
    <>
      <div className="h-screen w-screen bg-emerald-200 relative flex">
        <div className="flex-col justify-start space-y-5 mt-20 ml-24">
          <h1 className="font-extrabold text-8xl">
            HI <span className="text-sky-500">THERE</span>
          </h1>
          <h1 className="font-extrabold text-8xl">WELCOME TO</h1>
          <h1 className="font-extrabold text-8xl text-sky-500">Ecommerce</h1>
        </div>

        <div className="flex items-center justify-center ml-40 mb-16">
          <div className="flex flex-col bg-slate-200 h-96 w-96 justify-center items-center text-center space-y-5 pb-6 rounded-lg">
            <h1 className="font-bold text-3xl">Sign in</h1>
            <input type="email" placeholder="email" className="p-3 w-64 rounded-sm" />
            <input type="password" placeholder="password" className="p-3 w-64 rounded-sm" />

            <div className="flex flex-col space-y-2">
              <button className="bg-sky-500 py-2 w-64 rounded-md text-white ml-1">Login</button>
              <p className="pl-20 font-light">
                New here?{' '}
                <button onClick={handleNav} className="text-sky-500 font-bold underline">
                  Create account
                </button>
              </p>
            </div>

            <p className="font-light">-or continue with-</p>
            <button className="bg-sky-500 text-white py-2 w-52 rounded-md">
              <FontAwesomeIcon icon={faG} className="bg-blue-600 p-1 mr-2" style={{ verticalAlign: 'middle' }} />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
