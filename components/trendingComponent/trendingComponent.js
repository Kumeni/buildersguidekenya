import style from './trendingComponent.module.css'
import SectionTitle from '../categorySections/sectionTitle'
import TilesArticleListing from '../tilesArticleListing/TilesArticleListing'
import {useState, useEffect} from 'react'

function TrendingComponent({title='Featured articles', isNotWide=true, articles}){
    if(articles){
        console.log(articles);
    } else {
        console.log(articles);
    }
    return<>
        <div className={isNotWide ? style.trendingContainer_notFull: style.trendingContainer_full}>
            <SectionTitle title={title} link={'/articles'} />
            <div className={'componentScroll ' + style.articleContainer}>
                <TilesArticleListing articles={articles} />
            </div>
        </div>
    </>
}

export default TrendingComponent
