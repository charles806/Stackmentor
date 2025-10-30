import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear JWT token or any user info
    localStorage.removeItem("token");
    localStorage.removeItem("paidUser");

    // Optional: call backend logout route
    fetch("http://localhost:5000/api/auth/logout", { method: "POST" })
      .catch((err) => console.error("Logout API failed:", err));

    // Redirect to homepage
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen text-lg">
      Logging out...
    </div>
  );
};

export default Logout;
