import ArticleContent from '../components/Article/articleContent/articleContent'
import style from '../components/Article/article.module.css'
import FeaturedImage from '../components/Article/featuredImage/featuredImage'
import Link from 'next/link'

export default function Article() {
    return (
        <div className={'container'}>
            <div className={style.header}>
                <Link href='#'>
                    <a className={style.link}>Back</a>
                </Link>
                <h5>Tips And Advices</h5>
                <p>Search Icon</p>
            </div>
            <FeaturedImage />
            <ArticleContent />
            <div className={style.authorInformation}>
                <div className={style.authorImageContainer}>
                </div>
                by John Doe<br />
                September 20, 2020
            </div>
            {/* 
                Add the scroll to top button
                Add the related articles section
                Add the read next article
                Add the authors social media links
                Add more header tags
            */}
        </div>

    )
}
