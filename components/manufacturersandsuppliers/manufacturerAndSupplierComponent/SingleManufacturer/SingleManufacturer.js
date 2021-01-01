import Link from 'next/link'
import style from '../ManufacturerAndSupplierComponent.module.css'
import axios from 'axios'
import {useState, useEffect} from 'react'

function SingleManufacturer({manufacturer, fullWidth, baseURL}) {

    const [companyLogo, setCompanyLogo] = useState(undefined);
    useEffect(()=>{
        axios.get(baseURL+'/company-logos?userId='+manufacturer.userId)
        .then(res=>{
            setCompanyLogo(res.data);
        })
        .catch(err=>{
            console.log(err.response);
        })
    }, [])

    useEffect(()=>{
        console.log(companyLogo);
    }, [companyLogo])
    return (
        <Link 
            key={manufacturer.id} 
            href={{
                pathname:"/manufacturersandsuppliers/manufacturerandsupplier",
                query:{
                    companyName:manufacturer.companyName,
                }
            }}
        >
            <div className={fullWidth? style.container_FullWidth : style.container}>
                <div className={fullWidth? style.imageContainer_FullWidth:style.imageContainer}>
                    <img 
                        src={companyLogo?companyLogo.length!==0?companyLogo[0].companyLogo.formats.medium?baseURL+companyLogo[0].companyLogo.formats.medium.url:baseURL+companyLogo[0].companyLogo.url:'/icons/bgkNoImage.jpg':'/icons/bgkNoImage.jpg'}
                        alt={companyLogo?companyLogo.length!==0?baseURL+companyLogo[0].companyLogo.hash:'/icons/bgkNoImage.jpg':'/icons/bgkNoImage.jpg'}
                    />
                </div>
                <div className={fullWidth? style.companyDetails_FullWidth : style.companyDetails}>
                    <p><span><i className={'fas fa-warehouse'}></i></span> <span className={style.companyName}>{manufacturer.companyName}</span></p>
                    <p><span><i className={'fas fa-map-marker-alt'}></i></span> {manufacturer.county+"/ "+manufacturer.constituency}</p>
                    {/* <p><span><i className={'fas fa-industry'}></i></span> {manufacturer.industry}</p> */}
                </div>
            </div>
        </Link>
    )
}

export default SingleManufacturer
