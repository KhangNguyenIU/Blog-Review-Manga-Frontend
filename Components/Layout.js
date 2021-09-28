import React, { useEffect, useRef } from 'react'
import NavBar from './NavBar';
import Modal from '../Components/Modal';
import { Provider, useSelector } from 'react-redux'

import store from '../state/store'
import SwitchAuth from './auth/SwitchAuth';
import Footer from './Footer';
const Layout = ({ children }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <React.Fragment>
            <Provider store={store}>
                <NavBar handleOpen={handleOpen} />
                <main>
                    {children}

                    <Modal
                        open={open}
                        handleClose={handleClose}>
                        <SwitchAuth />
                    </Modal>
                </main>
                <Footer/>
            </Provider>
        </React.Fragment>
    )
}

export default Layout;