
import { useState, useRef, useEffect } from 'react';
import {
  Briefcase, Bell, UserCircle, Plus, ChevronDown,
  Menu, X, Home, Users, BarChart2, Settings,
  CreditCard, HelpCircle, LogOut,MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate= useNavigate()

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '/dashboardProvider', icon: <Home size={18} />, label: 'Dashboard' },
    { href: '/jobs', icon: <Briefcase size={18} />, label: 'Jobs' },
    { href: '/frelencer', icon: <Users size={18} />, label: 'Candidates' },
    { href: '/chat1', icon: <MessageSquare size={18} />, label: 'Chat' },
  ];

  const profileLinks = [
    { href: '/employers-profile', icon: <UserCircle size={16} />, label: 'Profile' },
    { href: '/settings', icon: <Settings size={16} />, label: 'Settings' },
    { href: '/billing', icon: <CreditCard size={16} />, label: 'Billing' },
    { href: '/managepay', icon: <CreditCard size={16} />, label: 'Payment' },
    { href: '/support', icon: <HelpCircle size={16} />, label: 'Help' },
    { href: '/signin', icon: <LogOut size={16} />, label: 'Sign Out' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/home" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Briefcase size={18} />
              </div>
              <span className="text-lg font-semibold text-gray-900 hidden sm:block">HireHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <button onClick={()=>{navigate('/post')}} className="hidden md:flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              <Plus size={16} />
              <span>Post Job</span>
              
            </button>

            <button onClick={()=>{navigate("employers-notification")}} className="p-2 text-gray-500 hover:text-gray-700 relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-1 rounded-full p-1 hover:bg-gray-100"
              >
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <UserCircle size={18} className="text-gray-600" />
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {profileMenuOpen && (

             
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {profileLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 md:hidden"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pb-3 pt-2">
          <div className="space-y-1 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-3 border-t border-gray-200 pt-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Plus size={16} />
              <span>Post New Job</span>
            </button>
          </div>
          <div className="mt-3 border-t border-gray-200 pt-3">
            <div className="space-y-1 px-2">
              {profileLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;