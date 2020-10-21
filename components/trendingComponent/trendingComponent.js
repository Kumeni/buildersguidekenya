import style from './trendingComponent.module.css'
import SectionTitle from '../categorySections/sectionTitle'
import TilesArticleListing from '../tilesArticleListing/TilesArticleListing'

function TrendingComponent({title='Featured articles', isNotWide=true}){
    return<>
        <div className={isNotWide ? style.trendingContainer_notFull: style.trendingContainer_full}>
            <SectionTitle title={title} link={'/articles'} />
            <div className={'componentScroll ' + style.articleContainer}>
                <TilesArticleListing />
            </div>
        </div>
    </>
}

export default TrendingComponent
