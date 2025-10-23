import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../../index.css";

const CTA = () => {
  return (
    <section className="cta">
      <div className="flex text-center gap-8 flex-col items-center justify-center p-6 sm:p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000]">
          Ready to Start Your Tech Journey?
        </h2>

        <p className="text-[#000] mt-4 text-[16px] md:text-[18px] leading-relaxed max-w-2xl">
          Join hundreds of learners building real-world skills at StackMentor.
          Choose your track — Frontend, Backend, or Full-Stack — and start coding your future today.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link to="/register">
            <Button
              variant="outlined"
              className="!text-[#000] font-bold !border-none !bg-[#D2D7E7] hover:!bg-[#182E6E] hover:!text-white transition-all duration-300 !rounded-lg !px-6 !py-3"
            >
              Register Now
            </Button>
          </Link>

          <Link to="/courses">
            <Button
              variant="outlined"
              className="!text-[#000] !border-none !bg-[#D2D7E7] hover:!bg-[#182E6E] hover:!text-white transition-all duration-300 !rounded-lg !px-6 !py-3"
            >
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
