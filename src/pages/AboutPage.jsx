import React from "react";
import { Layout, Navbar, ZigzagUnderline } from "../components";

const AboutPage = () => {
  return (
    <Layout>
      <section
        className="relative min-h-screen flex flex-col md:flex-row overflow-hidden my-0 ml-0 md:my-16 md:ml-20"
        style={{
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB3wXijJ7cxPRVBIh30p00m9RUkmeArc8g6w&s)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="relative bg-[#f5f5f5] md:w-1/2 w-full p-18 md:p-8 clip-diagonal shadow-2xl z-10">
          <ZigzagUnderline text="About Rotana Star"></ZigzagUnderline>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mr-0 md:mr-20">
            Providing only the best cars at the most competitive price is the
            core value that Rotana Star is following. Our concept is built
            entirely around what the client wants. We pride ourselves as the
            leading UAE car rental company. Having our fleet with cars that are
            less than 3 years old and carefully taken care of, allows us to keep
            them in pristine condition, always inspected and sanitized. The fact
            that we own all our cars makes us unique and our prices the best in
            the market too.
            <br />
            <br />
            So any customer can choose the car based on their personal
            preferences, budget, and purposes. Every vehicle, like a person, is
            unique, with its soul and signature. We have a wide range of sports,
            luxury, exotic, convertible, and economic cars as well as SUVs for
            any occasion or expectation.
            <br />
            <br />
            Many of our clients know exactly what they want to rent, but if you
            are confused and need advice, we are happy to help. Our client
            satisfaction is our priority, so we have created an ideal formula
            that helps us to put smiles on the customers’ faces. Amazing value
            of money combined with top-notch service gives an unforgettable
            experience.
            <br />
            <br />
            To enjoy it more, we made sure that the car booking process with
            Rotana Star is easy and stress-free. Simply select the car you want,
            leave a request online or call us to book it. For the delivery, we
            offer 2 options. You can either come to pick up the car from our
            Dubai showroom, or the car can be handed over to you anywhere in the
            UAE.
          </p>
        </div>
      </section>
      <section
        className="relative min-h-screen flex flex-col md:flex-row overflow-hidden my-0 ml-0 md:my-16 md:ml-20"
        style={{
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB3wXijJ7cxPRVBIh30p00m9RUkmeArc8g6w&s)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="relative bg-[#f5f5f5] md:w-1/2 w-full p-18 md:p-8 clip-diagonal shadow-2xl z-10">
          <ZigzagUnderline text="Where are you located?"></ZigzagUnderline>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mr-0 md:mr-20">
            We are conveniently located in the heart of Al Barsha, right next to
            the Mall of the Emirates in Dubai.
          </p>
          <h3 className="text-primary text-xl font-bold">
            Do you deliver all over the UAE?{" "}
          </h3>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mr-0 md:mr-20">
            Yes. No matter in which Emirate, we provide free delivery for any
            car to the house, office, or airport.
          </p>
          <h3 className="text-primary text-xl font-bold">
            Do you have a chauffeur service?
          </h3>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mr-0 md:mr-20">
            Yes, for those who want to enjoy their time to the fullest,
            exploring and appreciating the views and having fun, we provide a
            chauffeur as well as limousine service.
          </p>
          <h3 className="text-primary text-xl font-bold">
            Why is it better to rent a car with Rotana Star?
          </h3>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mr-0 md:mr-20">
            Many of you want to enjoy your time to the fullest without waiting
            for public transport or being on the lookout for a taxi. At Rotana
            Star we have a fleet of cars ranging from exotic Lamborghini and
            Ferrari, luxury Mercedes and Range Rover, sports Bentley and
            McLaren, SUVs Porsche and Cadillac to economy Kia and Mazda. With a
            great variety of choices available for any pocket and preferences,
            we make sure that everyone finds the ideal car for rent. Our
            ‘can-do’ policy and exceptional customer service help to make your
            renting and driving experience bespoke. We know how important it is
            to communicate smoothly and understand what our customers are
            looking for, so the whole team works closely to ensure that all your
            requests and expectations are fulfilled.
          </p>
          <h3 className="text-primary text-xl font-bold">Our Values:</h3>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mr-0 md:mr-20">
            Transparency and no hidden cost. You pay only for what is in the
            contract.
            <br />
            Respect. And it comes to both our clients and teammates as
            communication is the foundation of long-lasting relationships.
            <br />
            The best cost-quality ratio. We want our customers to be able to
            rent a car they have been dreaming of, so having our own fleet
            allows us to rent even exotic cars with the best prices on the
            market.
            <br /> Honesty. We don’t advertise or promise something we don’t
            deliver. All our cars listed on the website are available for
            booking.
            <br />
            Client focus. We treat every client like a family member. We are
            happy to see customers satisfied with their choice and our service.
            Of course, no one is perfect and sometimes complaints happen, so we
            make sure to take them into account and improve ourselves to ensure
            they do not happen again.
            <br /> Safety. With the current situation, we take sanitization
            seriously to provide ultimate car cleanliness and safety to every
            client.
            <br /> Diversity. We always make sure to have new editions not only
            in models but also in colors for our premium car fleet, purchased
            directly from certified dealers.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
