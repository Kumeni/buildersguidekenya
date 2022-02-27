import React, {useState, useEffect} from 'react';
import style from "./Product.module.css";
import {Swiper, SwiperSlide} from 'swiper/react';
import axios from 'axios';

// import Swiper core and required modules
import SwiperCore, {
  Autoplay,Pagination,Navigation
} from 'swiper/core';
import TotalUnits from '../TotalUnits/TotalUnits';
import { prepareDestination } from 'next/dist/next-server/server/router';

SwiperCore.use([Autoplay,Pagination,Navigation]);

function Product(props) {

    const [units, setUnits] = useState(props.cart.units);

    const handleRemoveProduct = event => {
        //Remove a product on the cart array and also update it on the db 
        //updating the product on the db
        if(props.cart.id !== undefined){
            axios({
                url:props.baseURL+"/carts/"+props.cart.id,
                method:"put",
                headers:{
                    "Authorization":"Bearer "+props.loginData.jwt,
                },
                data:{
                    deleted:true
                }
            })
            .then(res=>{
                console.log(res);
                return res;
            })
            .catch(err=>{
                console.log(err.response);
            })
        }

        //removing the product in the cart array
        let holder = [], i;
        for ( i = 0; i < props.cartComplete.length; i++){
            if(i !== props.index){
                holder.push(props.cartComplete[i]);
            }
        }
        console.log(holder);
        props.setCart(holder.slice());
    }
        
    useEffect(()=>{
        if(units !== undefined && props.cart !== undefined && props.index !== undefined){
            //make a put request ot the servicer to change the cart product
            if(props.cart.id !== undefined){
                axios({
                    url:props.baseURL+"/carts/"+props.cart.id,
                    method:"put",
                    headers:{
                        "Authorization":"Bearer "+props.loginData.jwt,
                    },
                    data:{
                        units:units
                    }
                })
                .then(res=>{
                    console.log(res);
                    return res;
                })
                .catch(err=>{
                    console.log(err.response);
                })
            }

            //update the cart array
            let holder = props.cartComplete;
            holder[props.index].units = units;
            props.setCart(holder.slice());
        }
    }, [units])
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
            return "Ksh. " + (props.cart.units * props.pricing.unitPrice);
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
                            {
                                props.images?
                                    props.images.length > 0?
                                        props.images.map((element, index) => (
                                            <SwiperSlide
                                                key = {index}
                                            >
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
                        </Swiper>
                    </div>
                    <div className={style.productDetails}>
                        <div className = {style.close}>
                            <span 
                                onClick = {event => handleRemoveProduct(event)} 
                                title = {"Remove from cart"}
                            >&times;</span>
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
                                    <TotalUnits 
                                        units = {units} 
                                        setUnits = {data => setUnits(data)}
                                    />
                                :
                                    <button>more...</button>
                            }
                            
                        </div>
                    </div>
                </div>
                <div className = {style.productInfoS}>
                    <p>{productUnits()+ " units"} @ {pricing("UNIT_PRICE")}</p>
                    <p>Amount : {amount()}</p>
                    {
                        props.type === "CART-ITEM"?
                            <TotalUnits 
                                units = {units} 
                                setUnits = {data => setUnits(data)}
                            />
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