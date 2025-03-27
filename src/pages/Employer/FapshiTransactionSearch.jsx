import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FapshiTransactionSearch = () => {
  const [searchParams, setSearchParams] = useState({
    status: "",
    medium: "",
    name: "",
    start: null,
    end: null,
    amt: "",
    limit: 10,
    sort: "desc",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date, field) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (
      searchParams.limit &&
      (searchParams.limit < 1 || searchParams.limit > 100)
    ) {
      newErrors.limit = "Limit must be between 1 and 100";
    }

    if (
      searchParams.start &&
      searchParams.end &&
      searchParams.start > searchParams.end
    ) {
      newErrors.dateRange = "End date cannot be before start date";
    }

    if (searchParams.amt && isNaN(searchParams.amt)) {
      newErrors.amt = "Amount must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const searchTransactions = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setSearchResults(null);

    try {
      const params = {
        ...(searchParams.status && { status: searchParams.status }),
        ...(searchParams.medium && { medium: searchParams.medium }),
        ...(searchParams.name && { name: searchParams.name }),
        ...(searchParams.start && {
          start: formatDateForAPI(searchParams.start),
        }),
        ...(searchParams.end && { end: formatDateForAPI(searchParams.end) }),
        ...(searchParams.amt && { amt: Number(searchParams.amt) }),
        limit: searchParams.limit,
        sort: searchParams.sort,
      };

      const response = await axios.get("https://live.fapshi.com/search", {
        params,
        headers: {
          apiuser: "303fa035-04c7-4e44-a649-860478e77dd5",
          apikey: "FAK_df3ad5b9aad1de68ff868f50c966d7ec",
          "Content-Type": "application/json",
        },
      });

      setSearchResults({
        success: true,
        data: response.data,
        count: Array.isArray(response.data) ? response.data.length : 0,
        statusCode: response.status,
        timestamp: new Date().toLocaleString(),
      });
    } catch (err) {
      const apiError = err.response?.data || {
        message: err.message || "Failed to search transactions",
        statusCode: err.response?.status || 500,
      };

      setSearchResults({
        success: false,
        message: apiError.message,
        statusCode: apiError.statusCode,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateForAPI = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

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

  const resetForm = () => {
    setSearchParams({
      status: "",
      medium: "",
      name: "",
      start: null,
      end: null,
      amt: "",
      limit: 10,
      sort: "desc",
    });
    setSearchResults(null);
    setErrors({});
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Transaction Search</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search Criteria Card */}
        <div className="md:col-span-1 bg-white shadow rounded-md p-6">
          <h5 className="text-lg font-semibold mb-4">Search Criteria</h5>

          {/* Status */}
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={searchParams.status}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Status</option>
              <option value="created">Created</option>
              <option value="successful">Successful</option>
              <option value="failed">Failed</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          {/* Medium */}
          <div className="mb-4">
            <label htmlFor="medium" className="block text-sm font-medium mb-1">
              Payment Medium
            </label>
            <select
              id="medium"
              name="medium"
              value={searchParams.medium}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Medium</option>
              <option value="mobile money">Mobile Money (MTN)</option>
              <option value="orange money">Orange Money</option>
              <option value="card">Card</option>
            </select>
          </div>

          {/* Customer Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Customer Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={searchParams.name}
              onChange={handleChange}
              placeholder="Filter by name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date Range */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <div className="grid grid-cols-2 gap-2">
              <DatePicker
                selected={searchParams.start}
                onChange={(date) => handleDateChange(date, "start")}
                selectsStart
                startDate={searchParams.start}
                endDate={searchParams.end}
                placeholderText="Start date"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                dateFormat="yyyy-MM-dd"
              />
              <DatePicker
                selected={searchParams.end}
                onChange={(date) => handleDateChange(date, "end")}
                selectsEnd
                startDate={searchParams.start}
                endDate={searchParams.end}
                minDate={searchParams.start}
                placeholderText="End date"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            {errors.dateRange && (
              <p className="mt-1 text-xs text-red-600">{errors.dateRange}</p>
            )}
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label htmlFor="amt" className="block text-sm font-medium mb-1">
              Exact Amount (XAF)
            </label>
            <input
              type="number"
              id="amt"
              name="amt"
              min="100"
              value={searchParams.amt}
              onChange={handleChange}
              placeholder="Filter by exact amount"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.amt ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.amt && (
              <p className="mt-1 text-xs text-red-600">{errors.amt}</p>
            )}
          </div>

          {/* Limit and Sort */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <label htmlFor="limit" className="block text-sm font-medium mb-1">
                Results Limit
              </label>
              <input
                type="number"
                id="limit"
                name="limit"
                min="1"
                max="100"
                value={searchParams.limit}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.limit ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.limit && (
                <p className="mt-1 text-xs text-red-600">{errors.limit}</p>
              )}
            </div>
            <div>
              <label htmlFor="sort" className="block text-sm font-medium mb-1">
                Sort Order
              </label>
              <select
                id="sort"
                name="sort"
                value={searchParams.sort}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-2">
            <button
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={searchTransactions}
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
                  Searching...
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
            <button
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={resetForm}
              disabled={isLoading}
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 3a5 5 0 100 10A5 5 0 008 3zM8 1a7 7 0 110 14A7 7 0 018 1z" />
                <path d="M7.5 4.5a.5.5 0 011 0v4a.5.5 0 01-1 0v-4z" />
              </svg>
              Reset Form
            </button>
          </div>
        </div>

        {/* Search Results Card */}
        <div className="md:col-span-2">
          {searchResults && (
            <div
              className={`bg-white shadow rounded-md p-6 border ${
                searchResults.success ? "border-green-500" : "border-red-500"
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h5 className="text-lg font-semibold">
                  {searchResults.success
                    ? searchResults.count > 0
                      ? `Found ${searchResults.count} transaction${
                          searchResults.count !== 1 ? "s" : ""
                        }`
                      : "No Matching Transactions Found"
                    : "Search Error"}
                </h5>
                {searchResults.success && searchResults.count > 0 && (
                  <span className="text-xs text-gray-500 mt-2 md:mt-0">
                    {searchResults.timestamp}
                  </span>
                )}
              </div>

              {searchResults.success ? (
                searchResults.count > 0 ? (
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
                            Medium
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-gray-600">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {searchResults.data.map((txn, index) => (
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
                              {txn.medium || "N/A"}
                            </td>
                            <td className="px-4 py-2 text-gray-700">
                              {formatDisplayDate(txn.createdAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-4 bg-blue-100 text-blue-800 rounded-md text-sm">
                    No transactions match your search criteria.
                  </div>
                )
              ) : (
                <div className="p-4 bg-red-100 text-red-800 rounded-md text-sm">
                  <div className="font-semibold">{searchResults.message}</div>
                  {searchResults.statusCode && (
                    <div className="mt-1 text-xs">
                      Status Code: {searchResults.statusCode}
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

export default FapshiTransactionSearch;
