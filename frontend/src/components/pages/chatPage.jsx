import "../../css/ChatPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";
import MessageBubble from "../card/MessageBubble";
import MessageInput from "../card/MessageInput";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
const ChatPage = () => {
    return (
        <div className="chatPage_container">
            <div className="chatpage_header">
                <div className="chatPage_chat_avt">
                    <img src="https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-1.jpg" alt="user-avt" />
                </div>
                <div className="chatPage_chat_name">
                    <h3>Nguyễn Văn A</h3>
                    <p> <FontAwesomeIcon icon={faCircle} /></p>
                </div>
            </div>
            <div></div>

            <div className="ChatWindow">
                <MessageBubble data={
                    {
                        avt: "https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-1.jpg",
                        content: "ĐỊT CON ĐĨ MẸ NHÀ MÀY LÚC SÚC VẬT, WIBU THÌ ĐÃ SAO HẢ MẤY CON CHÓ ĂN CỨC RẢNH LỒN KHÔNG CÓ CHUYỆN GÌ LÀM ĐI GATO VS WIBU HẢ? WIBU ĂN HẾT CÁI LỒN CON ĐĨ MẸ MÀY HAY GÌ CỨ HỞ TÍ WIBU LÀ SAO HẢ CÁI CON THÚ HOANG RÁC RƯỞI, ĐỊT HẾT CÁC ĐỜI TỔ TÔNG GIA PHẢ NHÀ CON ĐĨ MẸ MÀY, TAO WIBU THÌ SAO? TỤI MÀY KO ĐC LÀM WIBU NHƯ TỤI TAO RỒI TỤI M TỨK HẢ? TỤI MÀY ĐÉO CÓ GỐI ÔM CỦA REM ĐỂ ĐỤ NÊN TỨK HẢ? TỤI MÀY ĐÉO CÓ THIỂU NĂNG NHƯ TỤI TAO TỤI MÀY TỨK HAY GÌ? TAO LÀ 1 WIBU CHÂN CHÍNH NÊN ĐỪNG ĐỤNG VÔ TỤI TAO, NẾU CÒN ĐỤNG VÔ THÌ TAO SẼ HOÁ ZORO CẦM 3 THANH KIẾM CHÉM MÀY RA HÀNG TRĂM MẢNH RỒI CHO CÁ SẤU ĂN ĐÓ, ĐỤ MẸ TỤI T NGỒI K CŨNG CÓ ĂN NÈ ĐÂU NHƯ TỤI M LÀM NHƯ CHÓ TỚI CUỐI THÁNG MỚI CÓ LƯƠNG ĐÂU, TỤI TAO NGỒI K ĂN BÁT VÀNG NÈ CON ĐĨ MẸ TỤI MÀY, TAO TỨK QUÁ MÀ, DÒNG ĐĨ NỨNG LỒN, NỨNG CẶC GÌ ĐÂU K À 😡😡😡😡😡😡😡",
                        time: "25:00",
                        user: "i"
                    }
                } />
                <MessageBubble data={
                    {
                        avt: "https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-1.jpg",
                        content: "ĐỊT CON ĐĨ MẸ NHÀ MÀY LÚC SÚC VẬT, WIBU THÌ ĐÃ SAO HẢ MẤY CON CHÓ ĂN CỨC RẢNH LỒN KHÔNG CÓ CHUYỆN GÌ LÀM ĐI GATO VS WIBU HẢ? WIBU ĂN HẾT CÁI LỒN CON ĐĨ MẸ MÀY HAY GÌ CỨ HỞ TÍ WIBU LÀ SAO HẢ CÁI CON THÚ HOANG RÁC RƯỞI, ĐỊT HẾT CÁC ĐỜI TỔ TÔNG GIA PHẢ NHÀ CON ĐĨ MẸ MÀY, TAO WIBU THÌ SAO? TỤI MÀY KO ĐC LÀM WIBU NHƯ TỤI TAO RỒI TỤI M TỨK HẢ? TỤI MÀY ĐÉO CÓ GỐI ÔM CỦA REM ĐỂ ĐỤ NÊN TỨK HẢ? TỤI MÀY ĐÉO CÓ THIỂU NĂNG NHƯ TỤI TAO TỤI MÀY TỨK HAY GÌ? TAO LÀ 1 WIBU CHÂN CHÍNH NÊN ĐỪNG ĐỤNG VÔ TỤI TAO, NẾU CÒN ĐỤNG VÔ THÌ TAO SẼ HOÁ ZORO CẦM 3 THANH KIẾM CHÉM MÀY RA HÀNG TRĂM MẢNH RỒI CHO CÁ SẤU ĂN ĐÓ, ĐỤ MẸ TỤI T NGỒI K CŨNG CÓ ĂN NÈ ĐÂU NHƯ TỤI M LÀM NHƯ CHÓ TỚI CUỐI THÁNG MỚI CÓ LƯƠNG ĐÂU, TỤI TAO NGỒI K ĂN BÁT VÀNG NÈ CON ĐĨ MẸ TỤI MÀY, TAO TỨK QUÁ MÀ, DÒNG ĐĨ NỨNG LỒN, NỨNG CẶC GÌ ĐÂU K À 😡😡😡😡😡😡😡",
                        time: "25:00",
                        user: "me"
                    }
                } />
                <MessageBubble data={
                    {
                        avt: "https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-1.jpg",
                        content: "ĐỊT CON ĐĨ MẸ NHÀ MÀY LÚC SÚC VẬT, WIBU THÌ ĐÃ SAO HẢ MẤY CON CHÓ ĂN CỨC RẢNH LỒN KHÔNG CÓ CHUYỆN GÌ LÀM ĐI GATO VS WIBU HẢ? WIBU ĂN HẾT CÁI LỒN CON ĐĨ MẸ MÀY HAY GÌ CỨ HỞ TÍ WIBU LÀ SAO HẢ CÁI CON THÚ HOANG RÁC RƯỞI, ĐỊT HẾT CÁC ĐỜI TỔ TÔNG GIA PHẢ NHÀ CON ĐĨ MẸ MÀY, TAO WIBU THÌ SAO? TỤI MÀY KO ĐC LÀM WIBU NHƯ TỤI TAO RỒI TỤI M TỨK HẢ? TỤI MÀY ĐÉO CÓ GỐI ÔM CỦA REM ĐỂ ĐỤ NÊN TỨK HẢ? TỤI MÀY ĐÉO CÓ THIỂU NĂNG NHƯ TỤI TAO TỤI MÀY TỨK HAY GÌ? TAO LÀ 1 WIBU CHÂN CHÍNH NÊN ĐỪNG ĐỤNG VÔ TỤI TAO, NẾU CÒN ĐỤNG VÔ THÌ TAO SẼ HOÁ ZORO CẦM 3 THANH KIẾM CHÉM MÀY RA HÀNG TRĂM MẢNH RỒI CHO CÁ SẤU ĂN ĐÓ, ĐỤ MẸ TỤI T NGỒI K CŨNG CÓ ĂN NÈ ĐÂU NHƯ TỤI M LÀM NHƯ CHÓ TỚI CUỐI THÁNG MỚI CÓ LƯƠNG ĐÂU, TỤI TAO NGỒI K ĂN BÁT VÀNG NÈ CON ĐĨ MẸ TỤI MÀY, TAO TỨK QUÁ MÀ, DÒNG ĐĨ NỨNG LỒN, NỨNG CẶC GÌ ĐÂU K À 😡😡😡😡😡😡😡",
                        time: "25:00",
                        user: "i"
                    }
                } />F
            </div>



            <div className="input_container">
                <MessageInput />
                <button
                    className="chatPage_chat_btn"
                >
                    <FontAwesomeIcon icon={faPaperPlane} className="chatPage_chat_avt" />
                </button>
            </div>
        </div>
    );
}

export default ChatPage;