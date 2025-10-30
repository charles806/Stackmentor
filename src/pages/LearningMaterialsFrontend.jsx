import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LearningMaterialsFrontend = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const paymentInfo = JSON.parse(localStorage.getItem("paymentInfo"));

    if (!paymentInfo || paymentInfo.course !== "frontend") {
      navigate("/payment");
      return;
    }

    // Frontend partial = 2 months
    const expirationTime =
      paymentInfo.paymentType === "full" ? Infinity : 2 * 30 * 24 * 60 * 60 * 1000;

    const expiryDate = new Date(paymentInfo.paidAt).getTime() + expirationTime;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = expiryDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        navigate("/payment");
      } else {
        setTimeLeft(distance);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (ms) => {
    if (ms === Infinity) return "Unlimited access";
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <main className="p-6">
        <div className="min-h-screen bg-[#D2D7E7] rounded-md flex flex-col items-center justify-center p-6">
          <div className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl w-full border border-gray-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
              🎓 Welcome to Your Frontend Learning Dashboard
            </h1>
            <p className="text-center text-gray-600 mb-4">
              Time left for your access:{" "}
              <span className="font-bold">{formatTime(timeLeft)}</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningMaterialsFrontend;
