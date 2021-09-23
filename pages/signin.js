import React, { useState } from 'react'


const Signin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')

    const onEmailChange = e => {
        e.preventDefault()
        setEmail(e.target.value)
    }
    const onPasswordChange = e => {
        e.preventDefault()
        setEmail(e.target.value)
    }
    const handleSubmit = () => {

    }

    return (
        <React.Fragment>
            <div className="auth-box">
                <p className="graf--p">Sign in with email</p>


                <p style={{ maxWidth: '30rem', textAlign: 'center', }} className="small-text-primary  bottom-margin-5">Enter the email address associated with your account, and we’ll send a magic link to your inbox.</p>

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

                <button
                    className="button-primary bottom-margin-2"
                >Continue</button>

                <p className="strong-text-primary cursor"> Back</p>
            </div>
        </React.Fragment>
    )
}

export default Signin;