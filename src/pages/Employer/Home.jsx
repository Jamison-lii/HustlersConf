import React from "react";
//import Navbar from "./Navbar";
import Hero from "../../components/Hero";
import Recommended_jobs from "../../components/Recommended_jobs";
import Top_company from "../../components/Top_company";
import Featured_jobs from "../../components/Featured_jobs";
import Testimonials from "../../components/Testimonials";
import Footer from "../../components/Footer";
import HeroCopy from "../../components/Hero copy";


const HomeEmployer = () => {
 
  
  return (
    <div>
      
      <HeroCopy />
      <Recommended_jobs />
      <Top_company />
      <Featured_jobs />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomeEmployer;
