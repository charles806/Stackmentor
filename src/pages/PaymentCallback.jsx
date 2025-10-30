import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentCallback = () => {
  const [status, setStatus] = useState("verifying");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference");
      if (!reference) return navigate("/payment-failed");

      try {
        const res = await axios.get(
          `http://localhost:5000/api/payments/verify/${reference}`
        );
        const { success, token, redirectUrl } = res.data;

        if (success) {
          localStorage.setItem("token", token);
          navigate(redirectUrl.replace("http://localhost:5173", ""));
        } else navigate("/payment-failed");
      } catch {
        navigate("/payment-failed");
      }
    };
    verifyPayment();
  }, [navigate, searchParams]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {status === "verifying" && (
          <p className="text-lg text-gray-700">Verifying your payment...</p>
        )}
      </div>
    </section>
  );
};

export default PaymentCallback;
