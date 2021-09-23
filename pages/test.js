import Button from '@mui/material/Button';
import axios from 'axios';

import React, { useState } from 'react'
// import DanteEditor, { DanteTooltipConfig, Icons ,h2} from 'dante3'

import { test } from '../api/auth'
import Layout from '../Components/Layout';
import ModalAuth from '../Components/ModalAuth';


/**
* @author
* @function DraftText
**/

const DraftText = (props) => {


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const test = () => {
        axios.get("http://localhost:8000/auth/test",{withCredentials:true})
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

    const clear = () => {
        axios.get("http://localhost:8000/auth/signout",{withCredentials:true})
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
    return (
        <React.Fragment>
            <Layout>
                
            <div className="container text-editor" >
                <button onClick={test}> test</button>
                <button onClick={clear}> delete</button>

                <Button >Open modal</Button>
                <p>
                    What is Lorem Ipsum?
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                </p>

            </div>
            <ModalAuth open={open} handleClose={handleClose} />
            </Layout>
        </React.Fragment>

    )

}

export default DraftText