import { nanoid } from 'nanoid';
import React, { createRef, useEffect, useRef, useState } from 'react';
import ToolEditor from './ToolEditor';
import { AiOutlineCloudUpload, AiOutlinePlus } from 'react-icons/ai'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IconButton } from '@material-ui/core';
import ContentEditable from 'react-contenteditable';
const TextEditor = () => {
    const [openTool, setOpenTool] = useState(false)
    const [openPhoto, setOpenPhoto] = useState([{ id: "first", open: true }])
    const [photoToolPosY, setPhotoToolPosY] = useState(0)


    const [selected, setSelected] = useState({})
    const [previewedImage, setPreviewedImage] = useState('')
    const [isUploadImage, setIsUploadImage] = useState(false)

    const [elements, setElements] = useState([{ id: "first", html: ""}])
    const [focused, setFocused] = useState(0)

    const [title, setTitle] = useState("")
    const refs = useRef([])

    // useEffect(() => {
    //     refs.current[focused].focus()
    // }, [focused])


    function saveSelection() {
        if (window.getSelection) {
            var sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                return sel.getRangeAt(0);
            }
        } else if (document.selection && document.selection.createRange) {
            return document.selection.createRange();
        }
        return null;
    }



    const handleMouseUp = index => (event) => {

        console.log("mouseupEVENT", event);

        var selection = saveSelection()
        //get relative x-position of focused element
        let relativePositionX = event.layerX == undefined ? event.nativeEvent.layerX : event.layerX
        let relativePositionY = event.layerY == undefined ? event.nativeEvent.layerY : event.layerY

        console.log("mouseup", relativePositionX, relativePositionY, positionY);

        setSelected(selection)
        console.log(selection);

        console.log(document.getSelection())
        if (!document.getSelection().isCollapsed && !openTool) {
            setPositionX((positionX + relativePositionX) / 2 - 70)
            setPositionY(positionY)
            console.log({ positionX, positionY })
            setOpenTool(true)
        } else {
            setOpenTool(false)
        }
    }
    const handleMouseDown = (index) => e => {
        console.log("mousedownEVENT", e);

        let relativePositionX = e.layerX == undefined ? e.nativeEvent.layerX : e.layerX
        let relativePositionY = e.layerY == undefined ? e.nativeEvent.layerY : e.layerY
        // console.log("mousedonw", relativePositionX, relativePositionY);
        if (!openTool) {
            setPositionX(relativePositionX)
            setPositionY(relativePositionY - 50)
        }

    }

    const handleKeyDown = ( index) => async (e) => {
        // console.log("key down", e.target.innerHTML);
        // set hide photo tool when typing



        // create new line when press ENTER
        if (e.keyCode == 13) {
            e.preventDefault()
            const newId = nanoid(4)
            elements.splice(index + 1, 0, { id: newId, html: ""})
            setElements([...elements])
            setFocused(index + 1)
        }

        // delete current line when press BACK SPACE
        if (e.keyCode == 8 && e.target.innerHTML == "" && id !== "first") {
            elements.splice(index, 1)
            setElements([...elements])
        }

        // open photo tool when empty
        if (e.target.innerHTML.length <= 1) {
            elements[index].open = true
            setElements([...elements])
        }


    }

    const handleTitleChange = (e) => {
        if (e.keyCode !== 13)
            setTitle(e.target.value)
    }

    const handlePreviewImage = (index) => (e) => {
        console.log("review", index);
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader()

            reader.onload = function (e) {
                setPreviewedImage(e.target.result)
                setIsUploadImage(true)
                // elements.splice(index, 0, { type: "img", class: "full-side-img", src:e.target.result })
                // setElements([...elements])
            }
            reader.readAsDataURL(e.target.files[0])
        }


    }

    const handleChange = (index) => e => {
        // console.log("on change", e);
        elements[index].html = e.target.value
        setElements([...elements])
    }

    const handleFocus = (index) => (e) => {
        if (elements[index].html === "") {
            elements.map((el, i) => {
                if (i != index) {
                    el.open = false
                } else {
                    el.open = true
                }
            })
            setElements([...elements])
        }
    }

    const handlePhotoButtonClick = (index) => e => {
        elements.splice(index, 0, { type: "img", class: "full-side-img", src: { previewedImage } })
    }

    const ImagePreview = () => {
        return (
            <div style={{ position: 'relative', marginBottom: '4rem' }}>
                <img
                    className="general-image"
                    src={previewedImage}
                    alt="alt-img" >
                </img>
                <div className={`tool-editor`}
                    style={{ position: 'absolute', top: "-5rem", left: "50%" }}>
                    <ul className="tool-list">
                        <li className="tool">
                            <RiDeleteBinLine
                                style={{
                                    fontSize: '3rem',
                                    fontWeight: '100',
                                }}
                                onClick={() => { setPreviewedImage(""); setIsUploadImage(false) }} />
                        </li>
                    </ul>


                </div>

            </div>
        )
    }

    const BackGroundImageUpload = () => {
        return (
            <div
                className="container"
                style={{
                    textAlign: "center",
                    color: '#7FC8A9',
                    border: "dotted 2px #7FC8A9",
                    padding: "3rem",
                    marginBottom: "3rem"
                }}>
                <label
                    style={{ display: 'block', cursor: 'pointer' }}
                    htmlFor="image-input">
                    <input type="file"
                        hidden
                        id="image-input"
                        name="image-input"
                        className="image-input"
                        onChange={handlePreviewImage} />
                    <AiOutlineCloudUpload style={{ fontSize: '6rem' }} />
                    <p>Browse your background photo</p>
                </label>

            </div >
        )
    }

    const ToolUploadImage = (props) => {
        return (
            <React.Fragment>
                <div className={` ${props.open ? "" : "hidden"}`}
                    style={{ position: 'absolute', left: '-60px', top: "-5px" }}
                >
                    {/* <input 
                     accept="image/*"  
                     id="upload-body-image" 
                     hidden type="file"
                     onChange={handlePreviewImage(props.index)}
                     /> */}
                    <label htmlFor="upload-body-image">
                        <IconButton size="medium" component="span">
                            <AiOutlinePlus className="icon-small" />
                        </IconButton>

                    </label>
                </div>

            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
       


            {
                isUploadImage ?
                    <ImagePreview />
                    :
                    <BackGroundImageUpload />
            }

            <div
                className="container "
                style={{ position: 'relative' }}
            >
                {
                    elements.map((el, index) => (
                        <ContentEditable
                            key={index}
                            className="text-editor"
                            id={el.id}
                            html={el.html}
                            placeholder="typing..."
                            onChange={handleChange(index)}
                            onKeyDown={handleKeyDown(index)}
                            onMouseDown={handleMouseDown(index)}
                            onMouseUp={handleMouseUp(index)}
                            // onFocus={handleFocus(index)}
                            // tagName="p"
                        >

                        </ContentEditable>

                ))
                }
                <ToolEditor
                    openTool={openTool}
                    positionX={positionX}
                    positionY={positionY}
                    selected={selected}
                    setSelected={setSelected}
                    saveSelection={saveSelection}
                />

            </div >

        </React.Fragment>

    )
}

export default TextEditor;