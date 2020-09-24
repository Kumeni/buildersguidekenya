import style from './articleComponent.module.css'
import SectionTitle from '../categorySections/sectionTitle'
import CategorySectionSlider from '../categorySectionSlider/CategorySectionSlider'

function ArticleComponent({subCategories}) {
    return (
        <div className={style.articleContainer}>
            <SectionTitle title='Tips and Advices' />
            <CategorySectionSlider subCategories = {subCategories} />
            <div className={style.articleContentContainer}>
                <div className={style.article}>
                    <div className={style.featuredImageContainer}>
                        <img className={style.featuredImage} src='/images/unique house design.jpg' alt='unique house design' />
                    </div>
                    <div className={style.articleContent}>
                        <h6 className={style.articleTitle}>
                            How to build your dream home in Kenya
                        </h6>
                        <p>by Juliet Moso</p>
                    </div>
                </div>
                <div className={style.article}>
                    <div className={style.featuredImageContainer}>
                        <img className={style.featuredImage} src='/images/unique house design.jpg' alt='unique house design' />
                    </div>
                    <div className={style.articleContent}>
                        <h6 className={style.articleTitle}>
                            How to build your dream home in Kenya
                        </h6>
                        <p>by Juliet Moso</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleComponent
