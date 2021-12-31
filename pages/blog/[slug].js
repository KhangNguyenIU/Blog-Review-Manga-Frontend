import axios from "axios"
import React, { useEffect } from "react"
import { fetchBlogById, getBlogs } from "../../api/blog"
import Blog from "../../Components/blog/Blog"
import Layout from '../../Components/Layout'
import Head from 'next/head'
const BlogPage = (props) => {
    const {blog} = props
    const head = () => (
        <Head>
            <title>
                {blog.title} 
            </title>
            <meta name="description" content={blog.exceprt} />
            <link rel="canonical" href={`${process.env.NEXT_PUBLIC_FE_URL}/blog/${blog.id}`} />
            <meta property="og:title" content={`${blog.title}`} />
            <meta property="og:description" content={blog.exceprt} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_FE_URL}/blog/${blog.id}`} />
            <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_FE_URL}`} />

            <meta property="og:image" content={`${blog.cover}`} />
            <meta property="og:image:secure_url" content={`${blog.cover}`} />
            <meta property="og:image:type" content="image/png" />
        </Head>
    );

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <Blog blog={props.blog} />
            </Layout>
        </React.Fragment>
    )
}

export default BlogPage

export async function getStaticPaths() {
    const blogs = await getBlogs().then(response => response.data)
    const paths = blogs.map((blog, index) => {
        return {
            params: {
                slug: `${blog.id}`
            }
        }
    })

    return {
        paths: paths,
        fallback: 'blocking'
    }
}


export async function getStaticProps(context) {
    const { params } = context
    console.log(params)
    // const data = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/${params.slug}`)
    //     .then(response => response.data)
    const data = await fetchBlogById(params.slug).then(res=>res.data)
    return {
        props: {
            blog: data
        }
    }
}