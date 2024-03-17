import Home from "../pages/Home.jsx"
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Contact from "../pages/Contact.jsx";
import Doctors from "../pages/Doctors/Doctors.jsx";
import DoctorDetails from "../pages/Doctors/DoctorDetails.jsx";
import Notifications from "../pages/Notifications.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import DoctorProfile from "../pages/DoctorProfile.jsx";
import Appointments from "../pages/Appointments.jsx";
import About from "../components/About.jsx";
import { Routes, Route } from "react-router-dom";
import LobbyScreen from "../screens/Lobby.jsx";
import RoomPage from "../screens/Room.jsx";
import Nutrients from "../components/Nutrients.jsx";
import CheckoutSuccess from "../pages/CheckoutSuccess.jsx";
const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/doctors/:id' element={<DoctorDetails />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/appointments' element={<Appointments />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/doctor" element={<DoctorProfile />} />
            <Route path="/nutrients" element={<Nutrients />} />
            <Route path="/room" element={<LobbyScreen />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
            <Route path='/checkout-success' element={<CheckoutSuccess />} />
        </Routes>
    )
}

export default Routers