import React from "react"
import GoogleAuth from "./GoogleLogin"
import Signin from "./Signin"
import Signup from './Signup'
const SwitchAuth =(props)=>{

    const renderModal = (param) => {
        switch (param) {
            case 0:
                return <GoogleAuth
                    handleClose={props.handleClose}
                    setModalNumber={props.setModalNumber} />
            case 1:
                return <Signin
                    handleClose={props.handleClose}
                    setModalNumber={props.setModalNumber} />
            case 2:
                return <Signup
                    handleClose={props.handleClose}
                    setModalNumber={props.setModalNumber} />
            default:
                break
        }
    }

    return (
        <React.Fragment>
            {renderModal(props.modalNumber)}
        </React.Fragment>
    )
}

export default SwitchAuth