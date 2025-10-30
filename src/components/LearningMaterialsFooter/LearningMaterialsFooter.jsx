import React from "react";
import { Link } from "react-router-dom";

const LearningMaterialsFooter = () => {
  return (
    <footer className="bg-[#6175AD] text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} StackMentor. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link to="/privacy" className="hover:underline text-sm">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:underline text-sm">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default LearningMaterialsFooter;
