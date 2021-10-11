import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { getBlogs } from "../api/blog";
import CardBlog from "../Components/home/CardBlog";
import DraftTextEditor from "../Components/blog/DraftTextEditor";
import GridBlogs from "../Components/blog/GridBlog";
import Layout from "../Components/Layout";
import HomeMenuRight from "../Components/home/HomeMenuRight";
import { test, testSetCookie } from "../api/auth";
export default function Home({ blogs}) {

  const setCookie =()=>{
    testSetCookie().then(response=>{
      console.log(response)
    }).catch(error=>{
      console.log(error)
    })
  }

  const testCookie=()=>{
      test().then(response=>{
        console.log(response)
      })
  }
  return (
    <div>
      <Layout>

         
            <>
              <div className="header">
                <div className="header-title">
                  <p className="title-primary">Manga - Sharing - Reviews</p>
                </div>
              </div>

              <div className="container-medium">

                <button onClick={setCookie}>Set Cookie</button>
                <button onClick={testCookie}> Test Cookie</button>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    {
                      blogs && blogs.map((blog, index) => (
                        <CardBlog blog={blog}
                          key={index}
                        />
                      ))
                    }
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <HomeMenuRight />
                  </Grid>
                </Grid>
              </div>
            </>
      </Layout>
    </div>
  )
}


export async function getStaticProps() {

  try {
    const blogs = await getBlogs()
    return {
      props: { blogs: blogs.data }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }



}
