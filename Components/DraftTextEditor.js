
import React, { useEffect, useState } from 'react'
import Dante, { ImageBlockConfig } from 'Dante2'
import {
    AiOutlineCloudUpload,
    AiOutlinePlus,
    AiOutlinePicLeft,
    AiOutlineClose
} from 'react-icons/ai'
import UnsplashImage from './UnsplashImage';
import TitleText from './Title';
import { createBlog } from '../api/blog';
import { convertBlobToBinary } from '../utilites/image.helpers';
/**
* @author
* @function DraftText
**/



const DraftTextEditor = (props) => {
    const [title, setTitle] = useState("")
    const [previewedBackground, setPreviewBackground] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {


    })
    let danteProps = {
        data_storage: {
            url: "xxx",
            save_handler: function (editorContext, content) {
                setContent(editorContext.editorContent)
            }
        },

    };

    const handlePublish =async  () => {

        await convertBlobToBinary(content)

        let blog = {
            title: title,
            cover: previewedBackground,
            body: JSON.stringify(content),
            exceprt: "This is exceprt"
        }
        // console.log(blog)
        createBlog(blog).then(response => console.log(response)).catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            <TitleText
                previewedBackground={previewedBackground}
                setPreviewBackground={setPreviewBackground}
                title={title}
                setTitle={setTitle}
            />

            <div className="container" style={{ padding: '3rem 0' }}>
                <Dante
                    {...danteProps}
                    bodyPlaceholder={"Do what you will"}
                />

            </div>

            <div className="container center" style={{ display: 'block' }}>
                <button className="button-outlined">Back</button>
                <button className="button-outlined" onClick={handlePublish}>Publish</button>
            </div>
        </React.Fragment>

    )

}

export default DraftTextEditor;