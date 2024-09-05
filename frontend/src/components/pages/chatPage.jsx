import "../../css/ChatPage.scss";
import MessageBubble from "../card/MessageBubble";
import MessageInput from "../card/MessageInput";
const ChatPage = () => {
    return (
        <div className="chatPage_container">
            <div className="chatpage_header"></div>
            <div className="ChatWindow">
                <MessageBubble />
            </div>
            <MessageInput />
        </div>
    );
}

export default ChatPage;