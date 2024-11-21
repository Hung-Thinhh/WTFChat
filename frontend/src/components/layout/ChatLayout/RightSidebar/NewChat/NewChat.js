
import classNames from "classnames/bind";
import styles from "./NewChat.module.scss";
import Button from "components/Button";
import Search from "../Footer/Search";
import ChatRoom from "../ChatRoomComponent";
const cx = classNames.bind(styles);







const NewChat = ({ active, setActive }) => {
    const handleNewChat = (e) => {
        setActive(true)
        alert('Tạo phòng chat mới thành công')
    };


    return <div className={cx('overlay', active ? 'active' : 'unActive')}>
        <div className={cx('container')}>
            <h3 className={cx('title')}>Tạo phòng chat mới</h3>

            <div className={cx('content')}>
                <Search className={cx('search')} isMulti />
                <div className={cx('membercontainer')}>
                    <ChatRoom type="new" />
                </div>
            </div>

            <div className={cx('btnGr')}>
                <Button onClick={() => setActive(false)}>Đóng</Button>
                <Button onClick={handleNewChat}>Lưu</Button>
            </div>



        </div>
    </div>
};


export default NewChat;