import { delFriendCtrl } from '../controller/FriendStuff';
const delFriend = async (data) => {
    try {
        const datas = await delFriendCtrl(data)
        return datas
    } catch (error) {
        console.error("Error loading friend data:", error);
        return null;
    }
};

export default delFriend