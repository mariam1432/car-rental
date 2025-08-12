import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoriesQuery } from "../services/carCategoryApi";
import { useBrandsQuery } from "../services/brandApi";
import { CAR_CATEGORY_QUERY } from "../utils/carUtils";

const Navbar = ({ isHomePage }) => {
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const { data } = useCategoriesQuery({ ...CAR_CATEGORY_QUERY, populate: "*" });
  const { data: brandsData } = useBrandsQuery({});

  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    setOpenSubDropdown(null);
  };

  const toggleSubDropdown = (subDropdown) => {
    setOpenSubDropdown(openSubDropdown === subDropdown ? null : subDropdown);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
    setOpenSubDropdown(null);
  };

  const CAR_TYPES =
    data?.data && data?.data.length > 0
      ? data?.data.filter((d) => d.slug !== "exotic-cars")
      : [];
  const BRANDS = brandsData?.data ? brandsData.data : [];

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

  // Reusable components
  const ChevronIcon = ({ isOpen }) => (
    <svg
      className={`ml-1 h-4 w-4 transition-transform ${
        isOpen ? "rotate-180" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  const NavLink = ({
    label,
    href,
    onClick,
    selected = false,
    hasDropdown = false,
    isDropdownOpen = false,
  }) => (
    <div className="relative group">
      {href ? (
        <a
          href={href}
          className={`${
            selected ? "text-primary" : "text-gray-900"
          } px-3 py-2 text-xs md:text-sm whitespace-nowrap hover:text-primary`}
          onClick={closeAllDropdowns}
        >
          {label}
        </a>
      ) : (
        <button
          onClick={onClick}
          className="px-3 py-2 text-xs md:text-sm whitespace-nowrap text-gray-900 hover:text-primary flex items-center"
        >
          {label}
          {hasDropdown && <ChevronIcon isOpen={isDropdownOpen} />}
        </button>
      )}
      <span
        className={`absolute left-0 -top-2 w-full h-[1px] bg-primary origin-top transition-transform duration-400 ease-in-out ${
          selected || "group-hover:scale-y-100 scale-y-0"
        } ${selected ? "scale-y-100" : ""}`}
      ></span>
      <span
        className={`absolute left-0 -bottom-2 w-full h-[1px] bg-primary origin-bottom transition-transform duration-400 ease-in-out ${
          selected || "group-hover:scale-y-100 scale-y-0"
        } ${selected ? "scale-y-100" : ""}`}
      ></span>
    </div>
  );

  const DropdownMenu = ({ children, position = "left-0", width = "w-56" }) => (
    <div
      className={`absolute z-10 ${position} mt-2 ${width} rounded-md shadow-lg bg-white`}
    >
      <div className="py-1">{children}</div>
    </div>
  );

  const MobileNavLink = ({
    label,
    href,
    onClick,
    selected,
    hasDropdown = false,
    isDropdownOpen = false,
  }) => (
    <div>
      {href ? (
        <a
          href={href}
          className={`block px-3 py-2 text-xs md:text-sm text-gray-900 hover:bg-primary ${
            selected ? "bg-primary" : ""
          }`}
          onClick={() => {
            closeAllDropdowns();
            setIsOpen(false);
          }}
        >
          {label}
        </a>
      ) : (
        <button
          onClick={onClick}
          className="w-full text-left px-3 py-2 text-xs md:text-sm lg:text-base text-gray-900 hover:bg-primary flex justify-between items-center"
        >
          {label}
          {hasDropdown && <ChevronIcon isOpen={isDropdownOpen} />}
        </button>
      )}
    </div>
  );

  const renderCarTypeDropdown = (isMobile = false) => {
    const prefix = isMobile ? "mobile-" : "";
    const dropdownKey = `${prefix}carTypes`;
    const isOpen = openDropdown === dropdownKey;

    return (
      <div className="relative">
        <NavLink
          label="Rent by Type"
          onClick={() => toggleDropdown(dropdownKey)}
          hasDropdown
          isDropdownOpen={isOpen}
        />

        {isOpen && (
          <DropdownMenu>
            {CAR_TYPES.map((type) => {
              const subDropdownKey = `${prefix}${type.cartype}`;
              const isSubOpen = openSubDropdown === subDropdownKey;

              return (
                <div key={type.cartype} className="relative">
                  <a
                    href={`/cartype/${type.slug}`}
                    className="block px-4 py-2 text-sm md:text-xs whitespace-nowrap text-gray-700 hover:bg-primary"
                    onClick={closeAllDropdowns}
                  >
                    {type.cartype}
                  </a>
                  {type.car_subcategories &&
                  type.car_subcategories.length > 0 ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubDropdown(subDropdownKey);
                      }}
                      className="absolute right-0 top-0 px-4 py-2"
                    >
                      <ChevronIcon isOpen={isSubOpen} />
                    </button>
                  ) : (
                    <></>
                  )}
                  {isSubOpen &&
                    type?.car_subcategories &&
                    type?.car_subcategories.length > 0 && (
                      <DropdownMenu position="left-full">
                        {type.car_subcategories.map((category) => {
                          const modelDropdownKey = `${prefix}${type.cartype}-${category.categorySubType}`;
                          const isModelOpen =
                            openSubDropdown === modelDropdownKey;

                          return (
                            <div
                              key={category.categorySubType}
                              className="relative"
                            >
                              <a
                                href={`/product-category/${type.slug}/${category.slug}`}
                                className="block px-4 py-2 text-xs md:text-[11px] whitespace-nowrap text-gray-700 hover:bg-primary"
                                onClick={closeAllDropdowns}
                              >
                                {category.categorySubType}
                              </a>
                            </div>
                          );
                        })}
                      </DropdownMenu>
                    )}
                </div>
              );
            })}
          </DropdownMenu>
        )}
      </div>
    );
  };

  const renderBrandsDropdown = (isMobile = false) => {
    const prefix = isMobile ? "mobile-" : "";
    const dropdownKey = `${prefix}brands`;
    const isOpen = openDropdown === dropdownKey;

    return (
      <div className="relative">
        <NavLink
          label="Rent by Brand"
          onClick={() => toggleDropdown(dropdownKey)}
          hasDropdown
          isDropdownOpen={isOpen}
        />

        {isOpen && (
          <DropdownMenu>
            {BRANDS.map((brand) => (
              <a
                key={brand.car_Brand}
                href={`/rent/${brand.slug}`}
                className="block px-4 py-2 text-xs md:text-sm whitespace-nowrap text-gray-700 hover:bg-primary"
                onClick={closeAllDropdowns}
              >
                {brand.car_Brand}
              </a>
            ))}
          </DropdownMenu>
        )}
      </div>
    );
  };

  const renderMobileCarTypeDropdown = () => {
    const isOpen = openDropdown === "mobileCarTypes";

    return (
      <div>
        <MobileNavLink
          label="Rent by Type"
          onClick={() => toggleDropdown("mobileCarTypes")}
          hasDropdown
          isDropdownOpen={isOpen}
        />

        {isOpen && (
          <div className="pl-4">
            {CAR_TYPES.map((type) => {
              const subDropdownKey = `mobile-${type.cartype}`;
              const isSubOpen = openSubDropdown === subDropdownKey;

              return (
                <div key={type.cartype}>
                  <div className="flex justify-between items-center">
                    <a
                      href={type.slug}
                      className="block px-3 py-2 text-sm md:text-base text-gray-900 hover:bg-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        closeAllDropdowns();
                        setIsOpen(false);
                        setTimeout(() => {
                          window.location.href = type.slug;
                        }, 300);
                      }}
                    >
                      {type.cartype}
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubDropdown(subDropdownKey);
                      }}
                      className="px-3 py-2"
                    >
                      <ChevronIcon isOpen={isSubOpen} />
                    </button>
                  </div>

                  {isSubOpen &&
                    type?.car_subcategories &&
                    type?.car_subcategories.length > 0 && (
                      <div className="pl-4">
                        {type.car_subcategories.map((category) => {
                          return (
                            <div key={category.categorySubType}>
                              <div className="flex justify-between items-center">
                                <a
                                  href={`/product-category/${type.slug}/${category.slug}`}
                                  className="block px-3 py-2 text-sm md:text-base text-gray-900 hover:bg-primary"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    closeAllDropdowns();
                                    setIsOpen(false);
                                    setTimeout(() => {
                                      window.location.href = category.slug;
                                    }, 300);
                                  }}
                                >
                                  {category.categorySubType}
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderMobileBrandsDropdown = () => {
    const isOpen = openDropdown === "mobileBrands";

    return (
      <div>
        <MobileNavLink
          label="Rent by Brand"
          onClick={() => toggleDropdown("mobileBrands")}
          hasDropdown
          isDropdownOpen={isOpen}
        />

        {isOpen && (
          <div className="pl-4">
            {BRANDS.map((brand) => (
              <a
                key={brand.car_Brand}
                href={`/rent/${brand.slug}`}
                className="block px-3 py-2 text-sm md:text-base text-gray-900 hover:bg-primary"
                onClick={() => {
                  closeAllDropdowns();
                  setIsOpen(false);
                }}
              >
                {brand.car_Brand}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={`
        fixed  w-full z-2000
        bg-black md:bg-white
        
        ${isHomePage ? "md:!bg-gray-200" : "md:shadow-2xl"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:justify-around h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={"../../logo.png"}
              alt="rotanastar"
              className="w-30 h-auto min-h-10"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center gap-x-2 lg:gap-x-4">
            {NAV_ITEMS.slice(0, 2).map((item) => (
              <NavLink
                key={item.label}
                label={item.label}
                href={item.href}
                selected={item.href === currentPath}
              />
            ))}

            {renderCarTypeDropdown()}
            {renderBrandsDropdown()}

            {NAV_ITEMS.slice(2).map((item) => (
              <NavLink
                key={item.label}
                label={item.label}
                href={item.href}
                selected={item.href === currentPath}
              />
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                if (!isOpen) {
                  closeAllDropdowns();
                }
              }}
              className="inline-flex items-center justify-center p-1 rounded-md bg-primary text-gray-900 hover:text-gray-900 cursor-pointer focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden z-20">
          <div className="bg-white pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.slice(0, 2).map((item) => (
              <MobileNavLink
                key={item.label}
                label={item.label}
                href={item.href}
                selected={currentPath === item.href}
              />
            ))}

            {renderMobileCarTypeDropdown()}
            {renderMobileBrandsDropdown()}

            {NAV_ITEMS.slice(2).map((item) => (
              <MobileNavLink
                key={item.label}
                label={item.label}
                href={item.href}
                selected={currentPath === item.href}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
