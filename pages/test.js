
import React, { useState } from 'react'
// import DanteEditor, { DanteTooltipConfig, Icons ,h2} from 'dante3'
import Dante from 'Dante2'
import UnsplashImage from '../Components/UnsplashImage'

/**
* @author
* @function DraftText
**/

const DraftText = (props) => {
    return (
        <React.Fragment>
        
            <div className="container text-editor" >

                <UnsplashImage/>

            </div>
        </React.Fragment>

    )

}

export default DraftText