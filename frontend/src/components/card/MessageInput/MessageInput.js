import './MessageInput.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faFileImage,
    faPaperPlane,
    faReply,
    faX,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useRef, useCallback, useState } from 'react';

const MessageInput = ({ value, isReply, onReply }) => {
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSentChat = useCallback(() => {
        const content = inputValue; // Lấy giá trị từ state
        const image = fileInputRef.current.files[0]; // Lấy tệp đầu tiên từ FileList

        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result.replace('data:', '').replace(/^.+,/, '');
                value({ content, image: base64Image });
            };
            reader.readAsDataURL(image);
        } else {
            value({ content });
        }

        setInputValue(''); // Clear the input field
        setIsPopupVisible(false); // Hide the popup
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the file input
        }
        onReply(''); // Clear the reply state after sending the message
    }, [value, inputValue, onReply]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSentChat();
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setIsPopupVisible(true); // Show the popup
        }
    };
    const handlePropReply = useCallback(() => {
        onReply('');
    }, [onReply]);
    const handleReply = () => {
        handlePropReply();
    };
    return (
        <div className="input_container">
            <div className="input_container_wrap">
                {isReply && (
                    <div className="input_container_reply">
                        <div className="icon_reply">
                            <span>
                                <FontAwesomeIcon icon={faReply} />
                            </span>
                        </div>
                        <div className="content_reply">
                            <div className="reply-content">
                                <div className="reply-title">
                                    <span>Reply to {isReply.sender}</span>
                                </div>
                                <div className="reply-subtitle">{isReply.content}</div>
                            </div>
                        </div>
                        <div className="icon_cancel">
                            <span onClick={handleReply}>
                                <FontAwesomeIcon icon={faXmark} />
                            </span>
                        </div>
                    </div>
                )}
                <div className="input_container_sub">
                    <div className="input_container">
                        <input
                            name="mess"
                            type="text"
                            ref={inputRef}
                            placeholder="Message"
                            onKeyDown={handleKeyPress}
                            className="main_input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>

                    {isPopupVisible && selectedImage && (
                        <div className="img_popup">
                            <div
                                className="close"
                                onClick={() => {
                                    setInputValue('');
                                    setIsPopupVisible(false); // Hide the popup
                                    fileInputRef.current.value = ''; // Clear the file input
                                    setSelectedImage(null);
                                }}
                            >
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </div>
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                                className="selected_image"
                            />
                            <div className="caption">
                                <input type="text" placeholder="thêm ghi chú" />
                                <button className="sendimg" onClick={handleSentChat}>
                                    gửi
                                </button>
                            </div>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="imageUpload"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="imageUpload" className="img_file">
                        <FontAwesomeIcon icon={faFileImage} />
                    </label>
                </div>
            </div>
            <button className="chatPage_chat_btn" onClick={handleSentChat}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    );
};

export default MessageInput;
