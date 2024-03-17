import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [iconActive, setIconActive] = useState(false);
  const navigate = useNavigate();
  const { user, token , dispatch} = useContext(AuthContext);

  const logoutFunc = () => {
    dispatch({ type: 'LOGOUT' });
    navigate("/");
  };

  return (
    <header className="w-full flex justify-between items-center gap-8 px-4 py-2 sticky top-0 left-0 bg-[#d7f3fb;] z-20 shadow transition-all duration-200">
      <nav className={iconActive ? "nav-active" : ""}>
        <h2 className="nav-logo">
          <NavLink to={"/"}>HealthCare</NavLink>
        </h2>
        <ul className="nav-links">
          <li>
            <NavLink to={"/"} activeClassName="active-link">Home</NavLink>
          </li>
          <li>
            <NavLink to={"/doctors"} activeClassName="active-link">Doctors</NavLink>
          </li>
          <li>
            <NavLink to={"/nutrients"} activeClassName="active-link">Nutrients Tracker</NavLink>
          </li>
          {token && (
            <>
              <li>
                <NavLink to={"/appointments"} activeClassName="active-link">Appointments</NavLink>
              </li>
              <li>
                <NavLink to={"/notifications"} activeClassName="active-link">Notifications</NavLink>
              </li>
              <li>
                <NavLink to={"/contact"} activeClassName="active-link">Contact Us</NavLink>
              </li>
              <li>
                <NavLink to={"/user/profile"} activeClassName="active-link">Profile</NavLink>
              </li>
            </>
          )}
          {!token && !user ? (
            <>
              <li>
                <NavLink
                  to={"/login"}
                  className="btn"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/register"}
                  className="btn"
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <span
                className="btn cursor-pointer"
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
            className="show_menu"
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
