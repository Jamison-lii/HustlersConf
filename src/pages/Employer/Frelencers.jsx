
import { Search, Star, MapPin, Briefcase, Clock, Filter, ChevronDown, Award, Check, Zap, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Navbar from './Navbar';
import Footer from '../../components/Footer';

const FreelancerPlatform = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [savedFreelancers, setSavedFreelancers] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const freelancers = [
        {
            id: 6,
            name: "Emma Chen",
            role: "Product Manager",
            rate: "95FCFA-FCFA135/hr",
            location: "Remote (Buea)",
            skills: ["Agile", "Roadmapping", "User Stories", "JIRA"],
            availability: "Available in 2 days",
            verified: false,
            rating: 4.6,
            projects: 57,
            portfolio: "emmachenpm.com"
        }
    ];

    const filteredFreelancers = freelancers.filter(freelancer => {
        const matchesSearch =
            freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            freelancer.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesFilter =
            activeFilter === 'all' ||
            (activeFilter === 'available' && freelancer.availability === 'Available now') ||
            (activeFilter === 'verified' && freelancer.verified) ||
            (activeFilter === 'top' && freelancer.rating >= 4.8);

        return matchesSearch && matchesFilter;
    });

    const toggleSavedFreelancer = (freelancerId) => {
        setSavedFreelancers(prev =>
            prev.includes(freelancerId) ? prev.filter(id => id !== freelancerId) : [...prev, freelancerId]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 overflow-auto">
       

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
                <div className="relative max-w-2xl mx-auto border  rounded-lg mb-10 border-gray-600 shadow-sm ">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-12 pr-4 py-4 border border-transparent rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 shadow-sm"
                        placeholder="Search by skill, role, or name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filters and Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex flex-wrap gap-2">
                        {[
                            { id: 'all', label: 'All' },
                            { id: 'available', label: 'Available Now' },
                            { id: 'verified', label: 'Verified' },
                            { id: 'top', label: 'Top Rated' }
                        ].map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === filter.id
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center text-sm text-gray-600">
                            <span>Sort by:</span>
                            <button className="ml-2 flex items-center text-gray-800 font-medium">
                                Relevance <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                        </div>

                        <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                            >
                                Grid
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                            >
                                List
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {filteredFreelancers.length} {filteredFreelancers.length === 1 ? 'freelancer' : 'freelancers'} found
                    </h2>
                    {searchQuery && (
                        <p className="text-sm text-gray-500 mt-1">
                            Showing results for "{searchQuery}"
                        </p>
                    )}
                </div>

                {/* Freelancer Cards */}
                {filteredFreelancers.length > 0 ? (
                    viewMode === 'grid' ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredFreelancers.map((freelancer) => (
                                <div
                                    key={freelancer.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                                >
                                    <div className="p-6">
                                        {/* Header with image and save button */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    {freelancer.verified && (
                                                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 flex items-center justify-center">
                                                            <Check className="h-3 w-3 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{freelancer.name}</h3>
                                                    <p className="text-gray-600 text-sm">{freelancer.role}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => toggleSavedFreelancer(freelancer.id)}
                                                className={`p-1.5 rounded-full ${savedFreelancers.includes(freelancer.id)
                                                    ? 'text-yellow-400 bg-yellow-50'
                                                    : 'text-gray-300 hover:text-gray-400 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <Star className={`h-5 w-5 ${savedFreelancers.includes(freelancer.id) ? 'fill-current' : ''
                                                    }`} />
                                            </button>
                                        </div>

                                        {/* Badge */}
                                        {freelancer.badge && (
                                            <div className="mb-3">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800">
                                                    <Sparkles className="h-3 w-3 mr-1" />
                                                    {freelancer.badge}
                                                </span>
                                            </div>
                                        )}

                                        {/* Rate and availability */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-lg font-semibold text-gray-900">{freelancer.rate}</span>
                                            <div className={`flex items-center text-sm px-2.5 py-1 rounded-full ${freelancer.availability === 'Available now'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                <Zap className="h-3.5 w-3.5 mr-1" />
                                                {freelancer.availability}
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="flex items-center text-sm text-gray-600 mb-4">
                                            <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
                                            <span>{freelancer.location}</span>
                                        </div>

                                        {/* Rating and projects */}
                                        <div className="flex items-center text-sm text-gray-600 mb-4">
                                            <div className="flex items-center mr-4">
                                                <Award className="h-4 w-4 mr-1.5 text-yellow-500" />
                                                <span className="font-medium text-gray-900">{freelancer.rating}</span>
                                                <span className="mx-1">/</span>
                                                <span>5.0</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-900">{freelancer.projects}</span>
                                                <span> projects</span>
                                            </div>
                                        </div>

                                        {/* Skills */}

                                        <div className="mb-4">
                                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                                Skills
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {freelancer.skills.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Portfolio link */}
                                        {freelancer.portfolio && (
                                            <div className="text-sm">
                                                <a
                                                    href={`https://${freelancer.portfolio}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                                >
                                                    View portfolio →
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer with action buttons */}
                                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center">
                                        <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                                            View profile
                                        </button>
                                        <button className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors">
                                            Contact
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFreelancers.map((freelancer) => (
                                <div
                                    key={freelancer.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                                            {/* Image */}
                                            <div className="flex-shrink-0">
                                                <div className="relative">
                                                    <img
                                                        src={freelancer.image}
                                                        alt={freelancer.name}
                                                        className="h-20 w-20 rounded-lg object-cover border border-gray-200"
                                                    />
                                                    {freelancer.verified && (
                                                        <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1 flex items-center justify-center">
                                                            <Check className="h-3 w-3 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Main content */}
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900">{freelancer.name}</h3>
                                                        <p className="text-gray-600">{freelancer.role}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => toggleSavedFreelancer(freelancer.id)}
                                                        className={`p-1.5 rounded-full ${savedFreelancers.includes(freelancer.id)
                                                            ? 'text-yellow-400 bg-yellow-50'
                                                            : 'text-gray-300 hover:text-gray-400 hover:bg-gray-50'
                                                            }`}
                                                    >

                                                        Dione Makoge, [3/26/2025 11:50 AM]
                                                        <Star className={`h-5 w-5 ${savedFreelancers.includes(freelancer.id) ? 'fill-current' : ''
                                                            }`} />
                                                    </button>
                                                </div>

                                                {/* Badge */}
                                                {freelancer.badge && (
                                                    <div className="mt-2 mb-3">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800">
                                                            <Sparkles className="h-3 w-3 mr-1" />
                                                            {freelancer.badge}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Details row */}
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <DollarSign className="h-4 w-4 mr-1.5 text-gray-400" />
                                                        <span className="font-medium text-gray-900">{freelancer.rate}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                                                        <span>{freelancer.location}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <Award className="h-4 w-4 mr-1.5 text-gray-400" />
                                                        <span className="font-medium text-gray-900">{freelancer.rating}</span>
                                                        <span className="mx-1">rating</span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <Briefcase className="h-4 w-4 mr-1.5 text-gray-400" />
                                                        <span className="font-medium text-gray-900">{freelancer.projects}</span>
                                                        <span className="ml-1">projects</span>
                                                    </div>
                                                </div>

                                                {/* Skills */}
                                                <div className="mt-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {freelancer.skills.map((skill, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right side */}
                                            <div className="flex-shrink-0 flex flex-col items-end gap-3">
                                                <div className={`flex items-center text-sm px-3 py-1 rounded-full ${freelancer.availability === 'Available now'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    <Zap className="h-3.5 w-3.5 mr-1" />
                                                    {freelancer.availability}
                                                </div>
                                                <button className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors whitespace-nowrap">
                                                    Contact Freelancer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <div className="mx-auto max-w-md">

                            Dione Makoge, [3/26/2025 11:50 AM]
                            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No freelancers found</h3>
                            <p className="text-gray-500 mb-6">
                                Try adjusting your search or filter criteria to find what you're looking for
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setActiveFilter('all');
                                }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                            >
                                Reset filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default FreelancerPlatform;