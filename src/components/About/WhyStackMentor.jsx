import Button from "@mui/material/Button";
import { FaArrowRight } from "react-icons/fa";
import {
  FaLaptopCode,
  FaChalkboardTeacher,
  FaUsers,
  FaLayerGroup,
} from "react-icons/fa";

import React from "react";

const WhyStackMentor = () => {
  return (
    <div className="about_section py-20 px-6 md:px-12 text-center !bg-[#ffffff]">
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000]">
          Why Choose StackMentor?
        </h2>
        <p className="text-[#000] mt-4 text-[16px] md:text-[18px] leading-relaxed">
          At StackMentor, we’re not just teaching you how to code — we’re
          preparing you for real-world success. Our mentorship program combines
          expert guidance, hands-on projects, and modern tech stacks to help you
          become a confident developer.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-8">
        <div className="h-auto min-h-[320px] bg-[#D2D7E7]  rounded-xl cursor-pointer flex flex-col items-center justify-center text-center p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
          <FaChalkboardTeacher className="text-4xl text-[#1E3A8A] mb-2" />
          <h1 className="text-xl md:text-2xl font-semibold text-[#182E6E]">
            Hands-On Mentorship
          </h1>
          <p className="text-sm md:text-base text-[#333] leading-relaxed">
            Learn directly from experienced mentors who guide you through every
            step of your journey from writing your first line of code to
            building complete applications.
          </p>
          <Button
            variant="outlined"
            className="!text-[#182E6E] !border-[#182E6E] hover:!bg-[#182E6E] hover:!text-white transition-all duration-300 flex justify-between items-center gap-3 !rounded-lg !px-4 !py-2"
          >
            Join StackMentor Today <FaArrowRight />
          </Button>
        </div>

        <div className="h-auto min-h-[320px] bg-[#D2D7E7]  rounded-xl cursor-pointer flex flex-col items-center justify-center text-center p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
          <FaLayerGroup className="text-4xl text-[#1E3A8A] mb-2" />
          <h1 className="text-xl md:text-2xl font-semibold text-[#182E6E]">
            Career Growth Support
          </h1>
          <p className="text-sm md:text-base text-[#333] leading-relaxed">
            We don’t stop at coding. You’ll also learn how to prepare for tech
            interviews, build your personal brand, and grow a successful tech
            career.
          </p>
          <Button
            variant="outlined"
            className="!text-[#182E6E] !border-[#182E6E] hover:!bg-[#182E6E] hover:!text-white transition-all duration-300 flex justify-between items-center gap-3 !rounded-lg !px-4 !py-2"
          >
            Join StackMentor Today <FaArrowRight />
          </Button>
        </div>

        <div className="h-auto min-h-[320px] bg-[#D2D7E7]  rounded-xl cursor-pointer flex flex-col items-center justify-center text-center p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
          <FaUsers className="text-4xl text-[#1E3A8A] mb-2" />
          <h1 className="text-xl md:text-2xl font-semibold text-[#182E6E]">
            Real-World Projects
          </h1>
          <p className="text-sm md:text-base text-[#333] leading-relaxed">
            Gain practical experience by working on real-life projects that
            simulate what developers do in the industry. You’ll graduate with a
            strong portfolio that stands out.
          </p>
          <Button
            variant="outlined"
            className="!text-[#182E6E] !border-[#182E6E] hover:!bg-[#182E6E] hover:!text-white transition-all duration-300 flex justify-between items-center gap-3 !rounded-lg !px-4 !py-2"
          >
            Join StackMentor Today <FaArrowRight />
          </Button>
        </div>

        <div className="h-auto min-h-[320px] bg-[#D2D7E7]  rounded-xl cursor-pointer flex flex-col items-center justify-center text-center p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
          <FaLaptopCode className="text-4xl text-[#1E3A8A] mb-2" />
          <h1 className="text-xl md:text-2xl font-semibold text-[#182E6E]">
            Modern Tech Stack
          </h1>
          <p className="text-sm md:text-base text-[#333] leading-relaxed">
            Master the most in-demand technologies — HTML, CSS, JavaScript,
            React, TypeScript, Node.js, Express, Laravel, and more — all taught
            in a structured, beginner-friendly way.
          </p>
          <Button
            variant="outlined"
            className="!text-[#182E6E] !border-[#182E6E] hover:!bg-[#182E6E] hover:!text-white transition-all duration-300 flex justify-between items-center gap-3 !rounded-lg !px-4 !py-2"
          >
            Join StackMentor Today <FaArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhyStackMentor;
