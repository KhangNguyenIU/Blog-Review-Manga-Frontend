import renderHTML from 'react-render-html'

import { useState, useEffect , ReactNode} from 'react';
export default function Blog(props) {
    const [body, setBody] = useState('')
    const [render, setRender] =useState('')

    const handleClick = (event) => {
        alert(event.target.innerText);    // Click Me
        alert(event.target.tagName);      // BUTTON
    }

    const onBodyChange = (e) => {
        alert(e.target.innerText); 
        setBody(e.target.innerText)
        console.log(e.target.innerText);
        setRender(`<i>${body}</i>`)
    }

    const emitChange =(e)=>{
        
        console.log( e.target.innerText);
        setBody(e.target.innerText)
    }
    return (
        <div className="container top-margin">
          <div 
          className="editor" 
          onInput={emitChange}
          contentEditable="true"
          onChange= {onBodyChange}
    
          >
            
          </div>
        </div>
    )

}