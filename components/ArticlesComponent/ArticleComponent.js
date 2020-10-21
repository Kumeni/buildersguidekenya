import style from './ArticleComponent.module.css'
import SectionTitle from '../categorySections/sectionTitle'
import CategorySectionSlider from '../categorySectionSlider/CategorySectionSlider'
import TilesArticleListing from '../tilesArticleListing/TilesArticleListing'

function ArticleComponent({subCategories, link, }) {
    return (
        <div className={style.articleContainer}>
            <SectionTitle title='Tips and Advices' link={link} />
            <CategorySectionSlider subCategories = {subCategories} />
            <div className={style.articleContentContainer + ' componentScroll'}>
                <TilesArticleListing />
            </div>
        </div>
    )
}

export default ArticleComponent
