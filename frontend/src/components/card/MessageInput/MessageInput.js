import "./MessageInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRef, useCallback, useState, useEffect } from "react";
import { socket } from '../../../socket';

const MessageInput = ({
    func,
    senderid,
    friendid,
    groupid,
    value,
}) => {
    const inputRef = useRef(null);
    const [isSending, setIsSending] = useState(false);

    const handleSentChat = useCallback(() => {
        if (isSending) return; // Prevent multiple requests

        setIsSending(true);
        const content = inputRef.current.value;
        const messageData = {
            content: content,
            senderid: senderid,
            friendid: friendid,
            groupid: groupid,
            time: new Date().toISOString().split('T')[0], // Lấy ngày hiện tại theo định dạng yyyy-mm-dd    
            numlike: 0,
        };

        // Hiển thị tin nhắn ngay lập tức trên client
        value(messageData);

        func(messageData).then((data) => { 
            inputRef.current.value = ''; // Xóa nội dung input sau khi gửi
            setIsSending(false);
        }).catch(() => {
            setIsSending(false);
        });
    }, [func, senderid, friendid, groupid, isSending, value]);

    useEffect(() => {
        const handleNewMessage = (message) => {
            console.log('New message received from socket:', message);
            value(message); // Cập nhật giao diện người dùng với tin nhắn mới
        };

        socket.on('new_mess', handleNewMessage);

        // Cleanup khi component unmounts
        return () => {
            socket.off('new_mess', handleNewMessage);
        };
    }, [value]);

    return (
        <div className="input_container">
            <div className="input_container">
                <input name="mess" type="text" ref={inputRef} />
            </div>
            <button
                className="chatPage_chat_btn"
                onClick={handleSentChat}
            >
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    );
}

export default MessageInput;