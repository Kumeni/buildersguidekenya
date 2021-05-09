import SwiperCore, {Pagination, Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import style from './ProductImage.module.css'

SwiperCore.use([Pagination, Navigation]);

export default function ProductImage(props) {
    return (
        <div>
            <Swiper 
                navigation 
                pagination={{clickable:true, dynamicBullets:true, dynamicMainBullets:4}}
                spaceBetween={50}
            >
                {
                    props.productImages?
                        props.productImages.length > 0?
                            props.productImages.map((element, index) => (
                                <SwiperSlide>
                                    <div className={style.imageContainer}>
                                        <img
                                            className={style.productImage}
                                            src={element?element.productImage.formats.medium?props.baseURL+element.productImage.formats.medium.url:props.baseURL+element.productImage.url:'/icons/bgkNoImage.jpg'}
                                            alt={props.productDescription}
                                        />
                                    </div>
                                    
                                </SwiperSlide>
                            ))
                        :undefined
                    :undefined
                }
                
                {/* <SwiperSlide><img className={style.productImage} src='/images/Construction-resized.jpg' alt='Constuction image' /></SwiperSlide>
                <SwiperSlide><img className={style.productImage} src='/images/unique house design.jpg' alt='unique house design' /></SwiperSlide>
                <SwiperSlide><img className={style.productImage} src='/images/Construction-resized.jpg' alt='Constuction image' /></SwiperSlide>
                <SwiperSlide><img className={style.productImage} src='/images/unique house design.jpg' alt='unique house design' /></SwiperSlide>
                <SwiperSlide><img className={style.productImage} src='/images/Construction-resized.jpg' alt='Constuction image' /></SwiperSlide> */}
            </Swiper>
        </div>
    )
}
