import { getRoomInfo } from '../controller/getRoomInfo';
const getRoomInfoService = async (data) => {
    try {
        const datas = await getRoomInfo(data)
        return datas
    } catch (error) {
        console.error("Error loading top100 data:", error);
        return null;
    }
}; 

export default getRoomInfoService