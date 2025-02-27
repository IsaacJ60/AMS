import React from "react";
import { NavLink } from "react-router-dom";

export const NavBarBrand: React.FC = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <img
          className="nav-bar__logo"
          src="https://i.postimg.cc/hjZkJ6y3/AMS-1.png"
          alt="AMS logo"
         
        />
      </NavLink>
    </div>
  );
};
