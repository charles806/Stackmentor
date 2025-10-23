import React from "react";
import { Link } from "react-router-dom";

const Course = () => {
  return (
    <section className="py-16 px-6 md:px-12 text-center bg-[#D2D7E7]">
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-semibold text-black mb-3">
          Course Details
        </h1>
        <p className="text-lg sm:text-xl font-light text-gray-800">
          Get a clear overview of what each course covers, the skills you’ll
          gain, and how it helps you grow into a job-ready developer.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Frontend */}
        <div className="bg-white border cursor-pointer border-gray-200 p-8 rounded-2xl shadow-md text-center hover:shadow-lg transition-transform hover:scale-[1.02] duration-300">
          <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-2">
            Frontend Web Development
          </h2>
          <p className="text-gray-800 text-[15px] mb-4">
            Build beautiful, responsive websites using HTML, CSS, JavaScript,
            and React. Turn your design ideas into interactive user experiences.
          </p>
          <ul className="text-left text-gray-800 mb-6 space-y-2">
            <li>✔ HTML5, CSS3, JavaScript (ES6+)</li>
            <li>✔ Responsive Web Design</li>
            <li>✔ Bootstrap 5 & Tailwind CSS</li>
            <li>✔ React.js Framework</li>
          </ul>
          <Link to="/register">
            <button className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg hover:bg-[#14286E] transition-all">
              Start Frontend
            </button>
          </Link>
        </div>

        {/* Backend */}
        <div className="bg-white border cursor-pointer border-gray-200 p-8 rounded-2xl shadow-md text-center hover:shadow-lg transition-transform hover:scale-[1.02] duration-300">
          <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-2">
            Backend Web Development
          </h2>
          <p className="text-gray-800 text-[15px] mb-4">
            Learn how to build fast, secure, and scalable server-side
            applications using PHP, Node.js, and modern databases.
          </p>
          <ul className="text-left text-gray-800 mb-6 space-y-2">
            <li>✔ PHP (Laravel)</li>
            <li>✔ Node.js & Express.js</li>
            <li>✔ Python (Django)</li>
            <li>✔ API Development</li>
            <li>✔ Database Management</li>
          </ul>
          <Link to="/register">
            <button className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg hover:bg-[#14286E] transition-all">
              Start Backend
            </button>
          </Link>
        </div>

        {/* Full-Stack */}
        <div className="bg-white border cursor-pointer border-gray-200 p-8 rounded-2xl shadow-md text-center hover:shadow-lg transition-transform hover:scale-[1.02] duration-300">
          <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-2">
            Full-Stack Development
          </h2>
          <p className="text-gray-800 text-[15px] mb-4">
            Become a complete developer by learning both frontend and backend
            technologies. Build, deploy, and manage full-scale web apps.
          </p>
          <ul className="text-left text-gray-800 mb-6 space-y-2">
            <li>✔ Frontend + Backend Integration</li>
            <li>✔ React, Node.js, Express.js, MongoDB</li>
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

export default Course;
