import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getCourseContent } from "../components/API/api.jsx";
import {
  FaBook,
  FaVideo,
  FaDownload,
  FaClipboardList,
  FaClock,
  FaFileAlt,
  FaPalette,
  FaServer,
  FaLayerGroup,
} from "react-icons/fa";

const LearningMaterials = () => {
  const [user, setUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [frontendContent, setFrontendContent] = useState([]);
  const [backendContent, setBackendContent] = useState([]);
  const [fullstackContent, setFullstackContent] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [activeCourse, setActiveCourse] = useState("all"); // all, frontend, backend, fullstack
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchAllContent();
    }
  }, [user]);

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

  const fetchAllContent = async () => {
    try {
      // Fetch all three courses for fullstack students
      const [frontend, backend, fullstack] = await Promise.all([
        getCourseContent("frontend"),
        getCourseContent("backend"),
        getCourseContent("fullstack"),
      ]);

      setFrontendContent(frontend.content || []);
      setBackendContent(backend.content || []);
      setFullstackContent(fullstack.content || []);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    }
  };

  const formatTime = (ms) => {
    if (!ms) return "Unlimited access";
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "lesson":
        return <FaBook className="text-blue-500" />;
      case "video":
        return <FaVideo className="text-red-500" />;
      case "note":
        return <FaFileAlt className="text-green-500" />;
      case "resource":
        return <FaDownload className="text-purple-500" />;
      case "assignment":
        return <FaClipboardList className="text-orange-500" />;
      default:
        return <FaBook className="text-gray-500" />;
    }
  };

  // Combine and filter content
  const getAllContent = () => {
    let combined = [];

    if (activeCourse === "all") {
      combined = [
        ...frontendContent.map((c) => ({ ...c, source: "frontend" })),
        ...backendContent.map((c) => ({ ...c, source: "backend" })),
        ...fullstackContent.map((c) => ({ ...c, source: "fullstack" })),
      ];
    } else if (activeCourse === "frontend") {
      combined = frontendContent.map((c) => ({ ...c, source: "frontend" }));
    } else if (activeCourse === "backend") {
      combined = backendContent.map((c) => ({ ...c, source: "backend" }));
    } else if (activeCourse === "fullstack") {
      combined = fullstackContent.map((c) => ({ ...c, source: "fullstack" }));
    }

    // Filter by category
    if (activeTab !== "all") {
      combined = combined.filter((item) => item.category === activeTab);
    }

    return combined;
  };

  const filteredContent = getAllContent();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-linear-to-r from-purple-600 to-indigo-600 shadow-xl rounded-2xl p-8 mb-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <FaLayerGroup className="text-5xl" />
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Full Stack Development
              </h1>
              <p className="text-purple-100">Welcome back, {user?.fullName}!</p>
              <p className="text-sm text-purple-200 mt-1">
                🎉 You have access to Frontend, Backend, and Full Stack
                materials!
              </p>
            </div>
          </div>

          {user?.accessExpiresAt && (
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <FaClock />
                <p className="text-sm font-medium">
                  Access expires in:{" "}
                  <span className="font-bold">{formatTime(timeLeft)}</span>
                </p>
              </div>
              {user?.remainingAmount > 0 && (
                <p className="text-sm mt-2">
                  💰 Remaining balance:{" "}
                  <span className="font-bold">
                    ₦{user.remainingAmount.toLocaleString()}
                  </span>
                </p>
              )}
            </div>
          )}

          {!user?.accessExpiresAt && (
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 mt-4">
              <p className="text-sm font-medium">
                ✅ You have unlimited access to all courses!
              </p>
            </div>
          )}
        </div>

        {/* Course Tabs */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">
            📚 SELECT COURSE:
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveCourse("all")}
              className={`px-4 py-2 cursor-pointer rounded-lg font-medium transition flex items-center gap-2 ${
                activeCourse === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaLayerGroup /> All Courses
            </button>
            <button
              onClick={() => setActiveCourse("frontend")}
              className={`px-4 py-2 cursor-pointer rounded-lg font-medium transition flex items-center gap-2 ${
                activeCourse === "frontend"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaPalette /> Frontend
            </button>
            <button
              onClick={() => setActiveCourse("backend")}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                activeCourse === "backend"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaServer /> Backend
            </button>
            <button
              onClick={() => setActiveCourse("fullstack")}
              className={`px-4 py-2 rounded-lg cursor-pointer font-medium transition flex items-center gap-2 ${
                activeCourse === "fullstack"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaLayerGroup /> Full Stack Integration
            </button>
          </div>

          <h3 className="text-sm font-semibold text-gray-600 mb-3">
            🏷️ FILTER BY TYPE:
          </h3>
          <div className="flex flex-wrap gap-2">
            {["all", "lesson", "video", "note", "resource", "assignment"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                    activeTab === tab
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab === "all" ? "All Content" : tab + "s"}
                </button>
              )
            )}
          </div>
        </div>

        {/* Content Grid */}
        {filteredContent.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase block">
                        {item.category}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          item.source === "frontend"
                            ? "bg-blue-100 text-blue-600"
                            : item.source === "backend"
                            ? "bg-green-100 text-green-600"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {item.source}
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.videoUrl && (
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <FaVideo /> Video
                    </a>
                  )}

                  {item.fileUrl && (
                    <a
                      href={item.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      <FaDownload /> Download
                    </a>
                  )}
                </div>

                {item.content && (
                  <button
                    onClick={() => navigate(`/content/${item._id}`)}
                    className="w-full bg-purple-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm font-medium"
                  >
                    View Details
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FaLayerGroup className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Content Available Yet
            </h3>
            <p className="text-gray-500">
              {activeCourse === "all"
                ? "Course materials will be added soon. Check back later!"
                : `${
                    activeCourse.charAt(0).toUpperCase() + activeCourse.slice(1)
                  } materials coming soon!`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningMaterials;
