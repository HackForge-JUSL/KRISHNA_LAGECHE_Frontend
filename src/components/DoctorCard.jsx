import React from 'react'
import { Link } from "react-router-dom"
import { BiRightArrowAlt } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";

const DoctorCard = ({ doctor }) => {
  const { name, specialization, experience } = doctor;
  return (
    <div className='p-3 lg:p-5 shadow-panelShadow rounded-sm'>
      <div>
        <img className='w-full' src="/" alt="" />
      </div>
      <h2 className='text-lg lg:text-xl text-headingColor font-[700] mt-3 lg:mt-5'>{name}</h2>
      <div className='mt-2 lg:mt-4 flex items-center justify-between'>
        <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-md lg:text-lg font-semibold rounded'>
          {specialization}
        </span>
        <div className='flex items-center gap-2'>
          <span className='flex items-center gap-1 text-md lg:text-lg font-semibold text-headingColor'>
            <FaStar className='text-lg md:text-xl text-yellow-400' /> (5)
          </span>
        </div>
      </div>
      <div className='mt-[14px] lg:mt-3 flex items-center justify-between'>
        <p className='text-[14px] font-[400] text-textColor'>
          Experience of {" "} {experience} {" "} years
        </p>
        <div>
          <Link to={`/doctors/${doctor._id}`}
            className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'
          >
            <BiRightArrowAlt className='group-hover:text-white text-xl' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard
