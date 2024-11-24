import { leaveChatRoomCtrl } from '../controller/leaveChatRoomCtrl';
const leaveChatRoom = async (data) => {
    try {
        const datas = await leaveChatRoomCtrl(data)
        return datas
    } catch (error) {
        console.error("Error loading friend data:", error);
        return null;
    }
};

export default leaveChatRoom