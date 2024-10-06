import { sentChatCtrl } from "../controller/sendchatCtrl"
const sentChat = async (datas) => {
    try {
        const data = await sentChatCtrl(datas)
        return data
    } catch (error) {
        console.error("Error loading adminHome data:", error);
        return null;
    }
}; 
export default sentChat;