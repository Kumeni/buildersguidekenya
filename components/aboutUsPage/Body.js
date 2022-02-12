import React from 'react'
import style from './Body.module.css'

function Body(props) {
    return (
        <div className={style.body}>
            {props.children}
        </div>
    )
}

export default Body
