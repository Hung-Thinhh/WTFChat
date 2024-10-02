import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import "../../../../css/RightSidebar.scss";
import { useEffect, useState, useLocation } from "react";
import { useDispatch } from "react-redux";

const RightSidebar = () => {

    return (
        <div
            className="rightsidebar"
        >
            <div className="me-auto list_nav">
                <div className="sidebar_header">
                    <FontAwesomeIcon icon={faUser} />  Wtf Chat
                </div>
                <NavLink to="/" className="nav-link list_nav_item">
                    <div className="icon_list_nav_item">

                    </div>
                    <span>Trang chủ</span>
                </NavLink>
                <NavLink
                    to="/rating"
                    className="nav-link list_nav_item"
                >
                    <div className="icon_list_nav_item">

                    </div>
                    <span>Trang nhã</span>
                </NavLink>
                <NavLink
                    to="/chatpage"
                    className="nav-link list_nav_item"
                >
                    <div className="icon_list_nav_item">

                    </div>
                    <span>Trang tụ điền</span>
                </NavLink>
            </div>
            {/* <Mascot /> */}
            <div className="sidebar_footer">

            </div>
        </div>
    );
};
export default RightSidebar;
