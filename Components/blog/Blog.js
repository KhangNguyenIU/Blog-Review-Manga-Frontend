import Dante from 'Dante2'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchBlogById } from '../../api/blog'
import { Avatar } from '@mui/material'
import { Chip } from '@material-ui/core'
const Blog = ({blog}) => {

   
    // useEffect(()=>{
    //     console.log(blog)
    //     console.log("draft", )
    // },[])
    return (
        <React.Fragment>
            <div className="center top-margin-2">
                <div className="flex-column-center bottom-margin-2">
                    <p className="blur-text">{blog.createdAt}</p>
                    <p className="title-primary">{blog.title}</p>
                    <div className="flex-row-center bottom-margin-2">
                        <Avatar
                            className="right-margin-2"
                            src={blog.user.avatar} />
                        <p className="profile-text-primary">{blog.user.username}</p>
                    </div>

                </div>


                <img
                    src={blog.cover}
                    className="img bottom-margin-2"
                    alt="background cover"

                />

            </div>
            <div className="container">
           
                    <Dante
                        content={JSON.parse(blog.body)}
                        read_only={true}
                    />
                

                <div
                    className="center"
                    style={{ maxWidth: '50rem' }}>
                    {
                        blog.categories && blog.categories.map((cate, index) => (
                            <div
                                className="bottom-margin-2"
                                style={{ display: 'inline-block', padding: ' 0 .6rem' }}>
                                <Chip
                                    variant="outlined"
                                    label={cate.category.name}
                                    style={{ fontSize: '1.4rem', color: "grey" }}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Blog