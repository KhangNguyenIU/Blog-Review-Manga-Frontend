import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import React, { useEffect } from "react";
import { AiOutlineForward } from "react-icons/ai";
import { convertDateString } from "../../utilites/date";


const VerticalCard = ({ blog }) => {

    useEffect(()=>{
        console.log(blog)
    },[])
    return (
        <React.Fragment>
            <div className="vertical-card center">

                <div className="vertical-card--image ">
                    <img
                        className="vertical-card--image vertical-image "
                        src={blog.cover} />
                </div>



                <div className="vertical-card--info">
                    <div className="vertical-card--author">
                        <p>{blog.user.username}</p>
                    </div>
                    <div className="vertical-card--title">
                        <p className="card-title ">{blog.title}</p>
                    </div>
                    <div className="vertical-card-date">
                        <p>{convertDateString(blog.created_at)}</p>
                    </div>
                    <div className="vertical-card-exceprt">
                        <p >{blog.exceprt}</p>
                    </div>

                    <div className="vertical-card--button">
                        <span>Continue Reading</span>
                        <ArrowForwardIos style={{fontSize:'1.2rem', color:'#ddd', marginLeft:'.7rem'}}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default VerticalCard;