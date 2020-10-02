import Head from 'next/head'
import Banner from '../components/banner/banner'
import CategorySection from '../components/category_section/CategorySection'
import Header from '../components/manufacturersandsuppliers/Header/Header'
import productInfo from '../server_data/hot_deals'

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
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossorigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossorigin="anonymous" />

                {/* Latest Compiled minified css */}
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />

                <title>Manufacturers and Suppliers</title>

            </Head>
            <Header />
            <Banner />
            <CategorySection title={'Aggregate and Quarrying'} productInfo={productInfo} subCategories={AggregatesAndQuarrying}/>
            <CategorySection title={'Alarms and Security'} productInfo={productInfo} subCategories={AlarmsAndSecurity} />
            <CategorySection title={'Bitumen and Waterproofing'} productInfo={productInfo} subCategories={BitumenAndWaterproofing} />
            <CategorySection title={'ceilings'} productInfo={productInfo} subCategories={Ceilings} />
            <CategorySection title={'Cement and Concrete'} productInfo={productInfo} subCategories={CementAndConcrete} />
        </div>
    )
}
