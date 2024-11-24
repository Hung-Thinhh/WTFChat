
import Button from "components/Button";
import classNames from "classnames/bind";
import styles from "./NewChat.module.scss";
const cx = classNames.bind(styles);

const ButtonGroup = ({ setStep, handleNewChat }) => (
    <div className={cx('btnGr')}>
        <Button onClick={() => setStep(1)}>Quay lại</Button>
        <Button onClick={handleNewChat}>Lưu</Button>
    </div>
);

export default ButtonGroup;