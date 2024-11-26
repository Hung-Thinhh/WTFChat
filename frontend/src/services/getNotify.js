import { getNotifyCtrl } from '../controller/getNotifyCtrl';
const getNotify = async (data) => {
    try {
        const datas = await getNotifyCtrl(data)
        return datas
    } catch (error) {
        console.error("Error loading top100 data:", error);
        return null;
    }
}; 

export default getNotify