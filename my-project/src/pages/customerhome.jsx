import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../component/navbar";
import Footer from "../component/footer";
import Feature from "../component/whycooseus-card";
import HeroSection from "../component/hero section";
import '@fortawesome/fontawesome-free/css/all.min.css';
import imgstep1 from "../assets/Wavy_Bus-09_Single-10 1.png";
import imgstep2 from "../assets/man-moving-5-stars.png";
import imgstep3 from "../assets/image 3.png";
import img1 from "../assets/cs.png";
import img2 from "../assets/driver.png";
import img3 from "../assets/money.png";   
import img4 from "../assets/admin.png";
import VANIMAGE from "../assets/Vanimage.jpg";
import Testimonials from "../component/Testimonialcontainer";
import Appsoon from "../component/Mobileapp";
import Howitworks from "../component/howitworks";

const images = {
  step1: imgstep1,
  step2: imgstep2,
  step3: imgstep3,
};

const Customerpage = () => {
  const navigate = useNavigate();

  // Function to set a cookie with expiry
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  };

  // Function to get a cookie by name
  const getCookie = (name) => {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName)) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  };

  // Function to delete a cookie by name
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  useEffect(() => {
    // Check if the user registered through the landing page
    const registeredThroughLanding = getCookie("registeredThroughLanding");

    if (registeredThroughLanding === "true") {
      // Clear the cookie
      deleteCookie("registeredThroughLanding");

      // Redirect to login or show a login prompt
      alert("Please log in to continue.");
      navigate("/login"); // Redirect to your login page
    }
  }, [navigate]);

  const handleLogout = () => {
    console.log("Logout clicked");
    // Perform logout actions like clearing tokens or session data
    navigate("/customer");
  };

  const Herobuttons = [
    { to: "/signup", text: "Schedule a Move", isPrimary: false },
  ];

  return (
    <div className="h-screen overflow-auto">
      <header>
          <NavBar isLoggedIn={false} onLogout={handleLogout} />
      </header>

      <main>
        <HeroSection imageSrc={VANIMAGE} buttons={Herobuttons} />

        <div className="flex flex flex-col">
          <p className="text-black text-3xl sm:text-xl md:text-3xl lg:text-5xl font-bold font-['open-sans'] text-center pt-12">Why Choose Us</p>
          <div className="mx-auto grid grid-cols-2 md:flex flex-row">
            <Feature imageSrc={img1} title="Effortless Service" description="Seamless, smooth, and easy service" />
            <Feature imageSrc={img2} title="Reliable Drivers" description="Reliable, punctual, expert drivers ensured" />
            <Feature imageSrc={img3} title="Dependable Haulers" description="Professional, timely, and safe movers" />
            <Feature imageSrc={img4} title="Transparent Pricing" description="Clear, honest, upfront pricing guaranteed" />
          </div>
        </div>

        <div className="mt-12 flex flex-col">
          <div>
            <p className="text-black text-3xl sm:text-xl md:text-3xl lg:text-5xl font-bold font-['open-sans'] text-center pt-12">How It Works</p>
            <Howitworks images={images} />
          </div>
        </div>
        <Testimonials className="mx-auto" />
        <Appsoon mainText="Get Moving Today" descriptionText="Take the hassle out of moving with the New Mover App. Whether you're planning a short distance move or a big relocation, we've got you covered. Download the app now to get started or reach out to our support team for any questions." />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Customerpage;