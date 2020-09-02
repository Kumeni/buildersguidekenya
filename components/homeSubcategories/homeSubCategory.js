import style from './homeSubCategory.module.css'
import SectionTitle from '../categorySections/sectionTitle'
function HomeSubCategory(){
    return<div className={style.homeSubCategory}>

        <SectionTitle title='Agregates and Quarry Products' />
        <div className={style.subSection}>
            <div className={style.guidePrice}>
                <h5 className={style.subTitle}>Product guide prices</h5>
                <div className={style.priceGuideContainer}>
                    <div className={style.productContainer}>
                        <div className={style.productImageContainer}>
                            <img className={style.productImage} src='/images/mock_images/materials and services/ballast/download.jpg' alt='ballast' />
                        </div>
                        <div className={style.productDetails}>
                            <p className={style.productTitle}>Fuse HR 2455699 carbon core</p>
                            <p className={style.averagePrice}>Price: Ksh. 200 - 500</p>
                            <p className={style.location}>Nairobi</p>
                            <p className={style.manufacturer}>Manufacturer: Sam tech</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.tipsAndAdvices}>
                <h5 className={style.subTitle}>Tips and advices</h5>
                <div className={style.articleContainer}>
                    <p className={style.productTitle}>Why cement cracks when it is laid on the floor</p>
                    <p className={style.metadata}>
                        Are you tired of always having to deal with 
                        explaining to your clients on why the wall cracked
                        but you just made the house yesterday ...
                    </p>
                </div>
            </div>
        </div>
    </div>
}

export default HomeSubCategory