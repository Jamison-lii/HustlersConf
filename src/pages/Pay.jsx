import React, { useState } from 'react';
import axios from 'axios';

const FapshiInitiatePay = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);

  const handleQuickPay = async () => {
    setIsSubmitting(true);
    setPaymentLink(null);
    
    try {
      const payload = {
        amount: 500, // Default amount
        email: 'default@example.com',
        redirectUrl: 'https://yourwebsite.com/return',
        userId: 'defaultUser123',
        externalId: `txn_${Date.now()}`,
        message: 'Quick Payment',
      };

      const response = await axios.post(
        'https://live.fapshi.com/initiate-pay',
        payload,
        {
          headers: {
            'apiuser': '303fa035-04c7-4e44-a649-860478e77dd5',
            'apikey': 'FAK_df3ad5b9aad1de68ff868f50c966d7ec',
            'Content-Type': 'application/json'
          }
        }
      );

      setPaymentLink({
        url: response.data.link,
        transId: response.data.transId,
        statusCode: response.status
      });
    } catch (error) {
      const apiError = error.response?.data || {
        message: error.message || 'Failed to generate payment link',
        statusCode: error.response?.status || 500
      };
      setPaymentLink({ error: true, message: apiError.message, statusCode: apiError.statusCode });
      console.error('API Error:', apiError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Quick Payment</h2>

      {paymentLink && (
        <div className={`alert alert-${paymentLink.error ? 'danger' : 'success'}`}>
          {paymentLink.error ? (
            <>
              <div className="fw-bold">Error!</div>
              <div>{paymentLink.message}</div>
            </>
          ) : (
            <>
              <div className="fw-bold">Payment Link Generated!</div>
              <div>
                <strong>Transaction ID:</strong> {paymentLink.transId}
              </div>
              <div>
                <strong>Link:</strong>{' '}
                <a href={paymentLink.url} target="_blank" rel="noopener noreferrer">
                  {paymentLink.url}
                </a>
              </div>
            </>
          )}
        </div>
      )}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={handleQuickPay}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Generating...' : 'Generate Payment Link'}
      </button>
    </div>
  );
};

export default FapshiInitiatePay;
