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
    const { ChatData } = useContext(ChatDataContext);
    const [curChatData, setcurChatData] = useState([]);
    const [isSending, setIsSending] = useState(false); // Thêm state để kiểm tra trạng thái gửi

    const fetchNewMessages = async () => {
        try {
            const response = await getChat({ id: ChatData });
            setcurChatData(response.DT); // Giả sử API trả về danh sách tin nhắn trong response.DT
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    };


    const handleSetData = async (message) => {
        if (isSending) return; // Kiểm tra xem đang gửi hay không
        setIsSending(true); // Đánh dấu là đang gửi
        setcurChatData((prevMessages) =>
            [
                ...prevMessages,
                {
                    content: message,
                    senderid: currUser.id,
                    friendid: null,
                    groupid: 638,
                    time: new Date().toISOString().split('T')[0],
                    numlike: 0,
                }
            ]
        );
        const messageData = {
            content: message,
            senderid: 638,
            friendid: currUser.id,
            groupid: null,
            time: new Date().toISOString().split('T')[0],
            numlike: 0,
        };
        try {
            // socket.emit('send_mess', messageData); //  Gửi tin nhắn qua socket trực tiếp không qua API
            await sentChat(messageData); // Chờ kết quả từ sentChat
            setIsSending(false); // Gửi thành công thì đánh dấu là đã gửi
        } catch (error) {
            setIsSending(false); // Gửi thất bại thì đánh dấu là đã gửi
        }
    };



    useEffect(() => {
        fetchNewMessages();
        const handleNewChat = (data) => {
            setcurChatData((prevMessages) =>
                [
                    ...prevMessages,
                    {
                        content: data.DT.content,
                        senderid: data.DT.senderid,
                        friendid: data.DT.friendid,
                        groupid: data.DT.groupid,
                        time: data.DT.time,
                        numlike: data.DT.numlike,
                    }
                ]
            );
        };

        socket.on('new_chat', handleNewChat);

        return () => {
            socket.off('new_chat', handleNewChat);
        };
    }, []);



    // useEffect(() => {
    //     fetchNewMessages();
    // }, [curChatData]);


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
                {curChatData && curChatData.map((item, index) => (
                    <MessageBubble key={index} data={{
                        img: item.avt,
                        avt: item.avt,
                        content: item.content,
                        time: item.time,
                        user: item.senderid === currUser.id ? "other" : "me" // nếu là other thì là tin nhấn của bản thân user 
                    }} />
                ))}
            </div>
            <MessageInput value={handleSetData} />
        </div>
    );
}

export default ChatPage;