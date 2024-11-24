
import ChatRoom from "../ChatRoomComponent";
import classNames from "classnames/bind";
import styles from "./NewChat.module.scss";
const cx = classNames.bind(styles);

const MemberList = ({ findData, handleClickMember, choosedMember }) => (
    <div className={cx('membercontainer')}>
        {findData &&
            findData.map((item) =>
                item.loai === 'nguoidung' && (
                    <ChatRoom
                        key={item.id}
                        onClick={(item) => handleClickMember(item)}
                        type="new"
                        id={item.id}
                        name={item.firstname + ' ' + item.lastname}
                        choosedMember={choosedMember}
                        avt={item.avatar}
                        friendId={item.id}
                    />
                )
            )}
    </div>
);

export default MemberList;