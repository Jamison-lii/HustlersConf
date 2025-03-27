import { useState, useEffect } from 'react';
import { FiSearch, FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiBookmark, FiFilter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [salaryFilter, setSalaryFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const mockJobs = [
          {
            id: 1,
            title: "Frontend Developer",
            company: "TechCorp",
            logo: "https://via.placeholder.com/50",
            location: "Douala",
            salary: "FCFA 90,000 - FCFA 120,000",
            type: "Full-time",
            posted: "2 days ago",
            description: "We're looking for a skilled frontend developer with React experience to join our growing team.",
            skills: ["React", "JavaScript", "CSS", "HTML"],
            responsibilities: ["Develop UI components", "Write clean code", "Collaborate with team"],
            requirements: ["2+ years experience", "React knowledge", "JavaScript proficiency"],
            benefits: ["Health insurance", "Flexible hours", "Remote options"]
          },
          {
            id: 2,
            title: "UX Designer",
            company: "DesignHub",
            logo: "https://via.placeholder.com/50",
            location: "Remote",
            salary: "FCFA 80,000 - FCFA 100,000",
            type: "Full-time",
            posted: "1 week ago",
            description: "Join our design team to create beautiful, user-centered interfaces for our products.",
            skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
            responsibilities: ["Design interfaces", "Create prototypes", "Conduct user research"],
            requirements: ["Design portfolio", "Figma experience", "UX principles"],
            benefits: ["Creative freedom", "Professional development", "Flexible schedule"]
          },
          // ... other job objects with the same structure
        ];
        
        setJobs(mockJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (locationFilter === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
      (salaryFilter === '' || job.salary.includes(salaryFilter)) &&
      (jobTypeFilter === '' || job.type.toLowerCase().includes(jobTypeFilter.toLowerCase())))
  });

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setSalaryFilter('');
    setJobTypeFilter('');
  };

  const handleJobClick = (job) => {
    localStorage.setItem('selectedJob', JSON.stringify(job));
    navigate(`/jobdetails/${job.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Dream Job in Cameroon</h1>
          <p className="mt-2 text-gray-600">Browse through thousands of full-time and part-time jobs across Cameroon</p>
        </div>
      </header>

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
                placeholder="Job title, keywords, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="City (Douala, Yaoundé, Buea, etc.)"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
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
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={jobTypeFilter}
                  onChange={(e) => setJobTypeFilter(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Salary</label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={salaryFilter}
                  onChange={(e) => setSalaryFilter(e.target.value)}
                >
                  <option value="">Any Salary</option>
                  <option value="FCFA 50,000">FCFA 50,000+</option>
                  <option value="FCFA 80,000">FCFA 80,000+</option>
                  <option value="FCFA 100,000">FCFA 100,000+</option>
                  <option value="FCFA 120,000">FCFA 120,000+</option>
                  <option value="FCFA 150,000">FCFA 150,000+</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available in Cameroon
            </h2>
            <div className="text-sm text-gray-500">
              Sorted by: <span className="font-medium">Most Recent</span>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
                  onClick={() => handleJobClick(job)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src={job.logo}
                          alt={`${job.company} logo`}
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                            <span className="inline-flex items-center">
                              <FiMapPin className="mr-1" />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center">
                              <FiDollarSign className="mr-1" />
                              {job.salary}
                            </span>
                            <span className="inline-flex items-center">
                              <FiClock className="mr-1" />
                              {job.posted}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <FiBriefcase className="mr-1" />
                              {job.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button 
                        className="text-gray-400 hover:text-gray-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle bookmark functionality
                        }}
                      >
                        <FiBookmark className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-gray-600">{job.description}</p>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJobClick(job);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
        
        {filteredJobs.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 rounded-b-lg sm:px-6">
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(8, filteredJobs.length)}</span> of{' '}
                <span className="font-medium">{filteredJobs.length}</span> results
              </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
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

export default JobListings;