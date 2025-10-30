import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../components/API/api.jsx";

const LearningMaterials = () => {
  const [user, setUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getCurrentUser();

        if (!data.hasAccess) {
          navigate("/payment");
          return;
        }

        if (data.user.course !== "fullstack") {
          navigate(`/learning-materials-${data.user.course}`);
          return;
        }

        setUser(data.user);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (!user || !user.accessExpiresAt) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(user.accessExpiresAt).getTime();
      const distance = expiry - now;

      if (distance <= 0) {
        clearInterval(timer);
        navigate("/payment");
      } else {
        setTimeLeft(distance);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [user, navigate]);

  const formatTime = (ms) => {
    if (!ms) return "Unlimited access";
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D2D7E7] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎓 Welcome, {user?.fullName}!
          </h1>
          <p className="text-gray-600 mb-4">Full Stack Development Course</p>

          {user?.accessExpiresAt && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                ⏰ Access expires in:{" "}
                <span className="font-bold text-yellow-700">
                  {formatTime(timeLeft)}
                </span>
              </p>
              {user?.remainingAmount > 0 && (
                <p className="text-sm text-gray-700 mt-2">
                  💰 Remaining balance:{" "}
                  <span className="font-bold">
                    ₦{user.remainingAmount.toLocaleString()}
                  </span>
                </p>
              )}
            </div>
          )}

          {!user?.accessExpiresAt && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700 font-medium">
                ✅ You have unlimited access to this course!
              </p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-black text-xl mb-3">
              Frontend Development
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Master HTML, CSS, JavaScript, React, and modern frontend tools.
            </p>
            <ul className="text-sm text-gray-700 space-y-2 mb-4">
              <li>✓ HTML5 & CSS3 Fundamentals</li>
              <li>✓ JavaScript ES6+</li>
              <li>✓ React.js & Component Architecture</li>
              <li>✓ Responsive Design & Tailwind CSS</li>
            </ul>
            <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg hover:bg-[#14286E] transition">
              Start Learning
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-black text-xl mb-3">
              Backend Development
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Build robust server-side applications with Node.js, Express, and
              databases.
            </p>
            <ul className="text-sm text-gray-700 space-y-2 mb-4">
              <li>✓ Node.js & Express.js</li>
              <li>✓ RESTful API Development</li>
              <li>✓ MongoDB & Database Design</li>
              <li>✓ Authentication & Security</li>
            </ul>
            <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg hover:bg-[#14286E] transition">
              Start Learning
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-black text-xl mb-3">
              Projects & Practice
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Build real-world applications to strengthen your portfolio.
            </p>
            <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg hover:bg-[#14286E] transition">
              View Projects
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-black text-xl mb-3">
              Resources & Support
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Access documentation, tutorials, and community support.
            </p>
            <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg hover:bg-[#14286E] transition">
              Get Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningMaterials;
