import style from './trendingComponent.module.css'
import SectionTitle from '../categorySections/sectionTitle'

function TrendingComponent({title='Featured articles', isNotWide=true}){
    return<>
        <div className={isNotWide ? style.trendingContainer_notFull: style.trendingContainer_full}>
            <SectionTitle title={title}/>
            <div className={'componentScroll ' + style.articleContainer}>
                <div className={style.article}>
                    <div className={style.featuredImageContainer}>
                        <img className={style.featuredImage} src='/images/unique house design.jpg' alt='unique house design' />
                    </div>
                    <div className={style.articleContent}>
                        <h6 className={style.articleTitle}>
                            How to build your dream home in Kenya
                        </h6>
                    </div>
                </div>
                <div className={style.article}>
                    <div className={style.featuredImageContainer}>
                        <img className={style.featuredImage} src='/images/Glass-Graham-House-by-E.-Cobb-Architects-900x751.jpg' alt='Glass-Graham-House-by-E.-Cobb-Architects-900x751' />
                    </div>
                    <div className={style.articleContent}>
                        <h6 className={style.articleTitle}>
                            Find an architect to build your dream house
                        </h6>
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
                    </div>
                </div>
                <div className={style.article}>
                    <div className={style.featuredImageContainer}>
                        <img className={style.featuredImage} src='/images/Glass-Graham-House-by-E.-Cobb-Architects-900x751.jpg' alt='Glass-Graham-House-by-E.-Cobb-Architects-900x751' />
                    </div>
                    <div className={style.articleContent}>
                        <h5 className={style.articleTitle}>
                            Find an architect to build your dream house
                        </h5>
                    </div>
                </div>
                <div className={style.article}>
                    <div className={style.featuredImageContainer}>
                        <img className={style.featuredImage} src='/images/unique house design.jpg' alt='unique house design' />
                    </div>
                    <div className={style.articleContent}>
                        <h5 className={style.articleTitle}>
                            How to build your dream home in Kenya
                        </h5>
                    </div>
                </div>
                <div className={style.article}>
                    <div className={style.featuredImageContainer}>
                        <img className={style.featuredImage} src='/images/Glass-Graham-House-by-E.-Cobb-Architects-900x751.jpg' alt='Glass-Graham-House-by-E.-Cobb-Architects-900x751' />
                    </div>
                    <div className={style.articleContent}>
                        <h5 className={style.articleTitle}>
                            Find an architect to build your dream house
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default TrendingComponent
