import style from './SmallAds.module.css'
import ProductCard from '../categorySections/section_productCard'

function SmallAds({productInfo}) {
    return (
        <div className={style.adsContainer}>
            <div className={style.adsTitle}>
                <h3><span className={style.ads}>Ads-</span>Suggested for you</h3>
            </div>
            <div className={style.adsContent}>
                <ProductCard productInfo={productInfo}/>
            </div>
        </div>
        
    )
}

export default SmallAds
