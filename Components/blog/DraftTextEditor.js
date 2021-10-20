
import React, { useEffect, useState } from 'react'
import Dante, { ImageBlockConfig } from 'Dante2'
import TitleText from './Title';
import { createBlog, getAllCategories } from '../../api/blog';
import { convertBlobToBinary } from '../../utilites/image.helpers';
import Modal from '../Modal'
import Chip from '@mui/material/Chip';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
/**
* @author
* @function DraftText
**/

const DraftTextEditor = (props) => {
    const [title, setTitle] = useState("")
    const [previewedBackground, setPreviewBackground] = useState('')
    const [content, setContent] = useState('')
    const [openCateModal, setOpenCateModal] = useState(false);


    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectiedCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const userstate = useSelector(state => state.user)
    useEffect(() => {
        getCategories()

    }, [])

    const handleOpen = () => setOpenCateModal(true);
    const handleClose = () => {
        setOpenCateModal(false);

    }
    const getCategories = async () => {
        try {
            const cates = await getAllCategories()
            setCategories(cates.data)
        } catch (error) {
            console.log(error)
        }
    }

    const selectCategory = (id) => {
        if (selectedCategories.includes(id)) {
            let i = selectedCategories.indexOf(id)
            selectedCategories.splice(i, 1)
        } else {
            selectedCategories.push(id)
        }
        setSelectiedCategories([...selectedCategories])

    }
    let danteProps = {
        data_storage: {
            url: "xxx",
            save_handler: function (editorContext, content) {
                setContent(editorContext.editorContent)
            }
        },
    };

    const handlePublish = async () => {
        setLoading(true)
        const body = await convertBlobToBinary(content)
        // console.log(body)
        if (body) {
            setContent(body)
            let blog = {
                title: title,
                cover: previewedBackground,
                body: body,
                categories: selectedCategories,
                user: userstate.id
            }

            console.log(blog.body)
            setTimeout(() => {
                createBlog(blog)
                    .then(response => {
                        console.log(response)
                        setLoading(false)
                        setSelectiedCategories([])

                    })
                    .catch(error => {
                        console.log(error.message)
                        setLoading(false)
                    })
            }, 2000)

        }

    }

    const Category = () => {
        return (
            <div div className="auth-box" >
                <p className="graf--p bottom-margin-2">One more step!</p>
                <p className="small-text-secondary">Seclect your blog&prime;s tags or create new tag.</p>
                <div className="cate-box">
                    {
                        categories &&
                        categories.map((cate, index) => (
                            <div
                                key={index}
                                style={{ display: 'inline-block', padding: '.6rem' }}>
                                <Chip
                                    label={cate.name}
                                    variant={`${selectedCategories.includes(cate.id) ? "" : "outlined"}`}
                                    onClick={() => selectCategory(cate.id)}
                                    style={{ fontSize: '1.2rem' }}
                                />
                            </div>
                        ))
                    }
                </div>

                <p className="small-text-secondary">
                    Already&#x2047; Let&prime;s publish it
                </p>
                <button
                    onClick={handlePublish}
                    className="button-primary"
                >Publish
                </button>
                {loading &&

                    <CircularProgress color="inherit" />
                }

            </div >
        )
    }
    const CategoryModal = () => (
        <React.Fragment>
            <Modal
                open={openCateModal}
                handleClose={handleClose}
            >
                <Category />
            </Modal>
        </React.Fragment>
    )
    return (
        <React.Fragment>
            <TitleText
                previewedBackground={previewedBackground}
                setPreviewBackground={setPreviewBackground}
                title={title}
                setTitle={setTitle}
            />

            <div className="container" style={{ padding: '3rem 0' }}>
                <Dante
                    {...danteProps}
                    bodyPlaceholder={"Do what you will"}
                />
            </div>

            <div className="container center" style={{ display: 'block' }}>
                <button
                    className="button-outlined"
                    onClick={handleOpen}
                >Publish</button>
            </div>

            {
                CategoryModal()
            }
        </React.Fragment>

    )

}

export default DraftTextEditor;