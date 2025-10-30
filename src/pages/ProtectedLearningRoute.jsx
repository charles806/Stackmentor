import { Navigate } from "react-router-dom";

const ProtectedLearningRoute = ({ children, course }) => {
  const paymentInfo = JSON.parse(localStorage.getItem("paymentInfo"));

  if (!paymentInfo) return <Navigate to="/register" />;

  const { course: paidCourse, type, paidAt } = paymentInfo;
  const now = new Date().getTime();

  // Expiration time in milliseconds
  const expirationTime = type === "part"
    ? (paidCourse === "fullstack" ? 4 * 30 * 24 * 60 * 60 * 1000 : 2 * 30 * 24 * 60 * 60 * 1000)
    : Infinity; // full payment never expires

  const expiryDate = paidAt + expirationTime;

  // Redirect if course doesn't match or access expired
  if (paidCourse !== course || now > expiryDate) {
    return <Navigate to="/payment" />;
  }

  return children;
};

export default ProtectedLearningRoute;
