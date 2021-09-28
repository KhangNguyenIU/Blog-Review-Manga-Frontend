// import { Toolbar } from '@material-ui/core'
import React, { useState } from 'react'
import {
    AiOutlineCloudUpload,
    AiOutlinePlus,
    AiOutlinePicLeft,
    AiOutlineClose
} from 'react-icons/ai'
import ToolBar from './ToolBar'
import UnsplashImage from './UnsplashImage'


const TitleText = (props) => {

    const [isUploadBackground, setIsUploadBackground] = useState(false)
    const [isOpenUnsplash, setOpenUnsplash] = useState(false)


    const handleTitleChange = (e) => {
        if (e.keyCode !== 13)
            props.setTitle(e.target.innerText)
    }

    const handleImageClick = (e) => {
        console.log(e)
    }



    const ImagePreview = () => {
        return (
            <div
                style={{
                    display: 'block',
                    textAlign: 'center',
                    marginBottom: '4rem',
                    boxSizing: 'border-box'
                }}
            >

                <div className="icon-single"
                >
                    <AiOutlineClose
                        onClick={() => { props.setPreviewBackground(""); setIsUploadBackground(false) }} />
                </div>
                <img
                    className="general-image"
                    onClick={handleImageClick}
                    src={props.previewedBackground}
                    alt="alt-img" >
                </img>

            </div>
        )
    }

    return (
        <React.Fragment>
            <div className="flex-column-center"
            >
                <p
                    className="title-primary"
                    contentEditable
                    onInput={handleTitleChange}
                    placeholder="Title..."
                    style={{ paddingTop: '100px' }}
                >
                </p>
                <ToolBar 
                previewedBackground={props.previewedBackground}
                setPreviewBackground={props.setPreviewBackground}
                setIsUploadBackground={setIsUploadBackground}
                setOpenUnsplash={setOpenUnsplash}
                />

            </div>

            {
                isUploadBackground &&
                    <ImagePreview />
            }
        </React.Fragment>
    )
}

export default TitleText;