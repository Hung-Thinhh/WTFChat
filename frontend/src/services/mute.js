import { muteCtrl } from '../controller/muteCtrl';
const mute = async (data) => {
    try {
        const datas = await muteCtrl(data)
        return datas
    } catch (error) {
        console.error("Error loading top100 data:", error);
        return null;
    }
}; 

export default mute