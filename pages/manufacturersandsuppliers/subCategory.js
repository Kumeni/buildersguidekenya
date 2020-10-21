import React from 'react'
import style from '../../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/subCategory/SubCategory.module.css'
import ManufacturerAndSupplierComponent from '../../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent'
import CategorySectionSlider from '../../components/categorySectionSlider/CategorySectionSlider'
import Header from '../../components/manufacturersandsuppliers/Header/Header'
import Head from 'next/head'

export default function subCategory() {
    return (
        <div>
            <Head>
                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossorigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossorigin="anonymous" />

                <title>Aggregates and Quarrying</title>
            </Head>
            <Header title={'Aggregates and Quarrying'} />
            <div className={style.categorySlider}>
                <CategorySectionSlider subCategories={["All", "Ballast", "Sand", "Gravel"]}/>
            </div>
            <div className={style.components}>
                <ManufacturerAndSupplierComponent fullWidth={true}/>
                <ManufacturerAndSupplierComponent fullWidth={true} />
            </div>
        </div>
    )
}
