import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

const Header = () => {
  const [iconActive, setIconActive] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    localStorage.getItem("token")
      ? localStorage.getItem("token")
      : ""
  );

  const logoutFunc = () => {
    // dispatch(setUserInfo({}));
    navigate("/login");
  };

  return (
    <header className="w-full flex justify-between items-center gap-8 px-4 py-2 sticky top-0 left-0 bg-light-blue z-20 shadow transition-all duration-200">
      <nav className={`w-full flex justify-between items-center ${iconActive ? 'flex-col' : 'flex-row'}`}>
        <h2 className="nav-logo">
          <NavLink to={"/"}>HealthBooker</NavLink>
        </h2>
        <ul className={`nav-links flex ${iconActive ? 'fixed top-0 left-0 w-full h-full bg-light-blue flex-col justify-center items-center gap-12 transform transition-all duration-300' : 'gap-8'}`}>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/doctors"}>Doctors</NavLink>
          </li>
          {token && user.isAdmin && (
            <li>
              <NavLink to={"/dashboard/users"}>Dashboard</NavLink>
            </li>
          )}
          {token && !user.isAdmin && (
            <>
              <li>
                <NavLink to={"/appointments"}>Appointments</NavLink>
              </li>
              <li>
                <NavLink to={"/notifications"}>Notifications</NavLink>
              </li>
              <li>
                <NavLink to={"/applyfordoctor"}>Apply for doctor</NavLink>
              </li>
              <li>
                <NavLink to={"/#contact"}>Contact Us</NavLink>
              </li>
              <li>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
            </>
          )}
          {!token ? (
            <>
              <li>
                <NavLink
                  className="btn"
                  to={"/login"}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="btn"
                  to={"/register"}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <span
                className="btn"
                onClick={logoutFunc}
              >
                Logout
              </span>
            </li>
          )}
        </ul>
      </nav>
      <div className="menu-icons">
        {!iconActive && (
          <FiMenu
            className="menu-open"
            onClick={() => {
              setIconActive(true);
            }}
          />
        )}
        {iconActive && (
          <RxCross1
            className="menu-close"
            onClick={() => {
              setIconActive(false);
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
