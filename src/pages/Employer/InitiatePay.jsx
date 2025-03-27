import React, { useState } from "react";
import axios from "axios";

const FapshiInitiatePay = () => {
  const [formData, setFormData] = useState({
    amount: "",
    email: "",
    redirectUrl: "",
    userId: "",
    externalId: "",
    message: "",
    cardOnly: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (!Number.isInteger(Number(formData.amount))) {
      newErrors.amount = "Amount must be an integer";
    } else if (Number(formData.amount) < 100) {
      newErrors.amount = "Amount cannot be less than 100 XAF";
    }

    // Optional field validation
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

    if (
      formData.redirectUrl &&
      !/^https?:\/\/.+\..+/.test(formData.redirectUrl)
    ) {
      newErrors.redirectUrl = "Invalid URL format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentLink(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare payload according to API requirements
      const payload = {
        amount: Number(formData.amount),
        ...(formData.email && { email: formData.email }),
        ...(formData.redirectUrl && { redirectUrl: formData.redirectUrl }),
        ...(formData.userId && { userId: formData.userId }),
        ...(formData.externalId && { externalId: formData.externalId }),
        ...(formData.message && { message: formData.message }),
        ...(formData.cardOnly && { cardOnly: formData.cardOnly }),
      };

      const response = await axios.post(
        " https://live.fapshi.com/initiate-pay",
        payload,
        {
          headers: {
            apiuser: "303fa035-04c7-4e44-a649-860478e77dd5",
            apikey: "FAK_df3ad5b9aad1de68ff868f50c966d7ec",
            "Content-Type": "application/json",
          },
        }
      );

      setPaymentLink({
        url: response.data.link,
        transId: response.data.transId,
        statusCode: response.status,
      });
    } catch (error) {
      const apiError = error.response?.data || {
        message: error.message || "Failed to generate payment link",
        statusCode: error.response?.status || 500,
      };

      setPaymentLink({
        error: true,
        message: apiError.message,
        statusCode: apiError.statusCode,
      });

      console.error("API Error:", apiError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Generate Payment Link</h2>

      {/* Result Display */}
      {paymentLink && (
        <div
          className={`p-4 mb-6 rounded-md ${
            paymentLink.error
              ? "bg-red-100 border-l-4 border-red-400 text-red-700"
              : "bg-green-100 border-l-4 border-green-400 text-green-800"
          }`}
        >
          {paymentLink.error ? (
            <>
              <div className="font-semibold">Error!</div>
              <div>{paymentLink.message}</div>
              {paymentLink.statusCode && (
                <div className="mt-2">
                  <strong>Status Code:</strong> {paymentLink.statusCode}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="font-semibold">Payment Link Generated!</div>
              <div className="mt-2">
                <strong>Transaction ID:</strong> {paymentLink.transId}
              </div>
              <div className="mt-2 break-words">
                <strong>Link:</strong>{" "}
                <a
                  href={paymentLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {paymentLink.url}
                </a>
              </div>
              <div className="mt-3">
                <button
                  className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 text-sm"
                  onClick={() => navigator.clipboard.writeText(paymentLink.url)}
                >
                  Copy Link
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white rounded-md shadow p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block font-medium mb-1">
              Amount (XAF) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
              id="amount"
              name="amount"
              min="100"
              step="1"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            {errors.amount && (
              <p className="text-red-600 text-sm mt-1">{errors.amount}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">
              Minimum amount: 100 XAF
            </p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Customer Email
            </label>
            <input
              type="email"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">
              Pre-fills email on payment page
            </p>
          </div>

          {/* Redirect URL */}
          <div className="md:col-span-2">
            <label htmlFor="redirectUrl" className="block font-medium mb-1">
              Redirect URL
            </label>
            <input
              type="url"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.redirectUrl ? "border-red-500" : "border-gray-300"
              }`}
              id="redirectUrl"
              name="redirectUrl"
              placeholder="https://yourwebsite.com/return"
              value={formData.redirectUrl}
              onChange={handleChange}
            />
            {errors.redirectUrl && (
              <p className="text-red-600 text-sm mt-1">{errors.redirectUrl}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">
              Where users return after payment
            </p>
          </div>

          {/* User ID */}
          <div>
            <label htmlFor="userId" className="block font-medium mb-1">
              User ID
            </label>
            <input
              type="text"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.userId ? "border-red-500" : "border-gray-300"
              }`}
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
            />
            {errors.userId && (
              <p className="text-red-600 text-sm mt-1">{errors.userId}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">
              Your system's user identifier
            </p>
          </div>

          {/* External ID */}
          <div>
            <label htmlFor="externalId" className="block font-medium mb-1">
              External Reference ID
            </label>
            <input
              type="text"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.externalId ? "border-red-500" : "border-gray-300"
              }`}
              id="externalId"
              name="externalId"
              value={formData.externalId}
              onChange={handleChange}
            />
            {errors.externalId && (
              <p className="text-red-600 text-sm mt-1">{errors.externalId}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">
              For transaction reconciliation
            </p>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label htmlFor="message" className="block font-medium mb-1">
              Payment Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="message"
              name="message"
              rows="2"
              value={formData.message}
              onChange={handleChange}
            />
            <p className="text-gray-500 text-sm mt-1">
              Shown to user during payment
            </p>
          </div>

          {/* Card Only */}
          <div className="md:col-span-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                id="cardOnly"
                name="cardOnly"
                checked={formData.cardOnly}
                onChange={handleChange}
              />
              <span className="ml-2 font-medium">International Cards Only</span>
            </label>
            <p className="text-gray-500 text-sm mt-1">
              Restrict to international payment options (must be enabled in your
              account)
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                  />
                </svg>
                Generating Link...
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
                Generate Payment Link
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FapshiInitiatePay;
