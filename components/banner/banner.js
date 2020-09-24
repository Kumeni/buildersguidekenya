import style from  './banner.module.css'
import {useRef, useEffect} from 'react'

export default function Banner(){

    const billboardContainer = useRef();
    const billboardNav = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef() ];

    let newCurrentPos=0;
    let currentPos = 0;
    let billboardRep;
    let touch = {
        start:0,
        end:0,
        change:0
    }

    function billboardNavPosition(currentPos){
        for(let i=0; i<billboardNav.length;i++){
            if(i==currentPos){
                billboardNav[i].current.style.backgroundColor = 'black';
            } else {
                billboardNav[i].current.style.backgroundColor = 'white';
            }
        }
    }

    function billboardScroll(n){
        billboardContainer.current.scrollTo({left:(n*window.innerWidth), top:0, behavior:(n==0?'auto':'smooth')});
        console.log(n);
    }


    function billboardPaginationScroll(n){
        billboardContainer.current.scrollTo({left:(n*window.innerWidth), top:0, behavior:'smooth'});
        billboardNavPosition(n);
        console.log(n);
    }

    function handlePagination(n){
        billboardPaginationScroll(n);
        currentPos = n;
    }

    function handleBillboardTouchMove(touchTransform){
        if(touchTransform > 10){
            newCurrentPos <=5 ? newCurrentPos++ : newCurrentPos = 5;
            handlePagination(newCurrentPos);
            //console.log(newCurrentPos+'forward');
        } else if(touchTransform < -10){
            newCurrentPos >=1 ? newCurrentPos-- : newCurrentPos = 0;
            handlePagination(newCurrentPos);
            console.log(newCurrentPos+'backward');
        } else {
            handlePagination(newCurrentPos);
        }
    }

    const handleBillboardTouchStart = event => {
        touch.start =  event.changedTouches[0].clientX;
    }

    const handleBillboardTouchEnd = event => {
        touch.end =  event.changedTouches[0].clientX;
        touch.change = touch.start - touch.end;
        handleBillboardTouchMove(touch.change);
    }
   
    useEffect(()=>{    
        billboardRep = setInterval(()=>{
            if(currentPos>=0 && currentPos <=5){
                billboardScroll(currentPos);
                billboardNavPosition(currentPos);
                newCurrentPos = currentPos;
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
        <div ref={billboardContainer} className={style.billboardContainer +' container-fluid'} onTouchStart ={()=>handleBillboardTouchStart(event)} onTouchEnd = {()=>handleBillboardTouchEnd(event)}>
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
            <button ref={billboardNav[0]} className={style.billboardNavButton} onMouseOver={() => handlePagination(0)}></button>
            <button ref={billboardNav[1]} className={style.billboardNavButton} onMouseOver={() => handlePagination(1)}></button>
            <button ref={billboardNav[2]} className={style.billboardNavButton} onMouseOver={() => handlePagination(2)}></button>
            <button ref={billboardNav[3]} className={style.billboardNavButton} onMouseOver={() => handlePagination(3)}></button>
            <button ref={billboardNav[4]} className={style.billboardNavButton} onMouseOver={() => handlePagination(4)}></button>
            <button ref={billboardNav[5]} className={style.billboardNavButton} onMouseOver={() => handlePagination(5)}></button>
        </div>
    </>
}