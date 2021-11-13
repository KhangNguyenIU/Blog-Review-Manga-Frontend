import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { signin } from '../../api/auth'
import { useRouter } from 'next/router'
const Signin = (props) => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')

    const onEmailChange = e => {
        e.preventDefault()
        setEmail(e.target.value)
    }
    const onPasswordChange = e => {
        setPassword(e.target.value)
    }
    const handleSubmit = () => {
        let user = {
            email,
            password
        }

        signin(user).then(data => {
        })
        .then(()=>{
            props.handleClose()
            router.reload('/')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <React.Fragment>
            <div className="auth-box">
                <AiOutlineClose
                    onClick={props.handleClose}
                    className="cursor"
                    style={{ position: 'absolute', top: '2rem' }} />
                <p className="graf--p">Sign in with email</p>


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

export default Signin;