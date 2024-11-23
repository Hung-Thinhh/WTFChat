
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faUnlock, faLock, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import classNames from 'classnames/bind';
import styles from "./ChatRoomComponent.module.scss";

const cx = classNames.bind(styles);

export default function FriendMenu({ isnBlock, insFriend, handleUnBlockFriend, handleBlockFriend, handleAddFriend, handleDelFriend }) {
    return (
        <Menu menuButton={<MenuButton className={cx("btn_more")}><FontAwesomeIcon icon={faEllipsisVertical} /></MenuButton>} transition className={cx("my-menu")}>
            {isnBlock ?
                (<MenuItem className={cx("menu_item")} onClick={handleUnBlockFriend}><FontAwesomeIcon icon={faUnlock} />Bỏ chặn</MenuItem>) :
                (<MenuItem className={cx("menu_item")} onClick={handleBlockFriend}><FontAwesomeIcon icon={faLock} />Chặn</MenuItem>)
            }
            {isnBlock ? null :
                insFriend ?
                    (<MenuItem className={cx("menu_item", "deleteUser")} onClick={handleDelFriend}><FontAwesomeIcon icon={faTrash} />Xóa bạn</MenuItem>) :
                    (<MenuItem className={cx("menu_item", "addFUser")} onClick={handleAddFriend}><FontAwesomeIcon icon={faPlus} />Thêm bạn</MenuItem>)
            }
        </Menu>
    );
}