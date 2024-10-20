import React from 'react';
import './MessageBubble.scss';
import moment from 'moment';


const MessageBubble = (data) => {
    const userClass = data.data.user === "me" ? "me" : "other";

    const formatTime = (time) => {
        const messageTime = moment(time);
        const now = moment();
        const diffHours = now.diff(messageTime, 'hours');
        const diffDays = now.diff(messageTime, 'days');

        if (diffHours < 24) {
            return `${diffHours} giờ trước`;
        } else if (diffDays < 30) {
            return messageTime.format('DD/MM');
        } else {
            return messageTime.format('DD/MM/YYYY');
        }
    };

    return (
        <div className={`messageBubble ${userClass}`}>
            <div className={`messageContent ${userClass}`}>
                <div className="userAvatar">
                    <img alt="User Avatar" src={data.data.avt || "https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-1.jpg"} />
                </div>
                <div className={`messageBox ${userClass}`}>
                    {data.data.img && (
                        <img
                            src={data.data.img}
                            alt="Attached image"
                        />
                    )}
                    <div className="messageText">
                        <p>{data.data.content}</p>
                        <div className="messageTime">
                            {formatTime(data.data.time)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default MessageBubble;