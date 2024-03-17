import React from 'react'
import axios from "axios";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";

const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
};

const SidePanel = ({ doctorId, ticketPrice }) => {
    const bookingHandler = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {}, config);
            const { session, message, success } = res.data;
            if (!success) {
                throw new Error(message + "Please try again");
            }
            console.log(session);
            if (session.url) {
                window.location.href = session.url;
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div className='shadow-panelShadow p-3 lg:p-5 rounded-md w-[80%] md:w-full'>
            <div className='flex items-center justify-between'>
                <p className='text_para mt-0 font-semibold'>Appointment Price</p>
                <span className='text-md mt-3 md:mt-0 flex items-center justify-center text-headingColor'><FaIndianRupeeSign />{ticketPrice} </span>
            </div>
            <div className='mt-7'>
                <p className='text_para mt-0 font-semibold text-headingColor'>Available Time Slots</p>
                <ul className='mt-3'>
                
                    {/* time slotes */}
                </ul>
            </div>
            <div className='flex justify-center items-center'>
                <button className='btn' onClick={bookingHandler}>Book Appointment</button>
            </div>
        </div>
    )
}

export default SidePanel
