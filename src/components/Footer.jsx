import { resourcesLinks, platformLinks, contactLinks } from "../constants/index";
import React from "react";

const Footer = () => {
  const currentDate = new Date();
  const timeStamp = currentDate.getFullYear();
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700 bg-neutral-800">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:ml-[25%] lg:ml-[18%]">
        <div>
          <h3 className="text-md font-semibold mb-4 text-white">Resources</h3>
          <ul className="space-y-2">
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4 text-white">Platform</h3>
          <ul className="space-y-2">
            {platformLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4 text-white">Community</h3>
          <ul className="space-y-2">
            {contactLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <p className="text-neutral-300 text-sm text-center mt-10">
          @Copywrite {timeStamp}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
