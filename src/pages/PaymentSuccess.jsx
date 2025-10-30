import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPayment } from "../components/API/api.jsx";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const reference = searchParams.get("reference");
      
      if (!reference) {
        setStatus("failed");
        setTimeout(() => navigate("/payment-failed"), 2000);
        return;
      }

      try {
        const data = await verifyPayment(reference);

        if (data.success) {
          // Save token and user data
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          setStatus("success");
          
          // Redirect to appropriate learning page
          setTimeout(() => {
            navigate(data.redirectUrl.replace("http://localhost:5173", ""));
          }, 2000);
        } else {
          setStatus("failed");
          setTimeout(() => navigate("/payment-failed"), 2000);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("failed");
        setTimeout(() => navigate("/payment-failed"), 2000);
      }
    };

    verify();
  }, [navigate, searchParams]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#E8EBF3]">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
        {status === "verifying" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#1E3A8A] mx-auto mb-4"></div>
            <p className="text-lg text-gray-700">Verifying your payment...</p>
          </>
        )}
        
        {status === "success" && (
          <>
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
            <p className="text-gray-700">Redirecting to your dashboard...</p>
          </>
        )}
        
        {status === "failed" && (
          <>
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Verification Failed</h2>
            <p className="text-gray-700">Redirecting...</p>
          </>
        )}
      </div>
    </section>
  );
};

export default PaymentSuccess;