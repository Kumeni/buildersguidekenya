import React, {useState, useEffect} from 'react'
import style from './Progress.module.css'

function Progress(props) {
    console.log(props.updateStatus);
    if( props.updateStatus == 'UPDATE' || props.updateStatus == undefined ) 
        return (
            <span>
                {props.action? props.action : "UPDATE"}
            </span>
        )

    if(props.updateStatus == 'UPDATING')
        return (
            <div style={props.borderColor?{"borderTopColor":props.borderColor}:{"borderTopColor":"white"}} className={style.loadingAnimation}></div>
        )
    
    if(props.updateStatus == 'DONE')
        return(
            <span>
                <span><i className={'fas fa-check'}></i></span> DONE
            </span>
        )
}

export default Progress
