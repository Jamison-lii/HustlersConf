import { useState } from 'react';
import {
    Briefcase,
    DollarSign,
    MapPin,
    Clock,
    Code,
    PenTool,
    Cpu,
    BarChart2,
    Globe,
    Link,
    Mail,
    Plus,
    X,
    Check,
    Upload
} from 'lucide-react';

const JobPostingForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        remote: false,
        salaryMin: '',
        salaryMax: '',
        currency: 'USD',
        type: 'Full-time',
        category: 'Engineering',
        description: '',
        requirements: [''],
        benefits: [''],
        skills: [],
        applyLink: '',
        contactEmail: '',
        deadline: ''
    });

    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const jobCategories = [
        { value: 'Engineering', label: 'Engineering', icon: <Code size={16} /> },
        { value: 'Design', label: 'Design', icon: <PenTool size={16} /> },
        { value: 'Product', label: 'Product', icon: <Cpu size={16} /> },
        { value: 'Marketing', label: 'Marketing', icon: <BarChart2 size={16} /> },
        { value: 'Other', label: 'Other', icon: <Briefcase size={16} /> }
    ];

    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'];
    const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayChange = (field, index, value) => {
        const updated = [...formData[field]];
        updated[index] = value;
        setFormData(prev => ({
            ...prev,
            [field]: updated
        }));
    };

    const addArrayItem = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayItem = (field, index) => {
        const updated = formData[field].filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            [field]: updated
        }));
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Job title is required';
        if (!formData.company.trim()) newErrors.company = 'Company name is required';
        if (!formData.location.trim() && !formData.remote) newErrors.location = 'Location or remote option is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (formData.requirements.some(r => !r.trim())) newErrors.requirements = 'All requirements must be filled';
        if (!formData.applyLink && !formData.contactEmail) newErrors.applyMethod = 'Application link or email is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Frontend-only demo - just log the form data
            console.log('Form would be submitted:', formData);
            
            setSubmitSuccess(true);
            
            // Reset form after "submission"
            setTimeout(() => {
                setFormData({
                    title: '',
                    company: '',
                    location: '',
                    remote: false,
                    salaryMin: '',
                    salaryMax: '',
                    currency: 'USD',
                    type: 'Full-time',
                    category: 'Engineering',
                    description: '',
                    requirements: [''],
                    benefits: [''],
                    skills: [],
                    applyLink: '',
                    contactEmail: '',
                    deadline: ''
                });
                setLogoFile(null);
                setLogoPreview('');
                setSubmitSuccess(false);
            }, 3000);

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-blue-500">Post a Job Opening</h2>

            {submitSuccess && (
                <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                    Job posted successfully! (Demo only - no data was saved)
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name *
                        </label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.company ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Your company name"
                        />
                        {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Logo
                        </label>
                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer">
                                <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden mr-3 flex items-center justify-center">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Company logo" className="h-full w-full object-cover" />
                                    ) : (
                                        <Upload size={20} className="text-gray-400" />
                                    )}
                                </div>
                                <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    {logoPreview ? 'Change Logo' : 'Upload Logo'}
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                    />
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Job Info */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g. Senior Frontend Developer"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location *
                    </label>
                    <div className="flex flex-col space-y-3">
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg ${!formData.location && formData.remote ? 'bg-gray-100' : ''} ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="e.g. New York, NY"
                            disabled={formData.remote}
                        />
                        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}

                        <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="remote"
                                    checked={formData.remote}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">Fully Remote Position</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Type
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                            {jobTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                            {jobCategories.map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Application Deadline
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>

                {/* Salary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Minimum Salary
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <DollarSign size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="number"
                                name="salaryMin"
                                value={formData.salaryMin}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Maximum Salary
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <DollarSign size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="number"
                                name="salaryMax"
                                value={formData.salaryMax}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Currency
                        </label>
                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                            {currencies.map(curr => (
                                <option key={curr} value={curr}>{curr}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Description *
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full px-4 py-2 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Describe the role, responsibilities, and impact..."
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                {/* Requirements */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Requirements *
                    </label>
                    <div className="space-y-2">
                        {formData.requirements.map((req, index) => (
                            <div key={index} className="flex items-start">
                                <div className="flex-grow flex items-center">
                                    <span className="inline-block w-4 h-4 rounded-full bg-gray-100 text-gray-600 mr-3 flex items-center justify-center">
                                        {index + 1}
                                    </span>
                                    <input
                                        type="text"
                                        value={req}
                                        onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                                        className={`flex-grow px-3 py-1 border-b focus:outline-none ${!req.trim() && errors.requirements ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Add a requirement"
                                    />
                                </div>
                                {formData.requirements.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('requirements', index)}
                                        className="ml-2 text-gray-400 hover:text-red-500"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('requirements')}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
                        >
                            <Plus size={14} className="mr-1" />
                            Add Requirement
                        </button>
                        {errors.requirements && <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>}
                    </div>
                </div>

                {/* Benefits */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Benefits & Perks
                    </label>
                    <div className="space-y-2">
                        {formData.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start">
                                <div className="flex-grow flex items-center">
                                    <span className="inline-block w-5 h-5 rounded-full bg-green-100 text-green-600 mr-3 flex items-center justify-center">
                                        <Plus size={12} />
                                    </span>
                                    <input
                                        type="text"
                                        value={benefit}
                                        onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                                        className="flex-grow px-3 py-1 border-b border-gray-300 focus:outline-none"
                                        placeholder="Add a benefit"
                                    />
                                </div>
                                {formData.benefits.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('benefits', index)}
                                        className="ml-2 text-gray-400 hover:text-red-500"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('benefits')}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
                        >
                            <Plus size={14} className="mr-1" />
                            Add Benefit
                        </button>
                    </div>
                </div>

                {/* Application Method */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        How to Apply *
                    </label>
                    <div className="space-y-3">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Link size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="url"
                                name="applyLink"
                                value={formData.applyLink}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Application URL (e.g. your careers page)"
                            />
                        </div>

                        <div className="text-sm text-gray-500 text-center">- OR -</div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Email to receive applications"
                            />
                        </div>
                        {errors.applyMethod && <p className="mt-1 text-sm text-red-600">{errors.applyMethod}</p>}
                    </div>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-3 rounded-lg text-white font-medium ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isSubmitting ? 'Posting...' : 'Post Job Opening'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JobPostingForm;