import React from "react";
import { CarCard, Layout } from "../components";
import { useNavigate } from "react-router-dom";

const RentByBrand = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="pt-[50px] flex flex-col items-center ">
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {[...Array(9)].map((_, index) => (
            <CarCard
              onHandleAction={() => navigate("/car/mercedes-cle")}
              className={
                "w-[80vw] " + // Mobile: full-width scroll
                "md:w-[calc(50%-20px)] " + // Tablet: 2 cards per row
                "lg:w-[calc(25%-20px)] " + // Desktop: 4 cards (when not scrolling)
                "xl:w-[300px]" // Force desktop horizontal scroll
              }
              index={index}
              price={"899"}
              imgUrl={
                "https://www.rotanastar.ae/wp-content/uploads/2025/02/DSC05378-scaled.jpg"
              }
              logo={
                "https://www.rotanastar.ae/wp-content/uploads/2021/10/main-06.png"
              }
              title="Mercedes CLE 200 2025"
            />
          ))}
        </div>
        <button className="text-white bg-primary rounded font-bold px-6 py-2">
          View More
        </button>
        <div
          className="w-full h-[50vh] p-10 gap-2 flex flex-col items-center justify-center mt-10 bg-no-repeat bg-center"
          style={{
            backdropFilter: `drop-shadow(8px 8px 10px green)`,

            backgroundSize: "cover",
            backgroundImage: `url("https://imagecdnsa.zigwheels.ae/large/gallery/exterior/20/214/lamborghini-aventador-front-angle-low-view-689455.jpg")`,
          }}
        >
          <h1 className="text-white text-3xl font-bold">
            Rent A Lamborghini Dubai | Free Delivery
          </h1>
          <p className="text-white text-lg md:text-sm">
            Rent A Lamborghini Dubai at best prices & with free delivery option.
            <br />
            Our fleet of Lamborghini rental Dubai has Huracan, STO, Aventador,
            <brr />
            EVO, Urus & more. Book today!
          </p>
        </div>
        <div className="flex px-2 flex-col gap-2 pt-20 text-base">
          <h2 className="text-lg font-bold">
            Why Lamborghini For Rent in Dubai?
          </h2>
          <p>
            Rotana Star’s Lamborghini rental in Dubai service offers best prices
            for all Lamborghini cars. You can book Lamborghini car for a short
            or long stay in Dubai. We’ve got the best deals on the car of your
            dreams, whether you’re visiting or living in Dubai. We have
            competitive rates for all Lamborghini cars in Dubai for rental
            service.
          </p>
          <p>
            A real car-lover can’t resist this masterpiece. We have a great
            collection of Lamborghinis for rent in Dubai, UAE. Get your supercar
            delivered free of charge to your location, and enjoy your stay in
            Dubai with style and comfort.
          </p>
          <p>
            Rent and drive your favorite Lamborghini car anywhere in the UAE
            with Rotana Star in just a few clicks. Navigate to the adventure of
            a lifetime driving in a Lamborghini.
          </p>
          <h1 className="text-xl font-bold text-gray-800">
            Why should i Choose Lamborghini for Rent in Dubai?
          </h1>
          <p>
            Renting a Lamborghini in Dubai is a dream come true for many car
            enthusiasts. Rotana Star is dedicated to making this dream a reality
            by offering convenient Lamborghini rental services. With its
            exceptional speed, luxurious design, and captivating appearance,
            Lamborghini stands out in the market of elite cars. Since its
            inception, Lamborghini has been focused on producing
            high-performance supercars to surpass its Italian rivals. Over the
            past 50 years, the brand has solidified its position as one of the
            most coveted supercar manufacturers in the world, thanks to
            cutting-edge models like the Aventador and Huracan. A Lamborghini is
            the perfect vehicle for those seeking a memorable and luxurious
            driving experience in Dubai. It leaves a lasting impression and
            stands out from the competition. Whether you’re traveling for
            business or visiting for a short vacation, renting a Lamborghini
            allows you to live the high life and explore the city in style.
            Rotana Star offers a wide selection of Lamborghini rental cars from
            trusted car rental in Dubai. As a leading platform for renting
            supercars, we compile the top Lamborghini models available for hire
            from reliable partners across the Emirate. By browsing our verified
            listings, comparing car features, and instantly booking a car on a
            daily rental basis, you can easily find the perfect Lamborghini for
            your needs. Our partnerships with top UAE rental enable us to offer
            competitive Lamborghini rental rates.
          </p>
          <h1 className="text-xl font-bold text-gray-800">
            What to Expect if I Rent Lamborghini with Rotana Star in Dubai?
          </h1>
          <p>
            When you rent a Lamborghini in Dubai through Rotana Star, you can
            expect the best possible prices since you deal directly with local
            car rental. We charge zero commission or booking fees, ensuring a
            transparent and cost-effective rental process. Our mission is to
            provide top-notch Lamborghini rental services with a strong focus on
            safety. Additionally, we offer flexible rental options, including
            daily and weekly rates, to accommodate your preferences.
          </p>
          <p>
            Renting a Lamborghini in Dubai allows you to experience a host of
            high-end features and amenities. You can control various aspects of
            the car, such as safety technology, infotainment systems, climate
            control, driving modes, premium sound speakers, and LCD monitors,
            using the intuitive controls on the dashboard. These features
            enhance your overall driving experience and add to the allure of
            driving a Lamborghini. Rotana Star provides an opportunity to rent a
            Lamborghini in Dubai and be the center of attention while driving
            one of the most prestigious supercars in the world.
          </p>
          <p>
            It’s a chance to discover the thrill and exclusivity that not many
            people get to experience. With our simple booking process, you can
            reserve a Lamborghini and indulge in a unique luxury drive in this
            vibrant city. It’s important to note that to rent a vehicle from the
            ‘Supercars’ category, such as a Lamborghini, you must be at least 23
            years old or above.
          </p>
          <p>
            Lamborghini offers a range of unique car models, and Rotana Star
            allows you to choose from this wide variety at no additional cost.
            Whether you prefer the Lamborghini Huracan, Lamborghini Evo ,
            Lamborghini Urus, or Lamborghini Aventador, you can select your
            favorite model and rent it at the best market rates. These models
            are highly popular and frequently rented for self-drive purposes in
            Dubai.
          </p>
          <p>
            If you’re wondering where to hire a Lamborghini from, Rotana Star is
            the UAE-based company that offers luxury rental cars in Dubai. Our
            platform provides access to Lamborghini Huracan with different
            colors which allows you to enjoy not only the speed, driving
            experience, and stylish appearance but also the beautiful night sky.
            The Lamborghini Aventador, known for its luxury, is another
            excellent option for those seeking a memorable driving exprience in
            Dubai.
          </p>
          <p>
            At Rotana Star, we offer the best rental packages for any
            Lamborghini model you choose. Our attractive daily rates start from
            AED 2500, and we update our offers daily to provide you with the
            most competitive prices. For more details about Lamborghini car
            rentals in Dubai, visit Rotana Star. Don’t miss out on the
            opportunity to drive a Lamborghini on your next trip to Dubai.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default RentByBrand;
