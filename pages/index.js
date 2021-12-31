import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { getBlogs, getTotalBlogsNumber } from "../api/blog";
import CardBlog from "../Components/home/CardBlog";
import Head from 'next/head'
import Layout from "../Components/Layout";
import HomeMenuRight from "../Components/home/HomeMenuRight";
import { getAllCategories } from "../api/category";
import Pagination from '../Components/home/Pagination'
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { CategoryActionCreator } from "../state";


const CategoryWrapper = ({ categories }) => {
  const dispatch = useDispatch();
  const { getAllCategoriesAction } = bindActionCreators(CategoryActionCreator, dispatch)
  useEffect(() => {
    if (categories) {
      getAllCategoriesAction(categories)
    }
  }, [])
  return (<></>)
}

export default function Home({ blogs, categories, totalBlogsNumber, page }) {
  const router = useRouter()

  // const { page, query } = router;

  return (
    <div>
      <Head>
        <title>A manga reviewer site</title>
        <meta name="description" content="A manga, anime, book  reviewer site" />
        <link rel="icon" href="/favico.png" />
        <meta property="og:title" content="A manga reviewer web" />
        <meta property="og:description" content="A manga, anime, book reviewwer website" />
        <meta property="og:url" content="https://myblog.engineer" />
        <meta property="og:type" content="website" />
      </Head>
      <Layout>
        <>
          <CategoryWrapper categories={categories} />
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

                <Pagination page={page} totalPage={totalBlogsNumber} />
              </Grid>

              <Grid item xs={12} md={4}>
                <HomeMenuRight categories={categories} />
              </Grid>
            </Grid>
          </div>
        </>
      </Layout>
    </div>
  )
}


export async function getServerSideProps({ params, query, ...props }) {
  let page = Number(query.page) || 1
  let limit = query.limit || 5
  console.log("query", page)
  try {
    const blogs = await getBlogs(page, limit)
    // console.log(blogs)
    const categories = await getAllCategories()

    const totalBlogs = await getTotalBlogsNumber()
    return {
      props: {
        blogs: blogs.data ? blogs.data : [],
        categories: categories.data ? categories.data : [],
        totalBlogsNumber : totalBlogs.data ? totalBlogs.data : 0,
        page: page
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
