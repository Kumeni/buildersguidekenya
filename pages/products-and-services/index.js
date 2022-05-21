import Head from 'next/head'
import CategorySection from '../../components/category_section/CategorySection'
import Header from '../../components/manufacturersandsuppliers/Header/Header'
import LargeAds from '../../components/LargeAds/LargeAds'
import TrendingComponent from '../../components/trendingComponent/trendingComponent'
import Footer from '../../components/footerComponent/Footer'
import style from '../../components/manufacturersandsuppliers/style.module.css'
import ManufacturerAndSupplierComponent from '../../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent'
import axios from 'axios'
import {useState, useEffect, useRef} from 'react'
import completeCompanyInfo from '../../utilities/CompanyInfoComplete'
import Loading from '../../components/loading/Loading'
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
	
	useEffect(()=>{
		console.log(lastScrollPosition);
		if(lastScrollPosition == undefined)
			setLastScrollPosition(Number(sessionStorage.getItem(router.pathname+'InitialScrollPos')));
		
		if(lastScrollPosition/* && window.scrollY <= lastScrollPosition-20*/){
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
		setArticles(articles.data);
		//console.log(articles.data);
		

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
		const availableSubCategories = await axios.get(props.baseURL+"/sub-categories?productsAvailable=true&categories=1");
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
			if(props.pagesData.home.data == undefined){
				getArticles()
				.then(()=>{
					if(props.pagesData.productsAndServices.availableSubCategories == undefined)
						getAvailableSubCategories()
					else 
						setAvailableSubCategories(props.pagesData.productsAndServices.availableSubCategories);
				})
			} else {
				setArticles(props.pagesData.home.data.articles);
				setCounties(props.pagesData.home.data.counties);
				setConstituencies(props.pagesData.home.data.constituencies);

				if(props.pagesData.productsAndServices.availableSubCategories == undefined)
					getAvailableSubCategories()
				else 
					setAvailableSubCategories(props.pagesData.productsAndServices.availableSubCategories);
			}
		}
	},[])

	useEffect(()=>{
		if(availableSubCategories){
			async function getSectionObjects(element, index){
	
				const availableSpecificCategories = await axios.get(props.baseURL+"/specific-categories?productsAvailable=true&subCategory="+element[index].id);
				//console.log(availableSpecificCategories.data);
				
				const productSpecializations = await axios.get(props.baseURL+"/product-specializations?productSubCategory="+element[index].id+"&_limit=10");
				//console.log(specializations.data);
				let query = '';
		
			    productSpecializations.data.map((element,index)=>{
					index===0?query=query+"id="+element.productId:query=query+"&id="+element.productId;
				})
				//console.log(query);
				
				let products; 
				if(query=="")
					products = {data:[]};
				else 
					products = await axios.get(props.baseURL+"/products?"+query+'&_limit=11', {
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
				//console.log(suppliers.data);

				//Actual creating of section objects
				let object = {};
				object.subCategory = element[index];
				object.specificCategories = availableSpecificCategories.data;
				object.suppliers = completeCompanyInfo(products.data, counties, constituencies);

				if(object.suppliers.length > 0)
					setSectionsCopy(object);
			}
			console.log(props.pagesData.productsAndServices.sections);
			if(props.pagesData.productsAndServices.sections==undefined)
				availableSubCategories.map((element, index)=>{
					getSectionObjects(availableSubCategories, index);
				})
			else 
				setSections(props.pagesData.productsAndServices.sections);

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
				console.log(alreadySorted);
				let holder = props.pagesData;
				holder.productsAndServices.sections = [];
				holder.productsAndServices.sections = sections.concat(sectionsCopy);
				props.setPagesData(holder);
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

				<meta name="keywords"  description="construction, products, services, kenya, materials, builders, guide"/>

				<meta name="content" description={"Find construction materials, products, and services"+ listAvailableSubCategories() +" anywhere in Kenya and in the East African Community (EAC)"}/>

                <title>Construction Materials, Products and Services in Kenya and East African Community (EAC) | Builders Guide Kenya</title>

            </Head>
            <Header title='Products and Services' loginData = {props.loginData} setLoginData = { data => props.setLoginData(data)}/>
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
								link={'/products-and-services/'+element.subCategory.subCategory}
								productInfo={element.suppliers}
								counties={counties}
								constituencies = {constituencies}
								baseURL={props.baseURL}
								subCategories={element.specificCategories}
							/>
						</div>
					))
				:''
			}
            
			<div ref={loading}>
				<Loading />
			</div>
			{
				sections && availableSubCategories && sections.length == availableSubCategories.length?
					<Footer />
				:''
			}
            
        </div>
    )
}

