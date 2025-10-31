import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContentById } from "../services/api";
import { FaArrowLeft, FaVideo, FaDownload, FaClock } from "react-icons/fa";

const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [id]);

  const fetchContent = async () => {
    try {
      const data = await getContentById(id);
      setContent(data.content);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading content...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">Content not found</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <FaArrowLeft /> Back to Course
        </button>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full uppercase mb-3">
              {content.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {content.title}
            </h1>
            <p className="text-gray-600 text-lg mb-4">{content.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{new Date(content.createdAt).toLocaleDateString()}</span>
              </div>
              {content.createdBy && (
                <span>By {content.createdBy.fullName}</span>
              )}
            </div>
          </div>

          {/* Video */}
          {content.videoUrl && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                📹 Video Tutorial
              </h3>
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                {content.videoUrl.includes("youtube") || content.videoUrl.includes("youtu.be") ? (
                  <iframe
                    src={content.videoUrl.replace("watch?v=", "embed/")}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <a
                    href={content.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-full text-white hover:text-blue-400"
                  >
                    <FaVideo className="text-4xl mr-3" />
                    <span className="text-lg">Watch Video</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Main Content */}
          {content.content && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                📝 Content
              </h3>
              <div className="prose prose-lg max-w-none">
                <div
                  className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: content.content }}
                />
              </div>
            </div>
          )}

          {/* Download Resources */}
          {content.fileUrl && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                📥 Download Resources
              </h3>
              <a
                href={content.fileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <FaDownload />
                Download Materials
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;