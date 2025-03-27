import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiMapPin, 
  FiBriefcase, 
  FiUsers, 
  FiMail, 
  FiPhone, 
  FiGlobe, 
  FiClock, 
  FiDollarSign 
} from 'react-icons/fi';
import { HiStar, HiOutlineHeart } from 'react-icons/hi';

const EmployerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployerData = () => {
      try {
        // Get employer data from localStorage (stored by EmployersDirectory)
        const storedEmployer = localStorage.getItem('selectedEmployer');
        
        if (!storedEmployer) {
          throw new Error("Employer data not found.");
        }

        const parsedEmployer = JSON.parse(storedEmployer);
        
        // Verify if the ID matches (optional, but good practice)
        if (parsedEmployer.id !== parseInt(id)) {
          throw new Error("Employer ID mismatch.");
        }

        setEmployer(parsedEmployer);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employer details...</p>
        </div>
      </div>
    );
  }

  if (error || !employer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Employer Not Found</h2>
          <p className="text-gray-600 mb-4">{error || "The employer details could not be loaded."}</p>
          <button
            onClick={() => navigate('/employers')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Employers Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 ">
        <div className="absolute inset-0  "></div>
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 text-center px-4">
            {employer.company}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
                <img
                  className="h-32 w-32 rounded-full border-4 border-white shadow-md object-cover"
                  src={employer.logo}
                  alt={`${employer.company} logo`}
                />
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{employer.company}</h1>
                    <p className="text-lg text-gray-600">{employer.name}</p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 p-2">
                    <HiOutlineHeart className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="mr-1" />
                    <span>{employer.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiBriefcase className="mr-1" />
                    <span>{employer.industry}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiUsers className="mr-1" />
                    <span>{employer.employees} employees</span>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <HiStar 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(employer.rating || 0) ? "text-yellow-400" : "text-gray-300"}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => {
                      document.getElementById('job-openings').scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View Open Positions ({employer.jobOpenings})
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                    Follow Company
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* About Section */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About {employer.company}</h2>
                <p className="text-gray-700 whitespace-pre-line">{employer.description}</p>
              </section>
              
              {/* Open Positions Section */}
              <section id="job-openings" className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Open Positions ({employer.jobOpenings})</h2>
                </div>
                
                <div className="space-y-4">
                  {employer.jobOpenings > 0 ? (
                    [...Array(Math.min(3, employer.jobOpenings))].map((_, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{employer.industry} Professional</h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Full-time
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <FiMapPin className="mr-1" />
                            {employer.location.split(',')[0]}
                          </span>
                          <span className="flex items-center">
                            <FiDollarSign className="mr-1" />
                            Competitive Salary
                          </span>
                          <span className="flex items-center">
                            <FiClock className="mr-1" />
                            Posted recently
                          </span>
                        </div>
                        <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Details & Apply
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No current openings - check back later</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <FiMail className="mt-1 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a 
                        href={`mailto:${employer.contact.email}`} 
                        className="text-blue-600 hover:underline"
                      >
                        {employer.contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiPhone className="mt-1 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a 
                        href={`tel:${employer.contact.phone.replace(/\s/g, '')}`} 
                        className="text-gray-900 hover:text-blue-600"
                      >
                        {employer.contact.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiGlobe className="mt-1 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a 
                        href={`https://${employer.contact.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {employer.contact.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Company Details Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Company Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Founded</span>
                    <span className="font-medium">{employer.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company Size</span>
                    <span className="font-medium">{employer.employees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry</span>
                    <span className="font-medium">{employer.industry}</span>
                  </div>
                </div>
              </div>
              
              {/* Back Button */}
              <button
                onClick={() => navigate('/employers')}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                ← Back to Employers Directory
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDetails;