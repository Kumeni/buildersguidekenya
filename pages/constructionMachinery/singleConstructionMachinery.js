import Head from 'next/head'
import Header from '../../components/manufacturersandsuppliers/Header/Header'
import style from '../../components/ConstructionMachinery/singleConstructionMachinery/singleConstructionMachinery.module.css'
import SectionTitle from '../../components/categorySections/sectionTitle'
import ManufacturerAndSupplierComponent from '../../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent'
import SwiperCore, {Pagination, Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import TilesArticleListing from '../../components/tilesArticleListing/TilesArticleListing'
import ConstructionMachinery from '../../components/ConstructionMachinery/ConstructionMachineryComponent/ConstructionMachinery'

SwiperCore.use([Navigation, Pagination]);
export default function index() {
    return (
        <div>
            <Head>
                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossorigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossorigin="anonymous" />

                <meta rel="icon" src="/images/buildersguidekenyalogo.png" type='image/png'/>

                <title>Manufacturer and Supplier</title>
            </Head>
            <Header title="Construction Machinery"/>
            <main className={style.body}>
                <div className={style.company}>
                    <div>
                        <Swiper
                            slidesPerView={1}
                            pagination={{clickable:true}}
                            navigation
                        >
                            <SwiperSlide><div className={style.companyImages}><img src="/images/Tonys-Farm-by-Playze.jpg" alt='image' /></div></SwiperSlide>
                            <SwiperSlide><div className={style.companyImages}><img src="/images/Tonys-Farm-by-Playze.jpg" alt='image' /></div></SwiperSlide>
                            <SwiperSlide><div className={style.companyImages}><img src="/images/Tonys-Farm-by-Playze.jpg" alt='image' /></div></SwiperSlide>
                        </Swiper>
                    </div>
                    <div>
                        <div className={style.companyDetails}>
                            <p><span><i className={'fas fa-truck-monster'}></i></span>  Crane</p>
                            <p><span><i className={'fas fa-tag'}></i></span>  Ksh. 90,000/hr</p>
                            <p><span><i className={'fas fa-map-marker-alt'}></i></span> Nairobi/ Langata</p>
                            <p><span><i className={'fas fa-map-marker-alt'}></i></span> Manufacturer</p>
                            <p><span><i className={'fas fa-phone'}></i></span> +2547 17 551542 || 020 000 0000</p>
                            <p><span><i className={'far fa-envelope'}></i></span> mail@companywebsite.com</p>
                            <p><span><i className={'fas fa-globe-africa'}></i></span> companywebsite</p>
                            <p><span><i className={'fas fa-industry'}></i></span> Cranes and hoists</p>
                        </div>
                    </div>
                </div>
                <div className={style.companyDescriptionCopy}>
                    <h6>Machinery Description</h6>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices congue arcu, nec aliquam libero commodo a. In hendrerit lorem sit amet odio lobortis bibendum. Integer eget ante molestie metus molestie molestie.
                    </p>
                </div>
                <div className={style.moreLikeThis}>
                    <SectionTitle title="More Like this"/>
                    <div className={'componentScroll'}>
                        <ConstructionMachinery />
                    </div>
                </div>
                
                <div className={style.moreLikeThis}>
                    <SectionTitle title="related.Tips and Advices" />
                    <div className={'componentScroll'}>
                        <TilesArticleListing />

                    </div>
                </div>
            </main>
        </div>
    )
}
