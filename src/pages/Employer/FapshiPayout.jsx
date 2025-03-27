import React, { useState } from "react";
import axios from "axios";

const FapshiPayout = () => {
  const [formData, setFormData] = useState({
    amount: "",
    phone: "",
    medium: "",
    name: "",
    email: "",
    userId: "",
    externalId: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payoutResult, setPayoutResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (!Number.isInteger(Number(formData.amount))) {
      newErrors.amount = "Amount must be an integer";
    } else if (Number(formData.amount) < 100) {
      newErrors.amount = "Amount cannot be less than 100 XAF";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (typeof formData.phone !== "string") {
      newErrors.phone = "Phone must be a string";
    } else if (!/^6\d{8}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number (9 digits starting with 6)";
    }

    // Optional fields validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.userId && !/^[a-zA-Z0-9-_]{1,100}$/.test(formData.userId)) {
      newErrors.userId =
        "Only letters, numbers, hyphens and underscores allowed";
    }

    if (
      formData.externalId &&
      !/^[a-zA-Z0-9-_]{1,100}$/.test(formData.externalId)
    ) {
      newErrors.externalId =
        "Only letters, numbers, hyphens and underscores allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const initiatePayout = async (e) => {
    e.preventDefault();
    setPayoutResult(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare payload according to API requirements
      const payload = {
        amount: Number(formData.amount),
        phone: formData.phone,
        ...(formData.medium && { medium: formData.medium }),
        ...(formData.name && { name: formData.name }),
        ...(formData.email && { email: formData.email }),
        ...(formData.userId && { userId: formData.userId }),
        ...(formData.externalId && { externalId: formData.externalId }),
        ...(formData.message && { message: formData.message }),
      };

      const response = await axios.post(
        "https://live.fapshi.com/payout",
        payload,
        {
          headers: {
            apiuser: "303fa035-04c7-4e44-a649-860478e77dd5",
            apikey: "your-payout-service-api-key",
            "Content-Type": "application/json",
          },
        }
      );

      setPayoutResult({
        success: true,
        message: "Payout initiated successfully",
        transId: response.data.transId,
        statusCode: response.status,
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      const apiError = error.response?.data || {
        message: error.message || "Failed to initiate payout",
        statusCode: error.response?.status || 500,
      };

      setPayoutResult({
        success: false,
        message: apiError.message,
        statusCode: apiError.statusCode,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      phone: "",
      medium: "",
      name: "",
      email: "",
      userId: "",
      externalId: "",
      message: "",
    });
    setPayoutResult(null);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Initiate Payout</h2>

      <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-md flex items-center gap-2">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1 1 0 00-1.964 0L.165 13.233c-.457.778.091 1.767.982 1.767h13.707c.89 0 1.439-.99.982-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995A.905.905 0 018 5zm.002 6a1 1 0 110 2 1 1 0 010-2z" />
        </svg>
        <span>
          <strong>Important:</strong> This service requires special payout
          permissions. Contact Fapshi support to enable payouts for your service
          account.
        </span>
      </div>

      {payoutResult && (
        <div
          className={`mb-6 p-4 rounded-md ${
            payoutResult.success
              ? "bg-green-100 border-l-4 border-green-500 text-green-800"
              : "bg-red-100 border-l-4 border-red-500 text-red-800"
          }`}
        >
          {payoutResult.success ? (
            <>
              <div className="font-semibold">
                Payout Initiated Successfully!
              </div>
              <div className="mt-2">
                <strong>Transaction ID:</strong> {payoutResult.transId}
              </div>
              <div className="mt-1">
                <strong>Status Code:</strong> {payoutResult.statusCode}
              </div>
              <div className="mt-1">
                <strong>Processed At:</strong> {payoutResult.timestamp}
              </div>
            </>
          ) : (
            <>
              <div className="font-semibold">Payout Failed</div>
              <div className="mt-2">{payoutResult.message}</div>
              {payoutResult.statusCode && (
                <div className="mt-1">
                  <strong>Status Code:</strong> {payoutResult.statusCode}
                </div>
              )}
            </>
          )}
        </div>
      )}

      <form onSubmit={initiatePayout}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-1">
              Amount (XAF) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              min="100"
              step="1"
              value={formData.amount}
              onChange={handleChange}
              required
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.amount && (
              <p className="mt-1 text-xs text-red-600">{errors.amount}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Minimum amount: 100 XAF
            </p>
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Recipient Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="6XXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              required
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Format: 9 digits starting with 6
            </p>
          </div>

          {/* Payment Medium */}
          <div>
            <label htmlFor="medium" className="block text-sm font-medium mb-1">
              Payment Medium
            </label>
            <select
              id="medium"
              name="medium"
              value={formData.medium}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Auto-detect</option>
              <option value="mobile money">Mobile Money (MTN)</option>
              <option value="orange money">Orange Money</option>
            </select>
          </div>

          {/* Recipient Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Recipient Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Recipient Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              For sending payment receipt
            </p>
          </div>

          {/* User ID */}
          <div>
            <label htmlFor="userId" className="block text-sm font-medium mb-1">
              Your User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.userId ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.userId && (
              <p className="mt-1 text-xs text-red-600">{errors.userId}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Your system's user identifier
            </p>
          </div>

          {/* External ID */}
          <div className="md:col-span-2">
            <label
              htmlFor="externalId"
              className="block text-sm font-medium mb-1"
            >
              External Reference ID
            </label>
            <input
              type="text"
              id="externalId"
              name="externalId"
              value={formData.externalId}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.externalId ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.externalId && (
              <p className="mt-1 text-xs text-red-600">{errors.externalId}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              For transaction reconciliation
            </p>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Payout Description
            </label>
            <textarea
              id="message"
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">Reason for the payout</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
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
                Processing Payout...
              </>
            ) : (
              <>
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854 4.146a.5.5 0 00-.708 0L8 11.293 1.854 5.146a.5.5 0 10-.708.708l6.5 6.5a.5.5 0 00.708 0l7.5-7.5a.5.5 0 000-.708z" />
                </svg>
                Initiate Payout
              </>
            )}
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={resetForm}
            disabled={isSubmitting}
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 3a5 5 0 100 10A5 5 0 008 3zM8 1a7 7 0 110 14A7 7 0 018 1z" />
              <path d="M7.5 4.5a.5.5 0 011 0v4a.5.5 0 01-1 0v-4z" />
            </svg>
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default FapshiPayout;
