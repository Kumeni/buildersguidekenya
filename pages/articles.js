import Head from 'next/head'
import Header from '../components/manufacturersandsuppliers/Header/Header'
import Link from 'next/link'
import Article from '../components/ArticlesComponent/Article/Article'

export default function Articles() {
    return (
        <div>
            <Head>

                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossorigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossorigin="anonymous" />

                <title>Tips and Advices</title>
            </Head>
            <Header title='Tips and Advices' />
            <Article />
            <Article />
            <Article />
            <Article />
            <Article />
            <Article />
        </div>
    )
}
