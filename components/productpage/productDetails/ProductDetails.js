import style from './ProductDetails.module.css'
import {useEffect, useRef} from 'react'
import {useRouter} from 'next/router'
function ProductDetails(props) {
    const variations = useRef(null);
    const handleVariationSelect = index =>{
        //change the border color of all divs except the active one
        props.setActivePricing(index);
        if(variations.current){
            let variationsArray = variations.current.getElementsByTagName("div"), i;
            for( i = 0; i< variationsArray.length; i++){
                if( i == index)
                    variationsArray[i].style.border="1px solid rgb(233, 116, 21)";
                else
                    variationsArray[i].style.border="1px solid rgb(210, 210, 210)";
            }
        }
    }

    const router = useRouter();

    function handleSupplierClick(){
        router.push("/manufacturersandsuppliers/manufacturerandsupplier?companyName="+props.supplierInformation.companyName);
    }


    useEffect(()=>{
        console.log(props.productPricings);
    })

    return (
        <div className={style.detailsContainer}>
            {
                props.productDetails?
                    <div className={style.productInformation}>
                        {/* <p><i className={'fas fa-star ' + style.rating}></i> 4.6 | 1,249 ratings</p> */}
                        <h5><span><i className={'fas fa-archive'}></i></span> {props.productDetails.productName}</h5>
                        <p><span><i className={'fas fa-map-marker-alt'}></i></span>  {props.productDetails.county+'/'+ props.productDetails.constituency}</p>
                        {
                            props.price !== ""|| props.price !== undefined?
                                <p><span><i className={'fas fa-price-tag-alt'}></i></span> <strong>Ksh. {props.price}</strong></p>
                            :<p><span><i className={'fas fa-price-tag-alt'}></i></span> <strong>Contact seller</strong></p>
                        }
                        
                        {
                            props.initialPrice?
                                <p><span className={style.initialPrice}>{props.initialPrice}</span></p>
                            :undefined
                        }
                        <p><strong>Variations</strong></p>
                        <div ref={variations} className={style.variations}>
                            {
                                props.activePricing !== undefined && props.productPricings !== undefined && props.productPricings.length > 0? 
                                    props.productPricings.map( (element, index) => (
                                        <div 
                                            className={index == props.activePricing? style.active: style.notActive} 
                                            key = {element.id}
                                            onClick = {event =>{
                                                props.handleVariation(index);
                                                handleVariationSelect(index);
                                            }}
                                        >{element.unitCapacity}</div>
                                    ))
                                :undefined
                            }
                        </div>
                    </div>
                :undefined
            }
            {
                props.productDetails?
                    <div className={style.productDescription}>
                        <h5>Product description</h5>
                        <p>{props.productDetails.productDescription}</p>
                    </div>
                :undefined
            }
            {
                props.supplierInformation?
                    props.supplierContact?
                        <div className={style.supplierInformation}>
                            {
                                props.supplierInformation.services != 1?
                                props.supplierInformation.services == 2?(<h5 onClick={()=>handleSupplierClick()}>Supplier</h5>):
                                (<h5 onClick={()=>handleSupplierClick()}>Manufacturer and supplier</h5>):
                                (<h5 onClick={()=>handleSupplierClick()}>Manufacturer</h5>)
                            }
                            
                            <p><span className={style.companyName}><span><i className={'fas fa-warehouse'}></i></span> <b> {props.supplierInformation?props.supplierInformation.companyName:undefined}</b></span></p>
                            <p>
                                <span><i className={'fas fa-phone'}></i></span>
                                {props.supplierContact?"  +"+props.supplierContact[0].cellphoneNo:undefined}
                                {props.supplierContact?props.supplierContact[1]?" || +"+props.supplierContact[1].cellphoneNo:undefined:undefined}
                            </p>
                            <p>
                                <span><i className={'fas fa-envelope'}></i></span> 
                                {props.supplierEmails?"  "+props.supplierEmails[0].supplierEmail:undefined}
                                {props.supplierEmails?props.supplierEmails[1]?" || "+props.supplierEmails[1].supplierEmail:undefined:undefined}
                            </p>
                        </div>
                    :undefined
                :undefined
            }
            {/*
                props.productDetails?
                    props.productDetails.availableColors != '' && props.productDetails.availableColors != undefined?
                        <div className={style.productDescription}>
                            <h5>Additional details</h5>
                            <p>{props.productDetails.availableColors}</p>
                        </div>
                    :undefined
                :undefined
            */}
        </div>
    )
}

export default ProductDetails