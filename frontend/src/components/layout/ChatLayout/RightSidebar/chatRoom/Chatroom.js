import "./ChatRoom.scss";
const ChatRoom = () => {
    return ( 
       <div className="main_container">
        <div className="CR_avt">
            <img src="https://steamuserimages-a.akamaihd.net/ugc/791991838191794976/8747F5C887FF202088053BB41FB57943F72D9BAF/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" alt="/" />
        </div>
        <div className="CR_info">
            <div className="CR_left">
                <div className="CR_romname">
                    <h3>Room Name</h3>
                </div>
                <div className="CR_mess">
                    <p>Message</p>
                </div>
            </div>
            <div className="CR_right">
                10/02/00999
            </div>
        </div>
       </div>
     );
}
 
export default ChatRoom;