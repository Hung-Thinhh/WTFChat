import { addFriendCtrl } from '../controller/FriendStuff';
const addFriend = async (data) => {
    try {
        const datas = await addFriendCtrl(data)
        return datas
    } catch (error) {
        console.error("Error loading friend data:", error);
        return null;
    }
};

export default addFriend