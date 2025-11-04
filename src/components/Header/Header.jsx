import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // Safely parse user data
    if (
      token &&
      storedUser &&
      storedUser !== "undefined" &&
      storedUser !== "null"
    ) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Clear invalid data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Learning materials pages get special header
  const isLearningPage = location.pathname.includes("/learning-materials");

  if (isLearningPage && user) {
    return (
      <header className="bg-[#D2D7E7] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold">StackMentor</h1>
          </Link>

          <nav className="hidden md:flex space-x-6 font-medium">
            <Link
              to={`/learning-materials${
                user.course === "fullstack" ? "" : "-" + user.course
              }`}
              className="hover:underline"
            >
              My Courses
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <FaUserCircle className="text-2xl" />
              <span className="hidden sm:inline font-medium">
                {user.fullName}
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg py-2 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-semibold">{user.fullName}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Regular pages header
  return (
    <header className="bg-[#D2D7E7] flex items-center justify-between px-4 md:px-8 py-3 relative">
      <div className="text-xl md:text-2xl font-extralight text-[#1E3A8A] cursor-pointer">
        <Link to="/">StackMentor</Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-10">
        <Link
          to="/"
          className="text-black text-[15px] lg:text-[17px] hover:text-[#1E3A8A] transition"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-black text-[15px] lg:text-[17px] hover:text-[#1E3A8A] transition"
        >
          About Us
        </Link>
        <Link
          to="/courses"
          className="text-black text-[15px] lg:text-[17px] hover:text-[#1E3A8A] transition"
        >
          Our Courses
        </Link>
        <Link
          to="/contact"
          className="text-black text-[15px] lg:text-[17px] hover:text-[#1E3A8A] transition"
        >
          Contact Us
        </Link>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 text-[#1E3A8A]"
            >
              <FaUserCircle className="text-2xl" />
              <span className="text-[15px]">{user.fullName}</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                <Link
                  to={`/learning-materials${
                    user.course === "fullstack" ? "" : "-" + user.course
                  }`}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/register">
            <button className="bg-[#1E3A8A] text-white text-[13px] lg:text-[15px] px-3 py-2 lg:px-4 lg:py-2 rounded-lg font-semibold hover:bg-[#D2D7E7] hover:text-black shadow-md transition cursor-pointer">
              Register Now
            </button>
          </Link>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden z-50">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <HiX size={26} className="text-[#1E3A8A]" />
          ) : (
            <HiOutlineMenu size={26} className="text-[#1E3A8A]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-[70%] bg-[#D2D7E7] shadow-2xl z-40 flex flex-col items-center justify-center gap-6"
          >
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-[18px] text-black hover:text-[#1E3A8A]"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="text-[18px] text-black hover:text-[#1E3A8A]"
            >
              About Us
            </Link>
            <Link
              to="/courses"
              onClick={() => setIsOpen(false)}
              className="text-[18px] text-black hover:text-[#1E3A8A]"
            >
              Our Courses
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="text-[18px] text-black hover:text-[#1E3A8A]"
            >
              Contact Us
            </Link>

            {user ? (
              <>
                <Link
                  to={`/learning-materials${
                    user.course === "fullstack" ? "" : "-" + user.course
                  }`}
                  onClick={() => setIsOpen(false)}
                  className="text-[18px] text-black hover:text-[#1E3A8A]"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="bg-red-600 text-white text-[14px] px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <button className="bg-[#1E3A8A] text-white text-[14px] px-4 py-2 rounded-lg font-semibold">
                  Register Now
                </button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
