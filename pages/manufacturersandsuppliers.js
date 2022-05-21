import Head from 'next/head'
import CategorySection from '../components/category_section/CategorySection'
import Header from '../components/manufacturersandsuppliers/Header/Header'
import LargeAds from '../components/LargeAds/LargeAds'
import TrendingComponent from '../components/trendingComponent/trendingComponent'
import Footer from '../components/footerComponent/Footer'
import style from '../components/manufacturersandsuppliers/style.module.css'
import ManufacturerAndSupplierComponent from '../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent'
import axios from 'axios'
import {useState, useEffect, useRef} from 'react'
import completeCompanyInfo from '../utilities/CompanyInfoComplete'
import Loading from '../components/loading/Loading'
import {useRouter} from 'next/router'

export default function manufacturersandsuppliers(props) {

	const [articles, setArticles] = useState();
	const [availableSubCategories, setAvailableSubCategories] = useState();
	const [sections, setSections] = useState([]);
	const [sectionsCopy, setSectionsCopy] = useState()
	const [counties,setCounties] = useState();
	const [constituencies, setConstituencies] = useState();
	const [lastScrollPosition, setLastScrollPosition] = useState();

	const loading = useRef(null);
	const router = useRouter();

	//This block restores last scroll position
	useEffect(()=>{
		if(lastScrollPosition == undefined)
			setLastScrollPosition(Number(sessionStorage.getItem(router.pathname+'InitialScrollPos')));
		
		if(lastScrollPosition && window.scrollY <= lastScrollPosition-20){
			window.scrollTo(0, lastScrollPosition);
		}
	}, [sections, lastScrollPosition])

	useEffect(()=>{
		window.addEventListener('scroll', ()=>{
			sessionStorage.setItem(router.pathname+'InitialScrollPos', window.scrollY);
		});
	}, [])
	

	const getArticles = async () =>{
		loading.current.style.display="block";
		const articles = await axios.get(props.baseURL+"/articles?_limit=7",{
			transformResponse:[function(data){
				let newData = JSON.parse(data);
				newData.map(element=>{
				element.content=null;
				})
				return newData;
			}]
		});
		//console.log(articles.data);
		setArticles(articles.data);

		const counties = await axios.get(props.baseURL+"/counties?_limit=-1");
		setCounties(counties.data);
  
		const constituencies = await axios.get(props.baseURL+"/constituencies?_limit=-1");
		setConstituencies(constituencies.data);

		let holder = props.pagesData;
		holder.home.data = {};
		holder.home.data.articles=articles.data;
		holder.home.data.counties=counties.data;
		holder.home.data.constituencies=constituencies.data;
		props.setPagesData(holder);
	}

	const getAvailableSubCategories = async () =>{
		const availableSubCategories = await axios.get(props.baseURL+"/sub-categories?suppliersAvailable=true&categories=1");
		setAvailableSubCategories(availableSubCategories.data);
		console.log(availableSubCategories.data);

		let holder = props.pagesData;
		holder.productsAndServices.availableSubCategories = availableSubCategories.data;
		props.setPagesData(holder);
		return availableSubCategories.data;
	}

	//creating Section Objects
	useEffect(()=>{
		if(availableSubCategories === undefined){
			/*getArticles()
			.then(()=>{
				getAvailableSubCategories()
			})*/
			if(props.pagesData.home.data == undefined){
				getArticles()
				.then(()=>{
					if(props.pagesData.manufacturersAndSuppliers.availableSubCategories == undefined)
						getAvailableSubCategories()
					else 
						setAvailableSubCategories(props.pagesData.manufacturersAndSuppliers.availableSubCategories);
				})
			} else {
				setArticles(props.pagesData.home.data.articles);
				setCounties(props.pagesData.home.data.counties);
				setConstituencies(props.pagesData.home.data.constituencies);

				if(props.pagesData.manufacturersAndSuppliers.availableSubCategories == undefined)
					getAvailableSubCategories()
				else 
					setAvailableSubCategories(props.pagesData.manufacturersAndSuppliers.availableSubCategories);
			}
		}
	},[])

	useEffect(()=>{
		if(availableSubCategories){
			let holder = [];
			async function getSectionObjects(element, index){
	
				const availableSpecificCategories = await axios.get(props.baseURL+"/specific-categories?suppliersAvailable=true&subCategory="+element[index].id);
				//console.log(availableSpecificCategories.data);
				
				const specializations = await axios.get(props.baseURL+"/specializations?subCategory="+element[index].id+"&_limit=10");
				//console.log(specializations.data);
				let query = '';
		
				specializations.data.map((element,index)=>{
					index===0?query=query+"userId="+element.userId:query=query+"&userId="+element.userId;
				})
				//console.log(query);
				let suppliers;
				if(query=="")
					suppliers= {data:[]};
				else
					suppliers = await axios.get(props.baseURL+"/suppliers?"+query+'&_limit=11&Approved=true', {
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
								object.supplierCategoryId = element.supplierCategoryId;
			
								newData = newData.concat(object);
							})
			
							return newData;
						}]
					});
				//console.log(suppliers.data);

				//Actual creating of section objects
				let object = {};
				object.subCategory = element[index];
				object.specificCategories = availableSpecificCategories.data;
				object.suppliers = completeCompanyInfo(suppliers.data, counties, constituencies);

				if(object.suppliers.length > 0)
					setSectionsCopy(object);
			}

			if(props.pagesData.manufacturersAndSuppliers.sections==undefined)
				availableSubCategories.map((element, index)=>{
					getSectionObjects(availableSubCategories, index);
				})
			else 
				setSections(props.pagesData.manufacturersAndSuppliers.sections);

			//setSections(holder.slice());
			loading.current.style.display='none';
		}
	}, [availableSubCategories])

	useEffect(()=>{
		if(sectionsCopy !== undefined){
			let holder = sections, alreadySorted=true;
			holder = holder.concat(sectionsCopy);

			//Sorting the sections in alphabetical order
			let i, j;
			//if(holder.length == availableSubCategories.length)
			for(j=0; j<= holder.length-1; j++){
				for(i=0; i<holder.length-1; i++){
					if(holder[i].subCategory.subCategory > holder[i+1].subCategory.subCategory){
						let holder1 = holder[i];
						holder[i] = holder[i+1];
						holder[i+1] = holder1;
					}
				}
			}

			for(j=0; j<= holder.length-1; j++){
				for(i=0; i<holder.length-1; i++){
					if(holder[i].subCategory.subCategory > holder[i+1].subCategory.subCategory){
						alreadySorted = false;
					}
				}
			}

			if(alreadySorted){
				let holder = props.pagesData;
				holder.manufacturersAndSuppliers.sections = [];
				holder.manufacturersAndSuppliers.sections = sections.concat(sectionsCopy);
				props.setPagesData(holder);
				console.log(holder);
			}

			setSections(holder.slice());
		}
		
	}, [sectionsCopy])

	function listAvailableSubCategories(){
		if(availableSubCategories){
			let theMenus= "";
			availableSubCategories.map((element, index) => {
				if(index == 0)
                    theMenus+=element.subCategory;
                else if(index == availableSubCategories.length-1)
                    theMenus+="and "+element.subCategory;
                else 
                    theMenus+=", "+element.subCategory;
			})
			return " such as "+theMenus;
		}
		return "";
	}

	useEffect(()=>{
        window.dataLayer = window.dataLayer || [];

        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-8VYK6XCD9G');
    }, [props.baseURL])

	useEffect(()=>{
			console.log(sections);
	}, [sections])
    return (
        <div className={style.body}>
            <Head>
				{/* Global site tag (gtag.js) - Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-8VYK6XCD9G"></script>

                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />

				<meta name="keywords"  description="construction, products, manufacturers, suppliers, kenya, materials, builders, guide"/>

				<meta name="content" description={"Find manufacturers and suppliers providing construction materials, products, and services"+ listAvailableSubCategories() +" anywhere in Kenya and in the East African Community (EAC)"} />

                <title>Manufacturers and suppliers of construction materials, products and services in Kenya and East African Community (EAC) | Builders Guide Kenya</title>

            </Head>
            <Header loginData = {props.loginData} setLoginData = { data => props.setLoginData(data)}/>
			{
				articles?
					<TrendingComponent baseURL={props.baseURL} articles={articles}/>
				:''
			}
			{
				sections.length !== 0 && sections !== undefined?
					sections.map((element, index)=>(
						<div key={element.subCategory.id} id={element.subCategory.subCategory.replace(/\s/g, '')}>
							<CategorySection 
								title={element.subCategory.subCategory}
								link={'/manufacturersandsuppliers/'+element.subCategory.subCategory}
								companyInfo={element.suppliers}
								counties={counties}
								constituencies = {constituencies}
								baseURL={props.baseURL}
								subCategories={element.specificCategories}
							/>
						</div>
					))
				:''
			}
            
            {/*
				
				<CategorySection title={'Alarms and Security'} content={<ManufacturerAndSupplierComponent />} subCategories={AlarmsAndSecurity} />
				<LargeAds />
				<CategorySection title={'Bitumen and Waterproofing'} content={<ManufacturerAndSupplierComponent />} subCategories={BitumenAndWaterproofing} />
				<CategorySection title={'Ceilings'} content={<ManufacturerAndSupplierComponent />} subCategories={Ceilings} />
				<CategorySection title={'Cement and Concrete'} content={<ManufacturerAndSupplierComponent />} subCategories={CementAndConcrete} />
			*/}
			<div ref={loading}>
				<Loading />
			</div>
			{
				sections.length > 0?
					<Footer />
				:''
			}
            
        </div>
    )
}

