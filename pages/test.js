import React, { useState } from 'react'
import {nanoid} from 'nanoid'
const Test = () => {

    const [elId, setElId] = useState([1, 2])
    const onAddElement = async()=>{
        var elid = await nanoid(4)
        setElId([...elId,elid])
    }

    const onDeleteElement = ()=>{
        elId.pop()
        setElId([...elId])
    }
    return (
        <React.Fragment>
            <div className="container" style={{ marginTop: '100px' }}>
                <button onClick={onAddElement}>Click</button>
                <button onClick={onDeleteElement}>Delete</button>
                {elId.map(el => <p name={el}>{el}</p>)}
            </div>
        </React.Fragment>
    )
}

export default Test