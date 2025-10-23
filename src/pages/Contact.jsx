import React from "react";

const Contact = () => {
  return (
    <section className="min-h-screen bg-[#E8EBF3] py-16 px-6 md:px-20 flex flex-col justify-center items-center">
      {/* Hero Section */}
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold text-[#1E3A8A] mb-4">
          Get in Touch
        </h1>
        <p className="text-[#000] text-[15px] md:text-[18px] leading-relaxed">
          Have questions about StackMentor programs or partnerships?
          <br /> Reach out and we’ll respond within 24 hours.
        </p>
      </div>

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
            <p>📞 +234 703 235 5643</p>
            <p>📧 c08445333@gmail.com</p>
          </div>

          <div className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.tiktok.com/@codex_x_x"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-300 transition"
              >
                TikTok
              </a>
              <a
                href="https://www.instagram.com/codecraftter/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-300 transition"
              >
                Instagram
              </a>
              <a
                href="https://wa.link/hlduze"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-300 transition"
              >
                Message me
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-10 flex flex-col justify-center">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#000] mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#000] mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#000] mb-2">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E3A8A] text-white py-3 rounded-lg font-semibold hover:bg-[#152c6b] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
