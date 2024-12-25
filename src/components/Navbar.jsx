import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { Button } from "@mui/material";
import { useContext,  } from "react";
import { ThemeContext } from "../provider/ContextApi";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "../provider/firebase.config";
import fakeUser from '../assets/fakeUser.webp'
import Headroom from "react-headroom";

const Navbar = () => {
  const { user, processing } = useContext(ThemeContext);
  const photo = user?.photoURL


  const handleUserImage = (e) => {
    e.target.src = fakeUser
  }

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f12804",
      cancelButtonColor: "#16A34A",
      confirmButtonText: "Yes",
      customClass: {
        title: "text-xl  md:text-3xl font-bold ",
        text: "text-3xl ",
        popup: "text-black rounded-3xl ",
        confirmButton: "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
        cancelButton: "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged out!",
              text: "Logout Successful!",
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
          });
      }
    });
  };

  return (
    <Headroom>
      <div className="navbar w-10/12 mx-auto bg-white relative z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link to='/' className="text-2xl font-bold flex items-center gap-1">
          <img className="w-8 hue-rotate-180" src={logo} alt="" /> Service Scope
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-2 text-sm font-medium">
          <NavLink to="/" className="navLink">
            Home
          </NavLink>
          <NavLink to="/services" className="navLink">
            Services
          </NavLink>
          <NavLink to="/add-service" className="navLink">
            Add Service
          </NavLink>
          <NavLink to="/my-services" className="navLink">
            My Services
          </NavLink>
          <NavLink to="/my-reviews" className="navLink">
            My Reviews
          </NavLink>
        </ul>
      </div>
      <div className="navbar-end space-x-2">
        {processing ? (
          <>
            <div className="skeleton py-[6px] text-transparent rounded-full px-6">
              Login
            </div>
            <div className="skeleton py-[6px] text-transparent rounded-full px-6">
              Register
            </div>

            <div className="skeleton py-[6px] text-transparent rounded-full px-6">
              Log Out
            </div>
            <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
          </>
        ) : (
          <>
            {user ? (
              <>
                <Button
                  onClick={handleLogOut}
                  variant="contained"
                  className="mt-1 myBtn"
                >
                  Log Out{" "}
                </Button>

                 <img
                  onError={handleUserImage}
                  className="w-10 h-10 rounded-full object-cover"
                  src={photo}
                  alt=""
                />
               
              </>
            ) : (
              <>
                <Link to="/login">
                  {" "}
                  <Button
                    variant="contained"
                    className="mt-1 w-max !px-6 !bg-pColor hover:!bg-pColor !shadow-none hover:!text-white !rounded-full !capitalize"
                  >
                    Login{" "}
                  </Button>
                </Link>

                <Link to="/register">
                  <Button variant="contained" className="mt-1 myBtn">
                    Register{" "}
                  </Button>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </div>
    </Headroom>
  );
};

export default Navbar;
