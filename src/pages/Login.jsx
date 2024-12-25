import { Button, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import {
  RiEye2Line,
  RiEyeCloseLine,
  RiLock2Fill,
  RiMailFill,
} from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../provider/ContextApi";
import Swal from "sweetalert2";
import googlepng from '../assets/google.png'
import { useLoadingBar } from "react-top-loading-bar";
import { Helmet } from "react-helmet-async";


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const {state} = useLocation()
  const desiredRoute = state?.desiredRoute
  
  const { start, complete } = useLoadingBar({ color: "#FA6500", height: 2 });

  useEffect(()=>{
   start()
   setTimeout(()=>{
    complete()
   }, 200)
  },[complete, start])

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {login,GoogleSignIn,} = useContext(ThemeContext)
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = Object.fromEntries(new FormData(e.target).entries());
    const { password, email } = formData;

    login(email, password)
    .then(() => {
        
        setLoading(false)
          Swal.fire({
                  icon: "success",
                  title: "Logged in!",
                  text: "Login Successful!",
                  confirmButtonText: "Okay",
                  scrollbarPadding: false,
                  showConfirmButton: false,
                  timer: 1500,
                customClass: {
                  title: 'text-xl  md:text-3xl font-bold ',
                  text: 'text-3xl ',
                  popup: "text-black rounded-3xl outline outline-[#16A34A]",
                  confirmButton: "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
                },
                });
                e.target.reset();
                if (desiredRoute) {
                    navigate(desiredRoute);
                    
                }else{
                    navigate('/')
                }
    })
    .catch(error => {
         Swal.fire({
                  icon: "error",
                  title: 'Failed !',
                  text: `${error?.code}`,
                  confirmButtonText: "Retry",
                  scrollbarPadding: false,
                  customClass: {
                    title: 'text-xl md:text-3xl font-bold ',
                    text: 'text-3xl',
                    popup: "bg-white text-black rounded-3xl ",
                    confirmButton: "bg-[#f12804] rounded-full py-[10px] px-[30px]",
                  },
               
                });
                setLoading(false);
                e.target.reset();
       

    })

  };

  const handleSignIn = () => {
        GoogleSignIn()
        .then(() => {
        
            Swal.fire({
                icon: "success",
                title: "Logged in!",
                text: "Login Successful!",
                confirmButtonText: "Okay",
                scrollbarPadding: false,
                showConfirmButton: false,
                timer: 1500,
              customClass: {
                title: 'text-xl  md:text-3xl font-bold ',
                text: 'text-3xl ',
                popup: "text-black rounded-3xl outline outline-[#16A34A]",
                confirmButton: "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
              },
              });
              if (desiredRoute) {
                navigate(desiredRoute);
                
            }else{
                navigate('/')
            }
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: 'Failed !',
                text: `${error?.code}`,
                confirmButtonText: "Retry",
                scrollbarPadding: false,
                customClass: {
                  title: 'text-xl md:text-3xl font-bold ',
                  text: 'text-3xl',
                  popup: "bg-white text-black rounded-3xl ",
                  confirmButton: "bg-[#f12804] rounded-full py-[10px] px-[30px]",
                },
             
              });
        })
  }
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <div>
       <Helmet>
                    <title>Login | Service Scope</title>
                  </Helmet>
      <form onSubmit={handleLogin} className="card-body w-5/12 mx-auto">
        <h1 className="text-2xl font-bold">Welcome Back!</h1>
        <p className="pb-5">Log in to continue your journey.</p>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <div className="border flex items-center rounded-xl ">
            <RiMailFill className="text-xl ml-2" />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className=" flex-1 focus:outline-none py-2 px-2 bg-transparent"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="border flex items-center rounded-xl ">
            <RiLock2Fill className="text-xl ml-2" />
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Password"
              name="password"
              id="passwordField"
              className=" flex-1 focus:outline-none py-2 px-2 bg-transparent"
              required
            />
            {showPassword ? (
              <IconButton onClick={handleShowPassword} aria-label="fingerprint">
                <RiEyeCloseLine className="text-base text-pColor" />
              </IconButton>
            ) : (
              <IconButton onClick={handleShowPassword} aria-label="fingerprint">
                <RiEye2Line className="text-base text-pColor" />
              </IconButton>
            )}
          </div>
        </div>

        <div className="form-control mt-6">
          <button className="btn rounded-full py-3 min-h-max h-max bg-pColor border-none text-white hover:bg-pColor">
            {loading && <ImSpinner9 className="animate-spin" />} Login
          </button>
        </div>
        <h1 className="text-sm text-center">
          Do not have an account?{" "}
          <Link
            state={desiredRoute ? {desiredRoute : desiredRoute} : {desiredRoute : '/'}}
            to="/register"
            className="font-medium text-pColor hover:underline"
          >
            Register here
          </Link>
        </h1>
      </form>
      <div className="w-3/12 mx-auto flex flex-col items-center">
      <div className="divider">or</div>
      <Button onClick={handleSignIn} className="myBtn "><img className="w-4 mr-2" src={googlepng} alt="" /> Google</Button>
      </div>
    </div>
  );
};

export default Login;
