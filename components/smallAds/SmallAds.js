import style from './SmallAds.module.css'
import ProductCard from '../categorySections/section_productCard'
import AdsTitle from './AdsTitle'

function SmallAds({productInfo}) {
    return (
        <div className={style.adsContainer}>
            <AdsTitle />
            <div className={'componentScroll'}>
                <ProductCard productInfo={productInfo}/>
            </div>
        </div>  
    )
}

export default SmallAds
