import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBook,
  FaVideo,
  FaFileAlt,
  FaDownload,
  FaClipboardList,
  FaEye,
  FaTimes,
} from "react-icons/fa";
import {
  getCourseContent,
  createContent,
  updateContent,
  deleteContent,
} from "../../components/API/api.jsx";

const AdminContentManager = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("frontend");
  const [showModal, setShowModal] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [formData, setFormData] = useState({
    course: "frontend",
    title: "",
    description: "",
    category: "lesson",
    content: "",
    videoUrl: "",
    fileUrl: "",
    order: 0,
  });

  useEffect(() => {
    fetchContent();
  }, [selectedCourse]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const data = await getCourseContent(selectedCourse);
      setContents(data.content || []);
    } catch (error) {
      console.error("Failed to fetch content:", error);
      alert("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (content = null) => {
    if (content) {
      setEditingContent(content);
      setFormData({
        course: content.course,
        title: content.title,
        description: content.description,
        category: content.category,
        content: content.content || "",
        videoUrl: content.videoUrl || "",
        fileUrl: content.fileUrl || "",
        order: content.order || 0,
      });
    } else {
      setEditingContent(null);
      setFormData({
        course: selectedCourse,
        title: "",
        description: "",
        category: "lesson",
        content: "",
        videoUrl: "",
        fileUrl: "",
        order: 0,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingContent(null);
    setFormData({
      course: selectedCourse,
      title: "",
      description: "",
      category: "lesson",
      content: "",
      videoUrl: "",
      fileUrl: "",
      order: 0,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", formData);

      if (editingContent) {
        console.log("Updating existing content with ID:", editingContent._id);
        const response = await updateContent(editingContent._id, formData);
        console.log("Update response:", response);
        alert("Content updated successfully!");
      } else {
        console.log("Creating new content");
        const response = await createContent(formData);
        console.log("Creation response:", response);
        console.log("New content ID:", response?.content?._id);
        alert(`Content created successfully! ID: ${response?.content?._id}`);
      }

      handleCloseModal();
      await fetchContent();
      console.log("Updated content list:", contents);
    } catch (error) {
      console.error("Failed to save content:", error);
      console.error("Error details:", error.response?.data);
      alert("Failed to save content. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this content?"))
      return;

    try {
      await deleteContent(id);
      alert("Content deleted successfully!");
      fetchContent();
    } catch (error) {
      console.error("Failed to delete content:", error);
      alert("Failed to delete content");
    }
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Content Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage course materials and resources
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FaPlus /> Add New Content
          </button>
        </div>

        {/* Course Selector */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex gap-4">
            {["frontend", "backend", "fullstack"].map((course) => (
              <button
                key={course}
                onClick={() => setSelectedCourse(course)}
                className={`px-6 py-2 rounded-lg font-medium transition capitalize ${
                  selectedCourse === course
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {course} Development
              </button>
            ))}
          </div>
        </div>

        {/* Content List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading content...</p>
          </div>
        ) : contents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Content Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start by adding your first lesson or resource
            </p>
            <button
              onClick={() => handleOpenModal()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Content
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contents.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {getCategoryIcon(item.category)}
                    </div>
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    Order: {item.order}
                  </span>
                </div>

                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  {item.videoUrl && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded">
                      Video
                    </span>
                  )}
                  {item.fileUrl && (
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
                      File
                    </span>
                  )}
                  {item.content && (
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      Text
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingContent ? "Edit Content" : "Add New Content"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <FaTimes className="text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Course */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course *
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="frontend">Frontend Development</option>
                    <option value="backend">Backend Development</option>
                    <option value="fullstack">Full Stack Development</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Introduction to React Hooks"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Brief description of this content..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="lesson">Lesson</option>
                    <option value="video">Video</option>
                    <option value="note">Note</option>
                    <option value="resource">Resource</option>
                    <option value="assignment">Assignment</option>
                  </select>
                </div>

                {/* Main Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content (Text/HTML)
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="8"
                    placeholder="Write your lesson content here... (supports HTML)"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    You can use basic HTML tags like &lt;p&gt;, &lt;strong&gt;,
                    &lt;ul&gt;, &lt;li&gt;, etc.
                  </p>
                </div>

                {/* Video URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video URL (YouTube/Vimeo)
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* File URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File URL (PDF, ZIP, etc.)
                  </label>
                  <input
                    type="url"
                    name="fileUrl"
                    value={formData.fileUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/file.pdf"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload your file to Google Drive, Dropbox, or any file
                    hosting service and paste the link here
                  </p>
                </div>

                {/* Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order (for sorting)
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lower numbers appear first (0, 1, 2, 3...)
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-3 cursor-pointer border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {editingContent ? "Update Content" : "Create Content"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContentManager;
