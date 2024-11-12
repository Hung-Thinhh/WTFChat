import './ChatPage.scss';
import HeaderChatPage from './HeaderChatPage';
import MessageBubble from '../../card/MessageBubble';
import MessageInput from '../../card/MessageInput';
import { useContext, useEffect, useState, useRef } from 'react';
import ChatDataContext from 'lib/Context/ChatContext';
import getChat from 'services/getChat';
import { socket } from '../../../socket';

const ChatPage = () => {
    const { currUser } = useContext(ChatDataContext);
    const { ChatData } = useContext(ChatDataContext);
    const { RoomInfo } = useContext(ChatDataContext);
    const [curChatData, setCurChatData] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [room, setRoom] = useState('');
    const [tempId, setTempId] = useState(null);
    const chatWindowRef = useRef(null);

    const fetchNewMessages = async () => {
        try {
            const response = await getChat({ userId: currUser.id, roomId: ChatData });
            if (response && response.EC === 0) {
                socket.emit('join_room', ChatData);
                setRoom(ChatData); // Lấy ra roomId để gửi tin nhắn
                setCurChatData(response.DT); // Giả sử API trả về danh sách tin nhắn trong response.DT
            } else {
                return <h1>Chưa có gì cả</h1>;
            }
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    };

    const handleSetData = async (message) => {
        if (isSending) return; // Kiểm tra xem đang gửi hay không
        setIsSending(true); // Đánh dấu là đang gửi

        const temp = Date.now(); // Tạo ID tạm thời cho tin nhắn
        setTempId(temp);
        const messageData = {
            id: temp,
            content: message,
            senderid: currUser.id,
            roomid: ChatData,
            time: new Date().toISOString(),
            status: 'sending',
        };

        setCurChatData((prevMessages) => [...prevMessages, messageData]);

        try {
            socket.emit('send_mess', messageData); // Gửi tin nhắn qua socket trực tiếp không qua API

            setIsSending(false); // Gửi thành công thì đánh dấu là đã gửi
        } catch (error) {
            console.error('Error sending message:', error);
            setIsSending(false); // Gửi thất bại thì đánh dấu là đã gửi
        }
    };
    // Lấy thông tin room chat
    useEffect(() => {
        if (RoomInfo) {
            fetchNewMessages();
        }
    }, [RoomInfo]);
    useEffect(() => {
        const handleNewChat = (data) => {
            console.log(data);
            
            setCurChatData((prevMessages) => {
                const index = prevMessages.findIndex((msg) => msg.id === tempId);
                if (index !== -1) {
                    // Cập nhật tin nhắn nếu đã tồn tại

                    const updatedMessages = [...prevMessages];
                    updatedMessages[index] = { ...updatedMessages[index], ...data, status: 'done' };
                    setTempId(null);
                    return updatedMessages;
                } else {
                    // kiểm tra xem tin nhắn đã tồn tại chưa

                    const index = prevMessages.findIndex((msg) => msg.id === data.id);
                    if (index !== -1) {
                        return prevMessages;
                    } else {
                        return [...prevMessages, { ...data, status: 'done' }];
                    }
                }
            });
        };

        socket.on('new_chat', handleNewChat);

        return () => {
            socket.off('new_chat', handleNewChat);
        };
    }, [ChatData, tempId]);

    //vị trí tin nhắn
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [curChatData]);

    if (!currUser) return null;

    return (
        <>
            {RoomInfo ? (
                <div className="chatPage_container">
                    <HeaderChatPage RoomInfo={RoomInfo} />
                    <div className="ChatWindow" ref={chatWindowRef}>
                        {curChatData ? (
                            curChatData.map((item, index) => (
                                <MessageBubble
                                    key={index}
                                    data={{
                                        img: item.avt,
                                        avt: item.avt,
                                        content: item.content,
                                        time: item.time,
                                        user: item.senderid !== currUser.id ? 'other' : 'me', // nếu là me thì là tin nhấn của bản thân user
                                        status: item.status ? item.status : 'done',
                                    }}
                                />
                            ))
                        ) : (
                            <h1>CHƯA CÓ TIN NHÁN NÀO</h1>
                        )}
                    </div>
                    <MessageInput value={handleSetData} />
                </div>
            ) : (
                <h1>CHỌN MỘT CUỘC TRÒ TRUYỆN ĐỂ BĂT ĐẦU</h1>
            )}
        </>
    );
};

export default ChatPage;
