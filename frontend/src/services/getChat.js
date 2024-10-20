import { getChatCtrl } from '../controller/getChatCtrl';
const getChat = async (data) => {
    try {
        const datas = await getChatCtrl(data)
        return datas
    } catch (error) {
        console.error("Error loading top100 data:", error);
        return null;
    }
}; 

export default getChat