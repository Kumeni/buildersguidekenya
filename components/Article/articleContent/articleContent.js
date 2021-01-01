import React, {useState, useEffect, useRef} from 'react'
import style from './articleContent.module.css'

export default function ArticleContent(props) {

    const container = useRef(null);

    const [content, setContent] = useState(undefined);

    function publishDate(){
        if(props.article){
            let newDate = new Date(props.article.created_at);
            return ""+newDate.getDate()+"/"+newDate.getMonth()+"/"+newDate.getFullYear()
        }
    }

    useEffect(()=>{
            var showdown = require('showdown');
            let converter = new showdown.Converter();
            setContent(converter.makeHtml(props.article.content));
    }, [props.article])

    useEffect(()=>{
        if(content){
            container.current.innerHTML = content;
        }
    }, [content, props.article])

    return (
        <>
            <div ref={container} className={style.articleContent+ ' container'}></div>
            <div className={style.authorInformation}>
                <strong>By {props.article.admin_user.firstname+ " " + props.article.admin_user.lastname}<br/></strong>
                <strong>Published {props.article?publishDate():""}</strong>
            </div>
        </>
    )
}
