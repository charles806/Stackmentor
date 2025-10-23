import React from "react";
import { Button } from "@mui/material";
import { FaArrowRight, FaLaptopCode, FaChalkboardTeacher, FaUsers, FaLayerGroup } from "react-icons/fa";

const AboutWhyChooseUs = () => {
  const features = [
    {
      icon: <FaChalkboardTeacher className="text-4xl text-[#1E3A8A] mb-2" />,
      title: "Hands-On Mentorship",
      description:
        "Learn directly from experienced mentors who guide you from your first line of code to building complete applications.",
    },
    {
      icon: <FaLayerGroup className="text-4xl text-[#1E3A8A] mb-2" />,
      title: "Career Growth Support",
      description:
        "We don’t stop at coding. You’ll also learn interview prep, branding, and how to grow a successful tech career.",
    },
    {
      icon: <FaUsers className="text-4xl text-[#1E3A8A] mb-2" />,
      title: "Real-World Projects",
      description:
        "Gain practical experience by working on projects that simulate real industry work and build your portfolio.",
    },
    {
      icon: <FaLaptopCode className="text-4xl text-[#1E3A8A] mb-2" />,
      title: "Modern Tech Stack",
      description:
        "Master in-demand technologies like React, TypeScript, Node.js, Express, Laravel, and more — all beginner-friendly.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 text-center bg-[#D2D7E7]">
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000]">
          Why Choose StackMentor?
        </h2>
        <p className="text-[#000] mt-4 text-[16px] md:text-[18px] leading-relaxed">
          At StackMentor, we’re not just teaching you how to code — we’re
          preparing you for real-world success. Our mentorship program blends
          expert guidance, hands-on projects, and modern tools to make you a
          confident developer.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="h-auto min-h-[320px] bg-[#E8EBF3] rounded-xl flex flex-col items-center justify-center text-center p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
          >
            {item.icon}
            <h3 className="text-xl md:text-2xl font-semibold text-[#182E6E]">
              {item.title}
            </h3>
            <p className="text-sm md:text-base text-[#333] leading-relaxed mb-4">
              {item.description}
            </p>
            <Button
              variant="outlined"
              className="!text-[#182E6E] !border-[#182E6E] hover:!bg-[#182E6E] hover:!text-white transition-all duration-300 flex justify-between items-center gap-3 !rounded-lg !px-4 !py-2"
            >
              Join StackMentor <FaArrowRight />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutWhyChooseUs;
