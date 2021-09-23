import Dante from 'Dante2'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchBlogById } from '../actions/blog'
const Blog = () => {

    const [title, setTitle] = useState('')
    const [cover, setCover] = useState('')
    const [body, setBody] = useState()
    const [excerpt, setExcerpt] = useState('')
    const [createdAt, setCreatedAt] = useState('')

    useEffect(() => {
        getBlogById(4)
    }, [])
    const getBlogById = (id) => {
        fetchBlogById(id).then(data => data.data).then(data => {
            console.log(data)
            setTitle(data.title)
            setBody(data.body)
            setCover(data.cover)
            setExcerpt(data.excerpt)
            setCreatedAt
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <React.Fragment>
            <div className="center top-margin-2">
                <p className="blur-text">Published in January 13, 2021</p>
                <p className="title-primary">Vài giây lỡ bước, hẹn ước không thành</p>
                <div style={{ height: '60rem', width: '95%', position: 'relative', marginTop: '5rem' }}>
                    <img
                        src="https://wallpapercave.com/wp/AtXEMtw.jpg"
                        alt="background cover"
                        objectFit="cover"
                        layout="fill"
                    />
                </div>

            </div>
            <div className="container">
                {/* <Dante
                content
                read_only={true}
                /> */}
            </div>
        </React.Fragment>
    )
}

export default Blog