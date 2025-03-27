import React, { useState } from 'react';
import {
  FiUsers,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiPieChart,
  FiActivity,
  FiDownload,
  FiCalendar,
  FiMail,
  FiPhone,
  FiUser
} from 'react-icons/fi';
import EmployeePaymentCard from './Payment';

const EmployerBillingDashboard = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sprintStatus, setSprintStatus] = useState({
    1: 'pending',
    2: 'pending',
    3: 'pending'
  });

  // Sample data
  const employees = [
    {
      id: 1,
      name: 'John Mbeng',
      email: 'john.mbeng@example.com',
      phone: '+237 6 1234 5678',
      position: 'Frontend Developer',
      rate: 250000, // FCFA per sprint
      sprints: [
        { id: 1, status: 'pending', dueDate: '2023-06-15' },
        { id: 2, status: 'pending', dueDate: '2023-06-30' },
        { id: 3, status: 'pending', dueDate: '2023-07-15' }
      ],
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Sarah Nkeng',
      email: 'sarah.nkeng@example.com',
      phone: '+237 6 2345 6789',
      position: 'UX Designer',
      rate: 200000, // FCFA per sprint
      sprints: [
        { id: 1, status: 'completed', dueDate: '2023-06-15' },
        { id: 2, status: 'pending', dueDate: '2023-06-30' },
        { id: 3, status: 'pending', dueDate: '2023-07-15' }
      ],
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 3,
      name: 'David Tchamba',
      email: 'david.tchamba@example.com',
      phone: '+237 6 3456 7890',
      position: 'Backend Developer',
      rate: 300000, // FCFA per sprint
      sprints: [
        { id: 1, status: 'completed', dueDate: '2023-06-15' },
        { id: 2, status: 'completed', dueDate: '2023-06-30' },
        { id: 3, status: 'pending', dueDate: '2023-07-15' }
      ],
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    }
  ];

  const transactions = [
    {
      id: 1,
      employee: 'Sarah Nkeng',
      amount: 200000,
      date: '2023-06-16',
      sprint: 1,
      status: 'completed',
      method: 'Bank Transfer'
    },
    {
      id: 2,
      employee: 'David Tchamba',
      amount: 300000,
      date: '2023-06-16',
      sprint: 1,
      status: 'completed',
      method: 'Mobile Money'
    },
    {
      id: 3,
      employee: 'David Tchamba',
      amount: 300000,
      date: '2023-07-01',
      sprint: 2,
      status: 'completed',
      method: 'Mobile Money'
    }
  ];

  const handleSprintCompletion = (employeeId, sprintId) => {
    // In a real app, this would update the backend
    console.log(`Marking sprint ${sprintId} as completed for employee ${employeeId}`);
    
    // Update the UI state
    const updatedEmployees = employees.map(emp => {
      if (emp.id === employeeId) {
        const updatedSprints = emp.sprints.map(sprint => {
          if (sprint.id === sprintId) {
            return { ...sprint, status: 'completed' };
          }
          return sprint;
        });
        return { ...emp, sprints: updatedSprints };
      }
      return emp;
    });

    // In a real app, you would set state with updatedEmployees
  };

  const totalPaid = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const upcomingPayments = employees.reduce((sum, emp) => {
    return sum + emp.sprints.filter(s => s.status === 'pending').length * emp.rate;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Billing Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <FiDownload /> Export Report
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Employees</p>
                <p className="text-2xl font-semibold text-gray-900">{employees.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FiUsers size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Paid</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalPaid.toLocaleString()} FCFA
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FiDollarSign size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming Payments</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {upcomingPayments.toLocaleString()} FCFA
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <FiClock size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('employees')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'employees' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FiUsers /> Employees
                </div>
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'transactions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FiActivity /> Transactions
                </div>
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'analytics' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FiPieChart /> Analytics
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'employees' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Employee Sprint Payments</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Position
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rate (FCFA/sprint)
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sprint 1
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sprint 2
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sprint 3
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {employees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src={employee.avatar} alt={employee.name} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                <div className="text-sm text-gray-500">{employee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {employee.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {employee.rate.toLocaleString()}
                          </td>
                          {employee.sprints.map((sprint) => (
                            <td key={sprint.id} className="px-6 py-4 whitespace-nowrap">
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                sprint.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {sprint.status === 'completed' ? (
                                  <>
                                    <FiCheckCircle className="mr-1" /> Paid
                                  </>
                                ) : (
                                  <>
                                    <FiClock className="mr-1" /> Pending
                                  </>
                                )}
                              </div>
                            </td>
                          ))}
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setSelectedEmployee(employee)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              View
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <FiMail />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sprint
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount (FCFA)
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment Method
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(tx.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {tx.employee}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Sprint {tx.sprint}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {tx.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {tx.method}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              tx.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Payment Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Distribution</h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                      <p className="text-gray-500">[Payment Chart Placeholder]</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Timeline</h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                      <p className="text-gray-500">[Timeline Chart Placeholder]</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setSelectedEmployee(null)}></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4 mb-6">
                        <img
                          className="h-20 w-20 rounded-full object-cover border border-gray-200"
                          src={selectedEmployee.avatar}
                          alt={`${selectedEmployee.name} avatar`}
                        />
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{selectedEmployee.name}</h3>
                          <p className="text-gray-600 text-lg">{selectedEmployee.position}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedEmployee(null)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <FiMail className="mt-1 mr-2 text-gray-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <p className="text-gray-900">{selectedEmployee.email}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <FiPhone className="mt-1 mr-2 text-gray-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Phone</p>
                              <p className="text-gray-900">{selectedEmployee.phone}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Payment Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rate per sprint</span>
                            <span className="font-medium">{selectedEmployee.rate.toLocaleString()} FCFA</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Completed sprints</span>
                            <span className="font-medium">
                              {selectedEmployee.sprints.filter(s => s.status === 'completed').length}/3
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Sprint Payments</h4>
                      <div className="space-y-4">
                        {selectedEmployee.sprints.map((sprint) => (
                          <div key={sprint.id} className="flex justify-between items-center border-b border-gray-200 pb-3">
                            <div>
                              <p className="font-medium">Sprint {sprint.id}</p>
                              <p className="text-sm text-gray-500">Due: {new Date(sprint.dueDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              {sprint.status === 'completed' ? (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                  <FiCheckCircle className="mr-1" /> Paid
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleSprintCompletion(selectedEmployee.id, sprint.id)}
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                >
                                  Mark as Completed
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setSelectedEmployee(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <EmployeePaymentCard/>
    </div>
  );
};

export default EmployerBillingDashboard;