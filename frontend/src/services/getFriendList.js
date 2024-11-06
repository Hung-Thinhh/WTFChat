import { getFriendListCtrl } from '../controller/getFriendList';
const getFriendList = async (data) => {
    try {
        const datas = await getFriendListCtrl(data)
        return datas
    } catch (error) {
        console.error("Error loading friend data:", error);
        return null;
    }
};

export default getFriendList