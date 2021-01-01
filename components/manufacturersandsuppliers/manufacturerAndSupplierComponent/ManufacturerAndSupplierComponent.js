import {useState, useEffect} from 'react'
import SingleManufacturer from './SingleManufacturer/SingleManufacturer'

export default function ManufacturerAndSupplierComponent({fullWidth=false, companyInfo, activeSuppliers, baseURL}) {

    /*useEffect(()=>{
        console.log(activeSuppliers);
    }, [activeSuppliers])*/
    
    return (
        companyInfo[activeSuppliers].suppliers.map( (manufacturer, index) => (
            <span key={manufacturer.id}>
                <SingleManufacturer manufacturer={manufacturer} baseURL={baseURL} fullWidth={fullWidth} />
            </span>
        ))
    )
}
