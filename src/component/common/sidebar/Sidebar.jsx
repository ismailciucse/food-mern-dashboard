import Cookies from "js-cookie";
import React from "react";
import { NavLink } from "react-router-dom";
import navLinks from "../../../assets/data/navLinks";
import "./sidebar.css";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const logout = () => {
    Cookies.remove("admin");
    window.location.href = process.env.REACT_APP_FRONTEND + "/admin";
  };

  return (
    <>
      <section className="sidebar">
        <div className="sidebar-top">
          <div className="img">
            <a
              href={process.env.REACT_APP_FRONTEND}
              target="_blank"
              title="Go Home Page"
              rel="noreferrer"
            >
              <img
                src={process.env.REACT_APP_SERVER + "/default/logo.png"}
                alt="Logo"
              />
            </a>
          </div>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-menu">
            <ul className="nav-list">
              {navLinks.map((item, index) => (
                <SidebarItem key={index} item={item} />
              ))}
              <li className="nav-item">
                <NavLink
                  onClick={() => {
                    logout();
                  }}
                  className="nav-link sidebar-item"
                >
                  <i className="ri-logout-circle-r-line"></i> Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
