import React from "react";
import NavBar from "../component/navbar";
import Footer from "../component/footer";
import logoimage from "../assets/Vector.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import HeroSectioncusdashboard from "../component/herocusdashboard";   
import dashboardimg from "../assets/Dashboard.jpg";
import DashboardFeature from "../component/dashboardcard";
import MoveStatus from "../component/movestatus";
import img1 from "../assets/image 14.png";
import img2 from "../assets/image 16.png";
import img3 from "../assets/image 18.png";
import img4 from "../assets/image 19.png";




const Customerhomepage = () => {
  const logo = {
    src: logoimage,
    alt: "Company Logo",
  };

const handleLogout = () => {
  // Clear the session token
  sessionStorage.removeItem('sessionToken'); // Ensure the key matches your app's token name
  // Redirect to the /customer page
  window.location.href = '/customer';
};


  const links = [
    { href: "/dashboard", text: "Home", isActive: true },
    { href: "/contact-us", text: "Contact", isActive: false },
 
    ];



 const buttons = [
    { href: "/", text: "Request a Move", isPrimary: true },
    { href: "/", text: "Track your Move", isPrimary: false },
  ];
  
 const customerhomebuttons = [
  { text: 'Logout', onClick: handleLogout, isPrimary: false }
]   
       
 const Avatarlink = [
  { href: "/customer", text: "Request a Move", isPrimary: true } 
]  
  
  return (
<div className="min-h-screen">
        <header>
         <NavBar logo={logo} links={links} buttons={customerhomebuttons} avatar="https://avatar.iran.liara.run/public/boy" avatarHref={Avatarlink}     />
        </header>

        <main>
                        {/* Hero Section */}
            <HeroSectioncusdashboard imageSrc={dashboardimg} buttons={buttons} />

                    {/* Quick Actions Section */}
        <section className="flex flex-col max-w-full justify-center items-center px-4 mb-12">
                <h2 className="text-black text-3xl sm:text-2xl md:text-4xl lg:text-5xl font-bold font-['Open Sans'] text-center my-12">
                Quick Actions
                </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full my-6">
                    <DashboardFeature 
                        imageSrc={img1} 
                        title="Request a Move" 
                        description="Start a new moving request." 
                    />
                    <DashboardFeature 
                        imageSrc={img2} 
                        title="History" 
                        description="View past moves and payments" 
                    />
                    <DashboardFeature 
                        imageSrc={img3} 
                        title="Notifications" 
                        description="Access updates or reminders" 
                    />
                    <DashboardFeature 
                        imageSrc={img4} 
                        title="Support" 
                        description="Contact customer service" 
                    />
            </div>
        </section>

        {/* Recent Move Status Section */}
        <section className="flex flex-col max-w-full justify-center items-center px-4">
            <MoveStatus  
            title="Recent Move Status" 
            columnHeaders={["Move ID/Name", "Status", "Driver Info", "Estimated Time, Completion Date, Completion Status"]} 
            endpoint="/move-status" 
            />
        </section>
        </main>

        <footer>
                <Footer logo={logo} />
        </footer>
</div>
  );
};

export default Customerhomepage;
