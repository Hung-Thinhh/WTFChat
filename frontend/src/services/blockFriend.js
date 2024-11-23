import { blockFriendCtrl } from '../controller/FriendStuff';
const blockFriend = async (data) => {
    try {
        const datas = await blockFriendCtrl(data)
        return datas
    } catch (error) {
        console.error("Error loading friend data:", error);
        return null;
    }
};

export default blockFriend