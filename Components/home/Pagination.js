import React, {useEffect} from 'react'
import { useRouter } from 'next/router';

const Pagination =(props)=>{
    const page = props.page || 1
    const router = useRouter()
    useEffect(()=>{
        console.log(page)
    },)
    const handleNewer =()=>{
        router.push(`/?page=${page-1}`)
    } 
    const handleOlder =()=>{
        router.push(`/?page=${page+1}`)
    } 

    return (
        <React.Fragment>
            <div className='flex-row-between pagination'>
                <span onClick={handleNewer}>Newer Post</span>
                <span onClick={handleOlder}> Older Post</span>
            </div>
        </React.Fragment>
    )
}

export default Pagination