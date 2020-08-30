import SectionTitle from './sectionTitle'
import ProductCard from './section_productCard'
import style from './section.module.css'


function Section({title, productInfo}){
    return <div className={style.section}>
        <div className={style.sectionTitle}>
            <SectionTitle title={title}/>
        </div>
        <div className={style.componentScroll}>
            <ProductCard productInfo={productInfo} />
        </div>
    </div>
}

export default Section