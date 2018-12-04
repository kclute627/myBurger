import React from 'react';
import Auxx from '../../hoc/Auxx';
import classes from './Layout.css';




const layout =(props)=>{

    return(
        <Auxx>
        <div>
            Toolbar, sidebar and Backdrop
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
        </Auxx>
    )
}

export default layout;