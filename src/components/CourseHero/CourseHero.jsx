import React from "react";
import "../../index.css";
import course_hero from "../../assets/course_hero_image.jpeg";

const CourseHero = () => {
  return (
    <section className="flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="bg-[#D2D7E7] w-full sm:w-[80%] md:w-[70%] rounded-3xl border border-[#ccc] flex flex-col md:flex-row items-center justify-between overflow-hidden">
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left w-full md:w-1/2 p-8 space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-light text-[#000] leading-tight">
            Choose the Perfect Plan for Your Learning Journey
          </h1>
          <p className="text-[#000] text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed max-w-md">
            Whether you prefer a one-time payment or flexible part payments,
            StackMentor makes it easy to start learning at your own pace and
            budget.
          </p>
        </div>

        <div className="md:w-1/2 w-full h-[250px] sm:h-[300px] md:h-full">
          <img
            src={course_hero}
            alt="Course Hero"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
