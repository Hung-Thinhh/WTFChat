import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Footer.module.scss";
import { faMagnifyingGlass, faUserGroup, faBoxArchive, faPlus, faComment } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import Button from "components/Button";
const cx = classNames.bind(styles);

const Footer = ({ pageState, setPageData }) => {
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
                    onClick={() => handlePageClick('archive')}
                    className={cx('nav-link', pageState === 'archive' && 'activebtn')}
                >
                    <FontAwesomeIcon icon={faBoxArchive} />
                </div>
            </div>
            <Button className={cx('btnAddChat')}
                rightIcon={<FontAwesomeIcon icon={faPlus} />}
                onlyIcon={true}
            >
                
            </Button>
        </div>


    );
};
export default Footer;
