import React, { useState } from 'react';
import { 
  FiBriefcase, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiClock,
  FiDownload,
  FiCheckCircle,
  FiXCircle,
  FiFilter,
  FiSearch,
  FiInfo
} from 'react-icons/fi';

const EmployerNotifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const notifications = [
    {
      id: 1,
      type: 'application',
      jobTitle: 'Frontend Developer',
      applicant: {
        name: 'John Mbeng',
        email: 'john.mbeng@example.com',
        phone: '+237 6 1234 5678',
        resume: '/resumes/john-mbeng.pdf',
        appliedDate: '2023-05-15T10:30:00',
        status: 'pending'
      },
      read: false,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'application',
      jobTitle: 'UX Designer',
      applicant: {
        name: 'Sarah Nkeng',
        email: 'sarah.nkeng@example.com',
        phone: '+237 6 2345 6789',
        resume: '/resumes/sarah-nkeng.pdf',
        appliedDate: '2023-05-14T14:45:00',
        status: 'shortlisted'
      },
      read: true,
      timestamp: '1 day ago'
    },
    {
      id: 3,
      type: 'application',
      jobTitle: 'Backend Engineer',
      applicant: {
        name: 'David Tchamba',
        email: 'david.tchamba@example.com',
        phone: '+237 6 3456 7890',
        resume: '/resumes/david-tchamba.pdf',
        appliedDate: '2023-05-13T09:15:00',
        status: 'rejected'
      },
      read: true,
      timestamp: '2 days ago'
    },
    {
      id: 4,
      type: 'system',
      title: 'Your job post has been approved',
      message: 'The "Product Manager" position is now live on the platform',
      read: false,
      timestamp: '3 days ago'
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.type === 'application' 
      ? notification.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        notification.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
      : notification.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'applications' && notification.type === 'application') ||
                      (activeTab === 'system' && notification.type === 'system');
    
    return matchesSearch && matchesTab;
  });

  const handleStatusChange = (id, newStatus) => {
    // In a real app, you would update this in your backend
    console.log(`Changing status of application ${id} to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-600">Manage your job applications and system alerts</p>
        </div>

        {/* Filters and Search */}
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'all' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'applications' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'system' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
            >
              System
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-200">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`px-6 py-4 ${!notification.read ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-50 transition-colors`}
              >
                {notification.type === 'application' ? (
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                          <FiBriefcase />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            New application for <span className="text-blue-600">{notification.jobTitle}</span>
                          </h3>
                          <p className="text-sm text-gray-500">{notification.timestamp}</p>
                        </div>
                      </div>

                      <div className="mt-4 pl-11">
                        <div className="flex items-center gap-4 mb-2">
                          <FiUser className="text-gray-400" />
                          <span className="text-gray-900">{notification.applicant.name}</span>
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                          <FiMail className="text-gray-400" />
                          <span className="text-gray-900">{notification.applicant.email}</span>
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                          <FiPhone className="text-gray-400" />
                          <span className="text-gray-900">{notification.applicant.phone}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <FiClock className="text-gray-400" />
                          <span className="text-gray-900">
                            Applied on {new Date(notification.applicant.appliedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-3">
                      <a 
                        href={notification.applicant.resume} 
                        download
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <FiDownload /> Download CV
                      </a>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(notification.id, 'shortlisted')}
                          className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${notification.applicant.status === 'shortlisted' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                        >
                          <FiCheckCircle /> Shortlist
                        </button>
                        <button
                          onClick={() => handleStatusChange(notification.id, 'rejected')}
                          className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${notification.applicant.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                        >
                          <FiXCircle /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-gray-100 text-gray-600">
                      <FiInfo />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <p className="text-gray-600">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-1">{notification.timestamp}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 mb-4">
                <FiFilter size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No notifications found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerNotifications;