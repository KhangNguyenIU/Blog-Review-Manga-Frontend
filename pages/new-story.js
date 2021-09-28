import { useEffect } from "react";
import DraftTextEditor from "../Components/blog/DraftTextEditor";
import Layout from "../Components/Layout";
import { useRouter } from "next/router";
import { isAuth } from "../api/auth";

export default function CreateBlog() {
    const router = useRouter()
    useEffect(()=>{
        isAuth().then(response=>response)
        .catch(error=>{
            router.push('/')
        })
    },[])
  return (
    <div>
      <Layout>
        <DraftTextEditor />
      </Layout>
    </div>
  )
}
