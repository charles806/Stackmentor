import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../components/API/api.jsx";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(formData);

      if (data.token && data.user) {
        // Save token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Check if user has access
        if (data.hasAccess) {
          // Redirect to appropriate learning materials page
          const redirectUrls = {
            frontend: "/learning-materials-frontend",
            backend: "/learning-materials-backend",
            fullstack: "/learning-materials",
          };
          navigate(redirectUrls[data.user.course] || "/learning-materials");
        } else {
          // User needs to pay or renew
          navigate("/payment");
        }
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#E8EBF3] flex justify-center items-center px-6 py-12">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-8 md:p-10 border border-gray-200">
        <h1 className="text-3xl font-semibold text-[#1E3A8A] text-center mb-8">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1E3A8A] outline-none"
            />
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
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#1E3A8A] hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
