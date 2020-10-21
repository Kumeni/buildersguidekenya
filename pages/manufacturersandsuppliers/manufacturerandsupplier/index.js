import Head from 'next/head'
import Header from '../../../components/manufacturersandsuppliers/Header/Header'
import style from '../../../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/subCategory/ManufacturerAndSupplier.module.css'
import SectionTitle from '../../../components/categorySections/sectionTitle'
import ManufacturerAndSupplierComponent from '../../../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent'
import SwiperCore, {Pagination, Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import TilesArticleListing from '../../../components/tilesArticleListing/TilesArticleListing'

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
            <Header title="Manufacturer and Supplier"/>
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
                            <p><span><i className={'fas fa-warehouse'}></i></span>  Mary and Sisters Mary and Sisters Mary and Sisters Mary and Sisters</p>
                            <p><span><i className={'fas fa-map-marker-alt'}></i></span> Nairobi/ Langata</p>
                            <p><span><i className={'fas fa-phone'}></i></span> +2547 17 551542 || 020 000 0000</p>
                            <p><span><i className={'far fa-envelope'}></i></span> mail@companywebsite.com</p>
                            <p><span><i className={'fas fa-globe-africa'}></i></span> Website: companywebsite</p>
                            <p><span><i className={'fas fa-industry'}></i></span> Aggregates and Quarrying</p>
                        </div>
                        <div className={style.companyDescription}>
                            <h6>Company  Description</h6>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices congue arcu, nec aliquam libero commodo a. In hendrerit lorem sit amet odio lobortis bibendum. Integer eget ante molestie metus molestie molestie.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={style.companyDescriptionCopy}>
                    <h6>Company  Description</h6>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices congue arcu, nec aliquam libero commodo a. In hendrerit lorem sit amet odio lobortis bibendum. Integer eget ante molestie metus molestie molestie.
                    </p>
                </div>
                <div className={style.moreLikeThis}>
                    <SectionTitle title="More Like this"/>
                    <div className={'componentScroll'}>
                        <ManufacturerAndSupplierComponent />
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
