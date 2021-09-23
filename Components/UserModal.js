

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
const UserModal = (props) => {

    const userstate = useSelector(state => state.user)
    const menuRef = useRef()

    useEffect(() => {

        let handleMouswDown = (event) => {
            if (!menuRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleMouswDown)

        return () => {
            document.removeEventListener('mousedown', handleMouswDown)
        }
    })

    const [open, setOpen] = useState(false)
    const handleClick = (event) => {
        setOpen(true)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            {
                userstate &&
                <div className="drop-down" >
                    <div>
                    <Avatar
                    className="cursor"
                        src={userstate.avatar}
                        onClick={handleClick}
                    ></Avatar>
                    </div>
                    <div className={`drop-down-menu${open ? " menu-active" : ""}`}
                        ref={menuRef}
                    >
                        <ul className="drop-down-list">
                            <li>
                                <div className="drop-down-list-profile">
                                    <Avatar className="cursor" src={userstate.avatar} />
                                    <div className="drop-down-list-left">
                                        <p className="profile-text">{userstate.username}</p>
                                        <p className="email-text">@{userstate.email.split("@")[0]}</p>
                                    </div>

                                </div>
                                <li>
                                    <Divider />
                                </li>
                            </li>
                            <li>
                                Write a story
                            </li>
                            <li>
                                Stories
                            </li>
                            <li>
                                Bookmarks
                            </li>
                            <li>
                                Follows
                            </li>
                            <li>
                                Lists
                            </li>

                            <li>
                                <Divider />
                            </li>
                            <li>
                                Help
                            </li>
                            <li>
                                Settings
                            </li>
                            <li>
                                Sign out
                            </li>
                        </ul>
                    </div>
                </div>

            }
        </React.Fragment>
    )
}


{/* <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    MenuListProps={{
        'aria-labelledby': 'basic-button',
    }}
>
    <MenuItem onClick={handleClose}>Profile</MenuItem>
    <MenuItem onClick={handleClose}>My account</MenuItem>
    <MenuItem onClick={handleClose}>Logout</MenuItem>
</Menu> */}
export default UserModal