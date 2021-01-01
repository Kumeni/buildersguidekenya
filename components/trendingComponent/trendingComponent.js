import style from './trendingComponent.module.css'
import SectionTitle from '../categorySections/sectionTitle'
import TilesArticleListing from '../tilesArticleListing/TilesArticleListing'
import {useState, useEffect} from 'react'

function TrendingComponent({title='Featured articles', isNotWide=true, articles, baseURL}){

    const [updatedArticles, setUpdatedArticles] = useState('');
    
    return<>
        <div className={isNotWide ? style.trendingContainer_notFull: style.trendingContainer_full}>
            <SectionTitle title={title} link={'/articles'} />
            <div className={'componentScroll ' + style.articleContainer}>
                {
                    articles?
                    articles.map((element, index)=>(
                        <span key={index}>
                            <TilesArticleListing baseURL={baseURL} articleId={articles?element.id:""} featuredImage={element.featuredImages.url} articleTitle={element.title} actualTitle={articles?articles[index].title:undefined} imageTitle={element.featuredImages.name}  propKey={element.title+element.id}/>
                        </span>
                    ))
                    :""
                }
            </div>
        </div>
    </>
}

export default TrendingComponent
