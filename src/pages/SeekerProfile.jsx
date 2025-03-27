import { useState } from 'react';
import { FiUser, FiBriefcase, FiMapPin, FiPhone, FiMail, FiEdit, FiGlobe, FiLinkedin, FiGithub, FiFileText } from 'react-icons/fi';

const JobSeekerProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Arrey Mbong",
    profession: "Frontend Developer",
    location: "Douala, Cameroon",
    phone: "+237 6XX XXX XXX",
    email: "arrey.mbong@example.com",
    portfolio: "www.arreymbong.dev",
    education: [
      {
        institution: "University of Buea",
        degree: "BSc Computer Science",
        year: "2015-2019"
      }
    ],
    experience: [
      {
        position: "Frontend Developer",
        company: "TechCorp Cameroon",
        duration: "2020-Present",
        description: "Developing user interfaces with React and implementing new features"
      },
      {
        position: "Junior Developer",
        company: "Digital Solutions Ltd",
        duration: "2019-2020",
        description: "Assisted in web development projects and bug fixes"
      }
    ],
    skills: ["React", "JavaScript", "HTML/CSS", "Redux", "Git"],
    bio: "Passionate frontend developer with 4+ years of experience building responsive web applications. Looking for opportunities to contribute to innovative projects in Cameroon's growing tech ecosystem.",
    resume: null,
    socialMedia: {
      linkedin: "arrey-mbong",
      github: "arreymbong"
    }
  });

  const [activeTab, setActiveTab] = useState('experience');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field, index, key, value) => {
    const updatedArray = [...profileData[field]];
    updatedArray[index][key] = value;
    setProfileData(prev => ({
      ...prev,
      [field]: updatedArray
    }));
  };

  const handleAddItem = (field, newItem) => {
    setProfileData(prev => ({
      ...prev,
      [field]: [...prev[field], newItem]
    }));
  };

  const handleRemoveItem = (field, index) => {
    const updatedArray = profileData[field].filter((_, i) => i !== index);
    setProfileData(prev => ({
      ...prev,
      [field]: updatedArray
    }));
  };

  const handleFileChange = (e) => {
    setProfileData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // In a real app, you would save to your backend here
    console.log('Profile updated:', profileData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
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
                        <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold">
                          {profileData.fullName.charAt(0)}
                        </div>
                        <button
                          type="button"
                          className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                        >
                          <FiEdit className="text-lg" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                      <input
                        type="text"
                        id="profession"
                        name="profession"
                        value={profileData.profession}
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
                      <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">Portfolio Website</label>
                      <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        value={profileData.portfolio}
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
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'socialMedia',
                              value: { ...profileData.socialMedia, linkedin: e.target.value }
                            }
                          })}
                          className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="username"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiGithub className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="github"
                          name="github"
                          value={profileData.socialMedia.github}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'socialMedia',
                              value: { ...profileData.socialMedia, github: e.target.value }
                            }
                          })}
                          className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="username"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">Resume/CV</label>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleFileChange}
                        className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        accept=".pdf,.doc,.docx"
                      />
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={profileData.bio}
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
                    <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold">
                      {profileData.fullName.charAt(0)}
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <h2 className="text-xl font-bold text-gray-900">{profileData.fullName}</h2>
                    <p className="text-gray-600">{profileData.profession}</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <FiMapPin className="text-gray-400" />
                      <p className="text-gray-700">{profileData.location}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiPhone className="text-gray-400" />
                      <p className="text-gray-700">{profileData.phone}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiMail className="text-gray-400" />
                      <p className="text-gray-700">{profileData.email}</p>
                    </div>

                    {profileData.portfolio && (
                      <div className="flex items-center gap-3">
                        <FiGlobe className="text-gray-400" />
                        <a 
                          href={`https://${profileData.portfolio}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {profileData.portfolio}
                        </a>
                      </div>
                    )}

                    {profileData.socialMedia.linkedin && (
                      <div className="flex items-center gap-3">
                        <FiLinkedin className="text-gray-400" />
                        <a 
                          href={`https://linkedin.com/in/${profileData.socialMedia.linkedin}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {profileData.socialMedia.linkedin}
                        </a>
                      </div>
                    )}

                    {profileData.socialMedia.github && (
                      <div className="flex items-center gap-3">
                        <FiGithub className="text-gray-400" />
                        <a 
                          href={`https://github.com/${profileData.socialMedia.github}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {profileData.socialMedia.github}
                        </a>
                      </div>
                    )}

                    {profileData.resume && (
                      <div className="flex items-center gap-3">
                        <FiFileText className="text-gray-400" />
                        <a 
                          href={URL.createObjectURL(profileData.resume)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Resume
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">About Me</h3>
                    <p className="text-gray-700">{profileData.bio}</p>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Experience/Education Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('experience')}
                    className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'experience' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Work Experience
                  </button>
                  <button
                    onClick={() => setActiveTab('education')}
                    className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'education' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Education
                  </button>
                </nav>
              </div>

              {isEditing ? (
                <div className="mt-6">
                  {activeTab === 'experience' ? (
                    <div className="space-y-6">
                      {profileData.experience.map((exp, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                              <input
                                type="text"
                                value={exp.position}
                                onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
                                className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                                className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                              <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)}
                                className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                              rows={3}
                              value={exp.description}
                              onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                              className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem('experience', index)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove Experience
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddItem('experience', {
                          position: '',
                          company: '',
                          duration: '',
                          description: ''
                        })}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Experience
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {profileData.education.map((edu, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                                className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                                className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                              <input
                                type="text"
                                value={edu.year}
                                onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                                className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem('education', index)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove Education
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddItem('education', {
                          institution: '',
                          degree: '',
                          year: ''
                        })}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Education
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-6">
                  {activeTab === 'experience' ? (
                    <div className="space-y-6">
                      {profileData.experience.length === 0 ? (
                        <p className="text-gray-500">No work experience added</p>
                      ) : (
                        profileData.experience.map((exp, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                            <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                            <p className="text-gray-600">{exp.company} • {exp.duration}</p>
                            <p className="text-gray-700 mt-2">{exp.description}</p>
                          </div>
                        ))
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {profileData.education.length === 0 ? (
                        <p className="text-gray-500">No education information added</p>
                      ) : (
                        profileData.education.map((edu, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                            <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                            <p className="text-gray-600">{edu.institution} • {edu.year}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobSeekerProfilePage;