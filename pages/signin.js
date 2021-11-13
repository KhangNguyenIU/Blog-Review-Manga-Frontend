import React, { useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import useTimeout from '../hooks/useTimeout'

const Signin = (props) => {

    const [count, setCount] = useState(0)
    const { clear, reset} = useTimeout(()=>setCount(0), 1000)

    useDebounce(()=>alert(count), 2000, [count])
    return (
        <React.Fragment>
            <div className="auth-box">
                <h1>test</h1>
                <div>
                    <div>{count}</div>
                    <button onClick={()=>setCount(count=>count+1)}>Click</button>
                    <button onClick={clear}>clear</button>
                    <button onClick={reset}>reset</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Signin;