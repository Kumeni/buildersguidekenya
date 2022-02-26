import React from 'react';
import style from "./Product.module.css";
import {Swiper, SwiperSlide} from 'swiper/react';

// import Swiper core and required modules
import SwiperCore, {
  Autoplay,Pagination,Navigation
} from 'swiper/core';
import TotalUnits from '../TotalUnits/TotalUnits';

SwiperCore.use([Autoplay,Pagination,Navigation]);

function Product(props) {

    const productName = () =>{
        if(props.product !== undefined && props.product.productName != undefined){
            return props.product.productName;
        } else {
            return ""
        }
    }

    const pricing = value => {
        if(value == "UNIT_CAPACITY"){
            if(props.pricing != undefined && props.pricing.unitCapacity != undefined){
                return props.pricing.unitCapacity;
            } else {
                return "";
            }
        } else if (value == "UNIT_PRICE"){
            if(props.pricing != undefined && props.pricing.unitPrice != undefined){
                return "Ksh. " + props.pricing.unitPrice;
            } else {
                return "";
            }
        }
    }

    const productUnits = () =>{
        if(props.cart != undefined && props.cart.units != undefined){
            return props.cart.units;
        } else {
            return "";
        }
    }

    const amount = () =>{
        if(props.cart != undefined && props.cart.units != undefined && props.pricing != undefined && props.pricing.unitPrice != undefined){
            return "Ksh. " + props.cart.units * props.pricing.unitPrice;
        }
    }
  return (
    <div>
        <div className = {style.container}>
            <div className = {style.order}>
                <div className = {style.imageContainer}>
                    <Swiper
                            slidesPerView={1}
                            spaceBetween={5}
                            pagination={{clickable:true}}
                            onSlideChange={()=>undefined}
                    >
                        <SwiperSlide>
                            <div className={style.imageContainer}>
                                <img 
                                    src={'/icons/bgkNoImage.jpg'}
                                    alt={'builders guide kenya logo'}
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.imageContainer}>
                                <img 
                                    src={'/icons/bgkNoImage.jpg'}
                                    alt={'builders guide kenya logo'}
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.imageContainer}>
                                <img 
                                    src={'/icons/bgkNoImage.jpg'}
                                    alt={'builders guide kenya logo'}
                                />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className={style.productDetails}>
                    <div className = {style.close}>
                        <span title = {"Remove from cart"}>&times;</span>
                    </div>
                    <h3>
                        <span><i className={'fas fa-archive'}></i></span> {productName()}
                    </h3>
                    <p>{pricing("UNIT_CAPACITY")}</p>
                    <div className = {style.productInfoL}>
                        <p>{productUnits()+ " units"} @ {pricing("UNIT_PRICE")}</p>
                        <p>Amount : {amount()}</p>
                        {
                            props.type === "CART-ITEM"?
                                <TotalUnits units = {productUnits()} />
                            :
                                <button>more...</button>
                        }
                        
                    </div>
                </div>
            </div>
            <div className = {style.productInfoS}>
                <p>10 units @ Ksh. 600</p>
                <p>Amount : Ksh. 6000</p>
                {
                    props.type === "CART-ITEM"?
                        <TotalUnits units = {1} />
                    :
                        <button>more...</button>
                }
            </div>
        </div>
        {
            props.type === "ORDER" &&
                <div className = {style.moreInformation}>
                    <section>
                        <h1>Progress</h1>
                        <div className = {style.progress}>
                            <ul>
                                <li><span>Payment</span><span>Feb 2, 2022</span></li>
                                <li><span>Production</span><span>Feb 2, 2022</span></li>
                                <li><span>Drop location</span><span>Feb 2, 2022</span></li>
                                <li><span>Pickup location</span><span>Feb 2, 2022</span></li>
                                <li><span>Ready for pickup</span><span>Feb 2, 2022</span></li>
                                <li><span>Picked up</span><span>Feb 2, 2022</span></li>
                            </ul>
                        </div>
                    </section>
                    <section>
                        <h1>Delivery</h1>
                        <table className = {"table table-bordered "+ style.delivery}>
                            <tr>
                                <th>Method</th>
                                <td>Pickup location</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>Kibera Town Center</td>
                                
                            </tr>
                            <tr>
                                <th>Google maps link</th>
                                <td><a href="#">Click here</a></td>
                            </tr>
                        </table>
                    </section>
                    <section>
                        <h1>Payment</h1>
                        <table className = {"table table-bordered "+ style.payment}>
                            <tr>
                                <th>Method</th>
                                <td>M-pesa</td>
                            </tr>
                            <tr>
                                <th>Receipt</th>
                                <td>PKSKUERIU12490</td>
                            </tr>
                            <tr>
                                <th>Phone No</th>
                                <td>+254717551542</td>
                            </tr>
                            <tr>
                                <th>Amount</th>
                                <td>Ksh. 400</td>
                            </tr>
                        </table>
                    </section>
                </div>
        }
    </div>
  )
}

export default Product