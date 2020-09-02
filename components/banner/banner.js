import style from  './banner.module.css'
import {useRef, useEffect} from 'react'

export default function Banner(){

    const billboardContainer = useRef();

    return <>
        <div ref={billboardContainer} className={style.billboardContainer +' container-fluid'} id='billboardContainer'>
            <div className={style.slide}>
                <img className={style.banner}src='/banner/Billboard1.png' alt='billboard1' />
            </div>
            <div className={style.slide}></div>
            <div className={style.slide}></div>
            <div className={style.slide}></div>
            <div className={style.slide}></div>
            <div className={style.slide}></div>
        </div>
        <div className={style.billboardNavButtons}>
            <button className={style.billboardNavButton} ></button>
            <button className={style.billboardNavButton} ></button>
            <button className={style.billboardNavButton} ></button>
            <button className={style.billboardNavButton} ></button>
            <button className={style.billboardNavButton} ></button>
            <button className={style.billboardNavButton} ></button>
        </div>
    </>
}