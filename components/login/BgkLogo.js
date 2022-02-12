import React from 'react'
import style from './BgkLogo.module.css'

function BgkLogo() {
    return (
        <div className={style.logoContainer}>
            <img className={style.bgkLogo} src='/icons/builders guide logo small.png' alt='builders guide kenya logo' />
        </div>
    )
}

export default BgkLogo
