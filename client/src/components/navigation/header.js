import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({ users: { auth }, signOutUser }) => (
  <header className="bck_b_light">
    <div className="container">
      <div className="left">
        {/* Make the logo a link to the home page */}
        <Link to="/" className="logo">WAVES</Link>
      </div>
      <div className="right">
        <div className="top">
          {auth ? (
            <>
              <div className="cart_link">
                <span>1</span>
                <Link to="/dashboard/user/user_cart">My cart</Link>
              </div>

              <Link to="/dashboard" style={{ marginLeft: "20px" }}>
                My account
              </Link>
              <span
                onClick={signOutUser}
                style={{ cursor: "pointer", marginLeft: "20px" }}
              >
                Log out
              </span>
            </>
          ) : (
            <Link to="/sign_in">Log in</Link>
          )}
        </div>
        <div className="bottom">
          <Link to="/" style={{ marginRight: "15px" }}>
            Home
          </Link>
          <Link to="/shop">Shop</Link>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
