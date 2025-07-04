import React from "react";
import { Layout, ZigzagUnderline } from "../components";
import contactusImg from "../assets/contactusImg.jpg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const Contactus = () => {
  const position = [25.116111, 55.194944];

  return (
    <div>
      <Layout>
        <div className="w-full pt-20 md:pt-10 px-10 md:px-10 flex flex-row">
          <div className=" border-y-1 border-l-1 border-primary py-5 px-10 flex-1">
            <ZigzagUnderline text="Contact Rotana Star Rent a Car"></ZigzagUnderline>
            <div className="text-base flex flex-col gap-2 mt-2">
              <p>
                Rotana Star is a leading luxury and exotic car rental in the
                UAE. With our professional services, transparency, and wide
                range of cars, we can bet you that, with no compromise on
                quality, you will not find a better price at any other Dubai car
                rental agency.
              </p>
              <p>
                We also assure an easy and stress-free car booking process. All
                you need to do is select the car you want from the website, add
                it to your cart, fill in the form, proceed with the payment, and
                your booking is confirmed. If you have any questions or would
                like to change the booking time, we are always here to help you.
              </p>
              <p>
                There are more than 500 car rental companies in the UAE, so why
                chose Rotana Star?
              </p>
              <ol className="list-decimal">
                <li>
                  The best cost-quality ratio in the UAE. We have only
                  premium-class cars, that range from sports, exotic, luxury,
                  and SUVs. All cars are purchased directly from famous and
                  trusted dealers and are less than 3 years old.
                </li>
                <li>
                  Full transparency and no hidden cost. With Rotana Star, you
                  pay only for what is written in the contract.
                </li>
                <li>
                  Competitive prices. We want you to enjoy your driving
                  experience to the fullest, so we make sure that all our cars
                  are at the best price.
                </li>
                <li>
                  Choose what you want. We don’t promise something we don’t have
                  just to lure you to rent from us. From a wide range of
                  Lamborghini, Ferrari, Rolls Royce, Audi, Range Rover, and
                  other luxury cars, we provide only quality service to our
                  valued clients.
                </li>
                <li>
                  We have services that make us different in the market,
                  including chauffeur service for a more relaxing experience,
                  and free pickup and delivery of the car in any Emirate.
                </li>
                <li>
                  Your safety is guaranteed as all cars are inspected regularly
                  to provide ultimate safety and comfort.
                </li>
              </ol>
              <p>
                Our client’s satisfaction is our priority. If you have any
                questions, suggestions, or inquiries, feel free to contact us
                via WhatsApp, or simply fill in the form and one of our
                representatives will contact you as soon as possible.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-5">
                <div className="flex flex-row gap-5 items-center text-sm">
                  <i className="fa-regular fa-calendar-days text-green-500"></i>
                  <p>Available 24/7</p>
                </div>
                <div className="flex flex-row gap-5 items-center text-sm">
                  <i className="fa-solid fa-mobile-screen-button text-green-500"></i>
                  <p>+971 5858888</p>
                </div>
              </div>
              <div className="flex flex-row gap-5 items-center text-sm">
                <i className="fa-solid fa-map-location-dot text-green-500"></i>
                <p>Sartoga Building - Al Barsha - Al Barsha 1 - Dubai, UAE</p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <input
                className="border-b-1 h-10 w-100 border-dashed border-primary p-2 text-primary outline-0 text-xs"
                placeholder="Name"
                type="name"
              />
              <input
                className="border-b-1 h-10 w-100 border-dashed border-primary p-2 text-primary outline-0 text-xs"
                placeholder="Email"
                type="email"
              />
              <input
                className="border-b-1 h-10 w-100 border-dashed border-primary p-2 text-primary outline-0 text-xs"
                placeholder="Phone"
              />
              <texarea
                className="h-20 w-100 border-b-1 border-dashed border-primary p-2 text-primary outline-0 text-xs"
                placeholder="Message"
              ></texarea>
              <button
                className="text-white font-light text-xs bg-primary rounded-xs px-10 py-2
              "
              >
                Send Now
              </button>
            </div>
          </div>
          <div
            className="hidden flex-1 md:flex"
            style={{
              backgroundImage: `URL(${contactusImg})`,
              height: "500px",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>Rotana star</Popup>
          </Marker>
        </MapContainer>
      </Layout>
    </div>
  );
};

export default Contactus;
