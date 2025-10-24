import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [course, setCourse] = useState("Frontend");
  const [paymentType, setPaymentType] = useState("oneTime");

  // Define course prices
  const prices = {
    Frontend: { oneTime: 50000, part: { upfront: 30000, later: 20000 } },
    Backend: { oneTime: 70000, part: { upfront: 42000, later: 28000 } },
    Fullstack: { oneTime: 100000, part: { upfront: 60000, later: 40000 } },
  };

  const currentPrice =
    paymentType === "oneTime"
      ? prices[course].oneTime
      : prices[course].part.upfront;

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     alert("Redirecting to payment gateway...");
  //   };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment successful (demo mode)");
    navigate("/learning-materials");
  };

  return (
    <section className="min-h-screen bg-[#E8EBF3] flex justify-center items-center px-6 py-12">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-lg p-8 md:p-12 border border-gray-200">
        <h1 className="text-3xl font-semibold text-[#1E3A8A] text-center mb-8">
          Register for Your Course
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              required
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
            />
          </div>

          {/* Course Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Course
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
            >
              <option value="Frontend">Frontend Development</option>
              <option value="Backend">Backend Development</option>
              <option value="Fullstack">Full Stack Development</option>
            </select>
          </div>

          {/* Payment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Type
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className={`px-6 cursor-pointer py-2 rounded-lg border ${
                  paymentType === "oneTime"
                    ? "bg-[#1E3A8A] text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setPaymentType("oneTime")}
              >
                One-Time Payment
              </button>
              <button
                type="button"
                className={`px-6 cursor-pointer py-2 rounded-lg border ${
                  paymentType === "part"
                    ? "bg-[#1E3A8A] text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setPaymentType("part")}
              >
                Part Payment
              </button>
            </div>
          </div>

          {/* Display Price */}
          <div className="bg-[#D2D7E7] p-4 rounded-lg text-center">
            {paymentType === "oneTime" ? (
              <p className="text-lg text-gray-800">
                💰 You’ll pay{" "}
                <span className="font-semibold">₦{currentPrice}</span> as a
                one-time payment.
              </p>
            ) : (
              <p className="text-lg text-gray-800">
                💰 Pay <span className="font-semibold">₦{currentPrice}</span>{" "}
                now and{" "}
                <span className="font-semibold">
                  ₦{prices[course].part.later}
                </span>{" "}
                later.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#1E3A8A] cursor-pointer hover:bg-[#14286E] text-white px-8 py-3 rounded-lg font-medium transition-all"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
