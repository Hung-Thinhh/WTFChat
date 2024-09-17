// import "../../css/ChatPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";
import MessageBubble from "../card/MessageBubble";
// import MessageInput from "../card/MessageInput";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
const ChatPage = () => {
    return (
        <Box
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                position: 'fixed',
                left: '26%',
                top: '5%',
                width: ' 71%',
                height: '90%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#1C1B1C',
                zIndex: '1',
                borderRadius: '15px',
                boxShadow: '9px 9px 1px 1px #3b3b3b',
            }}
            noValidate
            autoComplete="off"
            className="chatPage_container"
        >
            <Stack direction="row" spacing={1} useFlexGap sx={{
                backgroundColor: '#3C3C434A',
                width: '97%',
                padding: '0.5rem',
                borderRadius: '15px',
                textAlign: 'center',
                fontSize: '1.5rem',
                color: '#FFFFFF',
            }} className="chatpage_header">
                <Avatar alt="UserAvt" src="https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-1.jpg" />  4 anh em bị gà
            </Stack>
            <Box
                sx={{
                    width: '100%',
                    backgroundImage: 'linear-gradient(to right bottom, #694cff, #5343cf, #41399f, #322e71, #252246, #2a2548, #2e2749, #322a4b, #523b78, #7a4aa6, #aa57d2, #e05ffb)',
                    height: '100%',
                    overflow: 'auto',
                }}>

                <MessageBubble data={
                    {
                        avt: "https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-1.jpg",
                        content: "ĐỊT CON ĐĨ MẸ NHÀ MÀY LÚC SÚC VẬT, WIBU THÌ ĐÃ SAO HẢ MẤY CON CHÓ ĂN CỨC RẢNH LỒN KHÔNG CÓ CHUYỆN GÌ LÀM ĐI GATO VS WIBU HẢ? WIBU ĂN HẾT CÁI LỒN CON ĐĨ MẸ MÀY HAY GÌ CỨ HỞ TÍ WIBU LÀ SAO HẢ CÁI CON THÚ HOANG RÁC RƯỞI, ĐỊT HẾT CÁC ĐỜI TỔ TÔNG GIA PHẢ NHÀ CON ĐĨ MẸ MÀY, TAO WIBU THÌ SAO? TỤI MÀY KO ĐC LÀM WIBU NHƯ TỤI TAO RỒI TỤI M TỨK HẢ? TỤI MÀY ĐÉO CÓ GỐI ÔM CỦA REM ĐỂ ĐỤ NÊN TỨK HẢ? TỤI MÀY ĐÉO CÓ THIỂU NĂNG NHƯ TỤI TAO TỤI MÀY TỨK HAY GÌ? TAO LÀ 1 WIBU CHÂN CHÍNH NÊN ĐỪNG ĐỤNG VÔ TỤI TAO, NẾU CÒN ĐỤNG VÔ THÌ TAO SẼ HOÁ ZORO CẦM 3 THANH KIẾM CHÉM MÀY RA HÀNG TRĂM MẢNH RỒI CHO CÁ SẤU ĂN ĐÓ, ĐỤ MẸ TỤI T NGỒI K CŨNG CÓ ĂN NÈ ĐÂU NHƯ TỤI M LÀM NHƯ CHÓ TỚI CUỐI THÁNG MỚI CÓ LƯƠNG ĐÂU, TỤI TAO NGỒI K ĂN BÁT VÀNG NÈ CON ĐĨ MẸ TỤI MÀY, TAO TỨK QUÁ MÀ, DÒNG ĐĨ NỨNG LỒN, NỨNG CẶC GÌ ĐÂU K À 😡😡😡😡😡😡😡",
                        time: "25:00",
                        user: "me"
                    }
                } />

            </Box>

            <Stack direction="row" spacing={1} useFlexGap sx={{ width: '100%' }}>
                <TextField
                    id="email-newsletter"
                    hiddenLabel
                    size="large"
                    variant="outlined"
                    fullWidth
                    aria-label="Enter your email address"
                    placeholder="Your email address"
                    slotProps={{
                        htmlInput: {
                            autoComplete: 'off',
                            'aria-label': 'Enter your email address',
                        },
                    }}
                    sx={{ width: '100% !important' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ flexShrink: 0, margin: '8px', fontSize: '1.5rem' }}
                >
                    <FontAwesomeIcon icon={faPaperPlane} className="chatPage_chat_avt" />
                </Button>
            </Stack>
        </Box>
    );
}

export default ChatPage;