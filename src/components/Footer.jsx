import React from 'react'
import { Link } from "react-router-dom";
import { AiFillYoutube, AiFillGithub, AiOutlineLinkedin, AiFillInstagram } from "react-icons/ai"

const socialLinks = [
  {
    path: "https://github.com/krishanu7",
    icon: <AiFillGithub className="group-hover:text-white w-5 h-6" />
  },
  {
    path: "https://www.youtube.com/krishanu1137",
    icon: <AiFillYoutube className="group-hover:text-white w-5 h-6" />
  },
  {
    path: "https://www.linkedin.com/in/krishanu-saha-163762209/",
    icon: <AiOutlineLinkedin className="group-hover:text-white w-5 h-6" />
  },
  {
    path: "https://www.instagram.com/krishanu_saha_7/",
    icon: <AiFillInstagram className="group-hover:text-white w-5 h-6" />
  }
];
const quickLinks01 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/",
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact"
  }
]
const quickLinks02 = [
  {
    path: "/doctors",
    display: "Doctor",
  },
  {
    path: "/appointments",
    display: "Request an Appointment",
  },
  {
    path: "/",
    display: "Find a Location",
  },
  {
    path: "/",
    display: "Get a Option"
  }
]
const quickLinks03 = [
  {
    path: "/",
    display: "Donate",
  }
  ,
  {
    path: "/contact",
    display: "Contact"
  }
]
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='pb-16 pt-10'>
      <div className='container'>
        <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px] ml-[10%] md:ml-0'>
          <div>
            <p className='text-[16px] font-[400] text-textColor mt-4'>
              Copyright © {year} developed by Krishna Lageche all right reserved.
            </p>
            <div className='flex items-center gap-3 mt-4'>
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className='w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none'
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className='text-[20px] font-[700] mb-6 text-headingColor'>Quick Links</h2>
            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className='mb-4'>
                  <Link to={item.path} className='text-[16px] font-[400] text-textColor hover:text-primaryColor'>
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className='text-[20px] font-[700] mb-6 text-headingColor'>I want to:</h2>
            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className='mb-4'>
                  <Link to={item.path} className='text-[16px] font-[400] text-textColor hover:text-primaryColor'>
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className='text-[20px] font-[700] mb-6 text-headingColor'>Support</h2>
            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className='mb-4'>
                  <Link to={item.path} className='text-[16px] font-[400] text-textColor hover:text-primaryColor'>
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer
