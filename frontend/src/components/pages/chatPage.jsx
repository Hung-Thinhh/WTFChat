import "../../css/ChatPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MessageBubble from "../card/MessageBubble";
import MessageInput from "../card/MessageInput";
const ChatPage = () => {
    return (
        <div className="chatPage_container">
            <div className="chatpage_header">
            <FontAwesomeIcon icon={faUser} className="chatPage_chat_avt"/>  4 anh em bị gà
            </div>
            <div className="ChatWindow">
                <MessageBubble />
            </div>
            <MessageInput />
        </div>
    );
}

export default ChatPage;