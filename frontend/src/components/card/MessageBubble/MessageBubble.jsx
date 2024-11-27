import React, { useEffect, useState, useContext, useCallback } from 'react';
import './MessageBubble.scss';
import { socket } from 'socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faCheckDouble,
    faCircleXmark,
    faCopy,
    faReply,
    faPen,
    faTrash,
    faFlag,
} from '@fortawesome/free-solid-svg-icons';

import OpengraphReactComponent from 'opengraph-react';
import ChatDataContext from 'lib/Context/ChatContext';
import { ControlledMenu, MenuItem, SubMenu, MenuHeader,target } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import { useSelector } from "react-redux";



const MessageBubble = (data) => {
    const { ChatData } = useContext(ChatDataContext);
    const reportType = useSelector((state) => state.typeReport.reportType);
    const [status, setStatus] = useState('sending');
    const userClass = data.data.user;
    // truyền data lên component cha
    const handlePropReply = useCallback(() => {
        data.onReply(data.data);
    }, []);
    const handleReply = () => {
        handlePropReply()
    }
    const handlePropReport = useCallback((data_report) => {
        data.reportting(data_report);

    }, []);
    const targets = (id) => {
        data.target(id);
    };
    const handleReport = (data_report) => {
        const newReport = {
            report_type: data_report,
            id_mess:data.data.id,
            mess_data: {
                content: data.data.content,
                img: data.data.img
            }
        }
        handlePropReport(newReport)
    }
    // time
    const formatTime = (datestring) => {
        const date = new Date(datestring);
        const now = new Date();

        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffSeconds = Math.floor(diffTime / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffMonths = Math.ceil(diffDays / 30.44);
        const diffYears = Math.floor(diffDays / 365.25);

        if (diffSeconds <= 10) {
            return `bây giờ`;
        } else if (diffSeconds <= 60) {
            return `${diffSeconds} giây`;
        } else if (diffMinutes <= 60) {
            return `${diffMinutes} phút`;
        } else if (diffHours <= 24) {
            return `${diffHours} giờ`;
        } else if (diffDays <= 30) {
            return `${diffDays} ngày`;
        } else if (diffDays <= 365) {
            return `${diffMonths} tháng`;
        } else {
            return `${diffYears} năm`;
        }
    };
    // useEffect(() => {
    //     try {
    //         const response = fetch('http://noembed.com/embed?url=http%3A//www.youtube.com/watch%3Fv%3DbDOYN-6gdRE&callback=my_embed_function');
    //         const data = response.json();
    //         // Xử lý dữ liệu (có thể cần extract title, description, image...)
    //        console.log(data);
    //     } catch (error) {
    //        console.log('Error fetching new messages:', error);
    //     }
    //   }, []);
    //     const website = 'https://youtu.be/MPp8hbuZwW0?si=g7WU5rztQZPUQbbv';
    //     const appId = '63490939-675d-4703-a891-9d30c454a46d'; //You're OpenGraph.io API Key goes here
    useEffect(() => {
        if (data.data.status === 'sending') {
            setStatus('sending');
        } else if (data.data.status === 'done') {
            setStatus('done');
        } else {
            setStatus('failed');
        }
    }, [data.data.status]);

    // status dropdown
    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const handleCopy = () => {
        if (data.data.img) {
            navigator.clipboard.writeText(data.data.img)
            return;
        }
        navigator.clipboard.writeText(data.data.content)

    }
    const handleDelete = () => {
        socket.emit('delete_mess', {id: data.data.id , roomid : ChatData});
    }

    return (
        <div id={`message${data.data.id}`}

            className={`messageBubble ${userClass}`}

            onContextMenu={(e) => {
                if (typeof document.hasFocus === 'function' && !document.hasFocus()) return;
                e.preventDefault();
                setAnchorPoint({ x: e.clientX, y: e.clientY });
                setOpen(true);
            }}
            key={data.data.id}
            onClick={() => targets(data.data.traloi ? data.data.traloi.id : null)}
        >

            <div className={`messageContent ${userClass}`}>
                {userClass === 'other' && (
                    <div className="userAvatar">
                        <img
                            alt="User Avatar"
                            src={
                                data.data.avt ||
                                'https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-1.jpg'
                            }
                        />
                    </div>
                )}

                <div className={`messageBox ${userClass}`} style={{ maxWidth: '500px', width: 'fit-content' }}>
                    {/* {data.data.img && <img src={data.data.img} alt="Attached image" />} */}
                    <div className="messageText">
                        {data.data.traloi ?
                            <div className='reply_ctn' >
                                <div className="reply_name">Bạn</div>
                                <div className="reply_content">{data.data.traloi.content}</div>
                            </div>
                            : ""}

                        {data.data.img &&
                            <div className='Chat_image'>
                                <img
                                    alt="chat img"
                                    src={data.data.img}
                                />
                            </div>
                        }
                        <p>{data.data.content}</p>
                        <div className="messageTime_container">
                            <div className="messageTime">{formatTime(data.data.time)}</div>
                            {userClass === 'me' &&
                                (status === 'sending' ? (
                                    <FontAwesomeIcon icon={faCheck} className="load_icon" />
                                ) : status === 'done' ? (
                                    <FontAwesomeIcon icon={faCheckDouble} className="load_icon" />
                                ) : (
                                    <FontAwesomeIcon icon={faCircleXmark} className="load_icon" />
                                ))}
                        </div>
                    </div>
                </div>

            </div>
            <ControlledMenu
                anchorPoint={anchorPoint}
                state={isOpen ? 'open' : 'closed'}
                direction="right"
                onClose={() => setOpen(false)}
                className="my-menu"
            >
                <MenuItem className="menu_item" onClick={handleReply}>
                    <FontAwesomeIcon icon={faReply} /> Reply
                </MenuItem>
                <MenuItem className="menu_item" onClick={handleCopy}>
                    <FontAwesomeIcon icon={faCopy} /> Copy
                </MenuItem>

                <SubMenu
                    label={
                        <>
                            <FontAwesomeIcon icon={faFlag} /> Report
                        </>
                    }
                    className="menu_item SubMenu"
                >
                    {/* <MenuDivider /> */}
                    <MenuHeader>Report</MenuHeader>
                    {reportType && reportType.data &&
                        reportType.data.map((report) => {
                            return (
                                <MenuItem
                                    key={report.id}
                                    className="menu_item"
                                    onClick={() => handleReport(report.id)}
                                >
                                    {report.content}
                                </MenuItem>
                            );
                        })}
                </SubMenu>
                <MenuItem className="menu_item delete-chat" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                </MenuItem>
            </ControlledMenu>

        </div>
    );
};

export default MessageBubble;
