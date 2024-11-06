import { findUserController } from "../controller/findUser"
const findUser = async (datas) => {
    try {
        const data = await findUserController(datas)
        return data
    } catch (error) {
        console.error("Error loading adminHome data:", error);
        return null;
    }
}; 
export default findUser;