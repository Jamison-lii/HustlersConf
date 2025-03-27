import React from "react";
import { HiOutlineHeart, HiStar } from "react-icons/hi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  SuperLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const TopCompanies = () => {
  const companies = [
    {
      id: 1,
      name: "Tech Innovators",
      logo: "https://via.placeholder.com/150/4b4efc/FFFFFF?text=TI",
      location: "Douala, Cameroon",
      type: "Full Time",
      salary: "FCFA 250,000+",
      rating: 4,
      description: "Leading tech company specializing in software solutions"
    },
    {
      id: 2,
      name: "AgroTech Solutions",
      logo: "https://via.placeholder.com/150/4b4efc/FFFFFF?text=AS",
      location: "Yaoundé, Cameroon",
      type: "Internship",
      salary: "FCFA 120,000+",
      rating: 3,
      description: "Modernizing agriculture with technology"
    },
    {
      id: 3,
      name: "Green Energy",
      logo: "https://via.placeholder.com/150/4b4efc/FFFFFF?text=GE",
      location: "Buea, Cameroon",
      type: "Remote",
      salary: "FCFA 180,000+",
      rating: 5,
      description: "Pioneering renewable energy solutions"
    },
    {
      id: 4,
      name: "Digital Finance",
      logo: "https://via.placeholder.com/150/4b4efc/FFFFFF?text=DF",
      location: "Limbe, Cameroon",
      type: "Contract",
      salary: "FCFA 200,000+",
      rating: 4,
      description: "Innovative financial technology services"
    }
  ];

  const CompanyCard = ({ company }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden mx-2 my-4 hover:shadow-lg transition-shadow duration-300">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{company.name}</h3>
                <p className="text-gray-600 text-sm">{company.location}</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-red-500">
              <HiOutlineHeart className="text-2xl" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-4">{company.description}</p>
          
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <HiStar 
                key={i} 
                className={`text-xl ${i < company.rating ? "text-yellow-400" : "text-gray-300"}`} 
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {company.type}
            </span>
            <p className="text-gray-800 font-medium">{company.salary}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Companies in Cameroon
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover leading employers offering great opportunities
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors">
            Browse All Companies
          </button>
          <button className="px-6 py-3 bg-white text-gray-700 font-medium rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
            Featured Employers
          </button>
        </div>

        <div className="relative">
          <Carousel
            swipeable={true}
            draggable={true}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="all .5s"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {companies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;