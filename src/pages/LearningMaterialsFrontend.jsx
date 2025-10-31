import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getCourseContent } from "../components/API/api.jsx";
import { 
  FaBook, 
  FaVideo, 
  FaDownload, 
  FaClipboardList,
  FaClock,
  FaFileAlt 
} from "react-icons/fa";

const LearningMaterialsFrontend = () => {
  const [user, setUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchContent();
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

      if (data.user.course !== "frontend") {
        navigate(`/learning-materials${data.user.course === 'fullstack' ? '' : '-' + data.user.course}`);
        return;
      }

      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      navigate("/login");
    }
  };

  const fetchContent = async () => {
    try {
      const data = await getCourseContent("frontend");
      setContent(data.content || []);
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

  const filteredContent = activeTab === "all" 
    ? content 
    : content.filter(item => item.category === activeTab);

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
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                🎨 Frontend Web Development
              </h1>
              <p className="text-gray-600">Welcome back, {user?.fullName}!</p>
            </div>
          </div>
          
          {user?.accessExpiresAt && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <FaClock className="text-yellow-600" />
                <p className="text-sm text-gray-700 font-medium">
                  Access expires in:{" "}
                  <span className="font-bold text-yellow-700">
                    {formatTime(timeLeft)}
                  </span>
                </p>
              </div>
              {user?.remainingAmount > 0 && (
                <p className="text-sm text-gray-700 mt-2">
                  💰 Remaining balance:{" "}
                  <span className="font-bold">₦{user.remainingAmount.toLocaleString()}</span>
                </p>
              )}
            </div>
          )}

          {!user?.accessExpiresAt && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-green-700 font-medium">
                ✅ You have unlimited access to this course!
              </p>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {["all", "lesson", "video", "note", "resource", "assignment"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab === "all" ? "All Content" : tab + "s"}
              </button>
            ))}
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
                    <div className="text-2xl">{getCategoryIcon(item.category)}</div>
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      {item.category}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>

                {item.videoUrl && (
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium mb-2"
                  >
                    <FaVideo /> Watch Video
                  </a>
                )}

                {item.fileUrl && (
                  <a
                    href={item.fileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mb-2 ml-4"
                  >
                    <FaDownload /> Download
                  </a>
                )}

                {item.content && (
                  <button
                    onClick={() => navigate(`/content/${item._id}`)}
                    className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                  >
                    View Details
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Content Available Yet
            </h3>
            <p className="text-gray-500">
              Course materials will be added soon. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningMaterialsFrontend;