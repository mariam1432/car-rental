import React, { useMemo } from "react";

const Footer = () => {
  const NAV_ITEMS = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact Us", href: "/contact-us" },
    ],
    []
  );
  return (
    <footer className="absolute left-0 right-0 bottom-0 bg-gray-200 flex flex-col w-full px-10 md:px-[10%] py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between">
        <ul className="flex flex-row gap-3">
          {NAV_ITEMS.map((nav, index) => (
            <li key={index} className="cursor-pointer text-gray-900 text-xs">
              <a href={nav.href}>{nav.label}</a>
            </li>
          ))}
        </ul>

        <ul className="text-sm text-gray-800 text-start w-full md:w-fit md:text-right border-t-2 border-gray-400 border-dotted py-4">
          <li>+971523142716</li>
          <li>info@arabstarcarrentals.com</li>
          <li> Arab Star Car Rentals, Street 16 A, Alqouz- Dubai, UAE</li>
        </ul>
      </div>
      <div className="border-t-2 border-gray-400 border-dotted py-4">
        <span className="text-xs text-gray-800">
          Ⓒ 2025 - All Rights Are Reserved - Copyright Luxury Car Rental in
          Dubai Arab Star - Privacy Policy
        </span>
      </div>
    </footer>
  );
};

export default Footer;
