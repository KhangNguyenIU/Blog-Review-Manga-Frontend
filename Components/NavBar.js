import Image from 'next/image'
import brandingImage from '../public/favico.png'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { isAuth } from '../api/auth'
import { AuthActionCreator } from '../state/index'
import { bindActionCreators } from 'redux'
import UserModal from './user/UserModal'
import { useRouter } from 'next/router'
import {FiSearch} from 'react-icons/fi'
import {BsBookmarks} from 'react-icons/bs'
const NavBar = (props) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { addUser } = bindActionCreators(AuthActionCreator, dispatch)
    const state = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const data = await isAuth()
                addUser(data.data)
            } catch (error) {
                console.log(error)
            }
            setLoading(true)
        })()
    }, [])
    return (
        <div className="navbar-wrapper">
            <div className="cursor"
                onClick={() => router.push('/')}
            >
                <Image src={brandingImage}
                    width={32}
                    height={32} />
            </div>
            {
                loading &&
                <div className="navbar-left">
                    <BsBookmarks className="cursor right-margin-2"/>
                    <FiSearch className="cursor right-margin-2"/>
                    {
                        (state && state.email) ? <UserModal /> :
                            <span onClick={props.handleOpen} >
                                <a className="button-outlined cursor" >Sign in</a>
                            </span>
                    }
                </div>
            }

        </div>
    )
}
export default NavBar;