import Head from 'next/head'
import Header from '../components/header/header'
import Banner from '../components/banner/banner'
import Section from '../components/categorySections/section'
import productInfo from '../server_data/hot_deals'
import ComponentNavigation from '../components/categoryNavigation/component_navigation'
import style from '../components/homepage.module.css'
import Layout from '../components/layout/layout'
import TrendingComponent from '../components/trendingComponent/trendingComponent'
import HomesubCategory from '../components/homeSubcategories/homeSubCategory'
import CategorySection from '../components/category_section/CategorySection';
import SmallAds from '../components/smallAds/smallAds'
import HardwareAndShops from '../components/hardware and shops/HardwareAndShops'


function HomePage(){

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
          <title>Builders Guide Kenya</title>
          <meta name="icon" href="../public/images/buildersguidekenyalogo.png"/>
        </Head>
        <Header />
        <Banner />
        <ComponentNavigation />
        <Section title='Recommended for you' productInfo={productInfo} />
        <TrendingComponent /> 
        <Section title='Special offers' productInfo={productInfo} />
        <Section title='New/Upgraded products' productInfo={productInfo} />
        <CategorySection title={'Materials and services'} productInfo={productInfo} subCategories={MaterialsAndServicesCategories}/>
        <CategorySection title={'Manufacturers and Suppliers'} productInfo={productInfo} subCategories={MaterialsAndServicesCategories}/>
        <SmallAds productInfo={productInfo}/>
        <CategorySection title={'Construction Machinery'} productInfo={productInfo} subCategories={ConstructionMachineryCategories}/>
        <HardwareAndShops />
        <HomesubCategory />
      </Layout>
  </div>
}

export default HomePage;