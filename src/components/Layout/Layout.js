import React from 'react';
import Auxx from '../../hoc/Auxx'



const layout =(props)=>{

    return(
        <Auxx>
        <div>
            Toolbar, sidebar and Backdrop
        </div>
        <main>
            {props.children}
        </main>
        </Auxx>
    )
}

export default layout;