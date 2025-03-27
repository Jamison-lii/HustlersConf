import React, { useState, useEffect } from "react";
import axios from "axios";

const FapshiServiceBalance = () => {
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchBalance = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://live.fapshi.com/balance", {
        headers: {
          apiuser: "303fa035-04c7-4e44-a649-860478e77dd5",
          apikey: "FAK_df3ad5b9aad1de68ff868f50c966d7ec",
          "Content-Type": "application/json",
        },
      });

      setBalance({
        amount: response.data.amount,
        currency: response.data.currency || "XAF",
        statusCode: response.status,
      });
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      const apiError = err.response?.data || {
        message: err.message || "Failed to fetch balance",
        statusCode: err.response?.status || 500,
      };

      setError({
        message: apiError.message,
        statusCode: apiError.statusCode,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch balance on component mount
  useEffect(() => {
    fetchBalance();
  }, []);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-md p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Service Balance</h2>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[120px]">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
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
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <div className="font-bold">Error Checking Balance</div>
            <div>{error.message}</div>
            {error.statusCode && (
              <div className="mt-2 text-xs text-gray-600">
                Status Code: {error.statusCode}
              </div>
            )}
          </div>
        ) : balance ? (
          <>
            <div className="text-4xl font-bold mb-3">
              {formatAmount(balance.amount)}{" "}
              <span className="text-lg text-gray-500">{balance.currency}</span>
            </div>
            <div className="flex justify-center gap-3 mb-3">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={fetchBalance}
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
                    Refreshing...
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
                    Refresh Balance
                  </>
                )}
              </button>
            </div>
          </>
        ) : null}

        {lastUpdated && (
          <div className="text-xs text-gray-500 mt-3">
            Last updated: {lastUpdated}
          </div>
        )}

        <div className="mt-4 bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-4 text-sm flex items-center justify-center gap-2">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1 1 0 00-1.964 0L.165 13.233c-.457.778.091 1.767.982 1.767h13.707c.89 0 1.439-.99.982-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995A.905.905 0 018 5zm.002 6a1 1 0 110 2 1 1 0 010-2z" />
          </svg>
          <span>
            In sandbox environment, the balance is randomly generated on each
            request.
          </span>
        </div>
      </div>
    </div>
  );
};

export default FapshiServiceBalance;
