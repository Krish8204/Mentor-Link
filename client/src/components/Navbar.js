import React from "react";
import { Link, useHistory } from "react-router-dom";
import LogoImage from "../assets/images/logo.png";

function Navbar() {
  const history = useHistory();

  const handleSignUpClick = () => {
    history.push("/main");
  };

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src={LogoImage}
              alt="MentorLink Logo"
              className="w-60 h-60 object-contain transition-transform group-hover:scale-110 duration-300"
            />
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleSignUpClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105"
            >
              Select Your Role
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
