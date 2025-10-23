import React from "react";
import CourseHero from "../components/CourseHero/CourseHero.jsx";
import Course from "../components/Course/Course.jsx";
import CoursePricing from "../components/CoursePricing/CoursePricing.jsx";

const Courses = () => {
  return (
    <div>
      <CourseHero />
      <Course />
      <CoursePricing />
    </div>
  );
};

export default Courses;
