import Head from 'next/head'
import {useRouter} from 'next/router'
import {useEffect, useState, useRef} from 'react'
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
import completeCompanyInfo from '../utilities/CompanyInfoComplete'
import {companyData, availableSuppliers} from '../utilities/CompanyData'
import Loading from '../components/loading/Loading'

export default function HomePage(props){

	const [data, setData] = useState(undefined);

	const router = useRouter();
	const loading = useRef(null);

	const  getData = async() =>{
		//getting the articles
		loading.current.style.display = 'block';
		const articles = await axios.get(props.baseURL+"/articles?_limit=7",{
			transformResponse:[function(data){
				let newData = JSON.parse(data);
				newData.map(element=>{
				element.content=null;
				})
				//console.log(newData);
				return newData;
			}]
		});

    	const specialization = await axios.get(props.baseURL+"/specializations?_limit=10");
  
		let query = '';
		
		specialization.data.map((element,index)=>{
			index===0?query=query+"userId="+element.userId:query=query+"&userId="+element.userId;
		})
    
		const suppliers = await axios.get(props.baseURL+"/suppliers?"+query, {
			transformResponse:[function(data){
				let newData = [];
				let originalData = JSON.parse(data);

				originalData.map(element=>{
					let object = {};

					object.id = element.id;
					object.companyName = element.companyName;
					object.services = element.services;
					object.county = element.county;
					object.constituency = element.constituency;
					object.buildingOrEstate = element.buildingOrEstate;
					object.userId=element.userId;

					newData = newData.concat(object);
				})

				return newData;
			}]
		});
  
    	const counties = await axios.get(props.baseURL+"/counties?_limit=-1");
  
    	const constituencies = await axios.get(props.baseURL+"/constituencies?_limit=-1");
  
    	const availableSubCategories = await axios.get(props.baseURL+"/sub-categories?suppliersAvailable=true&categories=1");
    
		let data = {
			articles:articles.data,
			specialization:specialization.data,
			suppliers:suppliers.data,
			counties:counties.data,
			constituencies:constituencies.data,
			availableSubCategories:availableSubCategories.data
		}
		
		setData(data);
  	}

	useEffect(()=>{
		getData()
		.then(()=>{
			loading.current.style.display='none';
		});
	}, [])

	//const [manufacturersAndSuppliers, setManufacturersAndSuppliers] = useState();
	console.log(data);
	console.log(data);

	return <div>
		<Layout>
			<Head>

				{/* FontAwesome icons */}
				<script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

				{/* FontAwesome icons */}
				<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
				integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
				crossOrigin="anonymous" />

				<title>Builders Guide Kenya</title>

				<meta type="shortcut icon" src="/images/buildersguidekenyalogo.png" />
			</Head>

			<Header />
			<Banner />
			<ComponentNavigation />

			{/* <Section title='Recommended for you' productInfo={productInfo} /> */}
			{/* <SmallAds productInfo={productInfo} title={'Special Offers'}/> */}
			
			{
				data?
					<TrendingComponent baseURL={props.baseURL} articles={data.articles}/> 
				:''
			}

			{/* <SmallAds productInfo={productInfo} title={'related.Sponsored Products'}/> */}
			{/* <SmallAds productInfo={productInfo} title={'New/Upgraded Products'}/> */}

			{
				data?
					<CategorySection 
						title={'Manufacturers and Suppliers'}
						subCategories={data.availableSubCategories}
						link={"/manufacturersandsuppliers"}
						companyInfo={completeCompanyInfo(data.suppliers, data.counties, data.constituencies)}
						suppliers={data.suppliers} counties={data.counties}
						constituencies={data.constituencies}
						baseURL={props.baseURL} 
					/>
				:''
			}
			
			
			{/* <CategorySection title={'Construction Machinery'} productInfo={productInfo} content={<ConstructionMachinery />} subCategories={ConstructionMachineryCategories} link={"/constructionMachinery"}/> */}
			{/* <ArticleComponent subCategories={MaterialsAndServicesCategories} link={"/articles"} /> */}
			{/* <LargeAds /> */}
			{/* <HardwareAndShops /> */}

			<div ref={loading}>
				<Loading />
			</div>

			{
				data?
				<Footer />
				:""
			}
		</Layout>
	</div>
}