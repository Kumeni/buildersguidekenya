import style from './ProductDetails.module.css'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
function ProductDetails(props) {

    const router = useRouter();

    function handleSupplierClick(){
        router.push("/manufacturersandsuppliers/manufacturerandsupplier?companyName="+props.supplierInformation.companyName);
    }

    return (
        <div className={style.detailsContainer}>
            {
                props.productDetails?
                    <div className={style.productInformation}>
                        {/* <p><i className={'fas fa-star ' + style.rating}></i> 4.6 | 1,249 ratings</p> */}
                        <h5><span><i className={'fas fa-archive'}></i></span> {props.productDetails.productName}</h5>
                        <p><span><i className={'fas fa-map-marker-alt'}></i></span>  {props.productDetails.county+'/'+ props.productDetails.constituency}</p>
                        {/* <p><strong>Manufacturer</strong>: JUMBO CHEM KENYA LTD</p> */}
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
            {
                props.productDetails?
                    props.productDetails.availableColors != '' && props.productDetails.availableColors != undefined?
                        <div className={style.productDescription}>
                            <h5>Additional details</h5>
                            <p>{props.productDetails.availableColors}</p>
                        </div>
                    :undefined
                :undefined
            }
            {/* <div className={style.sizeSelect}>
                <label for='size'>Size : </label>
                <select name='size' id='size' className={style.size}>
                    <option value='null'>select</option>
                    <option value='size1'>size 1</option>
                    <option value='size2'>size 2</option>
                    <option value='size3'>size 3</option>
                    <option value='size4'>size 4</option>
                </select>
            </div> */}
            {/* <div className={style.colorSelect}>
                <h5 className={'d-flex justify-content-between align-items-center'}>Available colors <span><button className={'btn'}>See all</button></span></h5>
                <div className={"componentScroll " + style.availableColors}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div> */}
        </div>
    )
}

export default ProductDetails
