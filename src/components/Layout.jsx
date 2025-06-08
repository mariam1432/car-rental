import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchbarWithCategories from "./SearchbarWithCategories";
const Layout = ({ children, isHome }) => {
  return (
    <div className="flex flex-col min-h-screen pb-[500px]">
      {isHome ? (
        <div className="bg-gray-200 rounded-b-[55%] h-[250px] mb-[250px] relative">
          <Navbar isHomePage />
          <div className="w-full md:w-3/4 absolute left-1/2 transform -translate-x-1/2 top-[40%] mt-[-20px] mb-[100px]">
            <SearchbarWithCategories />
          </div>
        </div>
      ) : (
        <Navbar />
      )}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
