import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Courses from "./pages/Courses.jsx";
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import LearningMaterials from "./pages/LearningMaterials.jsx";
import LearningMaterialsFrontend from "./pages/LearningMaterialsFrontend.jsx";
import LearningMaterialsBackend from "./pages/LearningMaterialsBackend.jsx";
import PaymentFailed from "./pages/PaymentFailed.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminContentManager from "./pages/admin/AdminContentManager.jsx";
import ContentDetail from "./pages/ContentDetail.jsx";
import PaymentHistory from "./pages/PaymentHistory.jsx";
import AdminPayments from "./pages/admin/AdminPayments.jsx";
import UserDetail from "./pages/admin/UserDetail.jsx";
import CertificatePage from "./pages/CertificatePage.jsx";
import TutorDashboard from "./pages/tutor/TutorDashboard.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/certificate" element={<CertificatePage />} />

        {/* Payment Routes */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-history" element={<PaymentHistory />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/content" element={<AdminContentManager />} />
        <Route path="/admin/users/:id" element={<UserDetail />} />
        <Route path="/admin/payments" element={<AdminPayments />} />

        {/* Course Detail */}
        <Route path="/content/:id" element={<ContentDetail />} />

        {/* Protected Learning Material Routes */}
        <Route
          path="/learning-materials"
          element={
            <ProtectedRoute course="fullstack">
              <LearningMaterials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-materials-frontend"
          element={
            <ProtectedRoute course="frontend">
              <LearningMaterialsFrontend />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-materials-backend"
          element={
            <ProtectedRoute course="backend">
              <LearningMaterialsBackend />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
