import React from 'react';
import style from './CallToAction.module.css';
import { useRouter } from "next/router"

function CallToAction(props) {

    const router = useRouter();

    const handleBuy = event => {
        if(props.loginData == undefined){
            sessionStorage.setItem("initialPathname", router.pathname);
            sessionStorage.setItem("initialQuery", router.query.v);
            router.push("/login");
            return null;
        }

        props.handleShowCover(true);
    }
    return (
        <>
            <button 
                className={/*'btn-primary '+ */ "text-white " + style.addToCart}
                onClick={ event => handleBuy(event)}
            >Buy now</button>
            <button className={'btn-dark ' + style.addToCart} >Add to cart</button>
            <button className={'btn ' + style.addToCart}>Leave contact</button>
            {/* <div className={style.sponsoredProduct}>
                <div></div>
                <span>sponsored product</span>
            </div> */}
        </>
    )
}

export default CallToAction
