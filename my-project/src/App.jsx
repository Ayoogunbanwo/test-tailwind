import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Customerpage from './pages/customerhome';
import Driverpage from './pages/driverpage';
import Moverspage from './pages/movers'; 
import SignUp from './pages/signup';
import Signin from './pages/signin';
import VerifyEmail from './pages/verifyemail';
import AddressAutocomplete from './pages/test';
import CreateAccount from './pages/createaccount';
import ResetPassword from './pages/passwordreset';
import ForgotPassword from './pages/forgotpassword';
import ForgotPasswordphone from './pages/forgotpasswordphone';
import OtpReceived from './pages/recieveOTP';
import Congratulations from './pages/congratulations';
import Customerhomepage from './pages/customerhomepage';

function App() {
  return (
    <Router>
      <div>
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
          <Route path="/dashboard" element={<Customerhomepage />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;

