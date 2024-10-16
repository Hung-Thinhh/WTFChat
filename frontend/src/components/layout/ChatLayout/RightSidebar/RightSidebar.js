import React from "react";
// import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./RightSidebar.scss";
// import { useEffect, useState, useLocation } from "react";
import Footer from "./Footer";
import ChatRoom from "./chatRoom";


const RightSidebar = () => {

    return (
        <div
            className="rightsidebar"
        >
            <div className="me-auto list_nav">
                <div className="sidebar_header">
                    <FontAwesomeIcon icon={faUser} />  Wtf Chat
                </div>
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
            </div>
            {/* <Mascot /> */}
            <Footer />
        </div>
    );
};
export default RightSidebar;
