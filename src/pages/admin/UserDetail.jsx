import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUserAccess } from "../../components/API/api.jsx";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBook,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaEdit,
} from "react-icons/fa";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    isActive: true,
    accessExpiresAt: "",
  });

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const data = await getUserById(id);
      setUser(data.user);
      setPayments(data.payments || []);
      setEditForm({
        isActive: data.user.isActive,
        accessExpiresAt: data.user.accessExpiresAt
          ? new Date(data.user.accessExpiresAt).toISOString().split("T")[0]
          : "",
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAccess = async (e) => {
    e.preventDefault();
    try {
      await updateUserAccess(id, {
        isActive: editForm.isActive,
        accessExpiresAt: editForm.accessExpiresAt || null,
      });
      alert("User access updated successfully!");
      setShowEditModal(false);
      fetchUser();
    } catch (error) {
      alert("Failed to update user access");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">User not found</p>
          <button
            onClick={() => navigate("/admin/users")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  const getAccessStatus = () => {
    if (!user.isActive)
      return {
        text: "Inactive",
        color: "bg-red-100 text-red-600",
        icon: <FaTimesCircle />,
      };
    if (!user.accessExpiresAt)
      return {
        text: "Active (Full)",
        color: "bg-green-100 text-green-600",
        icon: <FaCheckCircle />,
      };

    const now = new Date();
    const expiryDate = new Date(user.accessExpiresAt);

    if (now > expiryDate)
      return {
        text: "Expired",
        color: "bg-red-100 text-red-600",
        icon: <FaTimesCircle />,
      };
    return {
      text: "Active",
      color: "bg-green-100 text-green-600",
      icon: <FaCheckCircle />,
    };
  };

  const status = getAccessStatus();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/users")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 cursor-pointer"
        >
          <FaArrowLeft /> Back to Users
        </button>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <FaUser className="text-blue-600 text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.fullName}
                </h1>
                <p className="text-gray-600 mt-1">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${status.color}`}
              >
                {status.icon} {status.text}
              </span>
              <button
                onClick={() => setShowEditModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
              >
                <FaEdit /> Edit Access
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaPhone className="text-gray-600" />
                <p className="text-sm text-gray-600">Phone</p>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {user.phone || "N/A"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaBook className="text-gray-600" />
                <p className="text-sm text-gray-600">Course</p>
              </div>
              <p className="text-lg font-semibold text-gray-900 capitalize">
                {user.course}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaMoneyBillWave className="text-gray-600" />
                <p className="text-sm text-gray-600">Amount Paid</p>
              </div>
              <p className="text-lg font-semibold text-green-600">
                ₦{user.amountPaid?.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1 capitalize">
                {user.paymentType} Payment
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaClock className="text-gray-600" />
                <p className="text-sm text-gray-600">Access Expires</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {user.accessExpiresAt
                  ? new Date(user.accessExpiresAt).toLocaleDateString()
                  : "Unlimited"}
              </p>
            </div>
          </div>

          {user.remainingAmount > 0 && (
            <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800 font-medium">
                ⚠️ Outstanding Balance: ₦{user.remainingAmount.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Payment History
          </h2>

          {payments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No payment history</p>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment._id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">
                        ₦{payment.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Reference: {payment.reference}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(payment.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Access Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md">
              <div className="px-6 py-4 border-b">
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit User Access
                </h2>
              </div>

              <form onSubmit={handleUpdateAccess} className="p-6 space-y-6">
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.isActive}
                      onChange={(e) =>
                        setEditForm({ ...editForm, isActive: e.target.checked })
                      }
                      className="w-5 h-5 text-blue-600 cursor-pointer"
                    />
                    <span className="text-gray-700 font-medium">
                      Account Active
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Access Expires At
                  </label>
                  <input
                    type="date"
                    value={editForm.accessExpiresAt}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        accessExpiresAt: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty for unlimited access
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1  px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                  >
                    Update Access
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
