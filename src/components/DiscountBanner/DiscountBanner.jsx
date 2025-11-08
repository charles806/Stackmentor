import React, { useState, useEffect } from "react";
import { FaClock, FaFire } from "react-icons/fa";

const DiscountBanner = () => {
  // Set discount end date (3 weeks from now - you can change this)
const DISCOUNT_END_DATE = new Date("2025-11-31T23:59:59");  // Change this date!
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endTime = DISCOUNT_END_DATE.getTime();
      const distance = endTime - now;

      if (distance < 0) {
        setIsActive(false);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isActive) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-4 px-6 sticky top-0 z-50 shadow-lg animate-pulse-slow">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Discount Info */}
          <div className="flex items-center gap-3">
            <FaFire className="text-3xl animate-bounce" />
            <div>
              <p className="text-2xl font-bold">40% OFF LIMITED TIME SALE! 🔥</p>
              <p className="text-sm">Register now and save big on all courses!</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-4">
            <FaClock className="text-2xl" />
            <div className="flex gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[60px]">
                <p className="text-2xl font-bold">{timeLeft.days}</p>
                <p className="text-xs">Days</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[60px]">
                <p className="text-2xl font-bold">{timeLeft.hours}</p>
                <p className="text-xs">Hours</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[60px]">
                <p className="text-2xl font-bold">{timeLeft.minutes}</p>
                <p className="text-xs">Mins</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[60px]">
                <p className="text-2xl font-bold">{timeLeft.seconds}</p>
                <p className="text-xs">Secs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;