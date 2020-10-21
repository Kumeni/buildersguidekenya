import Head from 'next/head'
import CategorySection from '../components/category_section/CategorySection'
import Header from '../components/manufacturersandsuppliers/Header/Header'
import productInfo from '../server_data/hot_deals'
import LargeAds from '../components/LargeAds/LargeAds'
import TrendingComponent from '../components/trendingComponent/trendingComponent'
import Footer from '../components/footerComponent/Footer'
import TextField from '@material-ui/core/TextField'
import style from '../components/manufacturersandsuppliers/style.module.css'
import ManufacturerAndSupplierComponent from '../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent'

export default function manufacturersandsuppliers() {

    let AggregatesAndQuarrying = [
        'All',
        'Ballast',
        'Building Sand',
        'Hardcore',
        'Quarry Stone',
        'Termite treatment'
    ], 
    
    AlarmsAndSecurity=[
        'All',
        'CCTV',
        'Electric Fences',
        'Alarms'
    ],
    
    BitumenAndWaterproofing = [
        'Bitumen',
        'Premix',
        'Waterproofing'
    ],
    
    Ceilings = [
        'Ceiling Boards',
        'Gypsum ceilings',
        'Suspended ceilings',
    ],
    
    CementAndConcrete =[
        'Cement',
        'Pre-cast concrete products',
        'pre-mix concrete'
    ];



    return (
        <div>
            <Head>

                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossorigin="anonymous" />

                <title>Manufacturers and Suppliers</title>

            </Head>
            <Header />
            <TrendingComponent />
            <CategorySection title={'Aggregate and Quarrying'} content={<ManufacturerAndSupplierComponent />} subCategories={AggregatesAndQuarrying}/>
            <CategorySection title={'Alarms and Security'} content={<ManufacturerAndSupplierComponent />} subCategories={AlarmsAndSecurity} />
            <LargeAds />
            <CategorySection title={'Bitumen and Waterproofing'} content={<ManufacturerAndSupplierComponent />} subCategories={BitumenAndWaterproofing} />
            <CategorySection title={'Ceilings'} content={<ManufacturerAndSupplierComponent />} subCategories={Ceilings} />
            <CategorySection title={'Cement and Concrete'} content={<ManufacturerAndSupplierComponent />} subCategories={CementAndConcrete} />
            <Footer />
        </div>
    )
}
