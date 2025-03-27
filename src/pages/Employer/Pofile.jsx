import { useState } from 'react';
import { FiUser, FiBriefcase, FiMapPin, FiPhone, FiMail, FiEdit, FiGlobe, FiLinkedin, FiTwitter } from 'react-icons/fi';

const EmployerProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    companyName: "TechCorp Cameroon",
    industry: "Information Technology",
    location: "Douala, Cameroon",
    address: "Bonanjo, Rue de la Joie",
    phone: "+237 6XX XXX XXX",
    email: "contact@techcorp-cm.com",
    website: "www.techcorp-cm.com",
    foundedYear: "2018",
    employees: "50-100",
    description: "Leading software development company specializing in building innovative solutions for businesses across Cameroon and Central Africa. We're committed to digital transformation and nurturing local tech talent.",
    logo: "https://via.placeholder.com/150",
    socialMedia: {
      linkedin: "techcorp-cameroon",
      twitter: "@techcorp_cm"
    }
  });

  const [jobListings, setJobListings] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      type: "Full-time",
      location: "Douala",
      posted: "2023-06-10",
      applicants: 24
    },
    {
      id: 2,
      title: "UX Designer",
      type: "Contract",
      location: "Remote",
      posted: "2023-06-05",
      applicants: 15
    },
    {
      id: 3,
      title: "Backend Engineer",
      type: "Full-time",
      location: "Yaoundé",
      posted: "2023-05-28",
      applicants: 32
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // In a real app, you would save to your backend here
    console.log('Profile updated:', profileData);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <FiEdit className="text-gray-500" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="relative">
                        <img
                          src={profileData.logo}
                          alt="Company logo"
                          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
                        />
                        <button
                          type="button"
                          className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                        >
                          <FiEdit className="text-lg" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={profileData.companyName}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <input
                        type="text"
                        id="industry"
                        name="industry"
                        value={profileData.industry}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={profileData.website}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700 mb-1">Founded Year</label>
                      <input
                        type="text"
                        id="foundedYear"
                        name="foundedYear"
                        value={profileData.foundedYear}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
                      <input
                        type="text"
                        id="employees"
                        name="employees"
                        value={profileData.employees}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLinkedin className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="linkedin"
                          name="linkedin"
                          value={profileData.socialMedia.linkedin}
                          onChange={handleSocialMediaChange}
                          className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="company-name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiTwitter className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="twitter"
                          name="twitter"
                          value={profileData.socialMedia.twitter}
                          onChange={handleSocialMediaChange}
                          className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="@company"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={profileData.description}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-center">
                    <img
                      src={profileData.logo}
                      alt="Company logo"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
                    />
                  </div>

                  <div className="text-center mt-4">
                    <h2 className="text-xl font-bold text-gray-900">{profileData.companyName}</h2>
                    <p className="text-gray-600">{profileData.industry}</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <FiMapPin className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-gray-700">{profileData.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiMapPin className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="text-gray-700">{profileData.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiPhone className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-gray-700">{profileData.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiMail className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-700">{profileData.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiGlobe className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <a 
                          href={`https://${profileData.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {profileData.website}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiBriefcase className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Founded</p>
                        <p className="text-gray-700">{profileData.foundedYear}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiUser className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Employees</p>
                        <p className="text-gray-700">{profileData.employees}</p>
                      </div>
                    </div>

                    {profileData.socialMedia.linkedin && (
                      <div className="flex items-center gap-3">
                        <FiLinkedin className="text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">LinkedIn</p>
                          <a 
                            href={`https://linkedin.com/company/${profileData.socialMedia.linkedin}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {profileData.socialMedia.linkedin}
                          </a>
                        </div>
                      </div>
                    )}

                    {profileData.socialMedia.twitter && (
                      <div className="flex items-center gap-3">
                        <FiTwitter className="text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Twitter</p>
                          <a 
                            href={`https://twitter.com/${profileData.socialMedia.twitter.replace('@', '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {profileData.socialMedia.twitter}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">About Us</h3>
                    <p className="text-gray-700">{profileData.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Job Listings Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Active Job Listings</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
                  Post New Job
                </button>
              </div>

              {jobListings.length === 0 ? (
                <div className="text-center py-12">
                  <FiBriefcase className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mt-4">No active job listings</h3>
                  <p className="text-gray-600 mt-1">Post your first job to start attracting talent</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobListings.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span>{job.type}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Posted {formatDate(job.posted)}</p>
                          <p className="text-blue-600 font-medium">{job.applicants} applicants</p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-md">
                          View Applicants
                        </button>
                        <button className="text-sm bg-white border border-gray-300 text-gray-700 font-medium py-1 px-3 rounded-md hover:bg-gray-50">
                          Edit
                        </button>
                        <button className="text-sm bg-white border border-gray-300 text-gray-700 font-medium py-1 px-3 rounded-md hover:bg-gray-50">
                          Close
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerProfilePage;