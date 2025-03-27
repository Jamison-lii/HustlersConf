// Login.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Briefcase, Building, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    taxId: "",
    userType: "job_seeker", // 'job_seeker' or 'employer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/");
  

  useEffect(() => {
    // Capture redirect path from state if coming from job click
    if (location.state?.from) {
      setRedirectPath(location.state.from);
    }
  }, [location]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.userType === "employer" && !formData.taxId.trim()) {
      newErrors.taxId = "Tax ID is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log("Login data:", formData);
        // Store authentication state
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userType", formData.userType);
        
        // Redirect to either stored path or dashboard
        navigate(redirectPath, { replace: true });
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Login as:
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: "job_seeker" }))}
                className={`flex-1 p-2 rounded-lg border ${
                  formData.userType === "job_seeker" 
                    ? "border-blue-500 bg-blue-50" 
                    : "border-gray-300"
                }`}
              >
                <Briefcase className="inline mr-2 h-4 w-4" />
                Job Seeker
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: "employer" }))}
                className={`flex-1 p-2 rounded-lg border ${
                  formData.userType === "employer" 
                    ? "border-blue-500 bg-blue-50" 
                    : "border-gray-300"
                }`}
              >
                <Building className="inline mr-2 h-4 w-4" />
                Employer
              </button>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Mail className="inline mr-2 h-4 w-4" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Lock className="inline mr-2 h-4 w-4" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Tax ID Field for Employers */}
          {formData.userType === "employer" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Building className="inline mr-2 h-4 w-4" />
                Tax ID (UID)
              </label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Tax ID"
              />
              {errors.taxId && <p className="text-red-500 text-sm mt-1">{errors.taxId}</p>}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors`}
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link 
            onClick={()=>{navigate("/auth")}}
            to="/auth" 
            className="text-blue-600 hover:underline font-medium"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;