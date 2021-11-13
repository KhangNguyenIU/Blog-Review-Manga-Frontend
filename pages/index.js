import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { getBlogs } from "../api/blog";
import CardBlog from "../Components/home/CardBlog";
import Head from 'next/head'
import Layout from "../Components/Layout";
import HomeMenuRight from "../Components/home/HomeMenuRight";
import { getAllCategories } from "../api/category";
import Pagination from '../Components/home/Pagination'
import { useRouter } from 'next/router';


export default function Home({ blogs,categories }) {
  const router = useRouter()
  const {page, query} = router;

  return (
    <div>
      <Head>
        <title>A manga reviewer site</title>
        <meta name="description" content="A manga, anime, book  reviewer site"/>
        <link rel ="icon" href="/favico.png"/>
        <meta property="og:title" content="A manga reviewer web"/>
        <meta property="og:description" content="A manga, anime, book reviewwer website"/>
        <meta property="og:url" content="https://myblog.engineer"/>
        <meta property="og:type" content="website" />
      </Head>
      <Layout>
        <>
          <div className="container-medium top-margin-5">
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                {
                  blogs && blogs.map((blog, index) => (
                    <CardBlog blog={blog}
                      key={index}
                    />
                  ))
                }

                <Pagination page={page}/>
              </Grid>

              <Grid item xs={12} md={4}>
                <HomeMenuRight categories={categories}/>
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
    // console.log(blogs)
    const categories = await getAllCategories()
    return {
      props: {
        blogs: blogs.data ? blogs.data : [],
        categories: categories.data ? categories.data : []
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
