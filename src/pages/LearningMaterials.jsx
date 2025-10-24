import React from "react";
import { Link } from "react-router-dom";

const LearningMaterials = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl w-full border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          🎓 Welcome to Your Learning Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Congratulations! Your payment was successful. You now have access to
          all your learning materials below.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#E8EBF3]  rounded-xl p-5 hover:shadow-md transition">
            <h3 className="font-semibold text-black  text-lg mb-2">
              Frontend Web Development
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Learn HTML, CSS, and JavaScript fundamentals with practical
              examples.
            </p>
            <a
              href="#"
              className="text-sm text-black hover:underline font-medium"
            >
              View Material →
            </a>
          </div>

          <div className="bg-[#E8EBF3]  rounded-xl p-5 hover:shadow-md transition">
            <h3 className="font-semibold text-black text-lg mb-2">
              Advanced Frontend Design
            </h3>
            <p className="text-sm text-black mb-3">
              Dive into Tailwind CSS, animations, and Frontend Frameworks.
            </p>
            <a
              href="#"
              className="text-sm text-green-600 hover:underline font-medium"
            >
              Download PDF →
            </a>
          </div>

          <div className="bg-[#E8EBF3]  rounded-xl p-5 hover:shadow-md transition">
            <h3 className="font-semibold text-black text-lg mb-2">
              Backend Web Development
            </h3>
            <p className="text-sm text-black mb-3">
              Understand Express.js, APIs, and connecting your app to databases.
            </p>
            <a
              href="#"
              className="text-sm text-black hover:underline font-medium"
            >
              Watch Video →
            </a>
          </div>

          <div className="bg-[#E8EBF3] rounded-xl p-5 hover:shadow-md transition">
            <h3 className="font-semibold text-black text-lg mb-2">
              Full Stack Development
            </h3>
            <p className="text-sm text-black mb-3">
              Test your knowledge and earn your certificate of completion.
            </p>
            <a
              href="#"
              className="text-sm text-yellow-600 hover:underline font-medium"
            >
              Take Quiz →
            </a>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearningMaterials;
