import React, { useState } from "react";
import axios from "axios";

const FapshiExpirePay = () => {
  const [transId, setTransId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expirationResult, setExpirationResult] = useState(null);

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

  const expirePayment = async () => {
    if (!validateTransactionId()) return;

    setIsLoading(true);
    setExpirationResult(null);

    try {
      const response = await axios.post(
        "https://live.fapshi.com/expire-pay",
        { transId },
        {
          headers: {
            apiuser: "303fa035-04c7-4e44-a649-860478e77dd5",
            apikey: "FAK_df3ad5b9aad1de68ff868f50c966d7ec",
            "Content-Type": "application/json",
          },
        }
      );

      setExpirationResult({
        success: true,
        status: response.data.status || "EXPIRED",
        message: "Payment transaction expired successfully",
        details: response.data,
        statusCode: response.status,
        timestamp: new Date().toLocaleString(),
      });
    } catch (err) {
      const apiError = err.response?.data || {
        message: err.message || "Failed to expire payment",
        statusCode: err.response?.status || 500,
      };

      setExpirationResult({
        success: false,
        message: apiError.message,
        statusCode: apiError.statusCode,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      EXPIRED: "text-gray-600 border border-gray-600",
      SUCCESSFUL: "text-green-600 border border-green-600",
      FAILED: "text-red-600 border border-red-600",
      CREATED: "text-blue-600 border border-blue-600",
      PENDING: "text-yellow-600 border border-yellow-600",
    };
    return `inline-block px-2 py-1 text-xs font-medium rounded ${
      statusMap[status] || "text-indigo-600 border border-indigo-600"
    }`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Expire Payment Transaction</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Input Form */}
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
              placeholder="Enter transaction ID to expire"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            <p className="mt-1 text-xs text-gray-500">
              The transaction ID you want to expire (8-10 alphanumeric
              characters)
            </p>
          </div>

          <button
            className="w-full inline-flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onClick={expirePayment}
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
                Expiring Transaction...
              </>
            ) : (
              <>
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3.5a.5.5 0 01.5.5v4.293l2.146-2.147a.5.5 0 01.708.708l-2.5 2.5a.5.5 0 01-.708 0l-2.5-2.5a.5.5 0 11.708-.708L7.5 8.293V4a.5.5 0 01.5-.5z" />
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" />
                </svg>
                Expire Payment
              </>
            )}
          </button>

          <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-md text-sm flex items-center">
            <svg
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8.982 1.566a1 1 0 00-1.964 0L.165 13.233c-.457.778.091 1.767.982 1.767h13.707c.89 0 1.439-.99.982-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995A.905.905 0 018 5zm.002 6a1 1 0 110 2 1 1 0 010-2z" />
            </svg>
            <span>
              This will prevent any future payments using this transaction link.
            </span>
          </div>
        </div>

        {/* Right Column: Expiration Result */}
        <div>
          {expirationResult && (
            <div
              className={`bg-white shadow rounded-md p-6 border ${
                expirationResult.success ? "border-green-500" : "border-red-500"
              }`}
            >
              <h5 className="text-lg font-semibold mb-4">
                {expirationResult.success ? (
                  <>
                    Transaction Expired:{" "}
                    <span className={getStatusBadge(expirationResult.status)}>
                      {expirationResult.status}
                    </span>
                  </>
                ) : (
                  "Error Expiring Transaction"
                )}
              </h5>

              {expirationResult.success ? (
                <>
                  <div className="p-3 bg-green-100 text-green-800 rounded-md text-sm">
                    <strong>Success:</strong> {expirationResult.message}
                  </div>

                  <dl className="mt-4 space-y-2">
                    <div className="flex">
                      <dt className="w-1/3 font-medium">Transaction ID</dt>
                      <dd className="w-2/3">{transId}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-1/3 font-medium">Status</dt>
                      <dd className="w-2/3">
                        <span
                          className={getStatusBadge(expirationResult.status)}
                        >
                          {expirationResult.status}
                        </span>
                      </dd>
                    </div>
                    {expirationResult.details?.amount && (
                      <div className="flex">
                        <dt className="w-1/3 font-medium">Amount</dt>
                        <dd className="w-2/3">
                          {expirationResult.details.amount} XAF
                        </dd>
                      </div>
                    )}
                    {expirationResult.details?.email && (
                      <div className="flex">
                        <dt className="w-1/3 font-medium">Email</dt>
                        <dd className="w-2/3">
                          {expirationResult.details.email}
                        </dd>
                      </div>
                    )}
                    <div className="flex">
                      <dt className="w-1/3 font-medium">Processed At</dt>
                      <dd className="w-2/3">{expirationResult.timestamp}</dd>
                    </div>
                  </dl>

                  {expirationResult.details?.message && (
                    <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-md text-sm">
                      <strong>Note:</strong> {expirationResult.details.message}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">
                    <strong>Error:</strong> {expirationResult.message}
                  </div>
                  {expirationResult.statusCode && (
                    <p className="mt-2 text-sm text-gray-600">
                      Status Code: {expirationResult.statusCode}
                    </p>
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

export default FapshiExpirePay;
