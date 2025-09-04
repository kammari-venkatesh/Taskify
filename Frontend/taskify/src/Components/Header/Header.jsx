import "./index.css";
import Cookie from 'js-cookie';
import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
const Header = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const User = Cookie.get("username");

  const handleLogout = () => {
    Cookie.remove("jwt");
    Cookie.remove("username");
    navigate("/login");
  };

  return (
    <>
      <div className="medium-screen-view">
        <div className="header-container">
          <img
            src='https://res.cloudinary.com/dwatnpdcy/image/upload/Screenshot_2025-08-28_185237_ppyw9y.png'
            className="company-logo"
            alt="Logo"
          />
          <ul className="nav-items">
            <li><Link to="/" className="link">Projects</Link></li>
            <li><Link to="/team" className="link">Team</Link></li>
            <li><Link to="/dashboard" className="link">Dashboard</Link></li>
          </ul>
          <div className="account-section">
            <h2 className="username">{User}</h2>
            <button
              className="onclick"
              onClick={() => setShowLogout(prev => !prev)}
            >
              <img
                src="https://res.cloudinary.com/dwatnpdcy/image/upload/Gemini_Generated_Image_9nelds9nelds9nel_pnni5r.png"
                className="profile-pic"
                alt="Profile"
              />
            </button>

            {showLogout && (
              <div className="logout-dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
             <div className="mobile-screen-view">
        <div className="header-container">
          <img
            src="https://res.cloudinary.com/dwatnpdcy/image/upload/Screenshot_2025-08-28_185237_ppyw9y.png"
            className="company-logo"
          />
          <div className="account-section">
            <h2 className="username">{User}</h2>
            <button className="onclick" onClick={() => setShowLogout(prev => !prev)}>
              <img
                src="https://res.cloudinary.com/dwatnpdcy/image/upload/Gemini_Generated_Image_9nelds9nelds9nel_pnni5r.png"
                className="profile-pic"
              />
            </button>
          </div>
        </div>
        <ul className="nav-items-mobile">
          <li>
            <Link to="/" className="link">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/team" className="link">
              Team
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="link">
              Dashboard
            </Link>
          </li>
        </ul>
        {showLogout && (
              <div className="logout-dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
        </div>


    </>
  );
};

export default Header;
