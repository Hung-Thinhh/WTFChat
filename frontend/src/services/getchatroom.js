import { getChatRoomCtrl } from "../controller/getChatRoomCtrl"
const getChatRoom = async (datas) => {
    try {
        const data = await getChatRoomCtrl(datas)
        return data
    } catch (error) {
        console.error("Error loading adminHome data:", error);
        return null;
    }
}; 
export default getChatRoom;