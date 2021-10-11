import { Grid } from "@material-ui/core";
import React from "react";
import VerticalCard from "./VerticalCard";


const GridBlogs = ({ blogs }) => {


    return (
        <React.Fragment>
            
            <Grid container spacing={2}>
                {
                    blogs.map((blog, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <VerticalCard blog ={blog}/>
                    </Grid>
                ))
                }
            </Grid>

        </React.Fragment>
    )
}

export default GridBlogs;