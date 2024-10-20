import React from "react";
// import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./RightSidebar.scss";
// import { useEffect, useState, useLocation } from "react";
import Footer from "./Footer";
import ChatRoom from "./chatRoom";
import { useContext } from 'react';
import ChatDataContext from 'lib/Context/ChatContext';
const RightSidebar = () => {
    const { currUser } = useContext(ChatDataContext);
    console.log(currUser);
    if (!currUser) return null;
    return (
        <div
            className="rightsidebar"
        >
            <div className="me-auto list_nav">
                <div className="sidebar_header">
                    <FontAwesomeIcon icon={faUser} />  Wtf Chat
                </div>
                {currUser.friends.map((friend) => {
                    return (
                        <ChatRoom name={friend.first_name+friend.last_name} avt={friend.avt} time={"10/02/2024"} mess={"con dilon"} />
                    )
                })}
                {/* <ChatRoom name={"long"} avt={"/"} time={"10/02/2024"} mess={"con dilon"}/> */}
            </div>
            {/* <Mascot /> */}
            <Footer />
        </div>
    );
};
export default RightSidebar;
