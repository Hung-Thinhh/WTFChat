import "./MessageInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRef, useCallback} from "react";

const MessageInput = ({
    value,
}) => {
    const inputRef = useRef(null);

    const handleSentChat = useCallback(() => {
        const content = inputRef.current.value;
        value(content);
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