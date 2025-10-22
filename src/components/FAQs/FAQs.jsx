import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import faq_img from "../../assets/faq_img.jpg";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How long is the program?",
      answer:
        "Each program runs for 6 months, with live mentorship, weekly projects, and personalized feedback.",
    },
    {
      question: "Can I pay in installments?",
      answer:
        "Yes! You can choose Part Payment — pay 60% upfront and the remaining balance later in the program.",
    },
    {
      question: "Will I get a certificate after completing the program?",
      answer:
        "Absolutely ✅ You’ll receive a Certificate of Completion signed by Charles — Lead Mentor & Founder once you finish all modules.",
    },
    {
      question: "What if I’m a complete beginner?",
      answer:
        "No problem. StackMentor is designed to guide beginners step-by-step until you can confidently build full projects on your own.",
    },
    {
      question: "What tracks are available?",
      answer:
        "We currently offer Frontend, Backend, and Full-Stack tracks — all taught with real-world projects.",
    },
    {
      question: "Are classes live or recorded?",
      answer:
        "All classes are live to encourage real-time interaction, but recordings will be available to enrolled students after each session.",
    },
    {
      question: "What do I need before joining?",
      answer:
        "A laptop, internet connection, and the dedication to learn! We’ll teach you everything else from scratch.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#fff] py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1E3A8A] mb-12">
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
        {/* LEFT: FAQ LIST */}
        <div className="w-full md:w-1/2 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#E8EBF3] rounded-2xl shadow-md overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg md:text-xl font-semibold text-[#1E3A8A]">
                  {faq.question}
                </h3>
                <FaChevronDown
                  className={`text-[#1E3A8A] transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-40 opacity-100 p-6 pt-0"
                    : "max-h-0 opacity-0 p-0"
                }`}
              >
                <p className="text-black">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={faq_img}
            alt="FAQ illustration"
            className="w-[90%] h-[550px] md:h-[600px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQs;
