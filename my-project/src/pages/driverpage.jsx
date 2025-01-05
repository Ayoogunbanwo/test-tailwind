import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; 
import NavBar from "../component/navbar";
import Footer from "../component/footer";
import DriveIncome from "../component/DriveIncome";
import Testimonials from "../component/Testimonialcontainer";
import Appsoon from "../component/Mobileapp";
import Driveimg from "../assets/Hero.png"
import '@fortawesome/fontawesome-free/css/all.min.css';
import ServicesSection from "../component/Services";
import ProductCarousel from "../component/Carousel";
import ProcessFlow from "../component/howitworksmovers";



const Driverpage = () => {

const navigate = useNavigate();


  const handleLogout = () => {
    console.log("Logout clicked");
    // Perform logout actions like clearing tokens or session data
    navigate("/customer");
  };

  const Driverbuttons = [
    { to: "/signup", text: "Start Driving", isPrimary: true },
  ];
  

  return (
    <div className="h-screen p-4">
        <header>
        <NavBar isLoggedIn={false} onLogout={handleLogout} />
        <DriveIncome imageSrc={Driveimg} buttons={Driverbuttons}></DriveIncome>
       </header>


      <main className="mx-auto px-4 sm:px-6 lg:px-8">
        
        <ServicesSection></ServicesSection>
        <ProcessFlow></ProcessFlow> 
        <ProductCarousel />
        <Testimonials />
        <Appsoon mainText="Get Moving Today" descriptionText="Take the hassle out of moving with the New Mover App. Whether you're planning a short distance move or a big relocation, we've got you covered. Download the app now to get started or reach out to our support team for any questions." />
        
        </main>

        <footer>
          <Footer />
          </footer>
    </div>
  );
};

export default Driverpage;
