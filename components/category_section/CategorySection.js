import React from 'react'
import style from './CategorySection.module.css'
import SectionTitle from '../categorySections/sectionTitle'
import CategorySectionSlider from '../categorySectionSlider/CategorySectionSlider'
import ProductCard from '../categorySections/section_productCard'

function CategorySection({title, productInfo, subCategories}) {
    return (
        <div className={style.categorySection}>
            <SectionTitle title={title} />
            <div className={style.categorySectionContent}>
                <CategorySectionSlider subCategories={subCategories} />
                <div className={style.categorySectionProducts + ' componentScroll'}>
                    <ProductCard productInfo={productInfo} />
                </div>
            </div>
        </div>
    )
}

export default CategorySection
