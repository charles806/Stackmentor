import React from "react";
import OurMission from "../components/OurMission/OurMission.jsx";
import AboutHero from "../components/AboutHero/aboutHero.jsx";
import AboutWHyChooseUS from "../components/AboutWhyChooseUs/AboutWhyChooseUs.jsx";
import CTA from "../components/CTA/CTA.jsx";

const About = () => {
  return (
    <main>
      <AboutHero />
      <OurMission />
      <AboutWHyChooseUS />
      <CTA />
    </main>
  );
};


export default About;
