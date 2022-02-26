import React from 'react';
import style from './CallToAction.module.css';
import { useRouter } from "next/router"
import axios from "axios";

function CallToAction(props) {

    const router = useRouter();

    const handleBuy = event => {
        if(props.loginData == undefined){
            //For signing up before 
            sessionStorage.setItem("initialPathname", router.pathname);
            sessionStorage.setItem("initialQuery", router.query.v);
            router.push("/login");
            return null;
        }
        props.handleShowCover(true);
    }

    const handleAddToCart = event => {
        //If someone is signed in, we need to get the cart from the dB and use that
        //If no one is signed in, we use the ones in the local storage.
        //Cart should be updated to the server when one is signed in against their account
        console.log(event);
        let cart;
        if(localStorage.getItem("cart") == null){
            cart = [];
        }
        else {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        if(props.productDetails != undefined){
            cart = cart.concat(props.cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        if(props.loginData !== undefined || props.loginData !== null){
            
            let data = props.cartItem;
            data.userId = props.loginData.user.id;

                console.log(props.loginData.jwt);
            axios({
                url:props.baseURL+"/carts",
                method:"post",
                headers:{
                    "Authorization":"Bearer "+props.loginData.jwt,
                },
                data
            })
            .then(res=>{
                console.log(res);
                return res;
            })
            .catch(err=>{
                console.log(err.response);
            })
        } 
    }

    return (
        <>
            <button 
                className={/*'btn-primary '+ */ "text-white " + style.addToCart}
                onClick={ event => handleBuy(event)}
            >Buy now</button>
            <button 
                className={'btn-dark ' + style.addToCart}
                onClick = {event=>handleAddToCart(event)}
            >Add to cart</button>
            <button className={'btn ' + style.addToCart}>Leave contact</button>
            {/* <div className={style.sponsoredProduct}>
                <div></div>
                <span>sponsored product</span>
            </div> */}
        </>
    )
}

export default CallToAction
