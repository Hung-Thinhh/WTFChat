import "./ChatPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import MessageBubble from "../../card/MessageBubble";
import MessageInput from "../../card/MessageInput";
import { useContext, useEffect, useState } from 'react';
import ChatDataContext from 'lib/Context/ChatContext';
import sentChat from "services/sendchat";
import getChat from "services/getChat";
import { socket } from '../../../socket';

const ChatPage = () => {
    const { currUser } = useContext(ChatDataContext);
    const [chatData, setChatData] = useState([]);

    const fetchNewMessages = async () => {
        try {
            const response = await getChat({ id: currUser.id });
            setChatData(response.DT); // Giả sử API trả về danh sách tin nhắn trong response.DT
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    };

    const handleSetData = (message) => {
        setChatData((prevMessages) => 
            [...prevMessages, message]
        );
    };

    const handleSentChat = async (message) => {
        try {
            handleSetData(message); // Hiển thị tin nhắn ngay lập tức trên client

            // Gửi dữ liệu lên API
            const data = await sentChat(message);
            // Phát sự kiện socket tới các client khác
            socket.emit('new_mess', data.DT);
        } catch (error) {
            console.error('Error sending message to API:', error);
        }
    };

    useEffect(() => {
        if (currUser) {
            fetchNewMessages(); // Lấy tin nhắn mới khi component mount

            const handleNewMessage = (message) => {
                console.log('New message received from socket:', message);
                handleSetData(message); // Cập nhật giao diện người dùng với tin nhắn mới
            };

            socket.on('new_mess', handleNewMessage);

            // Cleanup khi component unmounts
            return () => {
                socket.off('new_mess', handleNewMessage);
            };
        }
    }, [currUser]);

    if (!currUser) return null;

    return (
        <div className="chatPage_container">
            <div className="chatpage_header">
                <div className="chatPage_chat_avt">
                    <img src={currUser.avt ? currUser.avt : "https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-1.jpg"} alt="user-avt" />
                </div>
                <div className="chatPage_chat_name">
                    <h3>{currUser.username}</h3>
                    <p><FontAwesomeIcon icon={faCircle} /></p>
                </div>
            </div>

            <div className="ChatWindow" ref={(el) => { if (el) el.scrollTop = el.scrollHeight; }}>
                {chatData && chatData.map((item, index) => (
                    <MessageBubble key={index} data={{
                        img: item.avt,
                        avt: item.avt,
                        content: item.content,
                        time: item.time,
                        user: item.senderid === currUser.id ? "i" : "me" // nếu là me thì là tin nhấn của bản thân user 
                    }} />
                ))}
            </div>
            <MessageInput func={handleSentChat} friendid={638} groupid={null} senderid={currUser.id} value={handleSetData} />
        </div>
    );
}

export default ChatPage;