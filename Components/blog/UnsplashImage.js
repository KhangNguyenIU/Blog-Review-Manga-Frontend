import { createApi } from 'unsplash-js';
import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { BsSearch } from 'react-icons/bs'
import { Grid, IconButton } from '@material-ui/core';
import Image from 'next/image';
import errorPic from '../../public/404.png'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useDebounce from '../../hooks/useDebounce';
/**
* @author
* @function 
**/
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

}));


const UnsplashImage = (props) => {
    const classes = useStyles()
    const [photos, setPhotos] = useState([])
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)
    const [error, setError] = useState(false)
    const client = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
  

    useDebounce(()=>handleSubmit(), 1000, [page,query])
    const handleSubmit = () => {
        console.log("submit")
        if (query) {
            const url = "https://api.unsplash.com/search/photos?page=" + page + "&query=" + query + "&client_id=" + client
            Axios.get(url).then(response => {
                console.log(response)
                if (response.data.results.length == 0) {
                    setError(true)
                    setPhotos([])
                } else {
                    setError(false)
                    setPhotos(response.data.results)

                }
            }).catch(error=>{
                setError(false)
            })
        }
    }

    const handleChange = e => {
            setQuery(e.target.value)
        
    }

    const handleImageClick = (url) => {
        props.setPreviewBackground(url)
        props.setIsUploadBackground(true)
        props.setOpenUnsplash(false)
    }

    const handleDecreasePage=()=>{
        if(page>1){
            setPage(page=>page-1)
        }
    }

    const handleIncreasePage =()=>{
        setPage(page=>page+1)
    }

    return (
        <React.Fragment>
            <div className="container  ">
                <div className="search">
                    <input
                        className="input-primary "
                        placeholder="Search your keyword"
                        value={query}
                        onChange={handleChange}
                    />
                    <BsSearch
                        onClick={handleSubmit}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                {
                    error &&
                    <div className="center">
                        <Image src={errorPic} width={500} height={400} />
                    </div>

                }
                {
                    photos &&
                    <div>
                        <div className="page-box" s>
                            <IconButton onClick={handleDecreasePage}>
                                <ArrowBackIosIcon />
                            </IconButton>

                            {
                                page
                            }

                            <IconButton onClick={handleIncreasePage}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </div>
                        <Grid container spacing={2}>
                            {
                                photos.map((photo, index) => (
                                    <Grid key={index} item xs={6}
                                        sm={4}>

                                        <img
                                            onClick={() => handleImageClick(photo.urls.full)}
                                            className="img-small"
                                            key={index}
                                            src={photo.urls.small}
                                        />
                                    </Grid>

                                ))
                            }
                        </Grid>
                    </div>
                }
            </div>


        </React.Fragment>
    )

}

export default UnsplashImage

