import React, {useEffect, useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import style from './SearchResult.module.css'
import companyInfoComplete from '../../../utilities/CompanyInfoComplete'
import axios from 'axios'
import Link from 'next/link'

// import Swiper core and required modules
import SwiperCore, {
    Autoplay,Pagination,Navigation
  } from 'swiper/core';

SwiperCore.use([Autoplay,Pagination,Navigation]);

function SearchResult(props) {

    //console.log(props.index);
    const [supplierInformation, setSupplierInformation] = useState();
    const [product, setProduct] = useState();
    const [productPricing, setProductPricing] = useState();
    const [plantAndMachinerySale, setPlantAndMachinerySale] = useState();
    const [plantAndMachineryLease, setPlantAndMachineryLease] = useState();
    const [images, setImages] = useState([]);

    useEffect(()=>{
        //This code is for products
        if(props.counties!==undefined && props.constituencies!==undefined && product===undefined){
            setProduct(companyInfoComplete([].concat(props.result), props.counties, props.constituencies)[0]);
        }
        if(props.result.productName!==undefined){
            async function getProductPricing(){
                axios.get(props.baseURL+'/product-pricings?productId='+props.result.id)
                .then(res=>{
                    let pricing = '';
                    res.data.map((element, index)=>{
                        index == 0?pricing = pricing + 'Ksh. ' + element.unitPrice : pricing = pricing + ', Ksh. ' + element.unitPrice;
                    })
                    setProductPricing(pricing);
                })
                .catch(err=>{
                    console.log(err.response);
                })
                axios.get(props.baseURL+'/suppliers?userId='+props.result.supplierId)
                .then(res=>{
                    setSupplierInformation(res.data[0]);
                })

                axios.get(props.baseURL+'/product-images?productId='+props.result.id+'&approved=true&deleted=false&blocked=false')
                .then(res=>{
                    setImages(res.data);
                })
                .catch(err=>{
                    console.log(err.response);
                })
            }
            getProductPricing();
        } else if (props.result.vehicleType !== undefined){
            async function getProductPricing(){
                await axios.get(props.baseURL+'/transport-vehicle-images?vehicleId='+props.result.id+'&approved=true&deleted=false&blocked=false')
                    .then(res=>{
                        setImages(res.data);
                    })
                    .catch(err=>{
                        console.log(err.response);
                    })
                axios.get(props.baseURL+'/transporters?userId='+props.result.userId)
                    .then(res=>{
                        setSupplierInformation(res.data[0]);
                    })
                    .catch(err=>{
                        console.log(err.response);
                    })
            }
            getProductPricing();
        } else if (props.result.name != undefined){
            async function getProductPricing(){
                axios.get(props.baseURL+'/plant-and-machinery-images?plantAndMachineryId='+props.result.id+'&approved=true&deleted=false&blocked=false')
                .then(res=>{
                    setImages(res.data);
                })
                .catch(err=>{
                    console.log(err.response);
                })
                axios.get(props.baseURL+'/plant-and-machinery-sales?plantAndMachineryId='+props.result.id)
                .then(res=>{
                    if(res.data[0]){
                        setPlantAndMachinerySale(res.data[0]);
                    }
                })
                .catch(err=>{
                    console.log(err.response);
                })

                axios.get(props.baseURL+'/plant-and-machinery-leases?plantAndMachineryId='+props.result.id)
                .then(res=>{
                    if(res.data[0]){
                        setPlantAndMachineryLease(res.data[0]);
                    }
                })
                axios.get(props.baseURL+'/suppliers?userId='+props.result.userId)
                .then(res=>{
                    setSupplierInformation(res.data[0]);
                    return res;
                })
                .catch(err=>{
                    console.log(err.response);
                })
            }
            getProductPricing();
        } else if (props.result.companyName){
            axios.get(props.baseURL+"/company-logos?userId="+props.result.userId)
            .then(res=>{
                setImages(res.data);
            })
        }
        //This code is responsible for fetching product images
    }, [props.result, props.counties, props.constituencies])
    /*autoplay={{
        "delay":10000,
        "disableOnInteraction":false,
        "waitForTransition":true
    }}*/

    return (
        <div key={props.index} className={style.searchResult}>
            <div className={style.imageContainer}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={5}
                    pagination={{clickable:true}}
                    onSlideChange={()=>undefined}
                >
                    {
                        props.result.title?
                            <SwiperSlide>
                                <div className={style.imageContainer}>
                                    <img 
                                        src={props.baseURL+props.result.featuredImages.url}
                                        alt={props.result.featuredImages.hash}
                                    />
                                </div>
                            </SwiperSlide>
                        :props.result.productName?
                            images?
                                images.length > 0?
                                    images.map((element, index) => (
                                        <SwiperSlide>
                                            <div className={style.imageContainer}>
                                                <img
                                                    src={element?element.productImage.formats.medium?props.baseURL+element.productImage.formats.medium.url:props.baseURL+element.productImage.url:'/icons/bgkNoImage.jpg'}
                                                    alt={props.result.productDescription}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))
                                :
                                    <SwiperSlide>
                                        <div className={style.imageContainer}>
                                            <img 
                                                src={'/icons/bgkNoImage.jpg'}
                                                alt={'builders guide kenya logo'}
                                            />
                                        </div>
                                    </SwiperSlide>
                            :undefined
                        :props.result.vehicleType?
                            images.length==0?
                                <SwiperSlide>
                                    <div className={style.imageContainer}>
                                        <img 
                                            src={'/icons/bgkNoImage.jpg'}
                                            alt={'builders guide kenya logo'}
                                        />
                                    </div>
                                </SwiperSlide>
                            : images.map((element, index)=>(
                                <SwiperSlide>
                                    <div key={element.id} className={style.imageContainer}>
                                        <img 
                                            src={element?element.image.formats.medium?props.baseURL+element.image.formats.medium.url:props.baseURL+element.image.url:'/icons/bgkNoImage.jpg'}
                                            alt={props.result.description}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))
                        :props.result.name?
                            images.length==0?
                                <SwiperSlide>
                                    <div className={style.imageContainer}>
                                        <img 
                                            src={'/icons/bgkNoImage.jpg'}
                                            alt={'builders guide kenya logo'}
                                        />
                                    </div>
                                </SwiperSlide>
                            : images.map((element, index)=>(
                                <SwiperSlide>
                                    <div key={element.id} className={style.imageContainer}>
                                        <img 
                                            src={element?element.image.formats.medium?props.baseURL+element.image.formats.medium.url:props.baseURL+element.image.url:'/icons/bgkNoImage.jpg'}
                                            alt={props.result.description}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))
                        :props.result.companyName?
                            images.length==0?
                                <SwiperSlide>
                                    <div className={style.imageContainer}>
                                        <img 
                                            src={'/icons/bgkNoImage.jpg'}
                                            alt={'builders guide kenya logo'}
                                        />
                                    </div>
                                </SwiperSlide>
                            : images.map((element, index)=>(
                                <SwiperSlide>
                                    <div key={element.id} className={style.imageContainer}>
                                        <img 
                                            src={images?images.length!==0?images[0].companyLogo.formats.medium?props.baseURL+images[0].companyLogo.formats.medium.url:props.baseURL+images[0].companyLogo.url:'/icons/bgkNoImage.jpg':'/icons/bgkNoImage.jpg'} 
                                            alt={props.result.companyDescription}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))
                        :undefined
                    }
                </Swiper>
            </div>
            <div>
                {
                    props.result.title?
                        <div className={style.details}>
                            <Link href={{
                                pathname:"/tip-and-advice",
                                query:{
                                    title:props.result.title
                                }
                            }}>
                                <h3>{props.result.title}</h3>
                            </Link>
                            <p>{props.result.metaDescription}</p>
                            <span>By {props.result.admin_user.firstname+" "+props.result.admin_user.lastname}</span><br/>
                            <span>Updated: {Date(props.result.updated_at).toLocaleString()}</span>
                        </div>
                    :props.result.productName?
                        <div className={style.productDetails}>
                            <Link href={{
                                pathname:"/products-and-services/product-and-service",
                                query:{
                                    materialName:props.result.productName,
                                    materialId:props.result.id
                                }
                            }}>
                                <h3><span><i className={'fas fa-archive'}></i></span> {props.result.productName}</h3>
                            </Link>
                            <p><span><i className={'fas fa-tags'}></i></span> {productPricing}</p>
                            {
                                product?
                                    <p><span><i className={'fas fa-map-marker-alt'}></i></span>  {product!=undefined?product.county+' >> '+ product.constituency:''}</p>
                                :"..."
                            }
                            {
                                props.result.productDescription?
                                    <p>{props.result.productDescription}</p>
                                :"..."
                            }
                            {
                                supplierInformation!=undefined?
                                    supplierInformation.services != 1?
                                    supplierInformation.services == 2?(<h5 onClick={()=>handleSupplierClick()}>Supplier</h5>):
                                    (<h5 onClick={()=>handleSupplierClick()}>Manufacturer and supplier</h5>):
                                    (<h5 onClick={()=>handleSupplierClick()}>Manufacturer</h5>)
                                :undefined
                            }
                            {
                                supplierInformation!=undefined?
                                    <Link href={{
                                        pathname:"/manufacturersandsuppliers/manufacturerandsupplier",
                                        query:{
                                            companyName:supplierInformation.companyName
                                        }
                                    }}>
                                        {/* <h3><span><i className={'fas fa-warehouse'}></i></span> {props.result.companyName}</h3> */}
                                        <p><span><i className={'fas fa-warehouse'}></i></span> <b>{supplierInformation.companyName}</b></p>
                                    </Link>
                                    //<p><span><i className={'fas fa-warehouse'}></i></span> <b>{supplierInformation.companyName}</b></p>
                                :undefined
                            }
                        </div>
                    :props.result.vehicleType?
                        <div className={style.productDetails}>
                            <Link href={{
                                pathname:"/transport-vehicles/transport-vehicle",
                                query:{
                                    vehicleName:props.result.description,
                                    vehicleId:props.result.id
                                }
                            }}>
                                <h3><span><i className={'fas fa-truck'}></i></span> {props.result.description}</h3>
                            </Link>
                            <p><span><i className={'fas fa-tags'}></i></span> {props.result.amount!= undefined?"Averagely Ksh. "+props.result.amount+" for "+props.result.distance+" km(s)":'Contact owner'}</p>
                            {
                                product!=undefined?
                                    <p><span><i className={'fas fa-map-marker-alt'}></i></span> {product.county+" >> "+product.constituency}</p>
                                :"..."
                            }
                            {
                                props.result.additionalDescription?
                                    <p>{props.result.additionalDescription}</p>
                                :undefined
                            }
                            
                            {
                                supplierInformation!=undefined?
                                    <h5>Dealer</h5>
                                :undefined
                            }   
                            {
                                supplierInformation!=undefined?
                                    <p><span className={style.companyName}><span><i className={'fas fa-warehouse'}></i></span> <b> {supplierInformation?supplierInformation.name:undefined}</b></span></p>
                                :"..."
                            }   
                        </div>
                    :props.result.name?
                        <div className={style.productDetails}>
                            <Link href={{
                                pathname:"/plants-and-machineries/plant-and-machinery",
                                query:{
                                    plantAndMachineryName:props.result.name,
                                    plantAndMachineryId:props.result.id
                                }
                            }}>
                                <h3><span><i className={'fas fa-truck-monster'}></i></span> {props.result.name}</h3>
                            </Link>
                            {
                                plantAndMachineryLease||plantAndMachinerySale?
                                    // <div className={style.companyDescriptionCopy}>
                                        //{/* <h6><span><i className={'fas fa-tag'}></i></span> Plant and/or Machinery Pricing</h6> */}
                                        <p><span>
                                            <span><i className={'fas fa-tag'}></i></span> 
                                                {plantAndMachinerySale?" Sold at Ksh. "+plantAndMachinerySale.sellingPrice:undefined}
                                                {plantAndMachinerySale&&plantAndMachineryLease?" and":undefined}
                                                {plantAndMachineryLease?" Leased at Ksh. "+plantAndMachineryLease.amount+" per "+plantAndMachineryLease.period:undefined}
                                            </span>
                                        </p>
                                    //</div>
                                :undefined
                            }
                            {
                                product!=undefined?
                                    <p><span><i className={'fas fa-map-marker-alt'}></i></span> {product.county+" >> "+product.constituency}</p>
                                :undefined
                            }
                            <p>{props.result.additionalDescription}</p>
                            {
                                supplierInformation!=undefined?
                                    <h5>Dealer</h5>
                                :undefined
                            }   
                            {
                                supplierInformation!=undefined?
                                    <Link href={{
                                        pathname:"/manufacturersandsuppliers/manufacturerandsupplier",
                                        query:{
                                            companyName:supplierInformation.companyName
                                        }
                                    }}>
                                        {/* <h3><span><i className={'fas fa-warehouse'}></i></span> {props.result.companyName}</h3> */}
                                        <p><span className={style.companyName}><span><i className={'fas fa-warehouse'}></i></span> <b> {supplierInformation?supplierInformation.companyName:undefined}</b></span></p>
                                    </Link>
                                    // <p><span className={style.companyName}><span><i className={'fas fa-warehouse'}></i></span> <b> {supplierInformation?supplierInformation.companyName:undefined}</b></span></p>
                                :"..."
                            }   
                        </div>
                    :props.result.companyName?
                        <div className={style.productDetails}>
                            <Link href={{
                                pathname:"/manufacturersandsuppliers/manufacturerandsupplier",
                                query:{
                                    companyName:props.result.companyName
                                }
                            }}>
                                <h3><span><i className={'fas fa-warehouse'}></i></span> {props.result.companyName}</h3>
                            </Link>
                            {
                                product!=undefined?
                                    <p><span><i className={'fas fa-map-marker-alt'}></i></span> {product.county+" >> "+product.constituency}</p>
                                :undefined
                            }
                            <div>
                                <h6>Company  Description</h6>
                                {
                                    props.result.companyDescription?
                                        <p>{props.result.companyDescription}</p>
                                    :"..."
                                }
                            </div>
                        </div>
                    :undefined
                }
            </div>
        </div>
    )
}

export default SearchResult
