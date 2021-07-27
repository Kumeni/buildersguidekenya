import React from 'react'
import style from "./Progress.module.css"

function Progress(props) {
    return (
        <div className={style.progressContainer}>
            <div>
                {
                    props.image===undefined?
                        <img src="/icons/301.gif" alt="loading gif" />
                    :"Oops (^-^)"
                }
            </div>
            <h5>{props.message}</h5>
        </div>
    )
}

export default Progress
