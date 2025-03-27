import { useState } from 'react';
import { CheckCircle, ArrowDownCircle, Clock, Wallet, BadgeDollarSign, ExternalLink } from 'lucide-react';

const PaymentNotificationPage = () => {
  const [payoutStatus, setPayoutStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Sample data - replace with actual data from API
  const paymentDetails = {
    jobTitle: "Website Redesign Project",
    client: "Tech Innovators Ltd",
    amount: 245000,
    currency: "XAF",
    date: "2023-08-20",
    paymentMethod: "Mobile Money",
    transactionId: "TXID_7890432",
    status: "pending", // 'pending' or 'completed'
  };

  const handlePayout = async () => {
    setIsProcessing(true);
    setPayoutStatus('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add actual payout logic here
      setPayoutStatus('success');
    } catch (error) {
      setPayoutStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Wallet className="h-10 w-10 text-blue-600" />
            Payment Received!
          </h1>
          <p className="text-xl text-gray-600">You've earned money for your hard work</p>
        </div>

        {/* Main Payment Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100">
          {/* Status Indicator */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-full ${paymentDetails.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
              {paymentDetails.status === 'completed' ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <Clock className="h-6 w-6 text-yellow-600" />
              )}
            </div>
            <span className={`text-lg font-medium ${paymentDetails.status === 'completed' ? 'text-green-700' : 'text-yellow-700'}`}>
              {paymentDetails.status === 'completed' ? 'Payment Completed' : 'Payment Pending'}
            </span>
          </div>

          {/* Payment Details */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Job Title</label>
                <div className="flex items-center gap-3">
                  <BadgeDollarSign className="h-5 w-5 text-blue-600" />
                  <span className="text-xl font-semibold text-gray-900">{paymentDetails.jobTitle}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Client</label>
                <div className="text-lg font-medium text-gray-900">{paymentDetails.client}</div>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Amount</label>
                  <div className="text-3xl font-bold text-gray-900">
                    {paymentDetails.amount.toLocaleString()} {paymentDetails.currency}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Payment Date</label>
                  <div className="text-lg font-medium text-gray-900">
                    {new Date(paymentDetails.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Payout Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Transfer to Account</h3>
                  <p className="text-sm text-gray-500">Money will be transferred to your registered mobile money account</p>
                </div>
                
                <button
                  onClick={handlePayout}
                  disabled={isProcessing || paymentDetails.status === 'completed'}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${
                    paymentDetails.status === 'completed'
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : isProcessing
                      ? 'bg-blue-100 text-blue-700 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } transition-colors`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : paymentDetails.status === 'completed' ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Amount Transferred
                    </>
                  ) : (
                    <>
                      <ArrowDownCircle className="h-5 w-5" />
                      Transfer Now
                    </>
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {payoutStatus === 'success' && (
                <div className="p-4 bg-green-50 rounded-lg flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-700">Payment successfully transferred to your account!</span>
                </div>
              )}

              {payoutStatus === 'error' && (
                <div className="p-4 bg-red-50 rounded-lg flex items-center gap-3">
                  <Clock className="h-5 w-5 text-red-600" />
                  <span className="text-red-700">Transfer failed. Please try again or contact support.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <ExternalLink className="h-6 w-6 text-blue-600" />
            Transaction Details
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID:</span>
              <span className="font-medium text-gray-900">{paymentDetails.transactionId}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-medium text-gray-900">{paymentDetails.paymentMethod}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Service Fee:</span>
              <span className="font-medium text-gray-900">0 {paymentDetails.currency}</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions (Sample) */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">UI/UX Design Project</div>
                    <div className="text-sm text-gray-500">Completed: 15 Aug 2023</div>
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    +{(245000 - item*15000).toLocaleString()} XAF
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentNotificationPage;