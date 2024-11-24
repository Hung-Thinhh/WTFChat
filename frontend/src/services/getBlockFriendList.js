import { getBlockFriendListCtrl } from '../controller/FriendStuff';
const getBlockFriendList = async (data) => {
    try {
        const datas = await getBlockFriendListCtrl(data)
        return datas
    } catch (error) {
        console.error("Error loading friend data:", error);
        return null;
    }
};

export default getBlockFriendList