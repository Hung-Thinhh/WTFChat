import { createChatRoomCtrl } from '../controller/createChatRoom';
const addFriend = async (data) => {
    try {
        const datas = await createChatRoomCtrl(data)
        return datas
    } catch (error) {
        console.error("Error loading friend data:", error);
        return null;
    }
};

export default addFriend