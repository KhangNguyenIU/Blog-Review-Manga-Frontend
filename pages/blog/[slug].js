import axios from "axios"
import React, { useEffect } from "react"
import { getBlogs } from "../../api/blog"
import Blog from "../../Components/blog/Blog"
import Layout from '../../Components/Layout'
import Head from 'next/head'
const BlogPage = (props) => {
    // const head = () => (
    //     <Head>
    //         <title>
    //             {props.blog.title} | {APP_NAME}
    //         </title>
    //         <meta name="description" content={props.blog.exceprt} />
    //         <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
    //         <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
    //         <meta property="og:description" content={props.blog.exceprt} />
    //         <meta property="og:type" content="webiste" />
    //         <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
    //         <meta property="og:site_name" content={`${APP_NAME}`} />

    //         <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
    //         <meta property="og:image:secure_url" ccontent={`${API}/blog/photo/${blog.slug}`} />
    //         <meta property="og:image:type" content="image/jpg" />
    //         <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    //     </Head>
    // );
   
    return (
        <React.Fragment>
            <Layout>
                <Blog blog = {props.blog}/>
            </Layout>
        </React.Fragment>
    )
}

export default BlogPage

export async function getStaticPaths(){
    const blogs = await getBlogs().then(response => response.data)
    const paths= blogs.map((blog, index)=>{
        return{
            params: {
                slug: `${blog.id}`
            }
        }
    })

    return {
        paths: paths,
        fallback: false
    }
}


export async function getStaticProps(context){
    const { params } = context    

    const data  = await axios.get(`http://localhost:8000/blogs/${params.slug}`)
    .then(response=>response.data)
    return {
        props:{
            blog: data
        }
    }
}