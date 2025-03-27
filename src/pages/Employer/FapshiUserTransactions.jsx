import React, { useState } from "react";
import axios from "axios";

const FapshiUserTransactions = () => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState(null);

  const validateUserId = () => {
    if (!userId) {
      setError("User ID is required");
      return false;
    }
    if (typeof userId !== "string") {
      setError("User ID must be a string");
      return false;
    }
    if (!/^[a-zA-Z0-9-_]{1,100}$/.test(userId)) {
      setError(
        "Invalid User ID (1-100 alphanumeric, hyphen, or underscore characters)"
      );
      return false;
    }
    setError("");
    return true;
  };

  const fetchUserTransactions = async () => {
    if (!validateUserId()) return;

    setIsLoading(true);
    setTransactions(null);

    try {
      const response = await axios.get(
        `https://live.fapshi.com/transaction/${userId}`,
        {
          headers: {
            apiuser: "303fa035-04c7-4e44-a649-860478e77dd5",
            apikey: "FAK_df3ad5b9aad1de68ff868f50c966d7ec",
            "Content-Type": "application/json",
          },
        }
      );

      const transactionsData = Array.isArray(response.data)
        ? response.data
        : [response.data];

      setTransactions({
        success: true,
        data: transactionsData,
        count: transactionsData.length,
        statusCode: response.status,
        timestamp: new Date().toLocaleString(),
      });
    } catch (err) {
      const apiError = err.response?.data || {
        message: err.message || "Failed to fetch user transactions",
        statusCode: err.response?.status || 500,
      };

      setTransactions({
        success: false,
        message: apiError.message,
        statusCode: apiError.statusCode,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Tailwind-styled badge based on status
  const getStatusBadge = (status) => {
    const statusMap = {
      CREATED: "text-blue-600 border-blue-600",
      PENDING: "text-yellow-600 border-yellow-600",
      SUCCESSFUL: "text-green-600 border-green-600",
      FAILED: "text-red-600 border-red-600",
      EXPIRED: "text-gray-600 border-gray-600",
    };
    return `inline-block px-2 py-1 text-xs font-medium rounded border ${
      statusMap[status] || "text-indigo-600 border-indigo-600"
    }`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">User Transaction History</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: User ID Form */}
        <div className="md:col-span-1 bg-white shadow rounded-md p-6">
          <div className="mb-4">
            <label htmlFor="userId" className="block text-sm font-medium mb-1">
              User ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value.trim())}
              placeholder="Enter user ID"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            <p className="mt-1 text-xs text-gray-500">
              The user ID used during payment initiation
            </p>
          </div>
          <button
            className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={fetchUserTransactions}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l2.146-2.146a.5.5 0 01.708.708L8.5 8.5V4a8 8 0 11-8 8z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.354 5.5H.5a.5.5 0 010-1h5.854a.5.5 0 010 1zM15.354 9.5h-5.854a.5.5 0 010-1h5.854a.5.5 0 010 1z" />
                  <path
                    fillRule="evenodd"
                    d="M8.354 1.146a.5.5 0 00-.708 0l-6.5 6.5a.5.5 0 00.708.708L8 2.207l6.146 6.147a.5.5 0 00.708-.708l-6.5-6.5z"
                  />
                </svg>
                Search Transactions
              </>
            )}
          </button>
        </div>

        {/* Right Column: Transactions Display */}
        <div className="md:col-span-2">
          {transactions && (
            <div
              className={`bg-white shadow rounded-md p-6 border ${
                transactions.success ? "border-green-500" : "border-red-500"
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h5 className="text-lg font-semibold">
                  {transactions.success
                    ? `Found ${transactions.count} transaction${
                        transactions.count !== 1 ? "s" : ""
                      }`
                    : "Error Fetching Transactions"}
                </h5>
                {transactions.success && (
                  <span className="text-xs text-gray-500 mt-2 md:mt-0">
                    Last updated: {transactions.timestamp}
                  </span>
                )}
              </div>

              {transactions.success ? (
                transactions.count > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium text-gray-600">
                            Transaction ID
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-gray-600">
                            Amount
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-gray-600">
                            Status
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-gray-600">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {transactions.data.map((txn, index) => (
                          <tr key={index}>
                            <td
                              className="px-4 py-2 text-gray-700 truncate max-w-[120px]"
                              title={txn.transId}
                            >
                              {txn.transId}
                            </td>
                            <td className="px-4 py-2 text-gray-700">
                              {txn.amount} XAF
                            </td>
                            <td className="px-4 py-2">
                              <span className={`${getStatusBadge(txn.status)}`}>
                                {txn.status}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-gray-700">
                              {formatDate(txn.createdAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-4 bg-blue-100 text-blue-800 rounded-md text-sm">
                    No transactions found for this user ID.
                  </div>
                )
              ) : (
                <div className="p-4 bg-red-100 text-red-800 rounded-md text-sm">
                  <div className="font-semibold">{transactions.message}</div>
                  {transactions.statusCode && (
                    <div className="mt-1 text-xs">
                      Status Code: {transactions.statusCode}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FapshiUserTransactions;
