import React from "react";
import { Layout, Navbar, ZigzagUnderline } from "../components";

const AboutPage = () => {
  return (
    <Layout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-64 md:h-96 w-full bg-gray-900 flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80')] bg-cover bg-center opacity-50"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              About Arab Star
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Premium car rental service in the heart of Dubai
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* About Section */}
          <section className="mb-20">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <ZigzagUnderline text="Our Story" className="mb-8" />
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Providing only the best cars at the most competitive price is
                  the core value that Arab Star is following. Our concept is
                  built entirely around what the client wants.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We pride ourselves as the leading UAE car rental company.
                  Having our fleet with cars that are less than 3 years old and
                  carefully taken care of, allows us to keep them in pristine
                  condition, always inspected and sanitized. The fact that we
                  own all our cars makes us unique and our prices the best in
                  the market too.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  So any customer can choose the car based on their personal
                  preferences, budget, and purposes. Every vehicle, like a
                  person, is unique, with its soul and signature. We have a wide
                  range of sports, luxury, exotic, convertible, and economic
                  cars as well as SUVs for any occasion or expectation.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
                    alt="Luxury cars"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1592853625601-bb9d23da12fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Car "
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2">
                <ZigzagUnderline text="Our Values" className="mb-8" />
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      Transparency
                    </h3>
                    <p className="text-gray-700">
                      No hidden costs. You pay only for what is in the contract.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      Respect
                    </h3>
                    <p className="text-gray-700">
                      For both our clients and teammates as communication is the
                      foundation of long-lasting relationships.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      Best Value
                    </h3>
                    <p className="text-gray-700">
                      We want our customers to rent their dream car with the
                      best prices on the market.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <ZigzagUnderline
              text="Frequently Asked Questions"
              className="mb-12 text-center"
            />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Where are you located?
                </h3>
                <p className="text-gray-700">
                  We are conveniently located in the heart of Al Barsha, right
                  next to the Mall of the Emirates in Dubai.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Do you deliver all over the UAE?
                </h3>
                <p className="text-gray-700">
                  Yes. No matter in which Emirate, we provide free delivery for
                  any car to the house, office, or airport.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Do you have a chauffeur service?
                </h3>
                <p className="text-gray-700">
                  Yes, for those who want to enjoy their time to the fullest,
                  exploring and appreciating the views and having fun, we
                  provide a chauffeur as well as limousine service.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-primary mb-3">
                  Why choose Arab Star?
                </h3>
                <p className="text-gray-700">
                  With a great variety of choices available for any pocket and
                  preferences, we make sure that everyone finds the ideal car.
                  Our 'can-do' policy and exceptional customer service make your
                  renting experience bespoke.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
