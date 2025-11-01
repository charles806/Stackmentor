import React, { useState, useEffect } from "react";
import { getUserCertificate, generateCertificate } from "../components/API/api.jsx";
import { FaAward, FaDownload, FaPrint, FaCheckCircle } from "react-icons/fa";

const CertificatePage = () => {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchCertificate();
  }, []);

  const fetchCertificate = async () => {
    try {
      const data = await getUserCertificate();
      setCertificate(data.certificate);
    } catch (error) {
      console.error("No certificate found:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCertificate = async () => {
    setGenerating(true);
    try {
      const data = await generateCertificate();
      setCertificate(data.certificate);
      alert("Certificate generated successfully! 🎉");
    } catch (error) {
      alert("Failed to generate certificate. Please contact support.");
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg">Loading certificate...</p>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl">
          <FaAward className="text-8xl text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            No Certificate Yet
          </h1>
          <p className="text-gray-600 mb-8">
            Complete your course to generate your certificate of completion.
          </p>
          <button
            onClick={handleGenerateCertificate}
            disabled={generating}
            className={`px-8 py-4 rounded-lg font-semibold text-white transition cursor-pointer ${
              generating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {generating ? "Generating..." : "Generate Certificate"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Actions Bar (hide when printing) */}
        <div className="mb-6 flex justify-between items-center print:hidden">
          <h1 className="text-2xl font-bold text-gray-900">Your Certificate</h1>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              <FaPrint /> Print
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
            >
              <FaDownload /> Download PDF
            </button>
          </div>
        </div>

        {/* Certificate */}
        <div className="bg-white p-16 rounded-2xl shadow-2xl border-8 border-yellow-500 relative overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-yellow-600"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-yellow-600"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-yellow-600"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-yellow-600"></div>

          <div className="text-center relative z-10">
            {/* Logo/Icon */}
            <FaAward className="text-6xl text-yellow-600 mx-auto mb-6" />

            {/* Title */}
            <h1 className="text-5xl font-serif font-bold text-gray-900 mb-8">
              Certificate of Completion
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-700 mb-4">This is to certify that</p>

            {/* Student Name */}
            <h2 className="text-5xl font-bold text-blue-900 mb-8 py-4 border-t-2 border-b-2 border-gray-300">
              {certificate.userName}
            </h2>

            {/* Course Info */}
            <p className="text-xl text-gray-700 mb-4">has successfully completed the</p>
            <h3 className="text-4xl font-semibold text-blue-700 mb-8 capitalize">
              {certificate.course} Web Development
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              This certificate acknowledges the successful completion of all course requirements,
              demonstrating proficiency in modern web development technologies and best practices.
            </p>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full mb-8">
              <FaCheckCircle />
              <span className="font-semibold">{certificate.completionPercentage}% Complete</span>
            </div>

            {/* Date and Signature */}
            <div className="flex justify-between items-end mt-16 pt-8 border-t-2 border-gray-200">
              <div className="text-left">
                <div className="border-t-2 border-gray-900 pt-2 mb-2 w-48">
                  <p className="font-bold text-lg text-gray-900">Charles</p>
                </div>
                <p className="text-sm text-gray-600">Lead Instructor & Founder</p>
                <p className="text-sm text-gray-600">StackMentor</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Issue Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date(certificate.issuedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-xs text-gray-500 mt-3 font-mono">
                  Certificate No: {certificate.certificateNumber}
                </p>
              </div>
            </div>

            {/* Verification Link */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Verify this certificate at:{" "}
                <span className="font-mono text-blue-600">
                  stackmentor.vercel.app/verify/{certificate.certificateNumber}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Info Message */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 text-center print:hidden">
          <p className="text-blue-800 text-sm">
            💡 Click "Download PDF" to save a copy, or "Print" to print directly.
            <br />
            Share your achievement on social media! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;