import React, {useState, useEffect} from 'react'
import style from './TilesArticleListing.module.css'
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function TilesArticleListing(props) {

    const router = useRouter();

    const [ellipsis, setEllipsis] = useState('');

    useEffect(()=>{
        if(props.articleTitle){
            props.articleTitle.length >= 40 ? setEllipsis("...") : setEllipsis("");
        }
    })
    return (
        props.actualTitle?
                <Link
                    href={{
                        pathname:"/tip-and-advice",
                        query:{
                            title:props.actualTitle?props.actualTitle:'',
                        }
                    }}
                    scroll={true}
                >
                <div className={style.article}>
                    <div className={style.featuredImageContainer}>
                        <img className={style.featuredImage} src={props.featuredImage?props.baseURL+props.featuredImage:""} alt={props.imageTitle?props.imageTitle:""} />
                    </div>
                    <div className={style.articleContent}>
                        <h6 onLoad={()=>handleTitleLoad()} className={style.articleTitle}>{props.articleTitle?props.actualTitle.slice(0,40):""}{ellipsis}</h6>
                    </div>
                </div>
                </Link>
        :""
    )
}
