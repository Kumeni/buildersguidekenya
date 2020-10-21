import React from 'react'
import titleData from '../../server_data/Articles'
import style from './TilesArticleListing.module.css'
import Link from 'next/link'

export default function TilesArticleListing() {
    return (
            titleData.map((article) => (
                <Link href={{
                    pathname:'/article',
                    query:{
                        article:article.title
                    }
                }}>
                    <div className={style.article}>
                        <div className={style.featuredImageContainer}>
                            <img className={style.featuredImage} src={article.src} alt={article.alt} />
                        </div>
                        <div className={style.articleContent}>
                            <h6 className={style.articleTitle}>{article.title}</h6>
                        </div>
                    </div>
                </Link>
            ))  
    )
}
