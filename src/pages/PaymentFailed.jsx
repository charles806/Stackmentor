import React from "react";
import { Link } from "react-router-dom";

const PaymentFailed = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-[#E8EBF3] text-center px-6">
    <h1 className="text-4xl font-bold text-blue-700 mb-4">Payment Failed</h1>
    <p className="text-gray-700 text-lg mb-6">
      Oops! Something went wrong with your payment. Please try again or contact support.
    </p>
    <Link
      to="/register"
      className="bg-[#8aa9ff] text-white px-6 py-3 rounded-lg hover:bg-[#769bff] transition"
    >
      Try Again
    </Link>
  </div>
);

export default PaymentFailed;
