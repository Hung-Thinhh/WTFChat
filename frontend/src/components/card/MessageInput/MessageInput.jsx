import "./MessageInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faFileImage, faPaperPlane, faReply, faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef, useCallback, useState } from "react";

const MessageInput = ({ value, isReply ,onReply}) => {
    
    const inputRef = useRef(null);
    const imageRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleSentChat = useCallback(() => {
        const content = inputRef.current.value;
        // const image = imageRef.current.files[0];
        value(content);
        setInputValue(''); // Clear the input field
        inputRef.current.value=''
        setIsPopupVisible(false); // Hide the popup
    }, [value]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSentChat();
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setInputValue(file.name); // Set the input value to the file name
            setIsPopupVisible(true); // Show the popup
            console.log(file);
        }
    };
    const handlePropReply = useCallback(() => {
        onReply('');
    }, []);
    const handleReply = ()=> {
        handlePropReply()
    }
    return (
        <div className="input_container">
            <div className="input_container_wrap">
                {isReply &&<div className="input_container_reply">
                    <div className="icon_reply">
                        <span><FontAwesomeIcon icon={faReply} /></span>
                        
                    </div>
                    <div className="content_reply">
                        <div className="reply-content">
                            <div className="reply-title">
                                <span>Reply to {isReply.sender}</span>
                            </div>
                            <div className="reply-subtitle">
                            {isReply.content }
                            </div>
                        </div>
                    </div>
                    <div className="icon_cancel">
                        <span onClick={handleReply}>
                        <FontAwesomeIcon icon={faXmark} /></span>
                    </div>
                </div>}
                <div className="input_container_sub">
                    <div className="input_container">
                        <input
                            name="mess"
                            type="text"
                            ref={inputRef}
                            placeholder="Message"
                            onKeyDown={handleKeyPress}
                            className="main_input"
                        />
                    </div>
                    {isPopupVisible && (
                        <div className="img_popup" >
                            <div className="close" onClick={() => {
                                setInputValue('');
                                setIsPopupVisible(false); // Hide the popup
                                imageRef.current.value = ''; // Clear the file input
                            }} >
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </div>
                            <img src={URL.createObjectURL(imageRef.current.files[0])} alt="Selected" className="selected_image" />
                            <div className="caption">
                                <input type="text" placeholder="thêm ghi chú" />
                                <button className="sendimg">gửi</button>
                            </div>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="imageUpload"
                        ref={imageRef}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="imageUpload" className="img_file">
                        <FontAwesomeIcon icon={faFileImage} />
                    </label>
                </div>
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