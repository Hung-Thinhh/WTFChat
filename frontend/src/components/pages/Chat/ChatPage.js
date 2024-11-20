import './ChatPage.scss';
import HeaderChatPage from './HeaderChatPage';
import MessageBubble from '../../card/MessageBubble';
import MessageInput from '../../card/MessageInput';
import { useContext, useEffect, useState, useRef } from 'react';
import ChatDataContext from 'lib/Context/ChatContext';
import getChat from 'services/getChat';
import { getReportType } from 'controller/report';
import { socket } from '../../../socket';

const ChatPage = () => {
    const { currUser } = useContext(ChatDataContext);
    const { ChatData } = useContext(ChatDataContext);
    const { RoomInfo } = useContext(ChatDataContext);
    const { reportType, setReportType } = useContext(ChatDataContext);
    const [curChatData, setCurChatData] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [isReply, setIsReply] = useState('');
    const [room, setRoom] = useState('');
    const [tempId, setTempId] = useState(null);
    const chatWindowRef = useRef(null);
    const [offset, setOffset] = useState(0);



    const fetchNewMessages = async () => {
        try {
            const response = await getChat({ userId: currUser.id, roomId: ChatData, offset: offset });
            if (response && response.EC === 0) {
                socket.emit('join_room', ChatData);
                setRoom(ChatData); // Lấy ra roomId để gửi tin nhắn
                let data = response.DT;
                data.forEach((item) => {
                    if (item.traloi !== null) {
                        const replyMessage = data.find((msg) => msg.id == item.traloi);
                        if (replyMessage) {
                            item.traloi = replyMessage;
                        }
                    }
                });
                setCurChatData(data); // Giả sử API trả về danh sách tin nhắn trong response.DT
                setOffset((prevOffset) => prevOffset + 50);
            } else {
                return <h1>Chưa có gì cả</h1>;
            }
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    };
    const lazyLoad = async () => {
        console.log(offset + 50);
        try {
            const response = await getChat({ userId: currUser.id, roomId: ChatData, offset: offset });
            if (response && response.EC === 0) {
                socket.emit('join_room', ChatData);
                setRoom(ChatData); // Lấy ra roomId để gửi tin nhắn
                let data = response.DT;
                data.forEach((item) => {
                    if (item.traloi !== null) {
                        const replyMessage = data.find((msg) => msg.id == item.traloi);
                        if (replyMessage) {
                            item.traloi = replyMessage;
                        }
                    }
                });
                setCurChatData((previous) => {
                    const newData = [...previous];
                    data.forEach((item) => {
                        if (!previous.some((msg) => msg.id === item.id)) {
                            newData.push(item);
                        }
                    });
                    newData.sort((a, b) => new Date(a.time) - new Date(b.time));
                    return newData;
                });
                setOffset((prevOffset) => prevOffset + 50);
            } else {
                return <h1>Chưa có gì cả</h1>;
            }
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    };


    const fetchReportType = async () => {
        try {
            const response = await getReportType();
            if (response && response.EC === 0) {
                setRoom(ChatData); // Lấy ra roomId để gửi tin nhắn
                setReportType(response.DT); // Giả sử API trả về danh sách tin nhắn trong response.DT
            }
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    };
    const handleDataReply = async (data) => {
        setIsReply(data);
    };
    const handleSetData = async (message) => {
        if (isSending) return; // Kiểm tra xem đang gửi hay không
        setIsSending(true); // Đánh dấu là đang gửi

        const temp = Date.now(); // Tạo ID tạm thời cho tin nhắn
        setTempId(temp);
        const messageData = {
            id: temp,
            content: message.content,
            senderid: currUser.id,
            roomid: ChatData,
            image: message.image,
            time: new Date().toISOString(),
            status: 'sending',
            traloi: isReply ? isReply.id : null,
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
            fetchReportType();
        }
    }, [RoomInfo]);
    useEffect(() => {
        const handleNewChat = (data) => {
            setCurChatData((prevMessages) => {
                // Tìm trong dữ liệu chatdata xem có id tương ứng với data.traloi không
                if (data.traloi) {
                    const replyMessage = prevMessages.find((msg) => msg.id == data.traloi);
                    if (replyMessage) {
                        data.traloi = replyMessage;
                    }
                }

                const index = prevMessages.findIndex((msg) => msg.id === tempId);
                console.log(JSON.stringify(data));
                if (index !== -1) {
                    // Cập nhật tin nhắn nếu đã tồn tại
                    const updatedMessages = [...prevMessages];
                    updatedMessages[index] = { ...updatedMessages[index], ...data, status: 'done' };
                    setTempId(null);
                    return updatedMessages;
                } else {
                    // Kiểm tra xem tin nhắn đã tồn tại chưa
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
    // Add scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            if (chatWindowRef.current && chatWindowRef.current.scrollTop === 0) {
                lazyLoad()
            }
        };
        const chatWindow = chatWindowRef.current;
        if (chatWindow) {
            chatWindow.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (chatWindow) {
                chatWindow.removeEventListener('scroll', handleScroll);
            }
        };
    }, [chatWindowRef.current, offset]);


    //vị trí tin nhắn
    useEffect(() => {
        if (chatWindowRef.current && offset <= 50) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [curChatData]);


    useEffect(() => {
        console.log(isReply);
    }, [isReply]);
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
                                        id: item.id,
                                        img: item.image ? item.image : "",
                                        avt: item.avt,
                                        content: item.content,
                                        time: item.time,
                                        user: item.senderid !== currUser.id ? 'other' : 'me', // nếu là me thì là tin nhấn của bản thân user
                                        status: item.status ? item.status : 'done',
                                        sender: item.senderName,
                                        traloi: item.traloi ? item.traloi : null,
                                    }}
                                    onReply={handleDataReply}
                                />
                            ))
                        ) : (
                            <h1>CHƯA CÓ TIN NHÁN NÀO</h1>
                        )}
                    </div>
                    <MessageInput value={handleSetData} isReply={isReply} onReply={handleDataReply} />
                </div>
            ) : (
                <h1>CHỌN MỘT CUỘC TRÒ TRUYỆN ĐỂ BĂT ĐẦU</h1>
            )}
        </>
    );
};

export default ChatPage;
