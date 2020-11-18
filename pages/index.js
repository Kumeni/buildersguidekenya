import Head from 'next/head'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import Header from '../components/header/header'
import Footer from '../components/footerComponent/Footer'
import Banner from '../components/banner/banner'
import Section from '../components/categorySections/section'
import productInfo from '../server_data/hot_deals'
import ComponentNavigation from '../components/categoryNavigation/component_navigation'
import Layout from '../components/layout/layout'
import TrendingComponent from '../components/trendingComponent/trendingComponent'
import CategorySection from '../components/category_section/CategorySection';
import SmallAds from '../components/smallAds/SmallAds'
import HardwareAndShops from '../components/hardware and shops/HardwareAndShops'
import ArticleComponent from '../components/ArticlesComponent/ArticleComponent'
import LargeAds from '../components/LargeAds/LargeAds'
import ManufacturerAndSupplierComponent from '../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent'
import ConstructionMachinery from '../components/ConstructionMachinery/ConstructionMachineryComponent/ConstructionMachinery'
import axios from 'axios'


export default function HomePage(props){
  const router = useRouter();
  console.log(props.articles);
  useEffect(()=>{
  router.prefetch({
      url:'/search'
  });
  })
  
  const MaterialsAndServicesCategories = [
    'All',
    'Aggregates and Quarrying',
    'Alarms and Security',
    'Ceilings',
    'Cement and Concrete',
    'Doors and windows',
    'Electrical and Mechanical',
    'Fencing and Barricading',
    'Furniture and Furnishings',
    'Gardening and Landscaping',
    'Kitchen and Cabinets',
    'Plumbing and Drainage',
    'Prefabricated housing',
    'Roofing products',
    'Solar power and appliances',
    'Tents and Canopies',
    'Steel and Wire products',
    'Timber products',
    'Wall and Floor furnishes',
    'Paints and Coating',
  ];

  const ConstructionMachineryCategories =[
    'All',
    'Cranes and Hoists',
    'Earth Moving',
    'Generators and Motors',
    'Mixers and Vibrators',
    'Power Tools',
    'Pumps and Accessories',
    'Road Construction',
    'Scaffholding and Trappers',
    'Trucks',
    'Water Treatment',
    'Welding',
    'Woodworking'
  ];

  return <div>
      <Layout>
        <Head>

          {/* FontAwesome icons */}
          <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

          {/* FontAwesome icons */}
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
          integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
          crossorigin="anonymous" />

          <title>Builders Guide Kenya</title>
          <meta type="shortcut icon" src="/images/buildersguidekenyalogo.png" />
        </Head>
        <Header />
        {/* <Banner /> */}
        <ComponentNavigation />
        {/* <Section title='Recommended for you' productInfo={productInfo} /> */}
        <SmallAds productInfo={productInfo} title={'Special Offers'}/>
        <TrendingComponent articles={props.articles}/> 
        <SmallAds productInfo={productInfo} title={'related.Sponsored Products'}/>
        <SmallAds productInfo={productInfo} title={'New/Upgraded Products'}/>
        <CategorySection title={'Manufacturers and Suppliers'} content={<ManufacturerAndSupplierComponent />} subCategories={MaterialsAndServicesCategories} link={"/manufacturersandsuppliers"} />
        <CategorySection title={'Construction Machinery'} productInfo={productInfo} content={<ConstructionMachinery />} subCategories={ConstructionMachineryCategories} link={"/constructionMachinery"}/>
        <ArticleComponent subCategories={MaterialsAndServicesCategories} link={"/articles"} />
        <LargeAds />
        <HardwareAndShops />
        <Footer />
      </Layout>
  </div>
}

export async function getStaticProps(){
  const baseURL = "http://localhost:1337"
  const articles = await axios.get(baseURL+"/articles?_limit=7");

  console.log(articles);
  
  return {
    props:{
      articles:articles.data
    }
  }
}