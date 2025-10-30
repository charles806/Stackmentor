import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [phone, setPhone] = useState("");
  const [paymentType, setPaymentType] = useState("full");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const paymentInfo = JSON.parse(localStorage.getItem("paymentInfo") || "{}");

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/payments/init",
        {
          fullName: paymentInfo.fullName,
          email: paymentInfo.email,
          phone,
          course: paymentInfo.course,
          paymentType,
          password: paymentInfo.password,
          amount: paymentType === "full" ? 300000 : 100000,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = res.data.authorization_url; // redirect to Paystack
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed");
    }
  };

  return (
    <div>
      <h2>Make Payment</h2>
      <input
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <select
        value={paymentType}
        onChange={(e) => setPaymentType(e.target.value)}
      >
        <option value="full">Full Payment</option>
        <option value="part">Partial Payment</option>
      </select>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
