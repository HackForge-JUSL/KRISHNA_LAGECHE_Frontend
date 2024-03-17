import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import Feedback from "./Feedback.jsx"
import SidePanel from './SidePanel.jsx';
import DoctorAbout from "./DoctorAbout.jsx";
import { BASE_URL } from "../../config.js";
import useFetchData from "../../Hooks/useFetchData.jsx";
import Loader from "../../components/Loading.jsx";
import Error from "../../components/Error.jsx";
import { FaStar } from "react-icons/fa6";

const DoctorDetails = () => {
  const [tab, setTab] = useState('about');
  const { id } = useParams();
  const { data: doctor, loading, error } = useFetchData(`${BASE_URL}/doctor/${id}`);
  const {
    name,
    email,
    age,
    gender,
    mobile,
    address,
    experience,
    specialization,
    fees,
  } = doctor;
  return (
    <section>
      <div className='max-w-[1024px] px-5 mx-auto'>
        {loading && <Loader />}
        {error && <Error />}
        {!loading && !error &&
          <div className='grid grid-cols-1 md:grid-cols-3 gap-[40px]'>
            <div className='md:col-span-2'>
              <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-5'>
                <figure className='max-w-[200px]'>
                  <img src="" alt="" className='w-full' />
                </figure>
                <div>
                  <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-sm leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>{specialization}</span>
                  <h3 className='text-headingColor text-xl leading-9 mt-3 font-bold'>{name}</h3>
                  <div className='flex items-center gap-[6px]'>
                    <span className='flex items-center gap-2 text-md lg:text-lg font-semibold text-headingColor'>
                      <FaStar className='text-yellow-400' /> {4.3}
                    </span>
                    <span className='text-md lg:text-lg font-[400] text-textColor'>
                      ({253})
                    </span>
                  </div>
                  <p className='text_para text-lg leading-5 md:text-xl lg:max-w-[390px]'>{email}</p>
                  <p className='text_para text-lg leading-5 md:text-xl lg:max-w-[390px]'>{gender}</p>
                  <p className='text_para text-lg leading-5 md:text-xl lg:max-w-[390px]'>{mobile}</p>
                </div>
              </div>
              <div className='mt-[50px] border-b border-solid border-gray-300'>
                <button onClick={() => setTab("about")} className={`${tab === 'about' && "border-b border-solid border-primaryColor"} py-2 px-5 text-lg leading-7 text-headingColor font-semibold`}>
                  About
                </button>
                <button onClick={() => setTab("feedback")} className={`${tab === 'feedback' && "border-b border-solid border-primaryColor"} py-2 px-5 text-lg leading-7 text-headingColor font-semibold`}>
                  Feedback
                </button>
              </div>
              <div className='mt-[50px]'>
                {
                  tab === 'about' && <DoctorAbout name={name} experience={experience} />
                }
                {
                  tab === 'feedback' && <Feedback />
                }
              </div>
            </div>
            <div>
              <SidePanel doctorId={doctor._id} fees={fees} />
            </div>
          </div>
        }
      </div>
    </section>
  )
}

export default DoctorDetails
