import React from "react";
import { Link } from 'react-router-dom';
import NavBar from "../component/navbar";
import Footer from "../component/footer";
import Feature from "../component/whycooseus-card";
import logoimage from "../assets/Vector.png";
import Testimonials from "../component/Testimonialcontainer";
import Movers from "../component/movers";
import Appsoon from "../component/Mobileapp";
import Howitworks from "../component/howitworks";
import img1 from "../assets/cs.png";
import img2 from "../assets/driver.png";
import img3 from "../assets/money.png";   
import img4 from "../assets/admin.png";
import imgstep1 from "../assets/Wavy_Bus-09_Single-10 1.png";
import imgstep2 from "../assets/man-moving-5-stars.png";
import imgstep3 from "../assets/image 3.png";
import moverimg from "../assets/Moversng.jpg"
import Appimg from "../assets/Group 4.png"
import '@fortawesome/fontawesome-free/css/all.min.css';


const images = {
  step1: imgstep1,
  step2: imgstep2,
  step3: imgstep3,
};

const Moverspage = () => {
  const logo = {
    src: logoimage,
    alt: "Company Logo",
  };


  const links = [
    { href: "/", text: "Home", isActive: true },
    { href: "/faq", text: "FAQ", isActive: false },
    { href: "/about-us", text: "About", isActive: false },
    { href: "/contact-us", text: "Contact", isActive: false },
    { href: "/driver", text: "Drivers", isActive: false },
    { href: "/movers", text: "Movers", isActive: false },
  ];

  const buttons = [
    { href: "/signin", text: "Login", isPrimary: true },
  ];

  
  const Moverbuttons = [
  { href: "/signup", text: "Start Moving", isPrimary: true },

];


  return (
<div className="h-screen overflow-auto">
  <header>
    <NavBar logo={logo} links={links} buttons={buttons} avatar="" />
  </header>

  <main>
        <Movers imageSrc={moverimg} buttons={Moverbuttons}></Movers>
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
        <Testimonials className = "mx-auto"></Testimonials> 
        <Appsoon mainText="Get Moving Today"
          descriptionText="Take the hassle out of moving with the New Mover App. Whether you're planning a short distance move or a big relocation, we've got you covered. Download the app now to get started or reach out to our support team for any questions."></Appsoon>
  </main>

  <footer>
    <Footer logo={logo} />
  </footer>
</div>
  );
};

export default Moverspage;
