import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../components/API/api.jsx";
import { initializePayment } from "../components/API/api.jsx";

const PaymentPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const data = await getCurrentUser();
        setUser(data.user);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handlePayment = async () => {
    if (!user || user.remainingAmount <= 0) return;

    setProcessing(true);

    try {
      const payload = {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone || "",
        course: user.course,
        paymentType: "full", // Completing the payment
        amount: user.remainingAmount,
        password: "existing_user", // Not needed for renewal
      };

      const data = await initializePayment(payload);

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      }
    } catch (error) {
      console.error("Payment initialization failed:", error);
      alert("Failed to initialize payment. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E8EBF3]">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8EBF3] p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Payment Required
        </h1>

        {user?.remainingAmount > 0 ? (
          <>
            <p className="mb-4 text-gray-600">
              Your access to the{" "}
              <strong className="text-[#1E3A8A]">{user.course}</strong> course
              has expired. Please complete your remaining payment to continue
              learning.
            </p>
            <div className="bg-[#D2D7E7] p-4 rounded-lg mb-6">
              <p className="text-lg font-semibold text-gray-800">
                Amount Owing: ₦{user.remainingAmount.toLocaleString()}
              </p>
            </div>
            <button
              onClick={handlePayment}
              disabled={processing}
              className={`w-full ${
                processing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#1E3A8A] hover:bg-[#14286E]"
              } text-white px-6 py-3 rounded-lg font-semibold transition`}
            >
              {processing ? "Processing..." : "Pay Now"}
            </button>
          </>
        ) : (
          <>
            <p className="mb-4 text-gray-600">
              Your payment information seems incomplete. Please contact support
              or re-register.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="w-full bg-[#1E3A8A] hover:bg-[#14286E] text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Register Again
            </button>
          </>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-4 text-sm text-gray-600 hover:text-[#1E3A8A] underline"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
