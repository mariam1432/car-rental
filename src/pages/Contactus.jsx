import React, { useState } from "react";
import { Layout, ZigzagUnderline } from "../components";
import contactusImg from "../assets/contactusImg.jpg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import emailjs from "@emailjs/browser";

const Contactus = () => {
  const position = [25.116111, 55.194944];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Phone validation (optional but validate if provided)
    if (
      formData.phone &&
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
        formData.phone
      )
    ) {
      newErrors.phone = "Please enter a valid phone number";
      valid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          title: `Message Enquiry from Arabstar: ${formData.name}`,
        },
        { publicKey: import.meta.env.VITE_PUBLIC_KEY }
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setSubmitStatus("success");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        (error) => {
          console.log("FAILED...", error);
          setSubmitStatus("error");
          // More detailed error handling
          if (error.text.includes("quota")) {
            setSubmitStatus("quota_exceeded");
          }
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Error message component
  const ErrorMessage = ({ message }) => (
    <p className="text-red-500 text-xs mt-1">{message}</p>
  );

  return (
    <Layout>
      <div className="w-full px-4 md:px-20 flex flex-col md:flex-row">
        {/* Left Column - Content & Form */}
        <div className="border-y-1 border-l-1 border-primary py-5 px-4 md:px-10 w-full md:w-1/2">
          <ZigzagUnderline text="Contact Arab Star Rent a Car" />

          <div className="text-xs flex flex-col gap-2 mt-2">
            <p>
              Arab Star is a leading luxury and exotic car rental in the UAE.
              With our professional services, transparency, and wide range of
              cars, we can bet you that, with no compromise on quality, you will
              not find a better price at any other Dubai car rental agency.
            </p>
            <p>
              We also assure an easy and stress-free car booking process. All
              you need to do is select the car you want from the website, add it
              to your cart, fill in the form, proceed with the payment, and your
              booking is confirmed. If you have any questions or would like to
              change the booking time, we are always here to help you.
            </p>
            <p>
              There are more than 500 car rental companies in the UAE, so why
              chose Arab Star?
            </p>
            <ol className="list-decimal">
              <li>
                The best cost-quality ratio in the UAE. We have only
                premium-class cars, that range from sports, exotic, luxury, and
                SUVs. All cars are purchased directly from famous and trusted
                dealers and are less than 3 years old.
              </li>
              <li>
                Full transparency and no hidden cost. With Arab Star, you pay
                only for what is written in the contract.
              </li>
              <li>
                Competitive prices. We want you to enjoy your driving experience
                to the fullest, so we make sure that all our cars are at the
                best price.
              </li>
              <li>
                Choose what you want. We don’t promise something we don’t have
                just to lure you to rent from us. From a wide range of
                Lamborghini, Ferrari, Rolls Royce, Audi, Range Rover, and other
                luxury cars, we provide only quality service to our valued
                clients.
              </li>
              <li>
                We have services that make us different in the market, including
                chauffeur service for a more relaxing experience, and free
                pickup and delivery of the car in any Emirate.
              </li>
              <li>
                Your safety is guaranteed as all cars are inspected regularly to
                provide ultimate safety and comfort.
              </li>
            </ol>
            <p>
              Our client’s satisfaction is our priority. If you have any
              questions, suggestions, or inquiries, feel free to contact us via
              WhatsApp, or simply fill in the form and one of our
              representatives will contact you as soon as possible.
            </p>
          </div>
          {/* Contact Info - Responsive Layout */}
          <div className="flex flex-col mt-4">
            <div className="flex flex-col md:flex-row md:gap-5">
              <div className="flex items-center gap-2 text-sm mb-2 md:mb-0">
                <i className="fa-regular fa-calendar-days text-green-500"></i>
                <p>Available 24/7</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <i className="fa-solid fa-mobile-screen-button text-green-500"></i>
                <p>+971523142716</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm mt-2">
              <i className="fa-solid fa-map-location-dot text-green-500"></i>
              <p className="text-sm">
                Arab Star Car Rentals, Street 16 A, Alqouz- Dubai, UAE
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-3 mt-6"
          >
            <div className="w-full">
              <input
                className={`border-b-1 h-10 w-full border-dashed ${
                  errors.name ? "border-red-500" : "border-primary"
                } p-2 
placeholder-primary text-gray-800 outline-0 text-sm`}
                placeholder="Name *"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <ErrorMessage message={errors.name} />}
            </div>

            <div className="w-full">
              <input
                className={`border-b-1 h-10 w-full border-dashed ${
                  errors.email ? "border-red-500" : "border-primary"
                } p-2 
placeholder-primary text-gray-800 outline-0 text-sm`}
                placeholder="Email *"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <ErrorMessage message={errors.email} />}
            </div>

            <div className="w-full">
              <input
                className={`border-b-1 h-10 w-full border-dashed ${
                  errors.phone ? "border-red-500" : "border-primary"
                } p-2 
placeholder-primary text-gray-800 outline-0 text-sm`}
                placeholder="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <ErrorMessage message={errors.phone} />}
            </div>

            <div className="w-full">
              <textarea
                className={`h-32 w-full border-b-1 border-dashed ${
                  errors.message ? "border-red-500" : "border-primary"
                } p-2 
placeholder-primary text-gray-800 outline-0 text-sm`}
                placeholder="Message *"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <ErrorMessage message={errors.message} />}
            </div>

            <button
              type="submit"
              className="text-white font-light text-sm bg-primary rounded-xs px-10 py-2 mt-2 hover:bg-opacity-90 transition-colors disabled:bg-opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Now"}
            </button>

            {/* Enhanced Status Messages */}
            {submitStatus === "success" && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-sm">
                <i className="fas fa-check-circle mr-2"></i>
                Thank you! Your message has been sent successfully. We'll
                contact you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                <i className="fas fa-exclamation-circle mr-2"></i>
                Oops! There was an error sending your message. Please try again
                later.
              </div>
            )}

            {submitStatus === "quota_exceeded" && (
              <div className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded text-sm">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                Our email quota has been reached. Please contact us directly at
                info@Arabstar.com
              </div>
            )}
          </form>
        </div>

        {/* Right Column - Image (hidden on mobile) */}
        <div
          className="hidden md:flex md:w-1/2"
          style={{
            backgroundImage: `URL(${contactusImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px",
          }}
        />
      </div>

      {/* Map Section - Responsive Height */}
      <div className="w-full x-4 md:px-0 pt-20">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>Arab star</Popup>
          </Marker>
        </MapContainer>
      </div>
    </Layout>
  );
};

export default Contactus;
