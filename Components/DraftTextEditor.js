
import React, { useEffect, useState } from 'react'
import Dante from 'Dante2'
import {
    AiOutlineCloudUpload,
    AiOutlinePlus,
    AiOutlinePicLeft,
    AiOutlineClose
} from 'react-icons/ai'
import { convertToHTML } from 'draft-convert';
/**
* @author
* @function DraftText
**/

const data =
{
    "blocks": [
        {
            "key": "8i090",
            "text": "Hello CodePulse!",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [
                {
                    "offset": 0,
                    "length": 16,
                    "style": "BOLD"
                }
            ],
            "entityRanges": [],
            "data": {}
        },
        {
            "key": "42ncd",
            "text": "This text should be underlined.",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [
                {
                    "offset": 0,
                    "length": 31,
                    "style": "UNDERLINE"
                }
            ],
            "entityRanges": [],
            "data": {}
        },
        {
            "key": "327r6",
            "text": "And this text should be italic.",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [
                {
                    "offset": 0,
                    "length": 31,
                    "style": "ITALIC"
                }
            ],
            "entityRanges": [],
            "data": {}
        }
    ],
    "entityMap": {}
}


const DraftTextEditor = (props) => {


    const [title, setTitle] = useState("")
    const [previewedBackground, setPreviewBackground] = useState('')
    const [isUploadBackground, setIsUploadBackground] = useState(false)
    const [content, setContent] = useState('')

    useEffect(() => {
        console.log("json", content);
        // console.log("parse", content)
        // let html = convertToHTML(content)
        // console.log({html});
    }, [content])

    let danteProps = {
        data_storage: {
            url: "xxx",
            // save_handler: save_handler(editorContent)
            save_handler: function (editorContext, content) {
                // console.log("editor", editorContext.editorContent.blocks);
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

            </div >
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