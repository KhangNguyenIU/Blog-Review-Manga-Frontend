import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { getBlogs } from "../api/blog";
import CardBlog from "../Components/home/CardBlog";
import DraftTextEditor from "../Components/blog/DraftTextEditor";
import GridBlogs from "../Components/blog/GridBlog";
import Layout from "../Components/Layout";
import HomeMenuRight from "../Components/home/HomeMenuRight";



export default function Home({ blogs, message }) {


  return (
    <div>
      <Layout>
  
        {
          message ? <h1>{message}</h1> :
            <>
              <div className="header">
                <div className="header-title">
                  <p className="title-primary">Manga - Sharing - Reviews</p>
                </div>
              </div>

              <div className="container-medium">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    {
                      blogs.map((blog, index) => (

                        <CardBlog blog={blog} />
                      ))
                    }
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <HomeMenuRight />
                  </Grid>
                </Grid>
              </div>
            </>
        }
      </Layout>
    </div>
  )
}

export async function getStaticProps() {

  try {
    const blogs = await getBlogs()

    if(blogs.error)
      return {
        message: "No post available"
      }
    return {
      props: {
        blogs: blogs.data
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }


}
