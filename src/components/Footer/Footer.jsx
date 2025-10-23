import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#E8EBF3] text-black py-10 px-6 md:px-20 border-t border-gray-300 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-[#000000]">
            StackMentor
          </h2>
          <p className="text-sm md:text-base leading-6 text-black">
            Empowering creativity and learning through high-quality online
            programs designed for modern learners. Join us and take your next
            big step toward success.
          </p>

          <div className="mt-5">
            <form className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-lg border border-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#1E3A8A] text-white text-sm rounded-lg hover:bg-blue-900 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <nav aria-label="Quick Links">
          <h3 className="text-lg font-semibold mb-4 text-[#000000]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-black text-md">
            <li>
              <Link
                to="/"
                className="hover:text-blue-700 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-700 transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="hover:text-blue-700 transition-colors duration-200"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-700 transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="hover:text-blue-700 transition-colors duration-200"
              >
                Register
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#000000]">Contact</h3>
          <ul className="text-black text-md space-y-2">
            <li>📞 +234 703 235 5643</li>
            <li>
              <Link
                to="mailto:c08445333@gmail.com"
                className="hover:text-blue-700 transition-colors duration-200"
              >
                📧 Email me
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#000000]">
            Follow Us
          </h3>
          <div className="flex flex-col gap-3">
            <Link
              to="https://www.tiktok.com/@codex_x_x"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition-colors duration-200"
            >
              TikTok
            </Link>
            <Link
              to="https://www.instagram.com/codecraftter/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition-colors duration-200"
            >
              Instagram
            </Link>
            <Link
              to="https://wa.link/hlduze"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition-colors duration-200"
            >
              Message me
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-400 pt-6 text-center text-black text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium font-italic">StackMentor</span> — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
