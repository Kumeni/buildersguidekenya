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

	const [data, setData] = useState();
	const [data2, setData2] = useState();
	const [data3, setData3] = useState();
	const [data4, setData4] = useState();
	const router = useRouter();
	const loading = useRef(null);

	const  getData = async() =>{
		//getting the articles
		//console.log('running');
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

    	//const specialization = await axios.get(props.baseURL+"/specializations?_limit=10");
  
		/*let query = '';
		
		specialization.data.map((element,index)=>{
			index===0?query=query+"userId="+element.userId:query=query+"&userId="+element.userId;
		})*/
    
		const suppliers = await axios.get(props.baseURL+"/suppliers?_limit=10&Approved=true&confirmed=true", {
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
			//specialization:specialization.data,
			suppliers:suppliers.data,
			counties:counties.data,
			constituencies:constituencies.data,
			availableSubCategories:availableSubCategories.data
		}
		
		setData(data);
			
		//Start of functions that deal with the downloading of products

		//getting products by specialization
		
		const products = await axios.get(props.baseURL+"/products?blocked=false&deleted=false&_limit=10", {
			transformResponse:[function(data){
				let newData = [];
				let originalData = JSON.parse(data);

				originalData.map(element=>{
					let object = {};

					object.id = element.id;
					object.productName = element.productName;
					object.county = element.county;
					object.constituency = element.constituency;
					object.buildingOrEstate = element.estate;
					object.productDescription = element.productDescription;

					newData = newData.concat(object);
				})

				return newData;
			}]
		});

		const availableProductSubCategories = await axios.get(props.baseURL+"/sub-categories?productsAvailable=true&categories=1");

		//create a data 2 object
		
		let data2 = {
			//specialization:specialization.data,
			products:products.data,
			availableProductSubCategories:availableProductSubCategories.data
		}
		
		setData2(data2);

		//Fetching information for construction machinery
		const constructionMachinery = await axios.get(props.baseURL+"/plant-and-machineries?blocked=false&deleted=false&_limit=10", {
			transformResponse:[function(data){
				let newData = [];
				let originalData = JSON.parse(data);

				originalData.map(element=>{
					let object = {};

					object.id = element.id;
					object.name = element.name;
					object.county = element.county;
					object.constituency = element.constituency;
					object.buildingOrEstate = element.buildingOrEstate;
					object.additionalDescription = element.additionalDescription;

					newData = newData.concat(object);
				})

				return newData;
			}]
		});

		const availableConstructionMachinerySubCategories = await axios.get(props.baseURL+"/sub-categories?productsAvailable=true&categories=3");

		let data3 = {
			//specialization:specialization.data,
			constructionMachinery:constructionMachinery.data,
			availableConstructionMachinerySubCategories:availableConstructionMachinerySubCategories.data
		}
		console.log('current construction machinery data');
		console.log(Date.now());
		console.log(data3);
		
		setData3(data3);

		const availableVehicleTypes = await axios.get(props.baseURL+"/transporter-vehicle-types?vehiclesAvailable=true");

		const transportVehicles = await axios.get(props.baseURL+"/transport-vehicles?deleted=false&approved=true&blocked=false&_limit=10");
		
		let data4 = {
			availableVehicleTypes:availableVehicleTypes.data,
			transportVehicles:transportVehicles.data
		}

		setData4(data4);
  	}

	useEffect(()=>{
		if(data === undefined && props.pagesData.home.data==undefined){
			getData()
			.then(()=>{
				loading.current.style.display='none';
			});
		} else if (props.pagesData.home.data != undefined){
			setData(props.pagesData.home.data);
			setData2(props.pagesData.home.data2);
			setData3(props.pagesData.home.data3);
			setData4(props.pagesData.home.data4);
		}
	}, [router.pathname, props.pagesData])

	useEffect(()=>{
		//console.log(data2);
		if(data2){
			console.log(completeCompanyInfo(data2.products, data.counties, data.constituencies));
		}
	}, [data2])

	useEffect(()=>{
        window.dataLayer = window.dataLayer || [];

        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-8VYK6XCD9G');
    }, [props.baseURL])

	return <div>
		<Layout>
			<Head>

				{/* Global site tag (gtag.js) - Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-8VYK6XCD9G"></script>

				{/* FontAwesome icons */}
				<script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

				{/* FontAwesome icons */}
				<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
				integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
				crossOrigin="anonymous" />

				<meta name="keywords" content="construction, builders, kenya" />		

				<meta name="description" content="Find what you want for your construction project; 
				manufacturers, suppliers, construction materials, services, artisans and professionals anywhere in kenya" />
				 
				<title>Builders Guide Kenya - Find construction products and services, plants and machineries, hardwares and stores, artisans and professionals anywhere in Kenya</title>

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
				:undefined
			}

			{/* <SmallAds productInfo={productInfo} title={'related.Sponsored Products'}/> */}
			{/* <SmallAds productInfo={productInfo} title={'New/Upgraded Products'}/> */}
			{
				data?
					data2?
						data2.products.length>0?
							<CategorySection 
								title={'Products and Services'}
								subCategories={data2.availableProductSubCategories}
								link={"/products-and-services"}
								productInfo={completeCompanyInfo(data2.products, data.counties, data.constituencies)}
								products={data2.products} 
								counties={data.counties}
								constituencies={data.constituencies}
								baseURL={props.baseURL}
							/>
						:undefined
					:undefined
				:undefined
			}
			{
				data?
					data.suppliers.length>0?
						<CategorySection 
							title={'Manufacturers and Suppliers'}
							subCategories={data.availableSubCategories}
							link={"/manufacturersandsuppliers"}
							companyInfo={completeCompanyInfo(data.suppliers, data.counties, data.constituencies)}
							suppliers={data.suppliers} 
							counties={data.counties}
							constituencies={data.constituencies}
							baseURL={props.baseURL} 
						/>
					:undefined
				:undefined
			}
			{
				data?
					data3?
						data3.constructionMachinery.length>0?
							<CategorySection 
								title={'Plants and Machineries'} 
								subCategories={data3.availableConstructionMachinerySubCategories} 
								link={"/plants-and-machineries"}
								constructionMachineryInfo={completeCompanyInfo(data3.constructionMachinery, data.counties, data.constituencies)} 
								constructionMachinery={data3.constructionMachinery}
								counties={data.counties}
								constituencies={data.constituencies}
								baseURL={props.baseURL}
							/>
						:undefined
					:undefined
				:undefined
			}
			{
				data?
					data4?
						data4.transportVehicles.length>0?
							<CategorySection 
								title={'Transport Vehicles'} 
								subCategories={data4.availableVehicleTypes} 
								link={"/transport-vehicles"}
								vehiclesInfo={completeCompanyInfo(data4.transportVehicles, data.counties, data.constituencies)} 
								vehicles={data4.transportVehicles}
								counties={data.counties}
								constituencies={data.constituencies}
								baseURL={props.baseURL}
							/>
						:undefined
					:undefined
				:undefined
			}
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