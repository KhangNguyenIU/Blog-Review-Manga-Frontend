import React from 'react'
import { convertDateString } from '../../utilites/date'
import Link from 'next/link'
const CardBlog = ({ blog }) => {

    return (
        <React.Fragment>
            <div className="card-wrapper">
                <div className="section-text-primary card-cate">
                    Post Formats
                </div>

                <Link href={`/blog/${blog.id}`}>
                    <p className="card-title">

                        {blog.title}
                    </p>

                </Link>
                <div className="card-date">
                    Posted on {convertDateString(blog.created_at)} by {blog.username}
                </div>

                <Link href={`/blog/${blog.id}`} className="card-image">
                    <img
                        className="card-image--fluid"
                        src={blog.cover}
                    />
                </Link>

                <div className="card-exceprt">
                    {blog.exceprt}
                </div>

                <Link href={`/blog/${blog.id}`} >
                    <span className="card-button">Read More</span>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default CardBlog;