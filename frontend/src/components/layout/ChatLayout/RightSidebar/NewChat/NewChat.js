
import classNames from "classnames/bind";
import styles from "./NewChat.module.scss";
import Button from "components/Button";


const cx = classNames.bind(styles);







const NewChat = ({ active, setActive }) => {
    return <div className={cx('overlay', active ? 'active' : 'unActive')}>
        <div className={cx('container')}>
            <Button onClick={() => setActive(false)}>Đóng</Button>
            <Button onClick={() => setActive(false)}>Lưu</Button>

        </div>
    </div>
};


export default NewChat;