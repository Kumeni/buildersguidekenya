import React from 'react'
import Signupsignin from '../header/Signupsignin'
import style from './Header3.module.css'

function Header3() {
    return (
        <header className={style.header}>
            <div className={style.carretLeft}>
                <img src="/icons/icons8-chevron-left-48.png" alt="icons8-chevron-left-48"/>
            </div>
            <div className={style.bgkIcon}>
                <img src="/icons/builders guide logo small.png" alt="builders guide logo small" />
            </div>
            <div className={style.phoneMenu}>
                <div className={style.carretLeft}>
                    <img src="/icons/icons8-chevron-left-48.png" alt="icons8-chevron-left-48"/>
                </div>
                <div className={style.bgkIcon}>
                    <img src="/icons/builders guide logo small.png" alt="builders guide logo small" />
                </div>
            </div>
            <div className={style.signin}>
                <Signupsignin />
            </div>
        </header>
    )
}

export default Header3
