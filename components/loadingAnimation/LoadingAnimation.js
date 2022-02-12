import React from 'react'
import style from './LoadingAnimation.module.css'

function LoadingAnimation(props) {
    return (
        <div ref={props.loadingAnimation} className={style.animationContainer+ ' bg-primary d-flex justify-content-center align-items-center'}>
            <div></div>
            <div></div>
        </div>
    )
}

export default LoadingAnimation
