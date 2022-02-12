import Head from 'next/head'
import ArticleContent from '../components/Article/articleContent/articleContent'
import style from '../components/Article/article.module.css'
import FeaturedImage from '../components/Article/featuredImage/featuredImage'
import Header from '../components/manufacturersandsuppliers/Header/Header'
import {useEffect, useState, useRef} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import TrendingComponent from '../components/trendingComponent/trendingComponent'
import TilesArticleListing from '../components/tilesArticleListing/TilesArticleListing'
import SectionTitle from '../components/categorySections/sectionTitle'
import Footer from '../components/footerComponent/Footer'
import Loading from '../components/loading/Loading'

export default function Article(props) {

    const [articleContent, setArticleContent] = useState(undefined);
    const [listedArticles, setListedArticles] = useState(undefined);
    const [updatedArticles, setUpdatedArticles] = useState(undefined);

    const router = useRouter();

    const loading = useRef(null);

    useEffect(()=>{
        async function getArticle(){
            loading.current.style.display="block";
            let article = await axios.get(props.baseURL+"/articles/?title="+router.query.title)
            .then(res=>{
                console.log(res.data[0]);
                return res.data[0];
            })
            .catch(err=>{
                console.log(err.response);
            })
            loading.current.style.display="none";
            return article;
        }

        getArticle().then(res=>{
            setArticleContent(res);
        })
    },[router.query])

    useEffect(()=>{
        async function getRelatedArticles(){
            const articles = await axios.get(props.baseURL+"/articles?_limit=7",{
                transformResponse:[function(data){
                    let newData = JSON.parse(data);
                    newData.map(element=>{
                    element.content=null;
                    })
                    return newData;
                }]
            })
            .then(res=>{
                return res.data;
            })
            .catch(err=>{
                console.log(err.response);
            })
            return articles;
        }
        articleContent?
        getRelatedArticles()
        .then(res=>{
            console.log(res);
            let arrayHolder = [];
            res.map(element=>{
                if(element.id !== articleContent.id){
                    arrayHolder.push(element);
                }
            })
            console.log(arrayHolder);
            setListedArticles(arrayHolder.slice());
        }):{}
    }, [articleContent])

    useEffect(()=>{
        window.dataLayer = window.dataLayer || [];

        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-8VYK6XCD9G');
    }, [props.baseURL])

    function title(){
        if(articleContent)
            return articleContent.title + " | Builders Guide Kenya";
        else 
            return ""
    }

    function metaDescription(){
        if(articleContent)
            return articleContent.metaDescription;
        else 
            return "";
        
    }

    function keywords(){
        if(articleContent){
            if(articleContent.keywords)
                return articleContent.keywords;
            else 
                return articleContent.title.replace(/\s/, ", ")+", builders, guide, kenya";
        } else 
            return "";
    }
    return (
        <div className={style.articleContainer}>
            <Head>

                {/* Global site tag (gtag.js) - Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-8VYK6XCD9G"></script>

                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />

                <meta name="keywords" content={keywords()} />

                <meta name="description" content={metaDescription()} />

                <title>{title()}</title>
            </Head>
            <Header title={'Tip and Advice'} />
            <div className={style.container}>
                {
                    articleContent?
                    <FeaturedImage baseURL={props.baseURL} url={articleContent?articleContent.featuredImages.url:undefined} name={articleContent?articleContent.featuredImages.name:undefined}/>
                    :''
                }
                {
                    articleContent?
                    <ArticleContent article={articleContent?articleContent:undefined} />
                    :''
                }
                {
                    listedArticles?(
                        <div className={style.moreArticles}>
                            <SectionTitle title="More tips and advices" link={'/tips-and-advices'} />
                            <div className="componentScroll">
                            {
                                listedArticles.map((element,index)=>(
                                    <span key={element.id}>
                                        <TilesArticleListing baseURL={props.baseURL} articleId={element.id} featuredImage={element.featuredImages.url} articleTitle={element.title} actualTitle={element.title} imageTitle={element.featuredImages.name}  propKey={element.title+element.id}/>
                                    </span>
                                ))
                            }
                            </div>
                        </div>
                    ):''
                }
                <div ref={loading}>
                    <Loading />
                </div>
            </div>
            {
                articleContent?
                    <Footer />
                :undefined
            }
            
            {/* 
                Add the authors social media links
                Add more header tags
            */}
        </div>
    )
}
