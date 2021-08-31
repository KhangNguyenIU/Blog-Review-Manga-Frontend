import { nanoid } from 'nanoid';
import React, { createRef, useEffect, useRef, useState } from 'react';
import ToolEditor from '../ToolEditor';


const List = () => React.createElement('input', { className: "div" })

const TextEditor = () => {
    const [openTool, setOpenTool] = useState('hidden')
    const [positionX, setPositionX] = useState(0)
    const [positionY, setPositionY] = useState(0)

    const [selected, setSelected] = useState({})
    const [previewedImage, setPreviewedImage] = useState('')
    const [isUploadImage, setIsUploadImage] = useState(false)
    const [elements, setElements] = useState([nanoid(4)])
    const elementRefs = useRef([])
    elementRefs.current=[]
    useEffect(() => {
        console.log("useEffect", elementRefs.current);
    }, [elements.length])


    const addToRefs = (i) => {
        if (elementRefs.current.length >1)
            elementRefs.current.splice(i, 0, React.createRef())
        else
            elementRefs.current.push(React.createRef())
        return elementRefs.current[i]
    }

    const deleteFromRefs = (i) => {
        elements.splice(i, 1)
        setElements([...elements])

        elementRefs.current.splice(i, 1)
        console.log("delete", elementRefs);
    }
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


    const handleMouseUp = async (event) => {

        var selection = saveSelection()
        setSelected(selection)
        if (!document.getSelection().isCollapsed && openTool !== '') {
            setPositionX((positionX + event.nativeEvent.layerX) / 2 - 70)
            setPositionY(positionY - 55)
            console.log({ positionX, positionY })
            setOpenTool('')
        } else {
            setOpenTool("hidden")
        }
    }
    const handleMouseDown = async e => {

        if (openTool !== '') {
            await setPositionX(e.nativeEvent.layerX)
            await setPositionY(e.nativeEvent.layerY)
        }
    }

    const handleKeyDown = (i) => e => {
        // console.log("change",i, e);
        if (e.keyCode == 13) {
            e.preventDefault()
            var newElement = nanoid(4)
            setElements([...elements, newElement])
            console.log("elements", elements);
            console.log("entter", elementRefs);
            return
        }
        if (e.keyCode == 8 && e.target.innerHTML == "") {
            deleteFromRefs(i)
        }

    }

    const handlePreviewImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader()

            reader.onload = function (e) {
                setPreviewedImage(e.target.result)
                setIsUploadImage(true)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }






    const buttonClick=(i) => {
        console.log("click button",elementRefs.current.current[i]);
    }
    return (
        <div
            className="container "
            style={{ position: 'relative' }}
        >

            <p className="text-editor"
                onMouseUp={handleMouseUp}
                onMouseDown={handleMouseDown}
                style={{ marginTop: '100px', marginBottom: '50px' }}
                contentEditable
                placeholder="Title..."
                onKeyDown={handleKeyDown()}

            >
            </p>

            {
                elements.map((element, i) => (
                    <React.Fragment key={i}>
                        <button onClick={()=>buttonClick(i)}> click {i}</button>

                        <p className="text-editor"
                            key={element}
                            name={element}
                            onMouseUp={handleMouseUp}
                            onMouseDown={handleMouseDown}
                            contentEditable
                            ref={addToRefs(i)}
                            placeholder="Write something..."
                            onKeyDown={handleKeyDown(i)}
                      
                        ></p>
                    </React.Fragment>
                ))
            }

            {
                isUploadImage && (<img
                    className="general-image"
                    src={previewedImage}
                    alt="alt-img" />)
            }



            <input type="file" className="image-input" onChange={handlePreviewImage} />
            <ToolEditor
                openTool={openTool}
                positionX={positionX}
                positionY={positionY}
                selected={selected}
                setSelected={setSelected}
                saveSelection={saveSelection}
            />


        </div >

    )
}

export default TextEditor;