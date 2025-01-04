import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Customerpage from './pages/customerhome';
import Driverpage from './pages/driverpage';
import Moverspage from './pages/movers'; 
import SignUp from './pages/signup';
import Signin from './pages/signin';
import VerifyEmail from './pages/verifyemail';
import AddressAutocomplete from './pages/emailverification';
import CreateAccount from './pages/createaccount';
import ResetPassword from './pages/passwordreset';
import ForgotPassword from './pages/forgotpassword';
import ForgotPasswordphone from './pages/forgotpasswordphone';
import OtpReceived from './pages/recieveOTP';
import Congratulations from './pages/congratulations';
import Userdetails from './pages/emailverification';
import { UserProvider } from "./config/UserContext";
import { AuthProvider } from './config/AuthContext';
import PrivateRoute from "./component/privateroute";
import ProfileForm from './pages/profile';
import CustomerDashboard from './pages/dashboard3';
import MoveRequestForm from './pages/Moverequestform';
import NotificationHistory from './pages/Notification';
import ServicesSection from './component/Services';
import ScrollContainer from './component/ScrollContainer';
import HowItWorks from './component/Workings';
import FAQ from './pages/FAQ';
import MoveDetailsPage from './pages/MoveHistory';
import ProductCarousel from './component/Carousel';

function App() {
  return (
    <Router>
      <div>
        <UserProvider>
        <AuthProvider>  
              <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/customer" element={<Customerpage />} /> 
                <Route path="/driver" element={<Driverpage />} /> 
                <Route path="/movers" element={<Moverspage />} /> 
                <Route path="/signup" element={<SignUp />} /> 
                <Route path="/signin" element={<Signin />} /> 
                <Route path="/verifyemail" element={<VerifyEmail />} /> 
                <Route path="/test" element={<AddressAutocomplete />} /> 
                <Route path="/createaccount" element={<CreateAccount />} /> 
                <Route path="/passwordreset" element={<ResetPassword />} /> 
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/forgotpasswordphone" element={<ForgotPasswordphone />} /> 
                <Route path="/recieveOTP" element={<OtpReceived />} />
                <Route path="/congratulations" element={<Congratulations />} />
              <Route path="/emailverification" element={<Userdetails />} />
              <Route path="/profile" element={<ProfileForm />} />
              <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
              <Route path="/MoveRequestForm" element={<MoveRequestForm />} />
              <Route path="/Notification" element={<NotificationHistory />} />
              <Route path="/Services" element={<ServicesSection />} />
              <Route path="/ScrollContainer" element={<ScrollContainer />} />
              <Route path="/HowItWorks" element={<HowItWorks />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/MoveHistory" element={<MoveDetailsPage />} />
              <Route path="/ProductCarousel" element={<ProductCarousel />} />

            </Routes>
            </AuthProvider>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;

