import SwiperCore, {Pagination, Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import style from './ProductImage.module.css'

SwiperCore.use([Pagination, Navigation]);

export default function ProductImage() {
    return (
        <div>
            <Swiper 
                navigation 
                pagination={{clickable:true, dynamicBullets:true, dynamicMainBullets:4}}
                spaceBetween={50}
            >
                <SwiperSlide><img className={style.productImage} src='/images/unique house design.jpg' alt='unique house design' /></SwiperSlide>
                <SwiperSlide><img className={style.productImage} src='/images/Construction-resized.jpg' alt='Constuction image' /></SwiperSlide>
                <SwiperSlide><img className={style.productImage} src='/images/unique house design.jpg' alt='unique house design' /></SwiperSlide>
                <SwiperSlide><img className={style.productImage} src='/images/Construction-resized.jpg' alt='Constuction image' /></SwiperSlide>
                <SwiperSlide><img className={style.productImage} src='/images/unique house design.jpg' alt='unique house design' /></SwiperSlide>
                <SwiperSlide><img className={style.productImage} src='/images/Construction-resized.jpg' alt='Constuction image' /></SwiperSlide>
            </Swiper>
        </div>
    )
}
