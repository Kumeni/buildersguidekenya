import {useState, useEffect} from 'react'
import SingleManufacturer from './SingleManufacturer/SingleManufacturer'

export default function ManufacturerAndSupplierComponent({fullWidth=false, companyInfo, productInfo, constructionMachineryInfo, vehiclesInfo, activeSuppliers, baseURL}) {

    /*useEffect(()=>{
        console.log(activeSuppliers);
    }, [activeSuppliers])*/
    
    return (
        <>
            {
                companyInfo?
                    companyInfo[activeSuppliers].suppliers.map( (manufacturer, index) => (
                        <span key={manufacturer.id}>
                            <SingleManufacturer 
                                manufacturer={manufacturer} 
                                baseURL={baseURL} 
                                fullWidth={fullWidth} />
                        </span>
                    ))
                :productInfo?
                    productInfo[activeSuppliers].suppliers.map( (product, index) => (
                        <span key={product.id}>
                            <SingleManufacturer 
                                product={product} 
                                baseURL={baseURL} 
                                fullWidth={fullWidth} />
                        </span>
                    ))
                :constructionMachineryInfo?
                    constructionMachineryInfo[activeSuppliers].suppliers.map( (constructionMachinery, index) => (
                        <span key={constructionMachinery.id}>
                            <SingleManufacturer 
                                constructionMachinery={constructionMachinery} 
                                baseURL={baseURL} 
                                fullWidth={fullWidth} />
                        </span>
                    ))
                :vehiclesInfo?
                    vehiclesInfo[activeSuppliers].suppliers.map( (vehicle, index) => (
                        <span key={vehicle.id}>
                            <SingleManufacturer 
                                vehicle={vehicle} 
                                baseURL={baseURL} 
                                fullWidth={fullWidth} />
                        </span>
                    ))
                :undefined
            }
        </>
    )
}
