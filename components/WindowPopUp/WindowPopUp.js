import React, {useState, useEffect, useRef} from 'react';
import style from './WindowPopUp.module.css';

function WindowPopUp(props) {

    const cover = useRef(null);

    //This block changes the cover position
    // position:fixed for notifications
    useEffect(()=> {
        if(cover.current != null){
            if(props.position != undefined){
                cover.current.style.position = props.position;
            }
        }
    }, [props.position, cover])

    useEffect(()=>{
        if( props.showNotification === true && cover.current !== null){
            cover.current.style.position = "fixed";
            cover.current.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
            cover.current.style.display = "grid";
            cover.current.style.alignContent = "center";
        }
    }, [props.showNotification, cover])

    if (props.showCover === true || props.showNotification === true)
        return (
            <div ref = {cover} className={style.cover}>
                <div>
                    <div>
                        <span title="Close" onClick={()=>props.handleShowCover(false)}> &times;</span>
                    </div>
                    {props.children}
                </div>
            </div>
        )

    return null;
}

export default WindowPopUp
