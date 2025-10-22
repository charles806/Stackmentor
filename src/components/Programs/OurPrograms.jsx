import React, { useState } from "react";
import { Link } from "react-router-dom";

const OurPrograms = () => {
  const [paymentType, setPaymentType] = useState("oneTime");

  const prices = {
    oneTime: {
      frontend: { full: "₦50K" },
      backend: { full: "₦70K" },
      fullstack: { full: "₦100K" },
    },
    part: {
      frontend: { upfront: "₦30K", later: "₦20K" },
      backend: { upfront: "₦42K", later: "₦28K" },
      fullstack: { upfront: "₦60K", later: "₦40K" },
    },
  };

  return (
    <section className="bg-[#E8EBF3] py-16 flex flex-col items-center">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-2xl font-semibold text-[#1E3A8A]">
          Our Courses
        </h2>
        <p className="text-gray-700 mt-2 text-base md:text-lg">
          Choose your path and start your journey to becoming a professional
          developer.
        </p>
      </div>

      {/* Payment Toggle */}
      <div className="flex bg-[#D2D7E7] border border-[#D2D7E7] p-1 rounded-lg mb-12 shadow-sm">
        <button
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
            paymentType === "oneTime"
              ? "bg-[#1E3A8A] text-white"
              : "text-gray-800"
          }`}
          onClick={() => setPaymentType("oneTime")}
        >
          One-time Payment
        </button>

        <button
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
            paymentType === "part" ? "bg-[#1E3A8A] text-white" : "text-gray-800"
          }`}
          onClick={() => setPaymentType("part")}
        >
          Part Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[90%] max-w-6xl">
        <div className="bg-[#D2D7E7] rounded-2xl shadow-md p-6 flex flex-col justify-between text-center ">
          <div>
            <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">
              Frontend Track
            </h3>
            {paymentType === "oneTime" ? (
              <p className="text-5xl font-bold mb-4">
                {prices.oneTime.frontend.full}
              </p>
            ) : (
              <div className="mb-4">
                <p className="text-4xl font-bold">
                  {prices.part.frontend.upfront}
                </p>
                <p className="text-2xl text-gray-600">
                  Pay later {prices.part.frontend.later}
                </p>
              </div>
            )}
            <ul className="text-left text-gray-800 mb-6 space-y-2">
              <li>✔ HTML5</li>
              <li>✔ CSS3</li>
              <li>✔ JavaScript (ES6+)</li>
              <li>✔ Responsive web design</li>
              <li>✔ BootStrap 5</li>
              <li>✔ Tailwind CSS</li>
              <li>✔ React.JS</li>
            </ul>
          </div>
          <Link to="/register">
            <button className="bg-[#1E3A8A] shadow-lg cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-[#14286E] transition-all">
              Start Frontend
            </button>
          </Link>
        </div>

        <div className="bg-[#D2D7E7] rounded-2xl shadow-md p-8 flex flex-col justify-between text-center min-h-[600px]">
          <div>
            <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">
              Backend Track
            </h3>
            {paymentType === "oneTime" ? (
              <p className="text-5xl font-bold mb-4">
                {prices.oneTime.backend.full}
              </p>
            ) : (
              <div className="mb-4">
                <p className="text-4xl font-bold">
                  {prices.part.backend.upfront}
                </p>
                <p className="text-xl text-gray-600">
                  Pay later {prices.part.backend.later}
                </p>
              </div>
            )}
            <ul className="text-left text-gray-800 mb-6 space-y-2">
              <li>✔ PHP with Laravel</li>
              <li>✔ Node.JS and Express.JS</li>
              <li>✔ Python with Django</li>
              <li>✔ API development</li>
              <li>✔ Database Management</li>
            </ul>
          </div>
          <Link to="/register">
            <button className="bg-[#1E3A8A] shadow-lg cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-[#14286E] transition-all">
              Start Backend
            </button>
          </Link>
        </div>

        <div className="bg-[#D2D7E7] rounded-2xl shadow-md p-8 flex flex-col justify-between text-center min-h-[600px]">
          <div>
            <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">
              Full Stack Track
            </h3>
            {paymentType === "oneTime" ? (
              <p className="text-5xl font-bold mb-4">
                {prices.oneTime.fullstack.full}
              </p>
            ) : (
              <div className="mb-4">
                <p className="text-4xl font-bold">
                  {prices.part.fullstack.upfront}
                </p>
                <p className="text-xl text-gray-600">
                  Pay later {prices.part.fullstack.later}
                </p>
              </div>
            )}
            <ul className="text-left text-gray-800 mb-6 space-y-2">
              <li>✔ Complete web development</li>
              <li>✔ Frontend and backend integration</li>
              <li>✔ Advanced framework skills</li>
              <li>✔ Real-world project deployment</li>
              <li>✔ Professional workflow practices</li>
            </ul>
          </div>
          <Link to="/register">
            <button className="bg-[#1E3A8A] shadow-lg cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-[#14286E] transition-all">
              Start Full Stack
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurPrograms;
