/*import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BriefcaseIcon, CalendarIcon, ChartBarIcon, CurrencyDollarIcon, AcademicCapIcon } from '@heroicons/react/24/outline';*/
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BriefcaseIcon, CalendarIcon, ChartBarIcon, CurrencyDollarIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const mockData = {
  applications: [
    { id: 1, company: 'Tech Corp', position: 'Senior Developer', status: 'Interview', appliedDate: '2024-03-01' },
    { id: 2, company: 'Design Studio', position: 'UX Lead', status: 'Applied', appliedDate: '2024-03-05' },
    { id: 3, company: 'StartUpX', position: 'Full-stack Engineer', status: 'Offer', appliedDate: '2024-03-10' },
  ],
  progress: [
    { status: 'Applied', count: 15 },
    { status: 'Interview', count: 6 },
    { status: 'Offer', count: 2 },
    { status: 'Rejected', count: 7 },
  ],
  skills: [
    { skill: 'React', demand: 45, proficiency: 80 },
    { skill: 'Node.js', demand: 35, proficiency: 70 },
    { skill: 'TypeScript', demand: 40, proficiency: 65 },
  ],
  trends: [
    { week: 'W1', applications: 3, interviews: 1 },
    { week: 'W2', applications: 5, interviews: 2 },
    { week: 'W3', applications: 7, interviews: 3 },
  ],
  projectEarnings: [
    { project: 'E-commerce Platform', earnings: 8500 },
    { project: 'Mobile App Development', earnings: 12000 },
    { project: 'Consulting Work', earnings: 6500 },
    { project: 'UI/UX Overhaul', earnings: 9200 },
  ],
  
  dailyEarnings: [
    { date: '2024-03-01', earnings: 420 },
    { date: '2024-03-05', earnings: 750 },
    { date: '2024-03-10', earnings: 920 },
    { date: '2024-03-15', earnings: 680 },
  ],
  
  monthlyEarnings: [
    { month: 'Jan', earnings: 3200 },
    { month: 'Feb', earnings: 4500 },
    { month: 'Mar', earnings: 6100 },
    { month: 'Apr', earnings: 5300 },
  ]
};

export default function JobSeekerDashboard() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Job Search Dashboard</h1>
          <p className="text-blue-600 mt-2">Welcome back, Sarah! Here's your search progress</p>
        </header>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            icon={<BriefcaseIcon className="h-8 w-8"/>}
            title="Active Applications"
            value="8"
            color="bg-blue-100"
            trend="+2 from last week"
          />
          <MetricCard 
            icon={<CalendarIcon className="h-8 w-8"/>}
            title="Upcoming Interviews"
            value="3"
            color="bg-green-100"
            trend="1 this week"
          />
          <MetricCard 
            icon={<ChartBarIcon className="h-8 w-8"/>}
            title="Offer Rate"
            value="15%"
            color="bg-purple-100"
            trend="3% increase"
          />
          <MetricCard 
            icon={<AcademicCapIcon className="h-8 w-8"/>}
            title="Skill Coverage"
            value="82%"
            color="bg-orange-100"
            trend="New skills added"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


          {/* Project Earnings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Project Earnings</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.projectEarnings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="project" stroke="#1e3a8a" />
                  <YAxis stroke="#1e3a8a" />
                  <Tooltip />
                  <Bar 
                    dataKey="earnings" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                    name="Earnings"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Earnings Trend */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Daily Earnings</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData.dailyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#1e3a8a" />
                  <YAxis stroke="#1e3a8a" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#3b82f6" 
                    fill="#bfdbfe" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Earnings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Monthly Earnings</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.monthlyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#1e3a8a" />
                  <YAxis stroke="#1e3a8a" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Earnings Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Earnings Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.projectEarnings}
                    dataKey="earnings"
                    nameKey="project"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#3b82f6"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>




          {/* Application Progress */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Application Pipeline</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.progress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="status" stroke="#1e3a8a" />
                  <YAxis stroke="#1e3a8a" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skill Analysis */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Skill Market Fit</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.skills}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="skill" stroke="#1e3a8a" />
                  <YAxis stroke="#1e3a8a" />
                  <Tooltip />
                  <Line type="monotone" dataKey="demand" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="proficiency" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Recent Applications</h2>
            <div className="space-y-4">
              {mockData.applications.map(app => (
                <div key={app.id} className="p-4 border border-blue-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-blue-900">{app.position}</h3>
                      <p className="text-blue-600 text-sm">{app.company}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      app.status === 'Offer' ? 'bg-green-100 text-green-800' :
                      app.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="text-blue-400 text-sm mt-2">Applied: {app.appliedDate}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Application Trends */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Weekly Activity</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" stroke="#1e3a8a" />
                  <YAxis stroke="#1e3a8a" />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="interviews" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MetricCard = ({ icon, title, value, color, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      <div>
        <p className="text-blue-600 text-sm">{title}</p>
        <p className="text-2xl font-bold text-blue-900">{value}</p>
        <span className="text-xs text-blue-400">{trend}</span>
      </div>
    </div>
  </div>
);


// Add this to the MetricCard component
const formatCurrency = (value) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(value);


// Update Tooltip in all charts to use:
<Tooltip 
  formatter={(value) => formatCurrency(value)} 
  labelStyle={{ color: '#1e3a8a' }}
/>