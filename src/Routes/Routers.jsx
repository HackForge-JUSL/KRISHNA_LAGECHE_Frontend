import Home from "../pages/Home.jsx"
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Contact from "../pages/Contact.jsx";
import Doctors from "../pages/Doctors/Doctors.jsx";
import DoctorDetails from "../pages/Doctors/DoctorDetails.jsx";
import { Routes, Route } from "react-router-dom";

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/doctors/:id' element={<DoctorDetails />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
        </Routes>
    )
}

export default Routers