
import Modal from '@mui/material/Modal';
import React, { useState } from 'react'

import Signin from './auth/Signin';
import Signup from './auth/Signup';
import GoogleAuth from './auth/GoogleLogin';
const ModalAuth = (props) => {

    const [modalNumber, setModalNumber] = useState(0)

    const renderModal = (param) => {
        switch (param) {
            case 0:
                return <GoogleAuth
                    handleClose={props.handleClose}
                    setModalNumber={setModalNumber} />
            case 1:
                return <Signin
                    handleClose={props.handleClose}
                    setModalNumber={setModalNumber} />
            case 2:
                return <Signup
                    handleClose={props.handleClose}
                    setModalNumber={setModalNumber} />
            default:
                break
        }
    }


    return (
        <div className={`back-drop${props.open?" back-drop--active":""}`}
        >
            <div>
                {
                    renderModal(modalNumber)
                }
            </div>
        </div>


    )
}

export default ModalAuth