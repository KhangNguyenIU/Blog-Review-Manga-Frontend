import React, { useEffect, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import { signout } from '../../api/auth';
import { useRouter } from 'next/router';
const UserModal = (props) => {

    const userstate = useSelector(state => state.user)
    const menuRef = useRef()
    const router = useRouter()
    
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

    
    const logout = () => {
        signout()
            .then(response =>{
                console.log("helo")
                router.reload(window.location.pathname)
            })
            .catch(err => console.log(err))
    }

    return (
        <React.Fragment>
            {
                userstate &&
                <div className="drop-down" >
                    <Avatar
                    className="cursor"
                        src={userstate.avatar}
                        onClick={handleClick}
                    ></Avatar>
                    <div 
                    className={`drop-down-menu${open ? " menu-active" : ""}`}
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
                            <li onClick={()=>router.push('/new-story')}>
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
                            <li onClick={logout}>
                                Sign out
                            </li>
                        </ul>
                    </div>
              
                </div>

            }
        </React.Fragment>
    )
}



export default UserModal