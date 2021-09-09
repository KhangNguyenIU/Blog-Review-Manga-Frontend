import { IconButton } from '@material-ui/core'
import { nanoid } from 'nanoid'
import React, { useEffect, useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import ToolEditor from '../Components/BlogEditor/ToolEditor'
import { AiOutlineCloudUpload, AiOutlinePlus, AiOutlinePicLeft, AiOutlineClose } from 'react-icons/ai'
import { saveSelection } from '../utilites/selection.util'
import { CgDisplayFullwidth } from 'react-icons/cg'


const Test = () => {
    const [positionX, setPositionX] = useState(0)
    const [positionY, setPositionY] = useState(0)
    const [openTool, setOpenTool] = useState(false)
    const [focused, setFocused] = useState(0)
    const [selected, setSelected] = useState({})
    const [previewedImage, setPreviewedImage] = useState('')
    const [previewedBackground, setPreviewBackground] = useState('')
    const [isUploadImage, setIsUploadImage] = useState(false)
    const [isUploadBackground, setIsUploadBackground] = useState(false)
    const [title, setTitle] = useState("")
    const [elements, setElements] = useState([{ id: "first-line", html: "", open: true, type: "text" }])
    const refs = useRef([])


    useEffect(() => {
        if (refs.current[focused].current) {
            console.log("current", refs.current[focused].current);
            refs.current[focused].current.focus()
        }
        else if (refs.current[focused]) {
            console.log("focus", refs.current[focused]);
            refs.current[focused].el.current.focus()
        }
    }, [focused])




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
            elements.splice(index + 1, 0, { id: nanoid(3), html: '', open: true, type: "text" })
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
        // console.log("eMouseDown", e);
        if (openTool == false) {
            let tempPositionX = e.layerX == undefined ? e.nativeEvent.layerX : e.layerX
            let tempPositionY = e.layerY == undefined ? e.nativeEvent.layerY : e.layerY
            // console.log("mousedonw", tempPositionX, tempPositionY);
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

        // console.log("mouseup", relativePositionX, relativePositionY, positionY);

        setSelected(selection)
        // console.log(selection);

        if (!document.getSelection().isCollapsed && openTool == false) {
            setPositionX(((relativePositionX + positionX) / 2) - 60)
            setOpenTool(true)
            // restoreSelection(selected)
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
                elements.splice(index, 0,
                    {
                        type: "img",
                        class: "left-side-img",
                        src: e.target.result,
                        id: nanoid(3),
                        position: 1
                    })
                setElements([...elements])
                setFocused(index + 1)
            }
            reader.readAsDataURL(e.target.files[0])
        }


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

    const ToolUploadImage = (props) => {
        return (
            <React.Fragment>
                <div
                    style={{ position: 'absolute', left: '-50px', margin: 'auto' }}
                >

                    <label style={{ display: 'inline-block', cursor: 'pointer' }}
                        htmlFor="upload-body-image"
                    >

                        <IconButton size="medium" component="span">
                            <AiOutlinePlus />
                        </IconButton>
                    </label>
                    <input
                        type="file"
                        hidden
                        name={props.index}
                        accept="image/*"
                        id="upload-body-image"
                        onChange={handlePreviewImage(focused)}
                    />
                </div>

            </React.Fragment>
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
                        onChange={handlePreviewBackground} />
                    <AiOutlineCloudUpload style={{ fontSize: '6rem' }} />
                    <p>Browse your background photo</p>
                </label>

            </div >
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

    const BodyImage = (props) => {
        const index = props.index
        console.log({ index });
        return (
            <div
                className={`${props.position == 1 ? "full-side-img" : "left-side-img"}`}
                id={props.id}
                ref={props.innerref}
            >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="icon-single" style={{ color: `${props.position == 0 ? "red" : 'black'}` }}>
                        <AiOutlinePicLeft
                            className="icon-single--icon"
                            onClick={() => {
                                console.log(props.index);

                                elements[props.index].position = 0
                                setElements([...elements])
                            }}
                        />
                    </div>

                    <div className="icon-single" style={{ color: `${props.position == 1 ? "red" : "black"}` }}>
                        <CgDisplayFullwidth
                            onClick={() => {
                                console.log(props.index);
                                elements[props.index].position = 1
                                setElements([...elements])
                            }} />
                    </div>

                    <div className="icon-single">
                        <AiOutlineClose
                            onClick={() => {
                                elements.splice(props.index, 1)
                                setElements([...elements])
                                // setFocused(props.index)
                            }}
                        />
                    </div>
                </div>
                <img
                    src={props.src}
                    className="img"
                />
            </div>
        )
    }

    const ImagePreview = () => {
        return (
            <div style={{ display:'block',textAlign:'center',marginBottom: '4rem' }}>
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
            <div className="container relative">
                <div>
                    {
                        elements.map((el, index) => (
                            <div key={index}>

                                {
                                    el.type == "text"
                                        ?
                                        <div key={index}
                                            style={{ display: 'block' }}
                                            onMouseDown={handleMouseDown(index)}
                                            onMouseUp={handleMouseUp(index)}
                                        >

                                            {
                                                el.open &&
                                                <ToolUploadImage index={index} />

                                            }
                                            <ContentEditable
                                                key={index}
                                                className="text-editor"
                                                id={el.id}

                                                contentEditable={true}
                                                placeholder="Write your story..."
                                                html={el.html}
                                                onChange={handleChange(index)}
                                                onKeyDown={handleKeyDown(index)}
                                                onFocus={() => setFocused(index)}
                                                ref={(curRef) => refs.current[index] = curRef}
                                                tagName="p"
                                                innerRef={refs.current[index]}
                                            >
                                            </ContentEditable>

                                        </div>
                                        :
                                        <BodyImage
                                            src={el.src}
                                            class={el.class}
                                            index={index}
                                            id={el.id}
                                            position={el.position}
                                            innerref={(el) => refs.current[index] = el}

                                        />


                                }
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