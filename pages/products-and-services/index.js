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

export default function manufacturersandsuppliers(props) {

	const [articles, setArticles] = useState();
	const [availableSubCategories, setAvailableSubCategories] = useState();
	const [sections, setSections] = useState([]);
	const [sectionsCopy, setSectionsCopy] = useState()
	const [counties,setCounties] = useState();
	const [constituencies, setConstituencies] = useState();

	const loading = useRef(null);
	

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
	}

	const getAvailableSubCategories = async () =>{
		const availableSubCategories = await axios.get(props.baseURL+"/sub-categories?productsAvailable=true&categories=1");
		setAvailableSubCategories(availableSubCategories.data);
        console.log(availableSubCategories.data);
        
		return availableSubCategories.data;
	}

	//creating Section Objects
	useEffect(()=>{
		if(availableSubCategories === undefined){
			getArticles()
			.then(()=>{
				getAvailableSubCategories()
			})
		}
	},[])

	useEffect(()=>{
		if(availableSubCategories){
			let holder = [];
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
			
				const products = await axios.get(props.baseURL+"/products?"+query+'&_limit=11', {
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

				setSectionsCopy(object);
			}

			availableSubCategories.map((element, index)=>{
				getSectionObjects(availableSubCategories, index);
			})

			//setSections(holder.slice());
			loading.current.style.display='none';
		}
	}, [availableSubCategories])

	useEffect(()=>{
		if(sectionsCopy !== undefined){
			let holder = sections;

			//Sorting the menu according to the number of available suppliers
			/*for(let i=0; i<holder.length-1; i++){
				if(holder[i].suppliers.length < holder[i+1].suppliers.length){
					let holder1 = holder[i];
					holder1[i] = holder1[i+1];
					holder1[i+1] = holder1;
				}
			}*/

			setSections(holder.concat(sectionsCopy));
		}
		
	}, [sectionsCopy])

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

				<meta name="keywords"  description="construction materials kenya" />

				<meta name="content" description="Find construction materials for your construction project
				at the location of your preference in Kenya." />

                <title>Construction Products and Services in Kenya | Builders Guide Kenya</title>

            </Head>
            <Header title='Products and Services' />
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
								link={'/materials/'+element.subCategory.subCategory}
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

