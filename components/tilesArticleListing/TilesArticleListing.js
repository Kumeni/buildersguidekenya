import React from 'react'
import titleData from '../../server_data/Articles'
import style from './TilesArticleListing.module.css'
import Link from 'next/link'
import {useState} from 'react'

export default function TilesArticleListing(props) {

    return (
        <div>
            <Link href={{
                pathname:'/article',
                query:{
                    article:props.title
                }
            }}>
                <a key={props.key}>
                    <div className={style.article}>
                        <div className={style.featuredImageContainer}>
                            <img className={style.featuredImage} src={props.featuredImages.formats.small.url} alt={article.featuredImages.formats.small.hash} />
                        </div>
                        <div className={style.articleContent}>
                            <h6 className={style.articleTitle}>{props.title}</h6>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}
