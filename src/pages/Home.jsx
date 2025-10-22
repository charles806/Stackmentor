import React from "react";
import About from "../components/About/WhyStackMentor.jsx";
import Hero from "../components/Hero/Hero.jsx";
import OurPrograms from "../components/Programs/OurPrograms.jsx";
import FAQs from "../components/FAQs/FAQs.jsx";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <OurPrograms />
      <FAQs />
    </div>
  );
};

export default Home;
