
import React, { useState } from 'react'
// import DanteEditor, { DanteTooltipConfig, Icons ,h2} from 'dante3'
import Dante from 'Dante2'

/**
* @author
* @function DraftText
**/

const DraftText = (props) => {
    return (
        <React.Fragment>
        
            <div className="container text-editor" >

                <Dante
                    // content={h2}
                    bodyPlaceholder={"Do what you will"}
                    default_wrappers={[{ className: 'text-editor', block: 'unstyled' }]}
                />

            </div>
        </React.Fragment>

    )

}

export default DraftText