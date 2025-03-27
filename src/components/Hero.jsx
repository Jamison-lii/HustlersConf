import React from "react";
import { HiSearch } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { FiBriefcase } from "react-icons/fi";

const Hero = () => {
  // Popular job categories in Cameroon
  const popularCategories = [
    "Software Development",
    "Healthcare",
    "Education",
    "Finance",
    "Marketing",
    "Engineering"
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Find the <span className="text-blue-600">Best Workforce</span> in <br />
            Cameroon's Growing Market
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with top employers across Douala, Yaoundé, Buea and beyond.
            Start your career journey today.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-2 mb-10">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 py-3 border border-gray-200 rounded-lg">
              <FiBriefcase className="text-gray-400 mr-3 text-xl" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full border-none outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-3 border border-gray-200 rounded-lg">
              <IoLocationOutline className="text-gray-400 mr-3 text-xl" />
              <input
                type="text"
                placeholder="City or region"
                className="w-full border-none outline-none text-gray-700 placeholder-gray-400"
              />
              <select className="ml-2 border-none outline-none text-gray-500 bg-transparent">
                <option>All Cameroon</option>
                <option>Douala</option>
                <option>Yaoundé</option>
                <option>Buea</option>
                <option>Bamenda</option>
                <option>Limbe</option>
              </select>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-300">
              <HiSearch className="mr-2 text-xl" />
              Search Jobs
            </button>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="text-center">
          <p className="text-gray-500 mb-4">Popular job categories:</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
            {popularCategories.map((category, index) => (
              <span 
                key={index}
                className="bg-white hover:bg-blue-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-gray-500 text-sm">
          <span>Trusted by 500+ Cameroonian companies</span>
          <span className="hidden sm:inline-block">•</span>
          <span>1,000+ jobs posted monthly</span>
          <span className="hidden sm:inline-block">•</span>
          <span>50,000+ active job seekers</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;