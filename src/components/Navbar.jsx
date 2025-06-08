import { useState, useMemo } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
const Navbar = ({ isHomePage }) => {
  const navigate = useNavigate();
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

  // Helper function to generate consistent slugs/URLs
  const generateSlug = (str) => str.toLowerCase().replace(/\s+/g, "-");

  // Optimized data structure with href values
  const CAR_TYPES = useMemo(
    () => [
      {
        name: "Luxury Cars",
        href: `/cartype/${generateSlug("Luxury Cars")}-rentals`,
        categories: [
          {
            name: "High End",
            href: `/product-category/${generateSlug("Luxury")}/${generateSlug(
              "Luxury High End"
            )}/`,
            models: [
              { name: "Ferrari", href: `/product/${generateSlug("Ferrari")}/` },
              {
                name: "Lamborghini",
                href: `/product/${generateSlug("Lamborghini")}/`,
              },
              {
                name: "Rolls Royce",
                href: `/product/${generateSlug("Rolls Royce")}/`,
              },
            ],
          },
          {
            name: "Mid Range",
            href: `/product-category/${generateSlug("Luxury")}/${generateSlug(
              "Luxury Mid Range"
            )}/`,
            models: [
              {
                name: "Mercedes S-Class",
                href: `/product/${generateSlug("Mercedes S-Class")}/`,
              },
              {
                name: "BMW 7 Series",
                href: `/product/${generateSlug("BMW 7 Series")}/`,
              },
              { name: "Audi A8", href: `/product/${generateSlug("Audi A8")}/` },
            ],
          },
          {
            name: "Sports",
            href: `/product-category/${generateSlug("Luxury")}/${generateSlug(
              "Luxury Sports"
            )}/`,
            models: [
              {
                name: "Porsche 911",
                href: `/product/${generateSlug("Porsche 911")}/`,
              },
              {
                name: "Aston Martin",
                href: `/product/${generateSlug("Aston Martin")}/`,
              },
              {
                name: "Maserati",
                href: `/product/${generateSlug("Maserati")}/`,
              },
            ],
          },
          {
            name: "SUV",
            href: `/product-category/${generateSlug("Luxury")}/${generateSlug(
              "Luxury SUV"
            )}/`,
            models: [
              {
                name: "Range Rover",
                href: `/product/${generateSlug("Range Rover")}/`,
              },
              {
                name: "Bentley Bentayga",
                href: `/product/${generateSlug("Bentley Bentayga")}/`,
              },
              {
                name: "Mercedes G-Class",
                href: `/product/${generateSlug("Mercedes G-Class")}/`,
              },
            ],
          },
        ],
      },
      {
        name: "Sports Car",
        href: `/cartype/${generateSlug("Sports Car")}-rentals`,
        categories: [
          {
            name: "Exotic",
            href: `/product-category/${generateSlug("Sports")}/${generateSlug(
              "Exotic"
            )}/`,
            models: [
              {
                name: "Ferrari 488",
                href: `/product/${generateSlug("Ferrari 488")}/`,
              },
              {
                name: "Lamborghini Huracan",
                href: `/product/${generateSlug("Lamborghini Huracan")}/`,
              },
              {
                name: "McLaren 720S",
                href: `/product/${generateSlug("McLaren 720S")}/`,
              },
            ],
          },
          {
            name: "Luxury",
            href: `/product-category/${generateSlug("Sports")}/${generateSlug(
              "Luxury"
            )}/`,
            models: [
              {
                name: "Aston Martin DB11",
                href: `/product/${generateSlug("Aston Martin DB11")}/`,
              },
              {
                name: "Porsche 911 Turbo",
                href: `/product/${generateSlug("Porsche 911 Turbo")}/`,
              },
              {
                name: "Mercedes AMG GT",
                href: `/product/${generateSlug("Mercedes AMG GT")}/`,
              },
            ],
          },
          {
            name: "SUV",
            href: `/product-category/${generateSlug("Sports")}/${generateSlug(
              "SUV"
            )}/`,
            models: [
              {
                name: "Lamborghini Urus",
                href: `/product/${generateSlug("Lamborghini Urus")}/`,
              },
              {
                name: "Porsche Cayenne Turbo",
                href: `/product/${generateSlug("Porsche Cayenne Turbo")}/`,
              },
              {
                name: "Audi RS Q8",
                href: `/product/${generateSlug("Audi RS Q8")}/`,
              },
            ],
          },
        ],
      },
      {
        name: "SUV",
        href: `/cartype/${generateSlug("SUV")}-rentals`,
        categories: [
          {
            name: "Exotic",
            href: `/product-category/${generateSlug("SUV")}/${generateSlug(
              "Exotic"
            )}/`,
            models: [
              {
                name: "Ferrari 488",
                href: `/product/${generateSlug("Ferrari 488")}/`,
              },
              {
                name: "Lamborghini Huracan",
                href: `/product/${generateSlug("Lamborghini Huracan")}/`,
              },
              {
                name: "McLaren 720S",
                href: `/product/${generateSlug("McLaren 720S")}/`,
              },
            ],
          },
          {
            name: "Luxury",
            href: `/product-category/${generateSlug("SUV")}/${generateSlug(
              "Luxury"
            )}/`,
            models: [
              {
                name: "Aston Martin DB11",
                href: `/product/${generateSlug("Aston Martin DB11")}/`,
              },
              {
                name: "Porsche 911 Turbo",
                href: `/product/${generateSlug("Porsche 911 Turbo")}/`,
              },
              {
                name: "Mercedes AMG GT",
                href: `/product/${generateSlug("Mercedes AMG GT")}/`,
              },
            ],
          },
          {
            name: "SUV",
            href: `/product-category/${generateSlug("Sports")}/${generateSlug(
              "SUV"
            )}/`,
            models: [
              {
                name: "Lamborghini Urus",
                href: `/product/${generateSlug("Lamborghini Urus")}/`,
              },
              {
                name: "Porsche Cayenne Turbo",
                href: `/product/${generateSlug("Porsche Cayenne Turbo")}/`,
              },
              {
                name: "Audi RS Q8",
                href: `/product/${generateSlug("Audi RS Q8")}/`,
              },
            ],
          },
        ],
      },
      {
        name: "Economic Cars",
        href: `/cartype/${generateSlug("Economic Cars")}-rentals`,
        categories: [
          {
            name: "Exotic",
            href: `/product-category/${generateSlug("Sports")}/${generateSlug(
              "Exotic"
            )}/`,
            models: [
              {
                name: "Ferrari 488",
                href: `/product/${generateSlug("Ferrari 488")}/`,
              },
              {
                name: "Lamborghini Huracan",
                href: `/product/${generateSlug("Lamborghini Huracan")}/`,
              },
              {
                name: "McLaren 720S",
                href: `/product/${generateSlug("McLaren 720S")}/`,
              },
            ],
          },
          {
            name: "Luxury",
            href: `/product-category/${generateSlug("Sports")}/${generateSlug(
              "Luxury"
            )}/`,
            models: [
              {
                name: "Aston Martin DB11",
                href: `/product/${generateSlug("Aston Martin DB11")}/`,
              },
              {
                name: "Porsche 911 Turbo",
                href: `/product/${generateSlug("Porsche 911 Turbo")}/`,
              },
              {
                name: "Mercedes AMG GT",
                href: `/product/${generateSlug("Mercedes AMG GT")}/`,
              },
            ],
          },
          {
            name: "SUV",
            href: `/product-category/${generateSlug("Sports")}/${generateSlug(
              "SUV"
            )}/`,
            models: [
              {
                name: "Lamborghini Urus",
                href: `/product/${generateSlug("Lamborghini Urus")}/`,
              },
              {
                name: "Porsche Cayenne Turbo",
                href: `/product/${generateSlug("Porsche Cayenne Turbo")}/`,
              },
              {
                name: "Audi RS Q8",
                href: `/product/${generateSlug("Audi RS Q8")}/`,
              },
            ],
          },
        ],
      },
      // Add other car types following the same pattern
    ],
    []
  );

  const BRANDS = useMemo(
    () => [
      { name: "Toyota", href: "/rent/toyota" },
      { name: "Ferrari", href: "/rent/ferrari" },
      { name: "Honda", href: "/rent/honda" },
      { name: "BMW", href: "/rent/bmw" },
      { name: "Mercedes", href: "/rent/mercedes" },
      { name: "Audi", href: "/rent/audi" },
      { name: "Porsche", href: "/rent/porsche" },
      { name: "Rolls Royce", href: "/rent/rolls-royce" },
    ],
    []
  );

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
    hasDropdown = false,
    isDropdownOpen = false,
  }) => (
    <div className="relative group">
      {href ? (
        <a
          href={href}
          className="px-3 py-2 text-xs text-gray-900 hover:text-primary"
          onClick={closeAllDropdowns}
        >
          {label}
        </a>
      ) : (
        <button
          onClick={onClick}
          className="px-3 py-2 text-xs text-gray-900 hover:text-primary flex items-center"
        >
          {label}
          {hasDropdown && <ChevronIcon isOpen={isDropdownOpen} />}
        </button>
      )}
      <span className="absolute left-0 -top-2 w-full h-[1px] bg-primary origin-top scale-y-0 transition-transform duration-400 ease-in-out group-hover:scale-y-100"></span>
      <span className="absolute left-0 -bottom-2 w-full h-[1px] bg-primary origin-bottom scale-y-0 transition-transform duration-400 ease-in-out group-hover:scale-y-100"></span>
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
    hasDropdown = false,
    isDropdownOpen = false,
  }) => (
    <div>
      {href ? (
        <a
          href={href}
          className="block px-3 py-2 text-basm text-gray-900 hover:bg-primary"
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
          className="w-full text-left px-3 py-2 text-basm text-gray-900 hover:bg-primary flex justify-between items-center"
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
          label="Rent by Type of Cars"
          onClick={() => toggleDropdown(dropdownKey)}
          hasDropdown
          isDropdownOpen={isOpen}
        />

        {isOpen && (
          <DropdownMenu>
            {CAR_TYPES.map((type) => {
              const subDropdownKey = `${prefix}${type.name}`;
              const isSubOpen = openSubDropdown === subDropdownKey;

              return (
                <div key={type.name} className="relative">
                  <a
                    href={type.href}
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-primary"
                    onClick={closeAllDropdowns}
                  >
                    {type.name}
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSubDropdown(subDropdownKey);
                    }}
                    className="absolute right-0 top-0 px-4 py-2"
                  >
                    <ChevronIcon isOpen={isSubOpen} />
                  </button>
                  {isSubOpen && (
                    <DropdownMenu position="left-full">
                      {type.categories.map((category) => {
                        const modelDropdownKey = `${prefix}${type.name}-${category.name}`;
                        const isModelOpen =
                          openSubDropdown === modelDropdownKey;

                        return (
                          <div key={category.name} className="relative">
                            <a
                              href={category.href}
                              className="block px-4 py-2 text-xs text-gray-700 hover:bg-primary"
                              onClick={closeAllDropdowns}
                            >
                              {category.name}
                            </a>

                            {isModelOpen && category.models.length > 0 && (
                              <DropdownMenu position="left-full">
                                {category.models.map((model) => (
                                  <a
                                    key={model.name}
                                    href={model.href}
                                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-primary"
                                    onClick={closeAllDropdowns}
                                  >
                                    {model.name}
                                  </a>
                                ))}
                              </DropdownMenu>
                            )}
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
          label="Rent by Brands"
          onClick={() => toggleDropdown(dropdownKey)}
          hasDropdown
          isDropdownOpen={isOpen}
        />

        {isOpen && (
          <DropdownMenu>
            {BRANDS.map((brand) => (
              <a
                key={brand.name}
                href={brand.href}
                className="block px-4 py-2 text-xs text-gray-700 hover:bg-primary"
                onClick={closeAllDropdowns}
              >
                {brand.name}
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
          label="Rent by Type of Cars"
          onClick={() => toggleDropdown("mobileCarTypes")}
          hasDropdown
          isDropdownOpen={isOpen}
        />

        {isOpen && (
          <div className="pl-4">
            {CAR_TYPES.map((type) => {
              const subDropdownKey = `mobile-${type.name}`;
              const isSubOpen = openSubDropdown === subDropdownKey;

              return (
                <div key={type.name}>
                  <div className="flex justify-between items-center">
                    <a
                      href={type.href}
                      className="block px-3 py-2 text-basm text-gray-900 hover:bg-primary"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent immediate navigation
                        closeAllDropdowns();
                        setIsOpen(false);
                        // Optional: Add navigation after slight delay
                        setTimeout(() => {
                          window.location.href = type.href;
                        }, 300);
                      }}
                    >
                      {type.name}
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

                  {isSubOpen && (
                    <div className="pl-4">
                      {type.categories.map((category) => {
                        const modelDropdownKey = `mobile-${type.name}-${category.name}`;
                        const isModelOpen =
                          openSubDropdown === modelDropdownKey;

                        return (
                          <div key={category.name}>
                            <div className="flex justify-between items-center">
                              <a
                                href={category.href}
                                className="block px-3 py-2 text-basm text-gray-900 hover:bg-primary"
                                onClick={(e) => {
                                  e.preventDefault();
                                  closeAllDropdowns();
                                  setIsOpen(false);
                                  setTimeout(() => {
                                    window.location.href = category.href;
                                  }, 300);
                                }}
                              >
                                {category.name}
                              </a>
                            </div>

                            {isModelOpen && category.models.length > 0 && (
                              <div className="pl-4">
                                {category.models.map((model) => (
                                  <a
                                    key={model.name}
                                    href={model.href}
                                    className="block px-3 py-2 text-basm text-gray-900 hover:bg-primary"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      closeAllDropdowns();
                                      setIsOpen(false);
                                      setTimeout(() => {
                                        window.location.href = model.href;
                                      }, 300);
                                    }}
                                  >
                                    {model.name}
                                  </a>
                                ))}
                              </div>
                            )}
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
          label="Rent by Brands"
          onClick={() => toggleDropdown("mobileBrands")}
          hasDropdown
          isDropdownOpen={isOpen}
        />

        {isOpen && (
          <div className="pl-4">
            {BRANDS.map((brand) => (
              <a
                key={brand.name}
                href={brand.href}
                className="block px-3 py-2 text-basm text-gray-900 hover:bg-primary"
                onClick={() => {
                  closeAllDropdowns();
                  setIsOpen(false);
                }}
              >
                {brand.name}
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
        fixed md:static w-full z-50
        bg-black md:bg-white
        ${isHomePage ? "md:!bg-transparent" : "md:shadow-2xl"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:justify-around h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="rotanastar" className="w-30 h-auto" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {NAV_ITEMS.slice(0, 2).map((item) => (
              <NavLink key={item.label} label={item.label} href={item.href} />
            ))}

            {renderCarTypeDropdown()}
            {renderBrandsDropdown()}

            {NAV_ITEMS.slice(2).map((item) => (
              <NavLink key={item.label} label={item.label} href={item.href} />
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
              />
            ))}

            {renderMobileCarTypeDropdown()}
            {renderMobileBrandsDropdown()}

            {NAV_ITEMS.slice(2).map((item) => (
              <MobileNavLink
                key={item.label}
                label={item.label}
                href={item.href}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
