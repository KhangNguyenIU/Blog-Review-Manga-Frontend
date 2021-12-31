import React, {useEffect} from 'react'
import { useRouter } from 'next/router';
import { isFirstPage, isLastPage } from '../../utilites/helpers';

const Pagination =(props)=>{
    const page = props.page || 1
    const maxPages = Math.ceil(props.totalPage/5) 
    const router = useRouter()
    useEffect(()=>{
        console.log({page, maxPages})
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
                <span
                className={`${isFirstPage(page) && 'hidden'} `}
                 onClick={handleNewer}>Newer Post</span>
                <span 
                className={`${isLastPage(page, maxPages) && 'hidden'} `}
                onClick={handleOlder}> Older Post</span>
            </div>
        </React.Fragment>
    )


}

export default Pagination