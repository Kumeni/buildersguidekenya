import Head from 'next/head'
import Header from '../components/manufacturersandsuppliers/Header/Header'
import CategorySectionSlider from '../components/categorySectionSlider/CategorySectionSlider'
import style from '../components/searchPage/Search.module.css'
import SearchSection from '../components/searchPage/searchSection/SearchSection'
import ProductCard from '../components/categorySections/section_productCard'
import productInfo from '../server_data/hot_deals'
import TilesArticlesListing from '../components/tilesArticleListing/TilesArticleListing'
import ManufacturerAndSupplierComponent from '../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent'
import {useRouter} from 'next/router'
import {useEffect, useState, useRef} from 'react'
import Article from '../components/ArticlesComponent/Article/Article'

export default function Search() {

    const subCategories = [
        'All',
        'Manufacturers and Suppliers',
        'Tips and Advices',
        'Project Reviews'
    ];

    const [menuSelected, setMenuSelected] = useState("All");
    const router = useRouter()
    console.log(menuSelected);
    const refs = [
        {
            name:'All',
            reference:useRef()
        },
        {
            name:'Manufacturers and Suppliers',
            reference:useRef()
        },
        {
            name:'Tips and Advices',
            reference:useRef()
        },
        {
            name:'Project Reviews',
            reference:useRef()
        },
    ];

    function handleSearchLoad(){
        console.log('the page loaded');
    }
    useEffect(()=>{
        if(menuSelected){
            refs.map(ref => {
                if( menuSelected === ref.name){
                    menuSelected === 'Manufacturers and Suppliers'? ref.reference.current.style.display = 'grid': ref.reference.current.style.display = 'block';
                    //console.log(ref.reference.current + ' ' + menuSelected + ' is ' + ref.name);
                } else {
                    //console.log(ref.reference.current + ' ' + ref.name + 'is not selected');
                    ref.reference.current.style.display = 'none';
                }
            })
        }
    },[menuSelected])
    

    return (
            <div className={style.searchPage} onLoad={()=>{handleSearchLoad()}}>
                <Head>
                    {/* Global site tag (gtag.js) - Google Analytics */}
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8VYK6XCD9G"></script>

                    {/* FontAwesome icons */}
                    <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                    {/* FontAwesome icons */}
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                    integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                    crossorigin="anonymous" />

                    <title>Builders Guide Kenya</title>

                </Head>

                <Header title="Builders Guide Kenya" router={router} />
                <div className={style.categorySlider}>
                    {/* <CategorySectionSlider subCategories={subCategories} setMenuSelected={(menu) => setMenuSelected(menu)} menuSelected={menuSelected} /> */}
                </div>
                <main className={style.searchBody}>
                    <div ref={refs[0].reference} className={style.all}>
                        {/* <SearchSection title="Manufacturers and Suppliers" content={<ManufacturerAndSupplierComponent />} setMenuSelected={(menu) => setMenuSelected(menu)} />
                        <SearchSection title='Tips and Advices' content={<TilesArticlesListing />} setMenuSelected={(menu) => setMenuSelected(menu)}/>
                        <SearchSection title='Products' content={<ProductCard productInfo={productInfo} setMenuSelected={(menu) => setMenuSelected(menu)}/>}/>
                        <SearchSection title='Project Reviews' content={<TilesArticlesListing />} setMenuSelected={(menu) => setMenuSelected(menu)}/> */}
                    </div>
                    <div ref={refs[1].reference} className={style.components}>
                        {/* <ManufacturerAndSupplierComponent fullWidth={true} /> */}
                    </div>
                    <div ref={refs[2].reference} className={style.tipsAndAdvices}>
                        {/* <Article />
                        <Article />
                        <Article /> */}
                    </div>
                    <div ref={refs[3].reference} className={style.projectReviews}>
                        {/* <Article />
                        <Article />
                        <Article /> */}
                    </div>
                </main>
            </div>
    )
}
