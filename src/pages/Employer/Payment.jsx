import React, { useState } from 'react';
import axios from 'axios';

const EmployeePaymentCard = ({ employee }) => {
  const [paymentLink, setPaymentLink] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePayNow = async () => {
    setPaymentLink(null);
    setIsSubmitting(true);
    
    try {
      // Fetch user details from localStorage
      const user = JSON.parse(localStorage.getItem('user')) || {};
      
      // Prepare payload for payment API
      const payload = {
        amount: employee.rate,
        email: user.email || employee.email,
        userId: user.id || employee.id,
        externalId: `${employee.id}-sprint2`,
        message: `Payment for Sprint 2 - ${employee.name}`,
        cardOnly: false,
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
      
      setPaymentLink(response.data.link);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to generate payment link. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-4 w-80 bg-white">
      <div className="flex items-center gap-4">
        <img src={employee?.avatar} alt={employee?.name} className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold">{employee?.name}</h3>
          <p className="text-sm text-gray-500">{employee?.position}</p>
          <p className="text-sm font-medium">Rate: {employee?.rate} XAF</p>
        </div>
      </div>
      <button 
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        onClick={handlePayNow} 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Pay Now for Sprint 2'}
      </button>
      {paymentLink && (
        <div className="mt-2 text-sm text-green-600">
          <a href={paymentLink} target="_blank" rel="noopener noreferrer">
            Click here to complete payment
          </a>
        </div>
      )}
    </div>
  );
};

export default EmployeePaymentCard;
