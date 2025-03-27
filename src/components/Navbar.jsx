import { useState, useRef, useEffect } from 'react';
import { 
  Briefcase, 
  Bell, 
  UserCircle, 
  MessageSquare, 
  Users, 
  Home,
  ChevronDown,
  Menu, 
  X,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavbarEmp = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  console.log('user',user);

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
    { href: '/', icon: <Home size={18} />, label: 'Find Jobs' },
    { href: '/hiring', icon: <Briefcase size={18} />, label: 'Job Listings' },
    { href: '/employers', icon: <Users size={18} />, label: 'Employers' },
    { href: '/chat', icon: <MessageSquare size={18} />, label: 'Chat' },
    { href: '/jobseekerdashboard', icon: <Briefcase size={18} />, label: 'Dashboard' },
    { href: '/notifications', icon: <Bell size={18} />, label: 'Notifications' }
  ];

  const profileLinks = [
    { href: '/seeker-profile', icon: <UserCircle size={16} />, label: 'Profile' },
    { href: '/signin', icon: <UserCircle size={16} />, label: 'Sign out' },
    { href: '/home', icon: <UserCircle size={16} />, label: 'employer?' },
    { href: '/paymentnotificationPage', icon: <Bell size={18} />, label: 'Payments' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4b4efc] text-white">
                <Briefcase size={18} />
              </div>
              <span className="text-lg font-semibold text-gray-900 hidden sm:block">
                <span className="text-[#4b4efc]">Hire</span>Hub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#4b4efc]"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {(user)?<></>:
            <button 
              onClick={() => navigate("/auth")} 
              className="hidden md:flex items-center gap-1 rounded-lg bg-[#4b4efc] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3a3dc7]"
            >
              <Plus size={16} />
              <span>Sign Up</span>
            </button>
}
            {/* Profile Dropdown */}
            {(user)?
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
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#4b4efc]"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>:<></>}

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
                className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#4b4efc]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        {  
          (user) ?<></>:
          <div className="mt-3 border-t border-gray-200 pt-3">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/auth");
              }} 
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#4b4efc] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a3dc7]"
            >
              <Plus size={16} />
              <span>Sign Up</span>
            </button>
          </div>}
          <div className="mt-3 border-t border-gray-200 pt-3">
            <div className="space-y-1 px-2">
              
              {profileLinks.map((link) => (
                (user)?
               
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#4b4efc]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>:<></>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavbarEmp;