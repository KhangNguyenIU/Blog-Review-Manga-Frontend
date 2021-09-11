import { nanoid } from 'nanoid'
import React, { useEffect, useRef, useState } from 'react'
import ToolEditor from '../Components/BlogEditor/ToolEditor'

import { DraftailEditor } from "draftail";
import { Editor, EditorState, RichUtils } from "draft-js"
const Test = () => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const handleKeyCommand=(command, editorState) =>{
        const newState = RichUtils.handleKeyCommand(editorState, command);
    
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
    
        return 'not-handled';
      }

    return (
        <React.Fragment>

            <div className="container" style={{ marginTop: "200px" , border:'1px solid black'}}>
                <Editor
                editorState={editorState}
                onChange ={setEditorState}
                // handleKeyCommand={handleKeyCommand}

                >
                    
                </Editor>

            </div>
        </React.Fragment>
    )
}

export default Test