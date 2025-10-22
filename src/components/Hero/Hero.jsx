import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import hero_img from "../../assets/hero_image.jpg";

const Hero = () => {
  return (
    <div className="hero flex items-center justify-center px-3 sm:px-4">
      <div className="bg-[#D2D7E7] w-full sm:w-[90%] md:w-[85%] h-auto md:h-[75%] rounded-3xl border border-[#ccc] flex flex-col md:flex-row overflow-hidden">

        {/* Left Section */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left md:w-1/2 w-full p-6 sm:p-8 md:p-12 space-y-5 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-light text-[#000] leading-tight">
            Become a Skilled Developer with <br />
            <span className="text-[#182E6E] font-semibold">StackMentor</span>
          </h1>

          <p className="text-[#000] text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed max-w-md">
            Join our 6-month mentorship program and learn to build real-world
            web apps using modern technologies. <br />
            <span className="italic">Code. Build. Launch.</span>
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
            <Link to="/register">
              <button className="bg-[#1E3A8A] text-white text-[13px] sm:text-[14px] md:text-[15px] px-4 sm:px-5 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#D2D7E7] hover:text-[#000] transition shadow-md">
                Start Learning
              </button>
            </Link>
            <Link to="/courses">
              <button className="bg-[#D2D7E7] text-[#000] text-[13px] sm:text-[14px] md:text-[15px] px-4 sm:px-5 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#1E3A8A] hover:text-[#fff] border border-[#ccc] transition shadow-md">
                Our Courses
              </button>
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 w-full h-[250px] sm:h-[300px] md:h-full">
          <img
            src={hero_img}
            alt="Hero Visual"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
