import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { Button } from "@mui/material";

const Navbar = () => {
  return (
    <div className="navbar w-10/12 mx-auto">
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
        <Link className="text-2xl font-bold flex items-center gap-1">
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
          <NavLink to="/my-reviews" className="navLink">
            My Reviews
          </NavLink>
        </ul>
      </div>
      <div className="navbar-end space-x-2">
      <Button variant="contained" className="mt-1 w-max !px-6 !bg-pColor hover:!bg-pColor !shadow-none hover:!text-white !rounded-full !capitalize">Login </Button>
      <Link to='/register'><Button variant="contained" className="mt-1 myBtn">Register </Button></Link>
      <Button variant="contained" className="mt-1 myBtn">Log Out </Button>
      
        <div className="avatar">
          <div className="mask mask-hexagon w-12">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
