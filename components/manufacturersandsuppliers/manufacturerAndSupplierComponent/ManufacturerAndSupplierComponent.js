import Link from 'next/link'
import style from './ManufacturerAndSupplierComponent.module.css'
import ManufacturerInfo from '../../../server_data/manufacturerandsupplier'

export default function ManufacturerAndSupplierComponent({fullWidth=false}) {

    return (
        ManufacturerInfo.map( (manufacturer, index) => (
            <Link key={index} href="/constructionMachinery/singleConstructionMachinery">
                <div className={fullWidth? style.container_FullWidth : style.container}>
                    <div className={fullWidth? style.imageContainer_FullWidth: style.imageContainer}>
                        <img src='/images/mock_images/plants and machinary/generators and motors/download.jpg'/>
                    </div>
                    <div className={fullWidth? style.companyDetails_FullWidth : style.companyDetails}>
                        <p><span><i className={'fas fa-warehouse'}></i></span> {manufacturer.name}</p>
                        <p><span><i className={'fas fa-map-marker-alt'}></i></span> {manufacturer.location}</p>
                        {/* <p><span><i className={'fas fa-industry'}></i></span> {manufacturer.industry}</p> */}
                    </div>
                </div>
            </Link>
        ))
    )
}
