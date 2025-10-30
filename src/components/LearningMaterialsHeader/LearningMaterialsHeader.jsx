import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const LearningMaterialsHeader = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-[#6175AD] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">StackMentor</Link>
        </h1>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex space-x-6 font-medium">
            <Link to="/my-courses" className="hover:underline">
              My Courses
            </Link>
            <Link to="/resources" className="hover:underline">
              Resources
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>

          {user && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2"
              >
                <FaUserCircle className="text-2xl" />
                <span className="hidden sm:inline">My Account</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 w-full text-left text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default LearningMaterialsHeader;
