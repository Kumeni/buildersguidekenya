import Head from 'next/head'
import Header from '../components/manufacturersandsuppliers/Header/Header'
import Link from 'next/link'
import Article from '../components/ArticlesComponent/Article/Article'
import {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import Footer from '../components/footerComponent/Footer'
import Loading from '../components/loading/Loading'

export default function Articles(props) {

    const [articles, setArticles] = useState();
    
    const loading = useRef(null);

	async function getArticles(){
        loading.current.style.display="block";
		const articles = await axios.get(props.baseURL+"/articles?_limit=7",{
			transformResponse:[function(data){
				let newData = JSON.parse(data);
				newData.map(element=>{
				element.content=null;
				})
				//console.log(newData);
				return newData;
			}]
		})
        setArticles(articles.data);
        loading.current.style.display="none";
	};
    
    useEffect(()=>{
        getArticles();
    },[props.baseURL])

    useEffect(()=>{
        window.dataLayer = window.dataLayer || [];

        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-8VYK6XCD9G');
    }, [props.baseURL])
    
    return (
        <div>
            <Head>
                {/* Global site tag (gtag.js) - Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-8VYK6XCD9G"></script>

                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossorigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossorigin="anonymous" />

                <title>Builders Guide Kenya | Tips and Advices</title>
            </Head>
            <Header title='Tips and Advices' />
            {
				articles?
					articles.map((element, index)=>(
						<Article article={element} baseURL={props.baseURL} />
					))
				:undefined
            }
            <div ref={loading}>
                <Loading />
            </div>
            {
                articles?
                    <Footer />
                :undefined
            }
        </div>
    )
}