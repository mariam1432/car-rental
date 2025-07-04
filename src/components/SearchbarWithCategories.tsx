import React, { useState, useEffect, useRef, useCallback } from "react";
import { useCategoriesQuery } from "../services/carCategoryApi";
import { useNavigate } from "react-router-dom";
import { URL } from "../data";
import { CAR_CATEGORY_QUERY, CAR_LIST_QUERY } from "../utils/carUtils";
import { useLazyCarsQuery } from "../services/carApi";

const SearchResultItem = ({ imgUrl, title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 gap-2 flex items-start border-1 border-gray-300 w-full text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
    >
      <img
        src={imgUrl}
        alt={title}
        className="w-12 h-12 object-cover rounded"
        loading="lazy"
      />
      <div>
        <h3 className="text-sm text-blue-600 font-medium">{title}</h3>
        <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
      </div>
    </button>
  );
};

const SearchbarWithCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const { data } = useCategoriesQuery({ ...CAR_CATEGORY_QUERY });
  const carType = data?.data || [];
  const [fetchCars] = useLazyCarsQuery();

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Memoized search function with debounce
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.trim() === "") {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await fetchCars({
          fields: ["name", "id", "description", "slug"],
          populate: { images: { fields: ["url"] } },
          pagination: { limit: 4 },
          filters: {
            $or: [
              { brand: { car_Brand: { $containsi: query } } },
              { name: { $containsi: query } },
            ],
          },
        });
        setSearchResults(data?.data || []);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500), // 300ms debounce delay
    [fetchCars]
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="md:mx-auto bg-[#000000e0] bg-opacity-10 flex flex-col items-center rounded-xl py-4 px-6 gap-6 w-full md:w-[70%]">
      <h1 className="text-lg md:text-xl text-white font-bold text-center">
        LUXURY CAR RENTAL DUBAI
      </h1>

      <div
        className="flex h-auto bg-white w-full p-2 items-center relative text-sm"
        ref={searchRef}
      >
        <input
          className="w-full outline-0"
          placeholder="Search cars..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsSearchOpen(true)}
        />
        <i
          className={`cursor-pointer text-sm ${
            isSearchOpen ? "fa-solid fa-xmark" : "fa-solid fa-magnifying-glass"
          }`}
          onClick={() => {
            setSearchQuery("");
            setSearchResults([]);
            setIsSearchOpen(!isSearchOpen);
          }}
        ></i>

        {/* Search results dropdown */}
        {isSearchOpen && (
          <div className="absolute top-9 left-0 bg-white w-full max-h-60 overflow-auto border border-gray-200 z-10 shadow-lg">
            {isLoading ? (
              <div className="p-2 text-center">Loading...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((car) => (
                <SearchResultItem
                  key={car?.id}
                  imgUrl={
                    car && car?.images && car?.images.length > 0
                      ? URL + car.images?.[0]?.url
                      : ""
                  }
                  title={car?.name}
                  description={car?.description}
                  onClick={() => {
                    navigate(`/car/${car?.slug}`);
                    setIsSearchOpen(false);
                  }}
                />
              ))
            ) : searchQuery ? (
              <div className="p-2 text-center">No results found</div>
            ) : (
              <div className="p-2 text-center">Start typing to search</div>
            )}
          </div>
        )}
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 w-full">
        {carType.map((type, index) => (
          <div
            key={type.slug}
            className={`border border-primary rounded-lg flex flex-col items-center px-1 cursor-pointer hover:bg-opacity-20 transition-colors
              ${
                index === carType.length - 1
                  ? "col-span-2 w-1/2 mx-auto md:col-span-1 md:w-full"
                  : ""
              }`}
            onClick={() => navigate(`/category/${type.slug}`)}
          >
            <img
              src={URL + type?.image?.url}
              alt={type.cartype}
              className="w-10 h-10 object-contain mb-1"
              loading="lazy"
            />
            <span className="text-white text-sm text-center">
              {type.cartype}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchbarWithCategories;
