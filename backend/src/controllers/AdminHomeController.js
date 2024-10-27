import {adminHome} from '../services/AdminHomeService';
const HomeController = async () => {
    try {
        const result = await adminHome.HomeService();
        
        return {
            ...result,
        };
    } catch (error) {
        console.log(error);
        
        return {
            EM: 'CONTROLLER | REGISTER | ERROR | ' + error,
            EC: '500',
        };
    }
};
export { HomeController };
