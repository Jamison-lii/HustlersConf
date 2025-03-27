import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobListings from './pages/JobListings';
import EmployersDirectory from './pages/People';
import JobDetailsPage from './pages/JobDetails';
import EmployerDetails from './pages/EmployerDetails';
import JobApplicationForm from './pages/JobApplicationsForm';
import NotificationsPage from './pages/NotificationsPage';
import FapshiInitiatePay from './pages/Pay';
import JobPostingForm from './pages/Employer/Post';
import JobListing from './pages/Employer/JobListing';
import SignUp from './pages/Employer/SignUp';
import FreelancerPlatform from './pages/Employer/Frelencers';
import SignInPage from './pages/Employer/SignInPage';
import HomeEmployer from './pages/Employer/Home';
import NavbarEmp from './pages/Employer/Navbar';
import EmployerNotificationsPage from './pages/Employer/NotificationsEmp';
import EmployerProfilePage from './pages/Employer/Pofile';
import HelpPage from './pages/Employer/Help';
import JobSeekerProfilePage from './pages/SeekerProfile';
import EmployerNotifications from './pages/Employer/NotificationsEmp';
import JobSeekerDashboard from './pages/dashboardSeeker';
import DashboardProvider from './pages/Employer/dasboardProvider';
import Ai from './pages/Chat';
import EmployerBillingDashboard from './pages/Employer/Billing';
import Login from './pages/Employer/SignInPage';
import ManagePay from './pages/Employer/ManagePay';

const LayoutWithNavbar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const LayoutWithNavbarEmp = () => {
  return (
    <>
      <NavbarEmp />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes with Main Navbar */}
          <Route element={<LayoutWithNavbar />}>
            <Route index element={<Home />} />
            <Route path='hiring' element={<JobListings />} />
            <Route path='employers' element={<EmployersDirectory />} />
            <Route path='jobdetails/:id' element={<JobDetailsPage />} />
            <Route path='employers/:id' element={<EmployerDetails />} />
            <Route path='apply' element={<JobApplicationForm />} />
            <Route path='notifications' element={<NotificationsPage />} />
            <Route path='pay' element={<FapshiInitiatePay />} />
            <Route path='seeker-profile' element={<JobSeekerProfilePage />} />
            <Route path='jobseekerdashboard' element={<JobSeekerDashboard />} />
            <Route path="chat" element={<Ai />} />
          </Route>

          {/* Auth Routes (No Navbar) */}
          <Route path='auth' element={<SignUp />} />
          <Route path='signin' element={<Login />} />
          

          {/* Employer Routes with Employer Navbar */}
          <Route element={<LayoutWithNavbarEmp />}>
            <Route path="post" element={<JobPostingForm />} />
            <Route path="jobs" element={<JobListing />} />
            <Route path="frelencer" element={<FreelancerPlatform />} />
            <Route path="home" element={<HomeEmployer />} />
            <Route path="employers-notification" element={<EmployerNotifications/>}/>
            <Route path="employers-profile" element={<EmployerProfilePage />} />
            <Route path="support" element={<HelpPage />} />
            <Route path="dashboardProvider" element={<DashboardProvider />} />
            <Route path="chat1" element={<Ai />} />
            <Route path="billing" element={<EmployerBillingDashboard />} />
            <Route path="managepay" element={<ManagePay />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;