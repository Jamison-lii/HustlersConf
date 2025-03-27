import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiBookmark, FiShare2, FiArrowLeft } from 'react-icons/fi';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    // Try to get job from localStorage first
    const savedJob = localStorage.getItem('selectedJob');
    if (savedJob) {
      setJob(JSON.parse(savedJob));
      setLoading(false);
    } else {
      // Fallback: fetch job from API if not in localStorage
      fetchJobDetails();
    }
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      // In a real app, you would fetch from your backend API
      // const response = await fetch(`/api/jobs/${id}`);
      // const data = await response.json();
      
      // Mock data for demonstration
      const mockJobs = [
        {
          id: 1,
          title: "Frontend Developer",
          company: "TechCorp Cameroon",
          logo: "https://via.placeholder.com/100",
          location: "Douala, Cameroon",
          salary: "FCFA 120,000 - FCFA 150,000",
          type: "Full-time",
          posted: "2 days ago",
          description: "We're looking for a skilled Frontend Developer with React experience to join our growing team in Douala. You'll be responsible for building user interfaces and implementing features for our web applications.",
          responsibilities: [
            "Develop new user-facing features using React.js",
            "Build reusable components and front-end libraries",
            "Translate designs and wireframes into high-quality code",
            "Optimize components for maximum performance",
            "Collaborate with back-end developers and web designers",
            "Participate in code reviews and team meetings"
          ],
          requirements: [
            "2+ years of experience with React.js",
            "Proficiency in JavaScript, HTML5, and CSS3",
            "Experience with Redux or Context API",
            "Familiarity with RESTful APIs",
            "Knowledge of modern authorization mechanisms",
            "Familiarity with Git version control"
          ],
          benefits: [
            "Competitive salary package",
            "Health insurance coverage",
            "Flexible working hours",
            "Professional development opportunities",
            "Modern office space in Douala",
            "Team building activities"
          ],
          skills: ["React", "JavaScript", "CSS", "HTML", "Redux", "Git"],
          applicationDeadline: "2023-12-15",
          applicants: 24,
          companyDescription: "TechCorp Cameroon is a leading software development company specializing in building innovative solutions for businesses across Africa. With offices in Douala and Yaoundé, we're committed to digital transformation on the continent."
        },
        // Add other jobs with the same structure as needed
      ];

      const foundJob = mockJobs.find(job => job.id === parseInt(id));
      if (foundJob) {
        setJob(foundJob);
      } else {
        navigate('/jobs', { replace: true });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job details:", error);
      navigate('/jobs', { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or may have been removed.</p>
          <button 
            onClick={() => navigate('/jobs')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiArrowLeft className="mr-2" />
            Back to Jobs
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Job Details */}
          <div className="lg:w-2/3">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                    <p className="text-lg text-gray-600">{job.company}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600">
                    <FiBookmark className="text-xl" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600">
                    <FiShare2 className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Job Meta */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <FiBriefcase className="text-gray-400" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-gray-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiDollarSign className="text-gray-400" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="text-gray-400" />
                  <span>Posted {job.posted}</span>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
              <p className="text-gray-700 mb-6">{job.description}</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Skills Required</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Application Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Apply for this position</h2>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Application deadline:</span> {new Date(job.applicationDeadline).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">{job.applicants}</span> {job.applicants === 1 ? 'applicant' : 'applicants'}
                </p>
              </div>

              <button onClick={()=>{navigate("/apply")}} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md mb-4">
                Apply Now
              </button>

              <button className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-md">
                Save for Later
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">About {job.company}</h3>
                <p className="text-gray-600">
                  {job.companyDescription || 'No company description available.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetailsPage;