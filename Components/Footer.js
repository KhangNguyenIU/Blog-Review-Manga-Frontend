import React from "react"
import {FaFacebookF} from 'react-icons/fa'
import {AiFillGithub} from 'react-icons/ai'
import {SiGmail} from 'react-icons/si'

const Footer =()=>{

    return (
        <React.Fragment>
            <div className="footer-wrapper flex-row-center">
                    <div className="flex-row-center">
                        <ul>
                            <li>
                                <FaFacebookF/>
                            </li>
                            <li>
                                <AiFillGithub/>
                            </li>

                            <li>
                                <SiGmail/>
                            </li>
                        </ul>
                    </div>
                    <p className="copy-right">@Copyright NguyenDuyKhang - 2021</p>
            </div>
        </React.Fragment>
    )
}

export default Footer