import style from  './banner.module.css'
import {useRef, useEffect} from 'react'

export default function Banner(){

    const billboardContainer = useRef();
    let currentPos = 0;
    let billboardRep;

    function billboardScroll(n){
        billboardContainer.current.scrollTo({left:(n*window.innerWidth), top:0, behavior:(n==0?'auto':'smooth')});
        console.log(n);
    }

    function billboardPaginationScroll(n){
        billboardContainer.current.scrollTo({left:(n*window.innerWidth), top:0, behavior:'smooth'});
        console.log(n);
    }

    function handlePagination(n){
        billboardPaginationScroll(n);
        currentPos = n;
    }  
    
    useEffect(()=>{    
        billboardRep = setInterval(()=>{
            if(currentPos>=0 && currentPos <=5){
                billboardScroll(currentPos);
                currentPos++;
                if(currentPos>5){
                    currentPos = 0;
                } else if (currentPos < 0){
                    currentPos=0
                }
            }  else{
                currentPos = 0;
            }
        },4500);
    },[]);

    return <>
        <div ref={billboardContainer} className={style.billboardContainer +' container-fluid'} id='billboardContainer'>
            <div className={style.slide}>
                <img className={style.banner}src='/banner/Billboard1.png' alt='billboard1' />
            </div>
            <div className={style.slide}>
                <img className={style.banner}src='/banner/Billboard1.png' alt='billboard1' />
            </div>
            <div className={style.slide}>
                <img className={style.banner}src='/banner/Billboard1.png' alt='billboard1' />
            </div>
            <div className={style.slide}>
                <img className={style.banner}src='/banner/Billboard1.png' alt='billboard1' />
            </div>
            <div className={style.slide}>
                <img className={style.banner}src='/banner/Billboard1.png' alt='billboard1' />
            </div>
            <div className={style.slide}>
                <img className={style.banner}src='/banner/Billboard1.png' alt='billboard1' />
            </div>
        </div>
        <div className={style.billboardNavButtons}>
            <button className={style.billboardNavButton} onMouseOver={() => handlePagination(0)}></button>
            <button className={style.billboardNavButton} onMouseOver={() => handlePagination(1)}></button>
            <button className={style.billboardNavButton} onMouseOver={() => handlePagination(2)}></button>
            <button className={style.billboardNavButton} onMouseOver={() => handlePagination(3)}></button>
            <button className={style.billboardNavButton} onMouseOver={() => handlePagination(4)}></button>
            <button className={style.billboardNavButton} onMouseOver={() => handlePagination(5)}></button>
        </div>
    </>
}