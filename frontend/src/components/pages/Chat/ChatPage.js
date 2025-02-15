import './ChatPage.scss';
import HeaderChatPage from './HeaderChatPage';
import MessageBubble from '../../card/MessageBubble';
import MessageInput from '../../card/MessageInput/MessageInput';
import React, { useContext, useEffect, useState, useRef } from 'react';
import ChatDataContext from 'lib/Context/ChatContext';
import getChat from 'services/getChat';
import { sendReport } from 'controller/report';
import { socket } from '../../../socket';
import Modal from 'react-modal';
import song from '../../../notify.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { currUserSelector, offsetSelector, chatDataSelector } from '../../../redux/selectors';
import { setOffset } from '../../layout/ChatLayout/LeftSidebar/sidebarSlide';
import { useDispatch, useSelector } from 'react-redux';
import { setNewMessage } from '../../../components/layout/ChatLayout/LeftSidebar/sidebarSlide';
import { setChatData } from './chatSlide';
Modal.setAppElement('#root');

const ChatPage = () => {
    const { ChatData, RoomInfo,setRoomInfo } = useContext(ChatDataContext);
    const notify = useSelector((state) => state.notify.notify.data);
    const [curChatData, setCurChatData] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [isReply, setIsReply] = useState('');
    const [room, setRoom] = useState('');
    const [report, setReport] = useState('');
    const [tempId, setTempId] = useState(null);
    const chatWindowRef = useRef(null);
    // const [offset, setOffset] = useState(0);
    const [audio] = useState(new Audio(song));
    const [modalIsOpen, setIsOpen] = useState(false);
    const [scrollid, setScrollid] = useState('');
    const dispatch = useDispatch();
    const state = useSelector(offsetSelector);
    const currUser = useSelector(currUserSelector);
    const [showGoDown, setShowGoDown] = useState(false);
    const Chat = useSelector(chatDataSelector);

    useEffect(() => {
        if (Array.isArray(curChatData) && curChatData.length > 0) {
            dispatch(setChatData(curChatData));
        }
    }, [curChatData]);

    const fetchNewMessages = async () => {
        try {
            const response = await getChat({
                userId: currUser.id,
                roomId: ChatData,
                offset: 0,
            });

            if (response && response.EC === 0) {
                socket.emit('join_room', ChatData);
                setRoom(ChatData);
                console.log(response);
                
                let data = response.DT;
                dispatch(setChatData(data));
                data.forEach((item) => {
                    if (item.traloi !== null) {
                        const replyMessage = data.find((msg) => msg.id === item.traloi);
                        if (replyMessage) {
                            item.traloi = replyMessage;
                        }
                    }
                });
                setCurChatData(data);
                dispatch(setOffset(state + 50));
            }
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    };

    const lazyLoad = async () => {
        try {
            const previousScrollHeight = chatWindowRef.current.scrollHeight;
            const response = await getChat({
                userId: currUser.id,
                roomId: ChatData,
                offset: state,
            });
            if (response && response.EC === 0) {
                let data = response.DT;
                data.forEach((item) => {
                    if (item.traloi !== null) {
                        const replyMessage = data.find((msg) => msg.id === item.traloi);
                        if (replyMessage) {
                            item.traloi = replyMessage;
                        }
                    }
                });

                setCurChatData((previous) => {
                    if (previous.length > 0) {
                        const firstMessageId = previous[0].id;
                        setScrollid(firstMessageId);
                    }

                    const newData = [...previous];
                    data.forEach((item) => {
                        if (!previous.some((msg) => msg.id === item.id)) {
                            newData.push(item);
                        }
                    });
                    newData.sort((a, b) => new Date(a.time) - new Date(b.time));
                    return newData;
                });
                dispatch(setOffset(state + 50));

                // Maintain scroll position after loading older messages
                setTimeout(() => {
                    if (chatWindowRef.current) {
                        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight - previousScrollHeight;
                    }
                }, 0);

                // Clear the scroll event listener after 1 second
                setTimeout(() => {
                    if (chatWindowRef.current) {
                        chatWindowRef.current.removeEventListener('scroll', handleScroll);
                    }
                }, 1000);
            }
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    };

    const handleDataReply = (data) => {
        setIsReply(data);
    };

    const handleReport = (data) => {
        const newData = { ...data, userId: currUser.id };
        setReport(newData);
        openModal();
    };

    const handleSendReport = async () => {
        const response = await sendReport(report);
        if (response && response.EC === 0) {
            closeModal();
            setReport('');
        }
    };

    const handleSetData = (message) => {
        if (isSending) return;
        setIsSending(true);

        const temp = Date.now();
        setTempId(temp);
        const messageData = {
            id: temp,
            content: message.content,
            senderid: currUser.id,
            roomid: ChatData,
            image: message.image,
            time: new Date().toISOString(),
            status: 'sending',
            traloi: isReply && isReply.id ? isReply.id : null,
        };

        setCurChatData((prevMessages) => [...prevMessages, messageData]);
        try {
            socket.emit('send_mess', messageData);
            setIsSending(false);
            setIsReply(''); // Clear the reply state after sending the message
            if (chatWindowRef.current) {
                chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight; // Scroll to bottom after sending a message
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setIsSending(false);
        }
    };

    useEffect(() => {
        if (RoomInfo) {
            fetchNewMessages();
        }
    }, [RoomInfo]);

    useEffect(() => {
        const handleNewChat = (data) => {
            console.log( data.idRoom);
            
            const notification = notify.find((item) => item.idroom === data.idRoom);
            console.log(notification);
            
            if (notification && notification.notify === 1) {
                audio.play();
            }
            setCurChatData((prevMessages) => {
                dispatch(setNewMessage(data));
                if (data.traloi) {
                    const replyMessage = prevMessages.find((msg) => msg.id === data.traloi);
                    if (replyMessage) {
                        data = { ...data, traloi: replyMessage };
                    }
                }

                const index = prevMessages.findIndex((msg) => {
                    return msg.id === tempId;
                });

                if (index !== -1) {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[index] = { ...updatedMessages[index], ...data, status: 'done' };
                    setTempId(null);
                    return updatedMessages;
                } else {
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
    useEffect(() => {
        const handleEditRoom = (data) => {
            console.log('log',data);
            
            if (RoomInfo.id === parseInt(data.id)) {
                let room = {...RoomInfo, status: data.isBan ? 1:0}
               setRoomInfo(room)
           }
        };

        socket.on('ban_group', handleEditRoom);

        return () => {
            socket.off('ban_group', handleEditRoom);
        };
    }, [ChatData, tempId]);

    const handleScroll = () => {
        if (chatWindowRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatWindowRef.current;
            setShowGoDown(scrollHeight - scrollTop - clientHeight > 100);
            if (scrollTop === 0) {
                lazyLoad();
            }
        }
    };

    useEffect(() => {
        const chatWindow = chatWindowRef.current;
        if (chatWindow) {
            chatWindow.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (chatWindow) {
                chatWindow.removeEventListener('scroll', handleScroll);
            }
        };
    }, [state]);

    useEffect(() => {
        if (chatWindowRef.current && state <= 50) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [Chat]);

    const scrollToMessage = (id) => {
        const messageElement = document.getElementById(`message${id}`);
        if (messageElement && chatWindowRef.current) {
            const chatWindowHeight = chatWindowRef.current.clientHeight;
            const messageElementOffset = messageElement.offsetTop;
            chatWindowRef.current.scrollTop =
                messageElementOffset - chatWindowHeight / 2 + messageElement.clientHeight / 2 - 50;
        }
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        socket.on('delete_res', (data) => {
            setCurChatData((prevMessages) => {
                const index = prevMessages.findIndex((msg) => msg.id === data.delete_mess.id);
                if (index !== -1) {
                    const updatedMessages = [...prevMessages];
                    updatedMessages.splice(index, 1);
                    return updatedMessages;
                }
                return prevMessages;
            });
        });

        return () => {
            socket.off('delete_res');
        };
    }, []);
    // socket.on('muted', (data) => {
    //    console.log(data);
    // })

    useEffect(() => {
        socket.on('return_res', (data) => {
            setCurChatData((prevMessages) => {
                dispatch(setNewMessage(data));
                return prevMessages.reduce((acc, msg) => {
                    if (msg.id > data.delete_mess.id) {
                        // Kiểm tra xem `data.delete_mess` đã có trong `acc` chưa
                        if (!acc.some((item) => item.id === data.delete_mess.id)) {
                            return [...acc, data.delete_mess, msg];
                        } else {
                            return [...acc, msg];
                        }
                    } else {
                        return [...acc, msg];
                    }
                }, []); // Khởi tạo mảng rỗng cho `acc`
            });
        });

        return () => {
            socket.off('return_res'); // Hủy đăng ký sự kiện khi component unmount
        };
    }, []);
    if (!currUser) return null;

    return (
        <>
            {!RoomInfo ? (
                 <h1>CHỌN MỘT CUỘC TRÒ TRUYỆN ĐỂ BẮT ĐẦU</h1>
            ) : RoomInfo && RoomInfo.status ===1 ? (
                <h1>Nhóm này đã bị khoá!</h1>
            ) : (
                <div className="chatPage_container">
                    <HeaderChatPage RoomInfo={RoomInfo} target={scrollToMessage} />
                    <div className="ChatWindow" ref={chatWindowRef}>
                        {Array.isArray(Chat) && Chat.length > 0 ? (
                            Chat.map((item, index) => (
                                <MessageBubble
                                    key={index}
                                    id={item.id}
                                    data={{
                                        id: item.id,
                                        img: item.image ? item.image : '',
                                        avt: item.avt,
                                        content: item.content,
                                        time: item.time,
                                        user: item.senderid !== currUser.id ? 'other' : 'me',
                                        status: item.status ? item.status : 'done',
                                        sender: item.senderName,
                                        traloi: item.traloi ? item.traloi : null,
                                    }}
                                    onReply={handleDataReply}
                                    reportting={handleReport}
                                    target={scrollToMessage}
                                />
                            ))
                        ) : (
                            <h1>CHƯA CÓ TIN NHẮN NÀO</h1>
                        )}
                    </div>
                    <MessageInput
                        value={handleSetData}
                        isReply={isReply}
                        onReply={handleDataReply}
                    />
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 1000,
                            },
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: '#212121',
                                padding: '20px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            },
                        }}
                    >
                        <div>Bạn có chắc chắc muốn báo cáo tin nhắn này không?</div>
                        <div className="btn_modal">
                            <span onClick={closeModal}>Huỷ</span>
                            <span onClick={handleSendReport}>Xác nhận</span>
                        </div>
                    </Modal>
                    {showGoDown && (
                        <button
                            className="go-down"
                            onClick={() => {
                                if (chatWindowRef.current) {
                                    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
                                    setShowGoDown(false); // Ẩn nút sau khi nhấn
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    )}

                </div>
            )}
        </>
    );
};

export default ChatPage;
