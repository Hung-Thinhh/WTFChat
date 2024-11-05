import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./Footer.scss";
import { faMagnifyingGlass, faUserGroup, faBoxArchive, faPlus } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import Button from "components/Button";
import ChatRoom from "../chatRoom"
const cx = classNames.bind(styles);

const Footer = () => {

    return (
        <div className={cx('footer')}>
            <div className={cx('threebtn')}>
                <NavLink to="/chatpage?search=" className={cx('nav-link')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </NavLink>
                <div className="find_popup">
                    <div className="find_popup__content">
                        <input type="text" placeholder="Find a friend" />
                        <div className="find_popup__content__result">
                           <ChatRoom
                            key="hhh" 
                            id="hhh" 
                            name="dragonccm"
                            avt="/"
                           
                           />
                           <ChatRoom
                            key="hhh" 
                            id="hhh" 
                            name="dragonccm"
                            avt="/"
                           
                           />
                           <ChatRoom
                           key="hhh" 
                           id="hhh" 
                           name="dragonccm"
                           avt="/"
                          />
                        </div>
                    </div>
                </div>
                <NavLink
                    to="/chatpage?friend=true"
                    className={cx('nav-link')}
                >
                    <FontAwesomeIcon icon={faUserGroup} />
                </NavLink>
                <NavLink
                    to="/chatpage?archive=true"
                    className={cx('nav-link')}
                >
                    <FontAwesomeIcon icon={faBoxArchive} />
                </NavLink>
            </div>
            <Button className={cx('btnAddChat')} rightIcon={<FontAwesomeIcon icon={faPlus} />} onlyIcon={true}/>
        </div>


    );
};
export default Footer;
