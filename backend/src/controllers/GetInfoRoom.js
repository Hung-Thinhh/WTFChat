import { getInfo } from '../services/chatService.js';
const GetInfoRoom = async (req, res) => {
    try {
        const { roomId } = req.body;
        const result = await getInfo(roomId);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });
    } catch (error) {
        console.log('CONTROLLER | GET INFO ROOM | ERROR | ', error);
        return res.status(500).json({
            EM: 'Error',
            EC: -1,
            DT: []
        });

    }
}
export default GetInfoRoom;