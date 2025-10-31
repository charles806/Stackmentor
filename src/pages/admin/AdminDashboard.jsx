import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
  FaUserCheck,
  FaUserTimes,
  FaCalendarAlt,
} from "react-icons/fa";
import { getDashboardStats } from "../../components/API/api.jsx";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your StackMentor platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.totalUsers || 0}
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <FaUsers className="text-blue-500 text-2xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              +{stats?.recentUsers || 0} this week
            </p>
          </div>

          {/* Active Users */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.activeUsers || 0}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <FaUserCheck className="text-green-500 text-2xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">With valid access</p>
          </div>

          {/* Expired Users */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Expired Access</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.expiredUsers || 0}
                </p>
              </div>
              <div className="bg-red-100 p-4 rounded-full">
                <FaUserTimes className="text-red-500 text-2xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Need renewal</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₦{(stats?.totalRevenue || 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-full">
                <FaMoneyBillWave className="text-yellow-500 text-2xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              ₦{(stats?.monthRevenue || 0).toLocaleString()} this month
            </p>
          </div>
        </div>

        {/* Course & Payment Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Course Distribution */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Course Distribution
            </h3>
            <div className="space-y-4">
              {stats?.courseStats?.map((course) => (
                <div
                  key={course._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 capitalize">
                      {course._id}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {course.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Type Distribution */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Payment Types
            </h3>
            <div className="space-y-4">
              {stats?.paymentTypeStats?.map((type) => (
                <div
                  key={type._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 capitalize">
                      {type._id === "full" ? "Full Payment" : "Part Payment"}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {type.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/users"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <FaUsers className="text-blue-500 text-3xl mb-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Manage Users
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              View, edit, and manage all registered users
            </p>
          </Link>

          <Link
            to="/admin/payments"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <FaMoneyBillWave className="text-green-500 text-3xl mb-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Payment History
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              View all transactions and payment records
            </p>
          </Link>

          <Link
            to="/admin/content"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <FaChartLine className="text-purple-500 text-3xl mb-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Course Content
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Add and manage course materials
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
