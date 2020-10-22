import style from './ArticleComponent.module.css'
import SectionTitle from '../categorySections/sectionTitle'
import CategorySectionSlider from '../categorySectionSlider/CategorySectionSlider'
import TilesArticleListing from '../tilesArticleListing/TilesArticleListing'
import {useState} from 'react'

function ArticleComponent({subCategories, link}) {
    const [menuSelected, setMenuSelected] = useState("All");
    //console.log(menuSelected);
    return (
        <div className={style.articleContainer}>
            <SectionTitle title='Tips and Advices' link={link} />
            <CategorySectionSlider 
                subCategories = {subCategories}
                setMenuSelected = {(menu)=>setMenuSelected(menu)}
                menuSelected={menuSelected} 
            />
            <div className={style.articleContentContainer + ' componentScroll'}>
                <TilesArticleListing />
            </div>
        </div>
    )
}

export default ArticleComponent
