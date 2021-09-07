import { GoItalic } from 'react-icons/go'
import { FaBold, FaLink } from 'react-icons/fa'
import { VscQuote } from 'react-icons/vsc'
import { useState } from 'react'
const ToolEditor = (props) => {


    const [boldButton, setBoldButton] = useState(false)
    const [italicButton, setItalicButton] = useState(false)
    const [embedButton, setEmbedButton] = useState(false)
    const [quoteButton, setQuoteButton] = useState(false)

    // function restoreSelection(range) {
    //     if (range) {
    //         if (window.getSelection) {
    //             var sel = window.getSelection();
    //             sel.removeAllRanges();
    //             sel.addRange(range);
    //         } else if (document.selection && range.select) {
    //             range.select();
    //         }
    //     }
    // }

    function handleToolButtonClick() {
        // restoreSelection(props.selected)
        // var selection = props.saveSelection()
        // props.setSelected(selection)
    }

    return (
     
            <div  
            className={`tool-editor ${props.openTool ? "" : "hidden"}`} 
            style={{position:'absolute',top: `${props.positionY}px`, left: `${props.positionX}px` }}
            >
                <ul className="tool-list">
                    <li
                        className={`tool ${boldButton && "active-btn"}`}
                        onClick={(e) => {
                            handleToolButtonClick()
                            document.execCommand('bold')
                            setBoldButton(!boldButton)
                        }}
                    >
                        <FaBold></FaBold>
                    </li>
                    <li
                        className={`tool ${italicButton && "active-btn"}`}
                        onClick={() => {
                            handleToolButtonClick()
                            setItalicButton(!italicButton)
                            document.execCommand('italic')
                        }}
                    >
                        <GoItalic></GoItalic>
                    </li>
                    <li
                        className={`tool tool-separate ${embedButton && "active-btn"}`}
                        onClick={() => { setEmbedButton(!embedButton) }}>
                        <FaLink></FaLink>
                    </li>

                    <li c
                        className={`tool ${quoteButton && "active-btn"}`}
                        onClick={() => { setQuoteButton(!quoteButton) }}>
                        <VscQuote></VscQuote>
                    </li>


                </ul>
            </div>

    )
}

export default ToolEditor