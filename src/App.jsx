import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CarTypePage from "./pages/CarTypePage";
import CarListingByTypePage from "./pages/CarListingByTypePage";
import RentByBrand from "./pages/RentByBrand";
import FAQS from "./pages/FAQS";
import CarDetailPage from "./pages/CarDetailPage";
import BlogPage from "./pages/BlogPage";
import Contactus from "./pages/Contactus";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/about-us",
      element: <AboutPage />,
    },
    { path: "/cartype/:type", element: <CarTypePage /> },
    {
      path: "/product-category/:type/:subCategory",
      element: <CarListingByTypePage />,
    },
    {
      path: "/rent/:brand",
      element: <RentByBrand />,
    },
    { path: "/faqs", element: <FAQS /> },
    { path: "/car/:car", element: <CarDetailPage /> },
    { path: "/blog", element: <BlogPage /> },
    { path: "/contact-us", element: <Contactus /> },
    { path: "*", element: <HomePage /> },
  ]);
  return (
    <div className="relative">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
