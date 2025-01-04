import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import NavBar from "../component/navbar";
import Footer from "../component/footer";
import Testimonials from "../component/Testimonialcontainer";
import Movers from "../component/movers";
import Appsoon from "../component/Mobileapp";
import Howitworks from "../component/howitworks";
import imgstep1 from "../assets/Wavy_Bus-09_Single-10 1.png";
import imgstep2 from "../assets/man-moving-5-stars.png";
import imgstep3 from "../assets/image 3.png";
import moverimg from "../assets/mvimg.jpg"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useUser } from '../config/useUser';
import WhyChooseUsmovers from "../component/whychooseusmovers";
import ProcessFlow from "../component/howitworksmovers";


const images = {
  step1: imgstep1,
  step2: imgstep2,
  step3: imgstep3,
};

const Moverspage = () => {
 const { logout } = useUser();
const navigate = useNavigate();

  
const handleLogout = () => {
    logout();
    localStorage.removeItem("authToken"); 
    navigate("/movers");
  };

 const Moverbuttons = [
  { to: "/signup", text: "Start Moving", isPrimary: false },

];


  return (
    <div className="h-screen">
      <header>
            <NavBar isLoggedIn={false} onLogout={handleLogout} />
            <Movers imageSrc={moverimg} buttons={Moverbuttons}></Movers>
      </header>

      <main className="mx-auto px-4 sm:px-6 lg:px-8"> 
            <WhyChooseUsmovers></WhyChooseUsmovers>
            <ProcessFlow></ProcessFlow> 
            <Testimonials className = "mx-auto"></Testimonials> 
            <Appsoon mainText="Get Moving Today"
              descriptionText="Take the hassle out of moving with the New Mover App. Whether you're planning a short distance move or a big relocation, we've got you covered. Download the app now to get started or reach out to our support team for any questions."></Appsoon>
      </main>

      <footer>
      <Footer />
      </footer>
    </div>
  );
};

export default Moverspage;
