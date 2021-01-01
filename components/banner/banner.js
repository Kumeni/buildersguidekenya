import style from  './banner.module.css'
import {useRef, useEffect} from 'react'
import SwiperCore, {Pagination, Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'

SwiperCore.use([Navigation, Pagination]);

export default function Banner(){

    
    
    return (
        <div className={style.bannerContainer}>
            <Swiper
                slidesPerView={1}
                spaceBetween={50}
                pagination={{clickable:true}}
                autoplay={{
                    delay:1000,
                    disableOnInteraction:false,
                    reverseDirection:false,
                    waitForTransition:true
                }}
            >
                <SwiperSlide>
                    <div className={style.slide}>
                        <img className={style.banner}src='/banner/Billboard1.png' alt='billboard1' />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={style.slide}>
                        <img className={style.banner}src='/banner/Billboard1.png' alt='billboard1' />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={style.slide}>
                        <img className={style.banner}src='/banner/Billboard1.png' alt='billboard1' />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}