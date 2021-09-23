import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineCamera, AiOutlineSearch } from 'react-icons/ai'
import UnsplashImage from "./UnsplashImage";
import Tooltip from '@mui/material/Tooltip';
const ToolBar = (props) => {

    const [open, setOpen] = useState(false)
    const [isOpenUnsplash, setOpenUnsplash] = useState(false)

    const handleOpen = () => {
        setOpen(open => !open)
        if (isOpenUnsplash) {
            setOpenUnsplash(isOpenUnsplash => !isOpenUnsplash)
        }
    }

    const handlePreviewBackground = (e) => {
        // console.log("reviewBK", e.target.files[0])
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader()

            reader.onload = function (e) {
                props.setPreviewBackground(e.target.result)
                props.setIsUploadBackground(true)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }
    return (
        <React.Fragment>
            <div className={`tool-box${open ? " tool-box-active" : ""}`}>
             
                <div
                    className={`icon-outlined ${open ? " rotate-45" : ""}`}
                    onClick={handleOpen}
                >
                        <AiOutlinePlus className="icon" />
                </div>
                <div
                    className={`${open ? "" : "hidden"} tool-expand`}
                >
                    <label style={{ display: 'inline-block' }} htmlFor="input">
                        <div className="icon-outlined"
                        >
                            <AiOutlineCamera />
                        </div>
                        <input
                            id="input"
                            hidden
                            type="file"
                            onChange={handlePreviewBackground} />
                    </label>

                    <div className="icon-outlined"
                        onClick={() => setOpenUnsplash(true)}
                    >
                        <AiOutlineSearch />
                    </div>
                </div>
            </div>

            <div>
                {
                    isOpenUnsplash && <UnsplashImage
                        setPreviewBackground={props.setPreviewBackground}
                        setIsUploadBackground={props.setIsUploadBackground}
                        setOpenUnsplash={setOpenUnsplash} />
                }
            </div>
        </React.Fragment>
    )
}

export default ToolBar;