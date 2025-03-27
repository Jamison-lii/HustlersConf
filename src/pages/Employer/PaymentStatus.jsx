import React, { useState } from "react";
import axios from "axios";

const FapshiPaymentStatus = () => {
  const [transId, setTransId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const validateTransactionId = () => {
    if (!transId) {
      setError("Transaction ID is required");
      return false;
    }
    if (typeof transId !== "string") {
      setError("Transaction ID must be a string");
      return false;
    }
    if (!/^[a-zA-Z0-9]{8,10}$/.test(transId)) {
      setError("Invalid transaction ID format (8-10 alphanumeric characters)");
      return false;
    }
    setError("");
    return true;
  };

  const checkPaymentStatus = async () => {
    if (!validateTransactionId()) return;

    setIsLoading(true);
    setPaymentStatus(null);

    try {
      const response = await axios.get(
        `https://live.fapshi.com/payment-status/${transId}`,
        {
          headers: {
            apiuser: "303fa035-04c7-4e44-a649-860478e77dd5",
            apikey: "FAK_df3ad5b9aad1de68ff868f50c966d7ec",
            "Content-Type": "application/json",
          },
        }
      );

      setPaymentStatus({
        ...response.data,
        statusCode: response.status,
        timestamp: new Date().toLocaleString(),
      });
    } catch (err) {
      const apiError = err.response?.data || {
        message: err.message || "Failed to check payment status",
        statusCode: err.response?.status || 500,
      };

      setPaymentStatus({
        error: true,
        message: apiError.message,
        statusCode: apiError.statusCode,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Return Tailwind classes based on the payment status
  const getStatusBadge = (status) => {
    const statusMap = {
      CREATED: "text-blue-600 border border-blue-600",
      PENDING: "text-yellow-600 border border-yellow-600",
      SUCCESSFUL: "text-green-600 border border-green-600",
      FAILED: "text-red-600 border border-red-600",
      EXPIRED: "text-gray-600 border border-gray-600",
    };
    return `inline-block px-2 py-1 text-xs font-medium rounded ${
      statusMap[status] || "text-indigo-600 border border-indigo-600"
    }`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Check Payment Status</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Transaction Input */}
        <div className="bg-white shadow rounded-md p-6">
          <div className="mb-4">
            <label htmlFor="transId" className="block text-sm font-medium mb-1">
              Transaction ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="transId"
              value={transId}
              onChange={(e) => setTransId(e.target.value)}
              placeholder="Enter transaction ID (8-10 characters)"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            <p className="mt-1 text-xs text-gray-500">
              The transaction ID received from payment initiation
            </p>
          </div>
          <button
            className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={checkPaymentStatus}
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
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                  ></path>
                </svg>
                Checking Status...
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
                  <path
                    fillRule="evenodd"
                    d="M8 4.793l-6.146 6.147a.5.5 0 10.708.708L8 6.207l5.438 5.439a.5.5 0 10.708-.708L8 4.793z"
                  />
                </svg>
                Check Status
              </>
            )}
          </button>
        </div>

        {/* Right Column - Payment Status Display */}
        <div>
          {paymentStatus && (
            <div
              className={`bg-white shadow rounded-md p-6 border ${
                paymentStatus.error ? "border-red-500" : "border-green-500"
              }`}
            >
              <h5 className="text-lg font-semibold mb-4">
                {paymentStatus.error ? (
                  "Error Checking Status"
                ) : (
                  <>
                    Payment Status:{" "}
                    <span className={getStatusBadge(paymentStatus.status)}>
                      {paymentStatus.status}
                    </span>
                  </>
                )}
              </h5>
              {paymentStatus.error ? (
                <>
                  <div className="p-3 bg-red-100 text-red-700 rounded-md">
                    <strong>Error:</strong> {paymentStatus.message}
                  </div>
                  {paymentStatus.statusCode && (
                    <p className="mt-2 text-sm text-gray-600">
                      Status Code: {paymentStatus.statusCode}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <dl className="grid grid-cols-1 gap-y-2">
                    <div className="flex">
                      <dt className="w-1/3 font-medium">Transaction ID</dt>
                      <dd className="w-2/3">{transId}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-1/3 font-medium">Amount</dt>
                      <dd className="w-2/3">{paymentStatus.amount} XAF</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-1/3 font-medium">Status</dt>
                      <dd className="w-2/3">
                        <span className={getStatusBadge(paymentStatus.status)}>
                          {paymentStatus.status}
                        </span>
                      </dd>
                    </div>
                    {paymentStatus.email && (
                      <div className="flex">
                        <dt className="w-1/3 font-medium">Email</dt>
                        <dd className="w-2/3">{paymentStatus.email}</dd>
                      </div>
                    )}
                    {paymentStatus.userId && (
                      <div className="flex">
                        <dt className="w-1/3 font-medium">User ID</dt>
                        <dd className="w-2/3">{paymentStatus.userId}</dd>
                      </div>
                    )}
                    {paymentStatus.externalId && (
                      <div className="flex">
                        <dt className="w-1/3 font-medium">Reference</dt>
                        <dd className="w-2/3">{paymentStatus.externalId}</dd>
                      </div>
                    )}
                    <div className="flex">
                      <dt className="w-1/3 font-medium">Last Checked</dt>
                      <dd className="w-2/3">{paymentStatus.timestamp}</dd>
                    </div>
                  </dl>
                  {paymentStatus.message && (
                    <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-md text-sm">
                      <strong>Note:</strong> {paymentStatus.message}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FapshiPaymentStatus;
