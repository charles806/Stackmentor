import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#E8EBF3] flex items-center justify-between px-4 md:px-8 py-3  relative">
      {/* Logo */}
      <div className="text-xl md:text-2xl font-[200] text-[#1E3A8A] cursor-pointer">
        <Link to="/">StackMentor</Link>
      </div>

      {/* Desktop Links */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-10">
        <Link
          to="/"
          className="text-[#000] text-[15px] lg:text-[17px] hover:text-[#1E3A8A] transition"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-[#000] text-[15px] lg:text-[17px] hover:text-[#1E3A8A] transition"
        >
          About Us
        </Link>
        <Link
          to="/courses"
          className="text-[#000] text-[15px] lg:text-[17px] hover:text-[#1E3A8A] transition"
        >
          Our Courses
        </Link>
        <Link
          to="/contact"
          className="text-[#000] text-[15px] lg:text-[17px] hover:text-[#1E3A8A] transition"
        >
          Contact Us
        </Link>
        <Link to="/register">
          <button className="bg-[#1E3A8A] text-white text-[13px] lg:text-[15px] px-3 py-2 lg:px-4 lg:py-2 rounded-lg font-semibold hover:bg-[#D2D7E7] hover:text-[#000] shadow-md transition cursor-pointer">
            Register Now
          </button>
        </Link>
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

      {/* Slide-In Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-[50%] sm:w-[60%] bg-[#E8EBF3] shadow-2xl z-40 flex flex-col items-center justify-center gap-6 sm:gap-8"
          >
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-[18px] sm:text-[20px] text-[#000] hover:text-[#1E3A8A]"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="text-[18px] sm:text-[20px] text-[#000] hover:text-[#1E3A8A]"
            >
              About Us
            </Link>
            <Link
              to="/courses"
              onClick={() => setIsOpen(false)}
              className="text-[18px] sm:text-[20px] text-[#000] hover:text-[#1E3A8A]"
            >
              Our Courses
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="text-[18px] sm:text-[20px] text-[#000] hover:text-[#1E3A8A]"
            >
              Contact Us
            </Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>
              <button className="bg-[#1E3A8A] text-white text-[14px] px-4 py-2 rounded-lg font-semibold hover:bg-[#D2D7E7] hover:text-[#000] shadow-md transition">
                Register Now
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
