import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../component/navbar";
import Footer from "../component/footer";
import HeroSection from "../component/hero section";
import Testimonials from "../component/Testimonialcontainer";
import Appsoon from "../component/Mobileapp";
import Howitworks from "../component/howitworks";
import imgstep1 from "../assets/Wavy_Bus-09_Single-10 1.png";
import imgstep2 from "../assets/man-moving-5-stars.png";
import imgstep3 from "../assets/image 3.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ServicesSection from "../component/Services";
import ProductCarousel from "../component/Carousel";



const images = {
  step1: imgstep1,
  step2: imgstep2,
  step3: imgstep3,
};

const Home = () => {
const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout clicked");
    // Perform logout actions like clearing tokens or session data
    navigate("/customer");
  };

  const Herobuttons = [
    { to: "/signup", text: "Register", isPrimary: true },
  
  ];


  return (
    <div className="h-screen">
      <header>
      <NavBar isLoggedIn={false} onLogout={handleLogout} />
      
      <HeroSection buttons={Herobuttons} />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
       <ServicesSection></ServicesSection>
        <div className="mt-12 flex flex-col">
          <div>
            <p className="text-black text-3xl sm:text-xl md:text-3xl lg:text-5xl font-bold font-['open-sans'] text-center">How It Works</p>
            <Howitworks images={images} />
          </div>
        </div>
        <div>
        <ProductCarousel />

        
        </div>
        <Testimonials />
        <Appsoon mainText="Get Moving Today" descriptionText="Take the hassle out of moving with the New Mover App. Whether you're planning a short distance move or a big relocation, we've got you covered. Download the app now to get started or reach out to our support team for any questions." />
      </main>

       <footer>
        <Footer />
       </footer>
      </div>
  );
};

export default Home;
