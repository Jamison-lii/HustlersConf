import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBriefcase, FiMapPin, FiUsers, FiFilter } from 'react-icons/fi';
import { HiOutlineHeart } from 'react-icons/hi';

const EmployersDirectory = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        // Simulated API call with Cameroonian employers data
        const mockEmployers = [
          {
            id: 1,
            name: "Ngatchou Tchamba",
            company: "Tech Innovators Cameroon",
            logo: "https://via.placeholder.com/100/4F46E5/FFFFFF?text=TIC",
            location: "Douala, Bonanjo",
            industry: "Technology",
            employees: "50-100",
            contact: {
              email: "contact@techinnovators.cm",
              phone: "+237 6 77 88 99 00",
              website: "www.techinnovators.cm"
            },
            description: "Leading tech company in Cameroon specializing in software development, AI solutions, and digital transformation for African businesses.",
            jobOpenings: 8,
            founded: 2015,
            rating: 4.5
          },
          {
            id: 2,
            name: "Aminatou Njoya",
            company: "AgroTech Solutions",
            logo: "https://via.placeholder.com/100/10B981/FFFFFF?text=ATS",
            location: "Yaoundé, Bastos",
            industry: "Agriculture",
            employees: "100-200",
            contact: {
              email: "info@agrotech.cm",
              phone: "+237 6 55 44 33 22",
              website: "www.agrotech.cm"
            },
            description: "Modernizing Cameroon's agriculture sector with technology-driven solutions for smallholder farmers and agribusinesses.",
            jobOpenings: 5,
            founded: 2012,
            rating: 4.2
          }
        ];
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setEmployers(mockEmployers);
      } catch (error) {
        console.error("Error fetching employers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  const filteredEmployers = employers.filter(employer => {
    const matchesSearch = employer.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         employer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === '' || 
                           employer.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesIndustry = industryFilter === '' || 
                           employer.industry.toLowerCase().includes(industryFilter.toLowerCase());
    
    return matchesSearch && matchesLocation && matchesIndustry;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setIndustryFilter('');
  };

  const handleEmployerClick = (employer) => {
    // Store employer data in localStorage (persists until cleared)
    localStorage.setItem('selectedEmployer', JSON.stringify(employer));
    // Navigate to employer details page with ID
    navigate(`/employers/${employer.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Cameroon Employers Directory</h1>
          <p className="mt-2 text-gray-600">Discover top employers and companies hiring across Cameroon</p>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search employers or companies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FiFilter className="mr-2" />
              Filters
            </button>
            
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Clear All
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-gray-400" />
                  </div>
                  <input
                    id="location"
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="City or region"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select
                  id="industry"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                >
                  <option value="">All Industries</option>
                  <option value="Technology">Technology</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Sports & Education">Sports & Education</option>
                  <option value="Renewable Energy">Renewable Energy</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Employers List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              {filteredEmployers.length} {filteredEmployers.length === 1 ? 'Employer' : 'Employers'} Listed
            </h2>
            <div className="text-sm text-gray-500">
              Showing companies across Cameroon
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : filteredEmployers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployers.map((employer) => (
                <div 
                  key={employer.id} 
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
                  onClick={() => handleEmployerClick(employer)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          className="h-16 w-16 rounded-full object-cover border border-gray-200"
                          src={employer.logo}
                          alt={`${employer.company} logo`}
                          loading="lazy"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{employer.company}</h3>
                          <p className="text-gray-600">{employer.name}</p>
                        </div>
                      </div>
                      <button 
                        className="text-gray-400 hover:text-red-500 p-2"
                        aria-label="Save employer"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click when clicking heart
                          // Add save functionality here
                        }}
                      >
                        <HiOutlineHeart className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-600 line-clamp-2">{employer.description}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <FiMapPin className="mr-1" />
                        {employer.location.split(',')[0]}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <FiBriefcase className="mr-1" />
                        {employer.industry}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <FiUsers className="mr-1" />
                        {employer.employees}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                        {employer.jobOpenings} {employer.jobOpenings === 1 ? 'opening' : 'openings'}
                      </span>
                      <span className="text-sm text-gray-500">
                        Since {employer.founded}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No employers found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredEmployers.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 rounded-b-lg sm:px-6">
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredEmployers.length}</span> of{' '}
                <span className="font-medium">{filteredEmployers.length}</span> results
              </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <button 
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployersDirectory;