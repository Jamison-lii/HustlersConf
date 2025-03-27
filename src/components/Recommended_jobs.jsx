import React from "react";
import { FiBriefcase, FiMapPin, FiClock, FiHeart } from "react-icons/fi";

const Recommended_jobs = () => {
  // Job categories data
  const categories = [
    { name: "Technology", openings: 24 },
    { name: "Healthcare", openings: 18 },
    { name: "Finance", openings: 12 },
    { name: "Education", openings: 9 },
    { name: "Construction", openings: 7 },
    { name: "Marketing", openings: 15 }
  ];

  // Recommended jobs data
  const recommendedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      type: "Full-time",
      salary: "FCFA 120,000 - 150,000",
      location: "Douala, Cameroon",
      department: "Software Development",
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "Healthcare Assistant",
      type: "Part-time",
      salary: "FCFA 80,000 - 100,000",
      location: "Yaoundé, Cameroon",
      department: "Healthcare",
      posted: "1 week ago"
    },
    {
      id: 3,
      title: "Financial Analyst",
      type: "Full-time",
      salary: "FCFA 150,000 - 180,000",
      location: "Buea, Cameroon",
      department: "Finance",
      posted: "3 days ago"
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Recommended Jobs</h2>
            <p className="text-gray-600 mt-2">Explore opportunities that match your profile</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full">
              Latest Jobs
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-full hover:bg-gray-50">
              Premium Jobs
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-xl font-bold mb-6">Job Categories</h3>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <FiBriefcase className="text-blue-600" />
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-gray-500">{category.openings} openings</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Jobs Section */}
          <div className="lg:w-2/3">
            <div className="space-y-4">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <FiBriefcase className="text-blue-600 text-xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium text-gray-900">{job.title}</h3>
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span>{job.type}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <FiClock className="text-gray-400" />
                              {job.posted}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <FiHeart className="text-xl" />
                      </button>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Salary</p>
                        <p className="font-medium text-blue-600">{job.salary}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="flex items-center gap-1">
                          <FiMapPin className="text-gray-400" />
                          {job.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="font-medium">{job.department}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommended_jobs;