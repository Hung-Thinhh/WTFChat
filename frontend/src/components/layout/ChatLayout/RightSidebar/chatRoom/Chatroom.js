import "./ChatRoom.scss";
const ChatRoom = ({avt,name,time,mess}) => {
    return ( 
       <div className="main_container">
        <div className="CR_avt">
            <img src={avt} alt="avt" />
        </div>
        <div className="CR_info">
            <div className="CR_left">
                <div className="CR_romname">
                    <h3>{name}</h3>
                </div>
                <div className="CR_mess">
                    <p>{mess}</p>
                </div>
            </div>
            <div className="CR_right">
                {time}
            </div>
        </div>
       </div>
     );
}
 
export default ChatRoom;