import React from "react";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import "../../css/RightSidebar.scss";
import { useEffect, useState, useLocation } from "react";
import { useDispatch } from "react-redux";

const RightSidebar = () => {
    
    return (
        <div
            className="rightsidebar"
        >
            <div className="me-auto list_nav">
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
                            
                        </div>
            {/* <Mascot /> */}
        </div>
    );
};
export default RightSidebar;
