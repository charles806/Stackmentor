import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import {
  getAllUsers,
  searchUsers,
  deleteUser,
} from "../../components/API/api.jsx";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers(currentPage, 10);
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchUsers();
      return;
    }

    try {
      const data = await searchUsers(searchQuery);
      setUsers(data.users);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(userId);
      fetchUsers();
      alert("User deleted successfully");
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const getAccessStatus = (user) => {
    if (!user.isActive)
      return { text: "Inactive", color: "text-red-600 bg-red-100" };
    if (!user.accessExpiresAt)
      return { text: "Active (Full)", color: "text-green-600 bg-green-100" };

    const now = new Date();
    const expiryDate = new Date(user.accessExpiresAt);

    if (now > expiryDate)
      return { text: "Expired", color: "text-red-600 bg-red-100" };
    return { text: "Active", color: "text-green-600 bg-green-100" };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage all registered users</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  fetchUsers();
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Registered
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => {
                  const status = getAccessStatus(user);
                  return (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {user.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm capitalize text-gray-700">
                          {user.course}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          ₦{user.amountPaid?.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {user.paymentType}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
                        >
                          {status.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              (window.location.href = `/admin/users/${user._id}`)
                            }
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                            title="Delete User"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
