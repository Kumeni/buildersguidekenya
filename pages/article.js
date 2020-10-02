import Head from 'next/head'
import ArticleContent from '../components/Article/articleContent/articleContent'
import style from '../components/Article/article.module.css'
import FeaturedImage from '../components/Article/featuredImage/featuredImage'
import Link from 'next/link'
import Header from '../components/manufacturersandsuppliers/Header/Header'

export default function Article() {
    return (
        <div className={style.articleContainer}>
            <Head>
                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossorigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossorigin="anonymous" />

                <title>Tips and Advices</title>
            </Head>
            <Header title={'Tip and Advice'} />
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
