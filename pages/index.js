import Head from 'next/head'
import Header from '../components/header/header'
import Banner from '../components/banner/banner'
import Section from '../components/categorySections/section'
import productInfo from '../server_data/hot_deals'
import ComponentNavigation from '../components/categoryNavigation/component_navigation'
import style from '../components/homepage.module.css'
import Layout from '../components/layout/layout'
import TrendingComponent from '../components/trendingComponent/trendingComponent'
function HomePage(){
  return <div>
      <Layout>
        <Head>
          <title>Builders Guide Kenya</title>
          <meta name="icon" href="../public/images/buildersguidekenyalogo.png"/>
        </Head>
        <div className={style.Header}>
          <Header />
        </div>
        <div className={style.banner}>
        <Banner />
        </div>
        <div className={style.componentNavigation}>
          <ComponentNavigation />
        </div>
        <div className={style.trending}>
          <TrendingComponent /> 
        </div>
        <div className={style.sections}>
          <Section title='Discounted products' productInfo={productInfo} />
          <Section title='Recommended for you' productInfo={productInfo} />
        </div>
      </Layout>
  </div>
}

export default HomePage;