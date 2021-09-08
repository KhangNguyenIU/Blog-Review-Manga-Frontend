import { IconButton } from '@material-ui/core'
import { nanoid } from 'nanoid'
import React, { useEffect, useRef, useState } from 'react'
// import { AiOutLinePlus } from 'react-icons/ai'
import ContentEditable from 'react-contenteditable'
import ToolEditor from '../Components/BlogEditor/ToolEditor'
import { AiOutlineCloudUpload, AiOutlinePlus } from 'react-icons/ai'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';


const Test = () => {
    const [positionX, setPositionX] = useState(0)
    const [positionY, setPositionY] = useState(0)
    const [openTool, setOpenTool] = useState(false)
    const [focused, setFocused] = useState()
    const [selected, setSelected] = useState({})
    const [previewedImage, setPreviewedImage] = useState('')
    const [isUploadImage, setIsUploadImage] = useState(false)
    const [elements, setElements] = useState([{ id: "first-line", html: "", open: true }])
    const refs = useRef([])

    useEffect(() => {
        if (focused) {
            refs.current[focused].focus()
        }
    }, [focused])
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

    const handleChange = (index) => e => {
        // console.log("change", e.target.value);
        elements[index].html = e.target.value
        if (e.target.value.length > 1) {
            elements[index].open = false
        } else {
            elements[index].open = true
        }
        setElements([...elements])
    }

    const handleKeyDown = (index) => e => {
        if (e.keyCode == 13) {
            e.preventDefault()
            elements.splice(index + 1, 0, { id: nanoid(3), html: '', open: true })
            setElements([...elements])
            setFocused(index + 1)
        }
        if (e.keyCode == 8 && elements[index].html == "" && index != 0) {
            elements.splice(index, 1)
            setElements([...elements])
            setFocused(index - 1)
        }
    }


    const handleMouseDown = (index) => e => {
        console.log("eMouseDown", e);


        if (openTool == false) {
            let tempPositionX = e.layerX == undefined ? e.nativeEvent.layerX : e.layerX
            let tempPositionY = e.layerY == undefined ? e.nativeEvent.layerY : e.layerY
            console.log("mousedonw", tempPositionX, tempPositionY);
            setPositionX(tempPositionX)
            setPositionY(tempPositionY - 50)
        }
    }

    const handleMouseUp = (index) => e => {
        // console.log("eMouseUp", e);

        var selection = saveSelection()
        //get relative x-position of focused element
        let relativePositionX = e.layerX == undefined ? e.nativeEvent.layerX : e.layerX
        let relativePositionY = e.layerY == undefined ? e.nativeEvent.layerY : e.layerY

        console.log("mouseup", relativePositionX, relativePositionY, positionY);

        setSelected(selection)
        // console.log(selection);

        if (!document.getSelection().isCollapsed && openTool == false) {
            setPositionX(((relativePositionX + positionX) / 2) - 60)
            setOpenTool(true)
        } else {
            setOpenTool(false)
        }
    }


    const handleTitleChange = (e) => {
        if (e.keyCode !== 13)
            setTitle(e.target.value)
    }

    const handlePreviewImage = (index) => (e) => {
        // console.log("review", index);
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

    const ToolUploadImage = (props) => {
        return (
            <React.Fragment>
                <div
                    style={{ position:'absolute', left:'-50px' , margin:'auto'}}
                >
                    {/* <h1>Upload imagge</h1> */}
                    <input
                        accept="image/*"
                        id="upload-body-image"
                        hidden
                        type="file"
                        onChange={handlePreviewImage(props.index)}
                    />
                    <label htmlFor="upload-body-image">
                        <IconButton>
                            <AiOutlinePlus />
                        </IconButton>

                    </label>
                </div>

            </React.Fragment>
        )
    }


    const TitleText = () => {
        return (
            <p className="title-primary"
                style={{ marginTop: '100px', marginBottom: '50px' }}
                contentEditable
                placeholder="Title..."
                onKeyDown={handleTitleChange}
            >
            </p>
        )
    }


    return (
        <React.Fragment>

            <TitleText />


            <div className="container relative">
                <div>
                    {
                        elements.map((el, index) => (
                            <div key={index}
                                style={{ display: 'flex'}}
                                onMouseDown={handleMouseDown(index)}
                                onMouseUp={handleMouseUp(index)}>

                                {
                                    el.open && <ToolUploadImage
                                        style={{marginleft:'-5rem'}}
                                        open={el.open}
                                        index={index} />
                                }
                                <ContentEditable
                                    key={index}
                                    className="text-editor"
                                    id={el.id}
                                    style={{width: '100%', marginleft:"4rem"}}
                                    contentEditable={true}
                                    placeholder={el.id}
                                    html={el.html}
                                    onChange={handleChange(index)}
                                    onKeyDown={handleKeyDown(index)}
                                    innerRef={(curRef) => refs.current[index] = curRef}
                                >

                                </ContentEditable>

                            </div>
                        ))
                    }
                </div>

                <ToolEditor
                    openTool={openTool}
                    positionX={positionX}
                    positionY={positionY}
                    selected={selected}
                    setSelected={setSelected}
                    saveSelection={saveSelection}
                />
            </div>
        </React.Fragment>
    )
}

export default Test