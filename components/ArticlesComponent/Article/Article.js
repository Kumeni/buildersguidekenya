import style from './Article.module.css'
import Link from 'next/link'
import {useState, useEffect} from 'react'

export default function Article(props) {

    const [published_at, setPublishedAt] = useState(undefined);

    useEffect(()=>{
        let date = new Date(props.article.published_at);
        //console.log(date);
        setPublishedAt(date);
    }, [props.article])
    return (
        <Link 
            href={{
                pathname:"/tip-and-advice",
                query:{
                    title:props.article?props.article.title:undefined
                }
            }}
            scroll={true}
        >
            {
                props.article?
                <div className={style.container}>
                <div className={style.articleContent}>
                    <div>
                        <h4>{props.article?props.article.title:''}</h4>
                    </div>
                    <p>{props.article?props.article.metaDescription:''}</p>
                    <span>by {props.article?props.article.admin_user.firstname + ' ' +props.article.admin_user.lastname:''}</span>
                    <span>{published_at?published_at.toLocaleString():''}</span>
                </div>
                <div className={style.articleImage}>
                    <img src={props.article?props.baseURL+props.article.featuredImages.formats.small.url:''} alt={props.article?props.article.featuredImages.alternativeText:''} />
                </div>
                </div>:''
            }
            
        </Link>
    )
}
