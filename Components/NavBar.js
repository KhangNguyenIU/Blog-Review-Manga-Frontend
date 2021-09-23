import Image from 'next/image'
import brandingImage from '../public/favico.png'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { isAuth } from '../api/auth'
// import {addUser} from '../state/actions/auth.action'
import { ActionCreator } from '../state/index'
import { bindActionCreators } from 'redux'
import UserModal from './UserModal'
// import {dispatch} from 'react-redux'
const NavBar = (props) => {

    const dispatch = useDispatch()
    const { addUser } = bindActionCreators(ActionCreator, dispatch)
    const state = useSelector(state => state.user)
    useEffect(() => {
        isAuth().then(data => {
            addUser(data.data)

        }).catch(err => {
            console.log(err)
        })
    })
    return (
        <div className="navbar-wrapper">
            <div>
                <Image src={brandingImage} width={32} height={32} />
            </div>

            <div className="navbar-left">


                {
                    (state && state.email) ? <UserModal /> :
                     <span onClick={props.handleOpen} >
                        <a className="link-text seperator cursor" >Sign in</a>
                    </span>
                }

                
            </div>
        </div>
    )
}
export default NavBar;