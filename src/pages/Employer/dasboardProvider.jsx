import { BarChart, LineChart, PieChart, AreaChart, Bar, Line, Pie, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BriefcaseIcon, CurrencyDollarIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const data = [
  { month: 'Jan', jobs: 12, amount: 4000 },
  { month: 'Feb', jobs: 18, amount: 5200 },
  { month: 'Mar', jobs: 15, amount: 4500 },
  { month: 'Apr', jobs: 22, amount: 6800 },
];

const projectSpending = [
  { name: 'Web Development', value: 12400 },
  { name: 'Mobile App', value: 8500 },
  { name: 'Marketing', value: 6100 },
  { name: 'Design', value: 4300 },
];

const dailySpending = [
  { day: 'Mon', amount: 1200 },
  { day: 'Tue', amount: 800 },
  { day: 'Wed', amount: 1500 },
  { day: 'Thu', amount: 900 },
  { day: 'Fri', amount: 1800 },
];

const projectProgress = [
  { project: 'E-commerce Site', progress: 75 },
  { project: 'Mobile App', progress: 60 },
  { project: 'Branding', progress: 90 },
  { project: 'SEO', progress: 45 },
];

export default function DashboardProvider() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">Project Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<BriefcaseIcon className="h-8 w-8 text-white"/>}
            title="Ongoing Projects"
            value="8"
            color="bg-blue-500"
          />
          <StatCard 
            icon={<ChartBarIcon className="h-8 w-8 text-white"/>}
            title="Completed Jobs"
            value="42"
            color="bg-indigo-500"
          />
          <StatCard 
            icon={<CurrencyDollarIcon className="h-8 w-8 text-white"/>}
            title="Total Spent"
            value="$32,400"
            color="bg-blue-600"
          />
          <StatCard 
            icon={<UserGroupIcon className="h-8 w-8 text-white"/>}
            title="Active Freelancers"
            value="15"
            color="bg-indigo-600"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Monthly Project Completion">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#bfdbfe" />
                <XAxis dataKey="month" stroke="#1e3a8a" />
                <YAxis stroke="#1e3a8a" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="jobs" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Project Spending Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectSpending}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#3b82f6"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Daily Spending Trend">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailySpending}>
                <CartesianGrid strokeDasharray="3 3" stroke="#bfdbfe" />
                <XAxis dataKey="day" stroke="#1e3a8a" />
                <YAxis stroke="#1e3a8a" />
                <Tooltip />
                <Area type="monotone" dataKey="amount" fill="#60a5fa" stroke="#3b82f6" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Project Progress">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#bfdbfe" />
                <XAxis dataKey="project" stroke="#1e3a8a" />
                <YAxis stroke="#1e3a8a" />
                <Tooltip />
                <Bar dataKey="progress" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
    <div className={`p-4 rounded-lg ${color}`}>{icon}</div>
    <div>
      <p className="text-blue-900 font-semibold text-lg">{value}</p>
      <p className="text-blue-600 text-sm">{title}</p>
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="text-xl font-semibold text-blue-900 mb-4">{title}</h3>
    {children}
  </div>
);