import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaBook,
  FaChartLine,
  FaClipboardList,
  FaAward,
  FaCalendarAlt,
} from "react-icons/fa";
import { getTutorStats } from "../../components/API/api.jsx";

const TutorDashboard = () => {
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
          <h1 className="text-3xl font-bold text-gray-900">Tutor Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your courses and students</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Students */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">My Students</p>
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

          {/* Active Students */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Students</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.activeUsers || 0}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <FaChartLine className="text-green-500 text-2xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Currently learning</p>
          </div>

          {/* Course Content */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Course Materials</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.totalContent || 0}
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-full">
                <FaBook className="text-purple-500 text-2xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Lessons & resources</p>
          </div>

          {/* Certificates */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Certificates</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.totalCertificates || 0}
                </p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-full">
                <FaAward className="text-yellow-500 text-2xl" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Issued to students</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/content"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <FaBook className="text-blue-500 text-3xl mb-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Manage Content
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Add and edit course materials, lessons, and resources
            </p>
          </Link>

          <Link
            to="/admin/users"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <FaUsers className="text-green-500 text-3xl mb-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              View Students
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              See student progress and manage enrollments
            </p>
          </Link>

          <Link
            to="/tutor/assignments"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <FaClipboardList className="text-purple-500 text-3xl mb-3" />
            <h3 className="text-lg font-semibold text-gray-900">Assignments</h3>
            <p className="text-gray-600 text-sm mt-2">
              Create and review student assignments
            </p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <FaCalendarAlt className="text-blue-500 text-xl" />
              <div>
                <p className="font-medium text-gray-900">
                  New student enrolled
                </p>
                <p className="text-sm text-gray-600">
                  John Doe joined Frontend Development
                </p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <FaAward className="text-yellow-500 text-xl" />
              <div>
                <p className="font-medium text-gray-900">Certificate issued</p>
                <p className="text-sm text-gray-600">
                  Jane Smith completed Backend Course
                </p>
                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <FaBook className="text-purple-500 text-xl" />
              <div>
                <p className="font-medium text-gray-900">New content added</p>
                <p className="text-sm text-gray-600">
                  React Hooks Tutorial uploaded
                </p>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
