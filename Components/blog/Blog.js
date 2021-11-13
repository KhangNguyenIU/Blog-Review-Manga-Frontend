import Dante from 'Dante2'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router';

import { BsBookmarkPlus, BsThreeDots } from 'react-icons/bs'
import { FiDelete } from 'react-icons/fi'
import { BiPencil } from 'react-icons/bi'
import { FaFacebook } from 'react-icons/fa'
import { Avatar, Snackbar } from '@mui/material'
import { Chip } from '@material-ui/core'
import { deleteBlogById } from '../../api/blog'
import Modal from '../Modal'
import CircularProgress from '@mui/material/CircularProgress';

const Blog = ({ blog }) => {
    const router = useRouter()
    const userstate = useSelector(state => state.user)
    const [openTool, setOpenTool] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSucess] = useState("")
    const [error, setError] = useState("")
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {

    }, [])

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }


    const handleDeleteBlog = () => {
        deleteBlogById(blog.id)
            .then(response => {
                console.log(response)
                setSucess(response.data)
                setTimeout(()=>{
                    router.push('/')
                },2000)
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
            })
    }
    const onToolClick = () => {
        setOpenTool(openTool => !openTool)
    }

    const ComfirmModalContent = () => (
        <div div className="auth-box" >
            <p className="graf--p bottom-margin-2">Are you sure to delete this blog</p>

            <div className="flex-row-center">
                <button
                    onClick={handleDeleteBlog}
                    className="button-primary"
                >Delete
                </button>

                <button
                    onClick={handleCloseModal}
                    className="button-outlined"
                >Cancel
                </button>
            </div>


            {loading &&
                <CircularProgress color="inherit" />
            }

        </div >
    )
    const ConfirmModal = () => (
        <Modal
            open={openModal}
            handleClose={handleCloseModal}
        >
            <ComfirmModalContent />
        </Modal>
    )

    const Tool = () => {
        return (
            <div className={`${!openTool && "hidden"} tool-list`}>
                <BsBookmarkPlus />
                <FaFacebook />
                {
                    (userstate.id == blog.user.id) &&
                    <div >
                        <FiDelete onClick={handleOpenModal} />
                        <BiPencil />
                    </div>
                }

            </div>
        )
    }


    const Notification = () => {
        return (
            <>
                <Snackbar
                    open={success.length}
                    autoHideDuration={2000}
                    message={success}
                />
                <Snackbar
                    open={error.length}
                    autoHideDuration={2000}
                    message={error}
                />
            </>

        )
    }
    return (
        <React.Fragment>
            <div className="center top-margin-5 bottom-margin-2">
                <div className="flex-column-center bottom-margin-2 container-medium" style={{ padding: '0 2rem' }}>
                    <p className="blur-text">{blog.createdAt}</p>
                    <p className="title-primary">{blog.title}</p>
                    <div className="blog-infor-tool">

                        <div className="flex-row-center bottom-margin-2">
                            <Avatar
                                className="right-margin-2"
                                src={blog.user.avatar} />
                            <p className="profile-text-primary">{blog.user.username}</p>
                        </div>
                        <div className="tool-menu">
                            <Tool />
                            <BsThreeDots className="cursor" onClick={onToolClick} />
                        </div>
                    </div>


                </div>


                <img
                    src={blog.cover}
                    className="img bottom-margin-2"
                    alt="background cover"

                />


            </div>
            <div className="container">

                <Dante
                    content={JSON.parse(blog.body)}
                    read_only={true}
                />

                <div
                    className="center"
                    style={{ maxWidth: '50rem' }}>
                    {
                        blog.categories && blog.categories.map((cate, index) => (
                            <div
                                key={index}
                                className="bottom-margin-2"
                                style={{ display: 'inline-block', padding: ' 0 .6rem' }}>
                                <Chip
                                    variant="outlined"
                                    label={cate.category.name}
                                    style={{ fontSize: '1.4rem', color: "grey" }}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>

            <ConfirmModal />
            {Notification()}
        </React.Fragment>
    )
}

export default Blog