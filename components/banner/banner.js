import style from  './banner.module.css'
import {useRef, useEffect} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'

// import Swiper core and required modules
import SwiperCore, {
    Autoplay,Pagination,Navigation
  } from 'swiper/core';

SwiperCore.use([Autoplay,Pagination,Navigation]);

export default function Banner(){
    /**
     * 
     * autoplay={{
                    delay:1,
                    disableOnInteraction:false,
                    reverseDirection:false,
                    waitForTransition:true
                }}
     */
    
    
    return (
        <div className={style.bannerContainer}>
            <div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={5}
                    pagination={{clickable:true}}
                    autoplay={{
                        "delay":10000,
                        "disableOnInteraction":false,
                        "waitForTransition":true
                    }}
                    onSwiper={()=>console.log('swiper')}
                    onSlideChange={()=>undefined}
                >
                    <SwiperSlide>
                        <div className={style.slide}>
                            <img className={style.banner}src='/banner/billboard6.png' alt='billboard1' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={style.slide}>
                            <img className={style.banner}src='/banner/billboard7.png' alt='billboard1' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={style.slide}>
                            <img className={style.banner}src='/banner/billboard8.png' alt='billboard1' />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className={style.signup}>
                {/* <div>
                    <h1>
                        Wanna showcase your products and services?
                    </h1>
                    <button className={'bg-primary text-white'}>SIGNUP</button>
                </div> */}
                <a href="https://suppliers.buildersguidekenya.com/signup">
                    <img src="/images/signupBanner.png" alt="buildersguidekenya signup link" />
                </a>
            </div>
        </div>
    )
}