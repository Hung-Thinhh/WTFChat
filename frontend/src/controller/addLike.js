// controller/SongController.js
import axios from "../setup/axios";
const addLike =  (data) => {
    console.log(data)
    return axios.post(`/api/addlike`,{data:data});

}
export {
    addLike,
}
