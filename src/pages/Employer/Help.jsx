import { 
    FiHeadphones, 
    FiMail, 
    FiMapPin, 
    FiMessageSquare, 
    FiInfo, 
    FiUser, 
    FiBriefcase, 
    FiFileText,
    FiSearch,
    FiLock  // Added missing import
  } from 'react-icons/fi';

const HelpPage = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button in the top right corner and fill in your details. Verify your email address to complete registration.",
      category: "Account",
      icon: <FiUser className="text-blue-600" />
    },
    {
      question: "How can I update my profile information?",
      answer: "Go to 'My Profile' from the dashboard and click the 'Edit' button. Remember to save your changes.",
      category: "Profile",
      icon: <FiUser className="text-blue-600" />
    },
    {
      question: "How do I apply for jobs?",
      answer: "Find a job listing you're interested in, click 'View Details', then click 'Apply Now' and follow the instructions.",
      category: "Applications",
      icon: <FiBriefcase className="text-green-600" />
    },
    {
      question: "Can I save job listings?",
      answer: "Yes! Click the bookmark icon on any job listing to save it to your 'Saved Jobs' section.",
      category: "Job Search",
      icon: <FiFileText className="text-purple-600" />
    }
  ];

  const contactMethods = [
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "Email Support",
      details: "support@jobportal.cm",
      action: "mailto:support@jobportal.cm"
    },
    {
      icon: <FiHeadphones className="w-6 h-6" />,
      title: "Phone Support",
      details: "+237 6 1234 5678",
      action: "tel:+237612345678"
    },
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: "Office Visit",
      details: "Bonanjo, Douala, Cameroon",
      action: "https://maps.google.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <FiInfo className="text-blue-600" /> How Can We Help You?
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions or contact our support team
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1.5 bg-blue-600 text-white px-6 py-2.5 rounded-md hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <FiMessageSquare className="text-green-600" /> Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{faq.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                    <span className="inline-block mt-3 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      {faq.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <FiHeadphones className="text-purple-600" /> Contact Support
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
              >
                <div className="mb-4 text-blue-600">{method.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600">{method.details}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Help Guides */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <FiFileText className="text-orange-600" /> Helpful Guides
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Creating a Strong Profile", icon: <FiUser /> },
              { title: "Job Application Process", icon: <FiBriefcase /> },
              { title: "Using Search Filters", icon: <FiSearch /> },
              { title: "Account Security Tips", icon: <FiLock /> }
            ].map((guide, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
              >
                <div className="mb-4 text-blue-600 text-2xl">{guide.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{guide.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;