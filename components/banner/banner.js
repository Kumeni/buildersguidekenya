import style from  './banner.module.css'
import {useRef, useEffect} from 'react'

export default function Banner(){

    const billboardContainer = useRef();

    useEffect(()=>{
        function billboardContainerScroll(n=0){
            billboardContainer.current.scrollTo({top:0,left:(n*window.innerWidth),behaviour:'smooth'});
            n++;
            if(n<7 & n>=0) {
                setTimeout(billboardContainerScroll(n), 2000);
            } else {
                alert('I work');
            }
        }

        billboardContainerScroll();
    });
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