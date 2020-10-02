import Head from 'next/head'
import Header from '../components/manufacturersandsuppliers/Header/Header'
import ProductDetails from '../components/productpage/productDetails/ProductDetails'
import ProductImage from '../components/productpage/productImageContainer/ProductImage'
import productInfo from '../server_data/hot_deals'
import Section from '../components/categorySections/section'
import style from '../components/productpage/productpage.module.css'
import TrendingComponent from '../components/trendingComponent/trendingComponent'


function MaterialProductPage(){
    return (
        <div>
            <Head>
                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossorigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossorigin="anonymous" />

                <title>Product</title>
            </Head>
            <Header title='Product' />
            <div className={style.container}>
                <div className={style.ProductImage}>
                    <ProductImage />
                </div>
                <div className={style.productDetails}>
                    <ProductDetails />
                </div>
                <div className={style.callToAction}>
                    <button className={'btn-primary ' + style.addToCart}>Add to cart</button>
                    <button className={'btn-dark ' + style.addToCart}>Add to wishlist</button>
                    {/* <div className={style.sponsoredProduct}>
                        <div></div>
                        <span>sponsored product</span>
                    </div> */}
                </div>
            </div>
            <Section title={'Related products'} productInfo={productInfo} shadow={false} />
            <div className={style.productDescription}>
                <h5>Product Details</h5>
                <ul>
                    <li><strong>Product Dimensions</strong>: 124*34*44 mm</li>
                    <li><strong>Item model number</strong>: WE345K</li>
                    <li><strong>First Available on</strong>: Sept 13, 2020</li>
                    <li><strong>Manufacturer</strong>: Chem ltd</li>
                    <li><strong>Best sellers rank</strong>: #25</li>
                    <li><strong>Customer reviews</strong>:500</li>
                </ul>
            </div>
            <TrendingComponent title='Related Tips and Advices' isNotWide={false} />
        </div>
    )
}

export default MaterialProductPage
