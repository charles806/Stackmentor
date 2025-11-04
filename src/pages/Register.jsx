import React, { useState } from "react";
import { Link } from "react-router-dom";
import { initializePayment } from "../components/API/api.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [course, setCourse] = useState("frontend");
  const [paymentType, setPaymentType] = useState("oneTime");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const prices = {
  //   frontend: { oneTime: 50000, part: { upfront: 30000, later: 20000 } },
  //   backend: { oneTime: 70000, part: { upfront: 42000, later: 28000 } },
  //   fullstack: { oneTime: 100000, part: { upfront: 60000, later: 40000 } },
  // };

  const prices = {
    frontend: { oneTime: 100, part: { upfront: 50, later: 50 } }, // Changed from 50000
    backend: { oneTime: 100, part: { upfront: 50, later: 50 } }, // Changed from 70000
    fullstack: { oneTime: 100, part: { upfront: 50, later: 50 } }, // Changed from 100000
  };

  const currentPrice =
    paymentType === "oneTime"
      ? prices[course].oneTime
      : prices[course].part.upfront;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        course: course.toLowerCase(),
        paymentType: paymentType === "oneTime" ? "full" : "part",
        amount: currentPrice,
      };

      const data = await initializePayment(payload);

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        setError("Payment initialization failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Error connecting to server");
    } finally {
      setLoading(false);
    }
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
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
            />
          </div>

          {/* Password with Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="Create a password (min 6 characters)"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#1E3A8A] transition"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
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
              <option value="frontend">Frontend Development</option>
              <option value="backend">Backend Development</option>
              <option value="fullstack">Full Stack Development</option>
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
                className={`px-6 cursor-pointer py-2 rounded-lg border transition-all ${
                  paymentType === "oneTime"
                    ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
                onClick={() => setPaymentType("oneTime")}
              >
                One-Time Payment
              </button>
              <button
                type="button"
                className={`px-6 cursor-pointer py-2 rounded-lg border transition-all ${
                  paymentType === "part"
                    ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
                    : "bg-gray-100 text-gray-700 border-gray-300"
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
                💰 You'll pay{" "}
                <span className="font-semibold">
                  ₦{currentPrice.toLocaleString()}
                </span>{" "}
                as a one-time payment.
              </p>
            ) : (
              <p className="text-lg text-gray-800">
                💰 Pay{" "}
                <span className="font-semibold">
                  ₦{currentPrice.toLocaleString()}
                </span>{" "}
                now and{" "}
                <span className="font-semibold">
                  ₦{prices[course].part.later.toLocaleString()}
                </span>{" "}
                later.
              </p>
            )}
          </div>

          {error && (
            <div className="text-red-600 text-center bg-red-100 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#1E3A8A] hover:bg-[#14286E]"
              } text-white px-8 py-3 rounded-lg font-medium transition-all cursor-pointer`}
            >
              {loading ? "Processing..." : "Pay & Register"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#1E3A8A] hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
