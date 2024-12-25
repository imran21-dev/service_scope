import { Alert, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { ImSpinner9 } from "react-icons/im";
import {
  RiEye2Line,
  RiEyeCloseLine,
  RiLink,
  RiLock2Fill,
  RiMailFill,
  RiUser2Fill,
} from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../provider/ContextApi";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { auth } from "../provider/firebase.config";
import { useLoadingBar } from "react-top-loading-bar";
import { Helmet } from "react-helmet-async";


const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const desiredRoute = state?.desiredRoute;
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

  const resetPassword = () => {
    const passwordField = document.querySelector("#passwordField");
    passwordField.value = "";
    setPasswordError(false);
  };

  const { registration } = useContext(ThemeContext);
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = Object.fromEntries(new FormData(e.target).entries());
    const { password, email, photo, name } = formData;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,}$/;
    if (!regex.test(password)) {
      setPasswordError(true);
      setLoading(false);
      return;
    }

    registration(email, password)
      .then(() => {
        setLoading(false);
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {

            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Registration Complete!",
              confirmButtonText: "Okay",
              scrollbarPadding: false,
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                title: "text-xl  md:text-3xl font-bold ",
                text: "text-3xl ",
                popup: "text-black rounded-3xl outline outline-[#16A34A]",
                confirmButton: "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
              },
            });
            e.target.reset();

            if (desiredRoute) {
              navigate(desiredRoute);
            } else {
              navigate("/");
            }

          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed !",
              text: `${error?.code}`,
              confirmButtonText: "Retry",
              scrollbarPadding: false,
              customClass: {
                title: "text-xl md:text-3xl font-bold ",
                text: "text-3xl",
                popup: "bg-white text-black rounded-3xl ",
                confirmButton: "bg-[#f12804] rounded-full py-[10px] px-[30px]",
              },
            });
            setLoading(false);
            e.target.reset();
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed !",
          text: `${error?.code}`,
          confirmButtonText: "Retry",
          scrollbarPadding: false,
          customClass: {
            title: "text-xl md:text-3xl font-bold ",
            text: "text-3xl",
            popup: "bg-white text-black rounded-3xl ",
            confirmButton: "bg-[#f12804] rounded-full py-[10px] px-[30px]",
          },
        });
        setLoading(false);
        e.target.reset();
      });
  };
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full relative">
       <Helmet>
                    <title>Register | Service Scope</title>
                  </Helmet>
      <div className="mx-auto w-5/12 px-8">
        {passwordError && (
          <Alert className="absolute  top-7  w-3/12 " severity="error">
            <span>
              {" "}
              Password must be at least 6 characters, including an uppercase and
              a lowercase letter.
            </span>
            <button
              onClick={resetPassword}
              className="px-2 font-medium text-pColor hover:underline"
            >
              Retry
            </button>
          </Alert>
        )}
      </div>
      <form onSubmit={handleRegister} className="card-body w-5/12 mx-auto">
        <h1 className="text-2xl font-bold">Join Us Today!</h1>
        <p className="pb-5">
          Create your account to access exclusive features.
        </p>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <div className="border flex items-center rounded-xl ">
            <RiUser2Fill className="text-xl ml-2" />
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className=" flex-1 focus:outline-none py-2 px-2 bg-transparent"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <div className="border flex items-center rounded-xl ">
            <RiLink className="text-xl ml-2" />
            <input
              type="url"
              name="photo"
              placeholder="Your photo URL"
              className=" flex-1 focus:outline-none py-2 px-2 bg-transparent"
              required
            />
          </div>
        </div>

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
            {loading && <ImSpinner9 className="animate-spin" />} Register
          </button>
        </div>
        <h1 className="text-sm text-center">
          Already have an account?{" "}
          <Link
            state={
              desiredRoute
                ? { desiredRoute: desiredRoute }
                : { desiredRoute: "/" }
            }
            to="/login"
            className="font-medium text-pColor hover:underline"
          >
            Login here
          </Link>
        </h1>
      </form>
    </div>
    </div>
  );
};

export default Register;
