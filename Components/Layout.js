import React, { useEffect } from 'react'
import NavBar from './NavBar';
import ModalAuth from '../Components/ModalAuth';
import { Provider, useSelector } from 'react-redux'

import store from '../state/store'
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
                    <ModalAuth open={open} handleClose={handleClose} />
                </main>

            </Provider>
        </React.Fragment>
    )
}

export default Layout;