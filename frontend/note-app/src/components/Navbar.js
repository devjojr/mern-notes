import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [isActive, setIsActive] = useState(false);

  const toggleBurger = () => {
    setIsActive(!isActive);
  };

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="navbar is-light is-transparent">
      <div className="navbar-brand">
        <Link to="/" id="note-brand" className="navbar-item">
          <strong>Note App</strong>
        </Link>

        {/* Navbar Burger */}
        <div
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          onClick={toggleBurger}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Navbar Menu */}
      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user && (
                <span onClick={handleClick} className="button is-dark">
                  <strong>Log Out</strong>
                </span>
              )}
              {!user && (
                <>
                  <Link to="/signup" className="button is-info">
                    <strong>Sign Up</strong>
                  </Link>
                  <Link to="/login" className="button is-dark">
                    <strong>Log In</strong>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
