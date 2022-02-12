import React from 'react'
import style from './FormBody.module.css'

function FormBody(props) {
    return (
        <div className={style.loginForm}>
            {props.children}
        </div>
    )
}

export default FormBody
