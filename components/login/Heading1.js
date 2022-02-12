import React from 'react'
import style from './Heading1.module.css'

function Heading1(props) {
    return (
        <h1 className={style.heading}>{props.heading}</h1>
    )
}

export default Heading1
