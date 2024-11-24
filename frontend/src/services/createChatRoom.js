import { createChatRoomCtrl } from '../controller/createChatRoom';
const createChatRoom = async (data) => {
    try {
        const datas = await createChatRoomCtrl(data)
        return datas
    } catch (error) {
        console.error("Error loading friend data:", error);
        return null;
    }
};

export default createChatRoom