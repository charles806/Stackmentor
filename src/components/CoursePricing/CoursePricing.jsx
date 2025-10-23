import React, { useState } from "react";
import { Link } from "react-router-dom";

const CoursePricing = () => {
  const [paymentType, setPaymentType] = useState("oneTime");

  const prices = {
    oneTime: {
      frontend: "₦50,000",
      backend: "₦70,000",
      fullstack: "₦100,000",
    },
    part: {
      frontend: { upfront: "₦30,000", later: "₦20,000" },
      backend: { upfront: "₦42,000", later: "₦28,000" },
      fullstack: { upfront: "₦60,000", later: "₦40,000" },
    },
  };

  return (
    <section className="py-20 px-6 md:px-12 text-center bg-white">
      <div className="max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-semibold text-black mb-3">
          Pricing Options
        </h1>
        <p className="text-gray-800 text-lg font-light">
          Choose a one-time payment or flexible part payment plan that suits
          your learning goals.
        </p>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center bg-[#E2E6F2] p-1 rounded-lg mb-12 w-fit mx-auto shadow-inner">
        <button
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            paymentType === "oneTime"
              ? "bg-[#1E3A8A] text-white"
              : "text-gray-800 hover:bg-[#cfd3e3]"
          }`}
          onClick={() => setPaymentType("oneTime")}
        >
          One-Time Payment
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            paymentType === "part"
              ? "bg-[#1E3A8A] text-white"
              : "text-gray-800 hover:bg-[#cfd3e3]"
          }`}
          onClick={() => setPaymentType("part")}
        >
          Part Payment
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-6xl">
        <div className="bg-[#D2D7E7] cursor-pointer rounded-2xl shadow-md p-8 flex flex-col justify-between text-center transition-transform hover:scale-[1.02] hover:shadow-lg duration-300">
          <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">
            Frontend Track
          </h3>
          {paymentType === "oneTime" ? (
            <p className="text-4xl font-bold mb-4">{prices.oneTime.frontend}</p>
          ) : (
            <div className="mb-4">
              <p className="text-3xl font-bold">
                {prices.part.frontend.upfront}
              </p>
              <p className="text-md text-gray-700">
                Pay later {prices.part.frontend.later}
              </p>
            </div>
          )}
          <ul className="text-left text-gray-800 mb-6 space-y-2">
            <li>✔ HTML5</li>
            <li>✔ CSS3</li>
            <li>✔ JavaScript</li>
            <li>✔ React.js</li>
            <li>✔ Responsive Design</li>
            <li>Tailwind CSS</li>
            <li>Bootstrap 5</li>
          </ul>
          <Link to="/register">
            <button className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg hover:bg-[#14286E] transition-all">
              Start Frontend
            </button>
          </Link>
        </div>

        <div className="bg-[#D2D7E7] cursor-pointer rounded-2xl shadow-md p-8 flex flex-col justify-between text-center transition-transform hover:scale-[1.02] hover:shadow-lg duration-300">
          <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">
            Backend Track
          </h3>
          {paymentType === "oneTime" ? (
            <p className="text-4xl font-bold mb-4">{prices.oneTime.backend}</p>
          ) : (
            <div className="mb-4">
              <p className="text-3xl font-bold">
                {prices.part.backend.upfront}
              </p>
              <p className="text-md text-gray-700">
                Pay later {prices.part.backend.later}
              </p>
            </div>
          )}
          <ul className="text-left text-gray-800 mb-6 space-y-2">
            <li>✔ PHP with Laravel</li>
            <li>✔ Node.js & Express.js</li>
            <li>Python with Django</li>
            <li>✔ API Development</li>
            <li>✔ Database Management</li>
          </ul>
          <Link to="/register">
            <button className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg hover:bg-[#14286E] transition-all">
              Start Backend
            </button>
          </Link>
        </div>

        <div className="bg-[#D2D7E7] cursor-pointer rounded-2xl shadow-md p-8 flex flex-col justify-between text-center transition-transform hover:scale-[1.02] hover:shadow-lg duration-300">
          <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">
            Full-Stack Track
          </h3>
          {paymentType === "oneTime" ? (
            <p className="text-4xl font-bold mb-4">
              {prices.oneTime.fullstack}
            </p>
          ) : (
            <div className="mb-4">
              <p className="text-3xl font-bold">
                {prices.part.fullstack.upfront}
              </p>
              <p className="text-md text-gray-700">
                Pay later {prices.part.fullstack.later}
              </p>
            </div>
          )}
          <ul className="text-left text-gray-800 mb-6 space-y-2">
            <li>✔ Complete Web Development</li>
            <li>✔ Frontend & Backend Integration</li>
            <li>✔ Advanced Frameworks</li>
            <li>✔ Real-world Project Deployment</li>
          </ul>
          <Link to="/register">
            <button className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg hover:bg-[#14286E] transition-all">
              Start Full-Stack
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursePricing;
