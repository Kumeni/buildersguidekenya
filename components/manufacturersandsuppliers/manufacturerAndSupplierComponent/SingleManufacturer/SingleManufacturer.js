import Link from 'next/link'
import style from '../ManufacturerAndSupplierComponent.module.css'
import axios from 'axios'
import {useState, useEffect} from 'react'

function SingleManufacturer(props) {

    const [companyLogo, setCompanyLogo] = useState(undefined);
    const [productImage, setProductImage] = useState(undefined);
    const [productPricing, setProductPricing] = useState(undefined);
    const [vehicleInfo, setVehicleInfo] = useState();

    useEffect(()=>{
        if(props.manufacturer){
            axios.get(props.baseURL+'/company-logos?userId='+props.manufacturer.userId)
            .then(res=>{
                setCompanyLogo(res.data);
            })
            .catch(err=>{
                console.log(err.response);
            })
        } else if(props.product){
            axios.get(props.baseURL+'/product-images?approved=true&blocked=false&deleted=false&productId='+props.product.id+'&_limit=1')
            .then(res=>{
                setProductImage(res.data);
            })
            .catch(err=>{
                console.log(err.response);
            })

            axios.get(props.baseURL+'/product-pricings?productId='+props.product.id)
            .then(res=>{
                let pricing = '';
                res.data.map((element, index)=>{
                    index == 0?pricing = pricing + 'Ksh. ' + element.unitPrice : pricing = pricing + ', Ksh. ' + element.unitPrice;
                    //console.log(index);
                    //console.log(pricing);
                })
                setProductPricing(pricing);
            })
            .catch(err=>{
                console.log(err.response);
            })
        } else if(props.constructionMachinery){
            axios.get(props.baseURL+'/plant-and-machinery-images?approved=true&blocked=false&deleted=false&plantAndMachineryId='+props.constructionMachinery.id+'&_limit=1')
            .then(res=>{
                setProductImage(res.data);
            })
            .catch(err=>{
                console.log(err.response);
            })
            
            axios.get(props.baseURL+'/plant-and-machinery-sales?_limit=1&deleted=false&plantAndMachineryId='+props.constructionMachinery.id)
            .then(res=>{
                let pricing = '';
                if(res.data.length>0){
                    pricing="Sold at Ksh."+res.data[0].sellingPrice+" ";
                }
                axios.get(props.baseURL+'/plant-and-machinery-leases?_limit=1&deleted=false&plantAndMachineryId='+props.constructionMachinery.id)
                .then(res=>{
                    if(res.data.length>0){
                        pricing="Leased at Ksh. "+res.data[0].amount+" for "+ res.data[0].period;
                    }
                })
                setProductPricing(pricing);
            })
            .catch(err=>{
                console.log(err.response);
            })
        } else if(props.vehicle){
            axios.get(props.baseURL+'/transport-vehicle-images?approved=true&blocked=false&deleted=false&vehicleId='+props.vehicle.id+'&_limit=1')
            .then(res=>{
                setProductImage(res.data);
            })
            .catch(err=>{
                console.log(err.response);
            })
        }
    }, [])
    // useEffect(()=>{
    //     console.log(companyLogo);
    // }, [companyLogo])

    // useEffect(()=>{
    //     console.log(productImage);
    // }, [productImage])

    // useEffect(()=>{
    //     console.log(productPricing);
    // }, [productPricing])
    
    return (
        <>
            {
                props.manufacturer?
                    <Link
                        key={props.manufacturer.id}
                        href={{
                            pathname:"/manufacturersandsuppliers/manufacturerandsupplier",
                            query:{
                                companyName:props.manufacturer.companyName,
                            }
                        }}
                    >
                        <div className={props.fullWidth? style.container_FullWidth : style.container}>
                            <div className={props.fullWidth? style.imageContainer_FullWidth:style.imageContainer}>
                                <img 
                                    src={companyLogo?companyLogo.length!==0?companyLogo[0].companyLogo.formats.medium?props.baseURL+companyLogo[0].companyLogo.formats.medium.url:props.baseURL+companyLogo[0].companyLogo.url:'/icons/bgkNoImage.jpg':'/icons/bgkNoImage.jpg'}
                                    alt={companyLogo?companyLogo.length!==0?props.baseURL+companyLogo[0].companyLogo.hash:'/icons/bgkNoImage.jpg':'/icons/bgkNoImage.jpg'}
                                />
                            </div>
                            <div className={props.fullWidth? style.companyDetails_FullWidth : style.companyDetails}>
                                <p><span><i className={'fas fa-warehouse'}></i></span> <span className={style.companyName}>{props.manufacturer.companyName}</span></p>
                                <p><span><i className={'fas fa-map-marker-alt'}></i></span> {props.manufacturer.county+"/ "+props.manufacturer.constituency}</p>
                                {/* <p><span><i className={'fas fa-industry'}></i></span> {manufacturer.industry}</p> */}
                            </div>
                        </div>
                    </Link>
                :undefined

            }
            {
                props.product?
                    <Link
                        key={props.product.id}
                        href={{
                            pathname:"/products-and-services/product-and-service",
                            query:{
                                materialName:props.product.productName,
                                materialId:props.product.id
                            }
                        }}
                    >
                        <div className={props.fullWidth? style.container_FullWidth : style.container}>
                            <div className={props.fullWidth? style.imageContainer_FullWidth:style.imageContainer}>
                                <img
                                    src={productImage?productImage.length!==0?productImage[0].productImage.formats.medium?props.baseURL+productImage[0].productImage.formats.medium.url:props.baseURL+productImage[0].productImage.url:'/icons/bgkNoImage.jpg':'/icons/bgkNoImage.jpg'}
                                    alt={props.product.productDescription}
                                />
                            </div>
                            <div className={props.fullWidth? style.companyDetails_FullWidth : style.companyDetails}>
                                <p><span><i className={'fas fa-archive'}></i></span> <span className={style.companyName}>{props.product.productName}</span></p>
                                <p><span><i className={'fas fa-tags'}></i></span> {productPricing!== undefined?productPricing!==''?productPricing:'Contact seller':'Loading...'}</p>
                                <p><span><i className={'fas fa-map-marker-alt'}></i></span> {props.product.county+"/ "+props.product.constituency}</p>
                            </div>
                        </div>
                    </Link>
                :undefined
            }
            {
                props.constructionMachinery?
                    <Link
                        key={props.constructionMachinery.id}
                        href={{
                            pathname:"/plants-and-machineries/plant-and-machinery",
                            query:{
                                plantAndMachineryName:props.constructionMachinery.name,
                                plantAndMachineryId:props.constructionMachinery.id
                            }
                        }}
                    >
                        <div className={props.fullWidth? style.container_FullWidth : style.container}>
                            <div className={props.fullWidth? style.imageContainer_FullWidth:style.imageContainer}>
                                <img
                                    src={productImage?productImage.length!==0?productImage[0].image.formats.medium?props.baseURL+productImage[0].image.formats.medium.url:props.baseURL+productImage[0].image.url:'/icons/bgkNoImage.jpg':'/icons/bgkNoImage.jpg'}
                                    alt={props.constructionMachinery.description}
                                />
                            </div>
                            <div className={props.fullWidth? style.companyDetails_FullWidth : style.companyDetails}>
                                <p><span><i className={'fas fa-truck-monster'}></i></span> <span className={style.companyName}>{props.constructionMachinery.name}</span></p>
                                <p><span><i className={'fas fa-tags'}></i></span> {productPricing!== undefined?productPricing!==''?productPricing:'Contact seller':'Loading...'}</p>
                                <p><span><i className={'fas fa-map-marker-alt'}></i></span> {props.constructionMachinery.county+"/ "+props.constructionMachinery.constituency}</p>
                            </div>
                        </div>
                    </Link>
                :props.vehicle?
                    <Link
                        key={props.vehicle.id}
                        href={{
                            pathname:"/transport-vehicles/transport-vehicle",
                            query:{
                                vehicleName:props.vehicle.description,
                                vehicleId:props.vehicle.id
                            }
                        }}
                    >
                        <div className={props.fullWidth? style.container_FullWidth : style.container}>
                            <div className={props.fullWidth? style.imageContainer_FullWidth:style.imageContainer}>
                                <img
                                    src={productImage?productImage.length!==0?productImage[0].image.formats.medium?props.baseURL+productImage[0].image.formats.medium.url:props.baseURL+productImage[0].image.url:'/icons/bgkNoImage.jpg':'/icons/bgkNoImage.jpg'}
                                    alt={props.vehicle.description}
                                />
                            </div>
                            <div className={props.fullWidth? style.companyDetails_FullWidth : style.companyDetails}>
                                <p><span><i className={'fas fa-truck'}></i></span> <span className={style.companyName}>{props.vehicle.description}</span></p>
                                <p><span><i className={'fas fa-tags'}></i></span> {props.vehicle.amount!= undefined?"Ksh. "+props.vehicle.amount+" for "+props.vehicle.distance+" km(s)":'Contact owner'}</p>
                                <p><span><i className={'fas fa-map-marker-alt'}></i></span> {props.vehicle.county+"/ "+props.vehicle.constituency}</p>
                            </div>
                        </div>
                    </Link>
                :undefined
            }
        </>
    )
}

export default SingleManufacturer
