import React from 'react';
import { useEffect, useState } from 'react';
import './MessageBubble.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble, faCircleXmark } from '@fortawesome/free-solid-svg-icons';


const MessageBubble = (data) => {
    const [status, setStatus] = useState('sending');
    const userClass = data.data.user === 'me' ? 'me' : 'other';
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
            return `${diffSeconds} giây trước`;
        } else if (diffMinutes <= 60) {
            return `${diffMinutes} phút trước`;
        } else if (diffHours <= 24) {
            return `${diffHours} giờ trước`;
        } else if (diffDays <= 30) {
            return `${diffDays} ngày trước`;
        } else if (diffDays <= 365) {
            return `${diffMonths} tháng trước`;
        } else {
            return `${diffYears} năm trước`;
        }
    };
    useEffect(() => {
        if (data.data.status === 'sending') {
            setStatus('sending');
        } else if (data.data.status === 'done') {
            setStatus('done');
        } else {
            setStatus('failed');
        }
    }, [data.data.status]);

    return (
        <div className={`messageBubble ${userClass}`}>
            <div className={`messageContent ${userClass}`}>
                <div className="userAvatar">    
                    <img
                        alt="User Avatar"
                        src={
                            data.data.avt ||
                            'https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-1.jpg'
                        }
                    />
                </div>
                <div className={`messageBox ${userClass}`}>
                    {data.data.img && <img src={data.data.img} alt="Attached image" />}
                    <div className="messageText">
                        <p>{data.data.content}</p>
                        <div className="messageTime_container">
                            <div className="messageTime">{formatTime(data.data.time)}</div>
                            {status === 'sending' ? (
                                <FontAwesomeIcon icon={faCheck} className="load_icon" />
                            ) : status === 'done' ? (
                                <FontAwesomeIcon icon={faCheckDouble} className="load_icon" />
                            ) : (
                                <FontAwesomeIcon icon={faCircleXmark} className="load_icon" />
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MessageBubble;
