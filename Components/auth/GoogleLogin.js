
import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc'
import { HiOutlineMail } from 'react-icons/hi'
import { googleLogin } from '../../api/auth';
import  {AiOutlineClose} from 'react-icons/ai'
import { useRouter } from 'next/router';
const GoogleAuth = (props) => {
    const router = useRouter()
    const responseGoogle = (response) => {
        const tokenId = response.tokenId
        let token = {
            tokenId: tokenId
        }
        googleLogin(token)
            .then(response => {
            })
            .then(()=>{
                props.handleClose()
                router.reload('/')
            })
            .catch(err => console.log(err))
    }


    return (

        <div
            className="auth-box"
        >
                    <AiOutlineClose 
                    onClick={props.handleClose}
                    className="cursor"
                     style={{position:'absolute', top:'2rem'}}/>

            <p className="graf--p">Welcome back!</p>
            <div>
                <GoogleLogin
                    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    cookiePolicy="single_host_origin"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    render={renderProps => (
                        <div
                            className="button-outlined btn-long bottom-margin-2"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}>
                            <FcGoogle />
                            <span className="text-btn">Sign in with Google</span>
                        </div>
                    )}
                />
            </div>


            <div
                className="button-outlined btn-long bottom-margin-2" >
                <HiOutlineMail />
                <span
                    onClick={() => props.setModalNumber(1)}
                    className="text-btn">Sign in with Email</span>
            </div>

            <p className="small-text-primary">No account?
                <span
                    onClick={() => props.setModalNumber(2)}

                    className="strong-text-primary left-margin-2 cursor">Create one
                </span>
            </p>
        </div>
    )
}

export default GoogleAuth