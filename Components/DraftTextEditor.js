
import React, { useEffect, useState } from 'react'
import Dante from 'Dante2'
import {
    AiOutlineCloudUpload,
    AiOutlinePlus,
    AiOutlinePicLeft,
    AiOutlineClose
} from 'react-icons/ai'
import { convertToHTML } from 'draft-convert';
import UnsplashImage from './UnsplashImage';
/**
* @author
* @function DraftText
**/



const DraftTextEditor = (props) => {
    const [title, setTitle] = useState("")
    const [previewedBackground, setPreviewBackground] = useState('')
    const [isUploadBackground, setIsUploadBackground] = useState(false)
    const [isOpenUnsplash, setOpenUnsplash] = useState(false)
    const [content, setContent] = useState('')
    const [openModal, setOpenModal] = useState(false)

    let danteProps = {
        data_storage: {
            url: "xxx",
            save_handler: function (editorContext, content) {
                setContent(editorContext.editorContent)
            }
        }
    };

    const handleTitleChange = (e) => {
        if (e.keyCode !== 13)
            setTitle(e.target.value)
    }


    const handlePreviewBackground = (e) => {
        console.log("reviewBK")
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader()

            reader.onload = function (e) {
                setPreviewBackground(e.target.result)
                setIsUploadBackground(true)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const TitleText = () => {
        return (
            <p className="title-primary"
                style={{ paddingTop: '100px' }}
                contentEditable
                placeholder="Title..."
                onKeyDown={handleTitleChange}
            >

            </p>
        )
    }

    const BackGroundImageUpload = () => {
        return (
            <React.Fragment>
                <div
                    className="container upload-img-box">
                    <label
                        style={{ display: 'block', cursor: 'pointer' }}
                        htmlFor="image-input">
                        <input type="file"
                            hidden
                            id="image-input"
                            name="image-input"
                            className="image-input"
                            onChange={handlePreviewBackground} />
                        <AiOutlinePlus style={{ fontSize: '6rem' }} />
                        <p>Browse your background photo</p>
                    </label>
                    <p>Or <a className="btn-text" onClick={()=>setOpenUnsplash(true)}>Search Unsplash</a></p>
                </div >

                <div>
                    {
                        isOpenUnsplash && <UnsplashImage
                            setPreviewBackground={setPreviewBackground}
                            setIsUploadBackground={setIsUploadBackground}
                            setOpenUnsplash={setOpenUnsplash} />
                    }
                </div>
            </React.Fragment>

        )
    }

    const ImagePreview = () => {
        return (
            <div style={{ display: 'block', textAlign: 'center', marginBottom: '4rem' }}>
                <div className="icon-single"
                >
                    <AiOutlineClose
                        onClick={() => { setPreviewBackground(""); setIsUploadBackground(false) }} />
                </div>
                <img
                    className="general-image"
                    src={previewedBackground}
                    alt="alt-img" >
                </img>
            </div>
        )
    }

    return (
        <React.Fragment>
            <TitleText />
            {
                isUploadBackground ?
                    <ImagePreview />
                    :
                    <BackGroundImageUpload />
            }

            <div className="container" style={{ padding: '3rem 0' }}>
                <Dante
                    {...danteProps}
                    bodyPlaceholder={"Do what you will"}
                // default_wrappers={[{ className: 'text-editor', block: 'unstyled' }]}
                />

            </div>

            <div className="container center">
                <button className="button-outlined">Back</button>
                <button className="button-outlined">Publish</button>
            </div>
        </React.Fragment>

    )

}

export default DraftTextEditor