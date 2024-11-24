import { changeInfoGrNameCtrl, changeInfoGrAvtCtrl } from '../controller/changeInfoGr';
export const changeInfoGrName = async (data) => {
    try {
        const datas = await changeInfoGrNameCtrl(data)
        return datas
    } catch (error) {
        console.error("Error loading friend data:", error);
        return null;
    }
};
export const changeInfoGrAvt = async (data) => {
    try {
        const datas = await changeInfoGrAvtCtrl(data)
        return datas
    } catch (error) {
        console.error("Error loading friend data:", error);
        return null;
    }
};

