
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faInfo, faBellSlash, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import { setShowMenu } from '../../layout/ChatLayout/LeftSidebar/sidebarSlide';

const MoreOptions = ({ dispatch, state }) => (
    <div className="more">
        <Menu menuButton={<MenuButton className="btn_more"><FontAwesomeIcon icon={faEllipsisVertical} /></MenuButton>} transition className="my-menu">
            <MenuItem onClick={() => dispatch(setShowMenu(!state))} className="menu_item"><FontAwesomeIcon icon={faInfo} />Thông tin</MenuItem>
            <MenuItem className="menu_item"><FontAwesomeIcon icon={faBellSlash} />Mute</MenuItem>
            <MenuItem className="menu_item"><FontAwesomeIcon icon={faLock} />Block user</MenuItem>
            <MenuItem className="menu_item delete-chat"><FontAwesomeIcon icon={faTrash} />Delete chat</MenuItem>
        </Menu>
    </div>
);

export default MoreOptions;