import "./MessageInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faFileImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRef, useCallback, useState } from "react";

const MessageInput = ({
    value,
}) => {
    const inputRef = useRef(null);
    const imageRef = useRef(null);
    const [, setInputValue] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleSentChat = useCallback(() => {
        const content = inputRef.current.value;
        // const image = imageRef.current.files[0];
        value(content);
        setInputValue(''); // Clear the input field
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

    return (
        <div className="input_container">
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
                        <div className="close" onClick={()=>{
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