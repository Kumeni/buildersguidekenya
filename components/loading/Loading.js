import React from 'react'
import style from './Loading.module.css'

function Loading() {
    return (
        <div className={style.loadingContainer}>
            <img src="/icons/301.gif" alt="loading animation" />
        </div>
    )
}

export default Loading
