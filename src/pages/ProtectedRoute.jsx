import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../components/API/api.jsx";

const ProtectedRoute = ({ children, course }) => {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [userCourse, setUserCourse] = useState(null);

  useEffect(() => {
    const checkAccess = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser();
        const { user, hasAccess: access } = data;

        setUserCourse(user.course);
        setHasAccess(access);
        
        // Store user data in localStorage for quick access
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Access check failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // Not logged in
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }

  // No access (expired or not paid)
  if (!hasAccess) {
    return <Navigate to="/payment" replace />;
  }

  // Wrong course
  if (course && userCourse !== course) {
    return <Navigate to={`/learning-materials-${userCourse}`} replace />;
  }

  return children;
};

export default ProtectedRoute;