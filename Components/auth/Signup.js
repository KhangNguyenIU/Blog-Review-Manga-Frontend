import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { signup } from '../../api/auth'

const Signup = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [reenterPassword, setReenterPassword] = useState('')
    const onEmailChange = e => {
        e.preventDefault()
        setEmail(e.target.value)
    }
    const onPasswordChange = e => {
        e.preventDefault()
        setPassword(e.target.value)
    }
    const onReenterPasswordChange = e=>{
        e.preventDefault()
        setReenterPassword(e.target.value)
    }
    const handleSubmit = () => {
        let user = {
            email,
            password,
            reenterpassword:reenterPassword
        }

        signup(user).then(data=>{
            console.log("data",data)
        }).catch(err=>{
            console.log("error",{err})
        })
    }

    return (
        <React.Fragment>
            <div className="auth-box">
                <AiOutlineClose
                    onClick={props.handleClose}
                    className="cursor"
                    style={{ position: 'absolute', top: '2rem' }} />
                <p className="graf--p">Sign un with email</p>


                <p style={{ maxWidth: '30rem', textAlign: 'center', }} className="small-text-primary  bottom-margin-5">Enter the email address associated with your account, and we’ll send a magic link to your inbox.</p>

                <div className="small-text-secondary">
                    <p> Email</p>
                    <input
                        value={email}
                        onChange={onEmailChange}
                        className="input-primary bottom-margin-2" />
                    <p> Password</p>
                    <input
                        value={password}
                        onChange={onPasswordChange}
                        className="input-primary bottom-margin-2" />
                    <p> Re enter password</p>
                    <input
                        value={reenterPassword}
                        onChange={onReenterPasswordChange}
                        className="input-primary bottom-margin-2" />
                </div>


                <button
                onClick={handleSubmit}
                    className="button-primary bottom-margin-2"
                >Continue</button>

                <p
                    onClick={() => props.setModalNumber(0)}

                    className="strong-text-primary cursor"> Back</p>
            </div>
        </React.Fragment>
    )
}

export default Signup;