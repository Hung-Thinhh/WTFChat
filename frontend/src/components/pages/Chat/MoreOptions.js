import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faInfo, faBellSlash, faLock, faTrash, faRightToBracket, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import { setShowMenu } from '../../layout/ChatLayout/LeftSidebar/sidebarSlide';
import leaveChatRoomCtrl from 'services/leaveChatRoom';
import { removeChatRoom } from '../../../redux/chatRoomSlice';

const MoreOptions = ({ RoomInfo, dispatch, state }) => {
    // const handleBlockFriend = async (e) => {
    //     const data = await blockFriend({ friendId: RoomInfo.friendId[0], status: true });
    // }

    const handleoutGr = async (e) => {
        const userAction = window.confirm('B���n có chắc chắn muốn rời nhóm?');
        if (!userAction) return;
        const data = await leaveChatRoomCtrl({ id: RoomInfo.id });
        if (data.EC === 1) {
            alert('Rời nhóm thành công');
            dispatch(removeChatRoom(RoomInfo.id));
        } else {
            alert('Rời nhóm không thành công');
        }
    }
    const handleAddGr = async (e) => {
        alert('Bạn có chắc chắn muốn thêm thành viên?')
    }

    return <div className="more">
        <Menu menuButton={<MenuButton className="btn_more"><FontAwesomeIcon icon={faEllipsisVertical} /></MenuButton>} transition className="my-menu">
            <MenuItem onClick={() => dispatch(setShowMenu(!state))} className="menu_item"><FontAwesomeIcon icon={faInfo} />Thông tin</MenuItem>
            <MenuItem className="menu_item"><FontAwesomeIcon icon={faBellSlash} />Im lặng</MenuItem>
            {RoomInfo.type === 'private' ? (
                <>
                    {/* <MenuItem className="menu_item" onClick={handleBlockFriend}><FontAwesomeIcon icon={faLock} />Chặn</MenuItem> */}
                    <MenuItem className="menu_item delete-chat" onClick={handleoutGr}><FontAwesomeIcon icon={faTrash} />Xóa chat</MenuItem>
                </>
            ) : (
                    <MenuItem className="menu_item delete-chat" onClick={handleoutGr}><FontAwesomeIcon icon={faRightToBracket} />Rời nhóm</MenuItem>
            )}
        </Menu>
    </div>
}


export default MoreOptions;