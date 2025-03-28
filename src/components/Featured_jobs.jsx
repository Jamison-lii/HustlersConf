import React from "react";
import { BiChart } from "react-icons/bi";
import { FaCalculator, FaHeartPulse } from "react-icons/fa6";
import { GiHamburger } from "react-icons/gi";
import { GoLaw } from "react-icons/go";
import { GrAnnounce } from "react-icons/gr";
import { HiGlobe } from "react-icons/hi";
import { HiPencilSquare } from "react-icons/hi2";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdImportContacts } from "react-icons/md";
import { PiPaintBrushBroadThin } from "react-icons/pi";
import { TbWhirl } from "react-icons/tb";
import { TiWaves } from "react-icons/ti";

const Featured_jobs = () => {
  const Offers = ({
    icon1,
    title,
    position,
    location,
    type,
    company,
    icon2,
    bg1,
    color,
    bg2,
  }) => {
    return (
      <div className="bg-white rounded-[10px] px-6 flex flex-col justify-center gap-12 shadow transition-shadow hover:bg-lime-100">
        <div className="flex items-center gap-x-4">
          <button
            className="p-2 rounded-full bg-[#f4fefe] border-none outline-none text-4xl"
            style={{ backgroundColor: `${bg1}`, color: `${color}` }}
          >
            {icon1}
          </button>
          <span>
            <p className="text-2xl font-semibold">{title}</p>
            <p className="text-lg">15 openings</p>
          </span>
        </div>
        <div>
          <p className="text-3xl font-semibold">{position}</p>
          <span className="flex flex-wrap gap-x-4 items-center justify-center text-xl pt-4">
            <p className="flex items-center gap-x-2">
              <HiGlobe className="text-2xl" /> {location}
            </p>
            <p className="text-[#93979d]">{type}</p>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>
            <p className="text-lg text-[#93979d]">March 27, 2025</p>
            <p className="text-xl font-medium">{company}</p>
          </span>
          <button
            className="rounded-[10px] p-2 text-white border-none outline-none"
            style={{ backgroundColor: `${bg2}` }}
          >
            {icon2}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#fcfaf6]">
      <div className="container mx-auto px-6 py-24">
        <div className="md:flex items-center justify-between">
          <h2 className="xl:text-5xl lg:text-3xl text-2xl font-semibold">
            Featured Job Offers in Cameroon
          </h2>
          <button className="rounded-full md:my-0 my-4 bg-[#4b4efc] text-lg text-white font-bold px-8 py-3 outline-none border-none transition-transform ease-in-out hover:scale-110">
            See All Jobs
          </button>
        </div>
        <p className="text-2xl mt-4 font-light">
          Find the right job opportunity that fits your skills and career goals.
        </p>
        <div className="mt-12 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          <Offers
            bg2="#f4fefe"
            bg1="black"
            color="#lae4e8"
            company="Afritech Solutions"
            icon1={<BiChart size={40} />}
            icon2={<HiPencilSquare size={30} />}
            location="Douala, Cameroon"
            position="Financial Analyst"
            title="Finance"
            type="Full Time"
          />
          <Offers
            bg1="#f5fef8"
            bg2="#457b9d"
            color="#25ef75"
            company="BueaTech Hub"
            icon1={<PiPaintBrushBroadThin size={40} />}
            icon2={<GiHamburger size={30} />}
            location="Buea, Cameroon"
            position="Web Developer"
            title="Software Engineering"
            type="Internship"
          />
          <Offers
            bg1="#fefaf4"
            bg2="#ef6f51"
            color="#d9b833"
            company="MediaCamer"
            icon1={<GrAnnounce size={40} />}
            icon2={<MdImportContacts size={30} />}
            location="Yaoundé, Cameroon"
            position="Marketing Manager"
            title="Marketing"
            type="Remote"
          />
          <Offers
            bg1="#f7fcfd"
            bg2="#f4a261"
            color="#5eb9d7"
            company="LogistiCam"
            icon1={<IoPersonCircleSharp size={40} />}
            icon2={<TbWhirl size={30} />}
            location="Bamenda, Cameroon"
            position="Operations Coordinator"
            title="Logistics"
            type="Contractor"
          />
          <Offers
            bg1="#fff9f6"
            bg2="#457b9d"
            color="#aff8c48"
            company="Yaoundé Medical Center"
            icon1={<FaHeartPulse size={40} />}
            icon2={<GiHamburger size={30} />}
            location="Yaoundé, Cameroon"
            position="Medical Coordinator"
            title="Health & Care"
            type="Full Time"
          />
          <Offers
            bg1="#fff9f7"
            bg2="#f4a261"
            color="#ff843d"
            company="FinaTrust Bank"
            icon1={<FaCalculator size={40} />}
            icon2={<TbWhirl size={30} />}
            location="Douala, Cameroon"
            position="Senior Accountant"
            title="Finance & Accounting"
            type="Contract"
          />
          <Offers
            bg1="#f7fcfd"
            bg2="#4895ef"
            color="#69bfd9"
            company="Cameroon Customer Care"
            icon1={<IoPersonCircleSharp size={40} />}
            icon2={<MdImportContacts size={30} />}
            location="Buea, Cameroon"
            position="Support Engineer"
            title="Customer Services"
            type="Full Time"
          />
          <Offers
            bg1="#f6f6ff"
            bg2="#e76f51"
            color="#4b4efc"
            company="CamerDesign Studio"
            icon1={<GoLaw size={40} />}
            icon2={<TiWaves size={30} />}
            location="Douala, Cameroon"
            position="UI/UX Designer"
            title="Design"
            type="Remote"
          />
        </div>
      </div>
    </div>
  );
};

export default Featured_jobs;
