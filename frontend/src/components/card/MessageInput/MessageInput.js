import "./MessageInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {  useRef, useCallback } from "react";

const MessageInput = ({ func }) => {
    const inputRef = useRef(null);

    const handleSentChat = useCallback(() => {
        const message = inputRef.current.value;
        func({messages:message});
    }, [func]);

    return (
        <div className="input_container">
            <div className="input_container">
                <input name="mess" type="text" ref={inputRef} />
            </div>
            <button
                className="chatPage_chat_btn"
                onClick={handleSentChat}
            >
                <FontAwesomeIcon icon={faPaperPlane} className="chatPage_chat_avt" />
            </button>
        </div>
    );
}

export default MessageInput;
