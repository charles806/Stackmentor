import React, { useState } from "react";
import { sendContactEmail } from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await sendContactEmail(formData);
      setSuccess(true);
      setFormData({ fullName: "", email: "", message: "" });

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#E8EBF3] py-16 px-6 md:px-20 flex flex-col justify-center items-center">
      {/* Hero Section */}
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold text-[#1E3A8A] mb-4">
          Get in Touch
        </h1>
        <p className="text-black text-[15px] md:text-[18px] leading-relaxed">
          Have questions about StackMentor programs or partnerships?
          <br /> Reach out and we'll respond within 24 hours.
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="w-full max-w-6xl mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-green-700 font-medium text-center">
            ✅ Message sent successfully! We'll get back to you soon.
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="w-full max-w-6xl mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 font-medium text-center">❌ {error}</p>
        </div>
      )}

      {/* Contact Info & Form */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-3xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Contact Info */}
        <div className="bg-[#1E3A8A] text-white p-10 flex flex-col justify-center space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-sm text-gray-100">
            Fill out the form and our team will get back to you as soon as
            possible.
          </p>

          <div className="space-y-4 text-[15px]">
            <div className="flex items-center gap-3">
              <span className="text-xl">📞</span>
              <span>+234 703 235 5643</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">📧</span>
              <span>c08445333@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">📍</span>
              <span>Port Harcourt, Nigeria</span>
            </div>
          </div>

          <div className="pt-6">
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.tiktok.com/@codex_x_x"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-300 transition cursor-pointer flex items-center gap-2"
              >
                <span className="text-xl">📱</span> TikTok
              </a>
              <a
                href="https://www.instagram.com/codecraftter/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-300 transition cursor-pointer flex items-center gap-2"
              >
                <span className="text-xl">📷</span> Instagram
              </a>
              <a
                href="https://wa.link/hlduze"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-300 transition cursor-pointer flex items-center gap-2"
              >
                <span className="text-xl">💬</span> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-10 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition cursor-pointer ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#1E3A8A] hover:bg-[#152c6b]"
              } text-white`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
