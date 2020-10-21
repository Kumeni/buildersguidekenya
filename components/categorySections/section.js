import SectionTitle from './sectionTitle'
import ProductCard from './section_productCard'
import style from './section.module.css'


function Section({title, productInfo, shadow=true}, link=''){
    return <div className={shadow ? style.section_shadow : style.section_noshadow}>
        <div className={style.sectionTitle}>
            <SectionTitle title={title} link={link}/>
        </div>
        <div className={'componentScroll'}>
            <ProductCard productInfo={productInfo} />
        </div>
    </div>
}

export default Section