import React, { useState, useEffect } from "react";
import { getUserPaymentHistory } from "../components/API/api.jsx";
import { FaCheckCircle, FaClock, FaReceipt, FaDownload } from "react-icons/fa";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const data = await getUserPaymentHistory();
      setPayments(data.payments || []);
    } catch (error) {
      console.error("Failed to fetch payment history:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalPaid = () => {
    return payments.reduce((sum, payment) => sum + payment.amount, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg">Loading payment history...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
          <p className="text-gray-600 mt-2">View all your transactions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Paid</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₦{getTotalPaid().toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <FaCheckCircle className="text-green-500 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Transactions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {payments.length}
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <FaReceipt className="text-blue-500 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Remaining Balance</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₦{(user?.remainingAmount || 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-orange-100 p-4 rounded-full">
                <FaClock className="text-orange-500 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
          </div>

          {payments.length === 0 ? (
            <div className="p-12 text-center">
              <FaReceipt className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Payments Yet
              </h3>
              <p className="text-gray-500">
                Your payment history will appear here
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Reference
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Course
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(payment.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-600">
                        {payment.reference}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                        {payment.course}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                        {payment.paymentType === "full" ? "Full Payment" : "Part Payment"}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ₦{payment.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          payment.status === "success"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => window.print()}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          <FaDownload /> Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;