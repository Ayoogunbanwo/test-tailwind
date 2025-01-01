import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../component/navbar";
import Footer from "../component/footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import HeroSectioncusdashboard from "../component/herocusdashboard";
import DashboardFeature from "../component/dashboardcard";
import MoveStatus from "../component/movestatus";
import img1 from "../assets/image 14.png";
import img2 from "../assets/image 16.png";
import img3 from "../assets/image 18.png";
import img4 from "../assets/image 19.png";
import useUser from "../config/hooks/useUser";
import useAuth from "../config/hooks/useAuth";






const Customerhomepage = () => {
  const { user, formData, loading } = useUser();
  const {signout} = useAuth();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = React.useState(false);  


  // Fallback avatar if URL is not accessible
  const avatar = "https://avatar.iran.liara.run/public/boy" || "/path-to-default-avatar.png";

  const handleLogout = () => {
    signout();
    localStorage.removeItem("authToken"); // or relevant storage mechanism
    setAuthenticated(false); // Reset authentication state
    console.log("Logout clicked");
    navigate("/customer");
  };




  return (
            <div className="min-h-screen">
              <header>
                <NavBar isLoggedIn={true} avatar={avatar} onLogout={handleLogout} />
              </header>

              <main>
                {/* Hero Section */}
                <HeroSectioncusdashboard isLoggedIn={true} firstname={formData.firstName || "Guest"} onLogout={handleLogout} />

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
                <section className="flex flex-col max-w-full justify-center items-center ">
                  <MoveStatus
                    title="Recent Move Status"
                    columnHeaders={[
                      "Move ID/Name",
                      "Status",
                      "Driver Info",
                      "Estimated Time, Completion Date, Completion Status",
                    ]}
                    endpoint="/move-status"
                  />
                </section>
              </main>

              <footer>
                <Footer />
              </footer>
            </div>
  );
};

export default Customerhomepage;
