import { useState } from 'react';
import { FiCheckCircle, FiClock, FiBell, FiFilter } from 'react-icons/fi';

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('approved');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for approved jobs
  const approvedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp Cameroon",
      location: "Douala",
      salary: "FCFA 120,000 - FCFA 150,000",
      approvedDate: "2023-06-15",
      applicationDate: "2023-06-01",
      status: "approved",
      interviewDate: "2023-06-25"
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignHub Africa",
      location: "Remote",
      salary: "FCFA 100,000 - FCFA 130,000",
      approvedDate: "2023-06-10",
      applicationDate: "2023-05-28",
      status: "approved",
      interviewDate: "2023-06-20"
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "DataSystems Ltd",
      location: "Yaoundé",
      salary: "FCFA 140,000 - FCFA 180,000",
      approvedDate: "2023-06-05",
      applicationDate: "2023-05-20",
      status: "hired",
      hireDate: "2023-06-30"
    }
  ];

  // Filter jobs based on status
  const filteredJobs = approvedJobs.filter(job => {
    if (statusFilter === 'all') return true;
    return job.status === statusFilter;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">Your job application updates</p>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <FiFilter className="text-gray-500" />
              <span>Filter</span>
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mt-6">
            <button
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'approved' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('approved')}
            >
              <FiCheckCircle />
              Approved Applications
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('pending')}
            >
              <FiClock />
              Pending Applications
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      {showFilters && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-white border-b border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="hired">Hired</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <FiBell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mt-4">No notifications</h3>
            <p className="text-gray-600 mt-1">You don't have any approved applications yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.company} • {job.location}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {job.status === 'approved' ? 'Approved' : 'Hired'}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="font-medium">{job.salary}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Applied On</p>
                      <p className="font-medium">{formatDate(job.applicationDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {job.status === 'approved' ? 'Interview Date' : 'Hire Date'}
                      </p>
                      <p className="font-medium">
                        {formatDate(job.status === 'approved' ? job.interviewDate : job.hireDate)}
                      </p>
                    </div>
                  </div>

                  {job.status === 'approved' && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
                        Confirm Interview
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50">
                        Reschedule
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default NotificationsPage;