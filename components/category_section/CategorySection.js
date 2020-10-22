import {useState, useCallback} from 'react'
import style from './CategorySection.module.css'
import SectionTitle from '../categorySections/sectionTitle'
import CategorySectionSlider from '../categorySectionSlider/CategorySectionSlider'
import ProductCard from '../categorySections/section_productCard'

function CategorySection(props) {
    const [menuSelected, setMenuSelected] = useState();
    //console.log(menuSelected);
    return (
        <div className={style.categorySection}>
            <SectionTitle title={props.title} link={props.link} />
            <div className={style.categorySectionContent}>
                <CategorySectionSlider 
                    subCategories={props.subCategories} 
                    name="manufacturersandsuppliers" 
                    setMenuSelected = {(menu)=>setMenuSelected(menu)}
                    menuSelected={menuSelected}
                />
                    <div className={style.categorySectionProducts + ' componentScroll'}>
                        {props.content}
                    </div>
            </div>
        </div>
    )
}

export default CategorySection
