import React from 'react';
import '../../css/MessageBubble.scss';

const MessageBubble = (data) => {
    const userClass = data.data.user === "me" ? "me" : "other";

    return (
        <div className={`messageBubble ${userClass}`}>
            <div className={`messageContent ${userClass}`}>
                <div className="userAvatar">
                    <img alt="UserAvt" src={data.data.avt} />
                </div>
                <div className={`messageBox ${userClass}`}>
                    {data.data.img !== '' && (
                        <img
                            src={data.data.img}
                            alt="Live from space album cover"
                        />
                    )}
                    <div className="messageText">
                        <div>
                            <p>{data.data.content}</p>
                        </div>
                        <div className="messageTime">
                            {data.data.time} phút trước
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageBubble;