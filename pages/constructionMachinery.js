import Head from 'next/head'
import ConstructionMachinery from '../components/ConstructionMachinery/ConstructionMachineryComponent/ConstructionMachinery'
import Header from '../components/manufacturersandsuppliers/Header/Header'
import style from '../components/ConstructionMachinery/ConstructionMachinery.module.css'
import CategorySectionSlider from '../components/categorySectionSlider/CategorySectionSlider'
import {useState} from 'react'

export default function constructionMachinery() {

    const subCategories =[
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

    const [menuSelected, setMenuSelected] = useState("All");
    return (
        <div>
            <Head>
                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossorigin="anonymous" />

                <title>Construction Machinery</title>
            </Head>
            <Header title='Construction Machinery' />
            <CategorySectionSlider 
                subCategories={subCategories}
                setMenuSelected = {(menu)=>setMenuSelected(menu)}
                menuSelected={menuSelected} 
            />
            <div className={style.components}>
                <ConstructionMachinery fullWidth={true} />
            </div>
        </div>
    )
}
