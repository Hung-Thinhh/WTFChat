import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Footer.module.scss";
import { faMagnifyingGlass, faUserGroup, faUserSlash, faPlus, faComment } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import Button from "components/Button";
const cx = classNames.bind(styles);

const Footer = ({ pageState, setPageData, onClickNewChat }) => {
    const handlePageClick = (data) => {
        setPageData(data);
    }
    return (
        <div className={cx('footer')}>
            <div className={cx('threebtn')}>
                <div
                    onClick={() => handlePageClick('chat')}
                    className={cx('nav-link', pageState === 'chat' && 'activebtn')}
                >
                    <FontAwesomeIcon icon={faComment} />
                </div>
                <div
                    onClick={() => handlePageClick('search')}
                    className={cx('nav-link', pageState === 'search' && 'activebtn')}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div
                    onClick={() => handlePageClick('friend')}
                    className={cx('nav-link', pageState === 'friend' && 'activebtn')}
                >
                    <FontAwesomeIcon icon={faUserGroup} />
                </div>
                <div
                    onClick={() => handlePageClick('block')}
                    className={cx('nav-link', pageState === 'block' && 'activebtn')}
                >
                    <FontAwesomeIcon icon={faUserSlash} />
                </div>
            </div>
            <Button className={cx('btnAddChat')}
                onClick={onClickNewChat}
                rightIcon={<FontAwesomeIcon icon={faPlus} />}
                onlyIcon={true}
            >
                
            </Button>
        </div>


    );
};
export default Footer;
