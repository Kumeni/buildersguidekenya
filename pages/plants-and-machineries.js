import Head from 'next/head'
import Header from '../components/manufacturersandsuppliers/Header/Header'
import style from '../components/ConstructionMachinery/ConstructionMachinery.module.css'
import ManufacturerAndSupplierComponent from '../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent'
import CategorySectionSlider from '../components/categorySectionSlider/CategorySectionSlider'
import completeCompanyInfo from '../utilities/CompanyInfoComplete'
import getConstructionMachineries from '../utilities/constructionMachineryData'
import Loading from '../components/loading/Loading'
import {useState, useEffect, useRef} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'

export default function constructionMachinery(props) {

    const [availableMachinerySubCategories, setAvailableMachinerySubCategories] = useState();
    const [data ,setData] = useState();
    //const [availableMenus, setAvailableMenus] = useState();
    const [menuSelected, setMenuSelected] = useState();
    const [previousActiveSuppliers, setPreviousActiveSuppliers] = useState(0);
    const [activeSuppliers, setActiveSuppliers] = useState(0);
    const [constructionMachineryInfo, setConstructionMachineryInfo] = useState([]);

    const router = useRouter();
    const loading = useRef(null);

    //This function is responsible for fetching initial page data
    const getData = async()=>{
        const availableConstructionMachinerySubCategories = await axios.get(props.baseURL+"/sub-categories?productsAvailable=true&categories=3");
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
        const counties = await axios.get(props.baseURL+"/counties?_limit=-1");
  
    	const constituencies = await axios.get(props.baseURL+"/constituencies?_limit=-1");

		let data = {
			constructionMachinery:constructionMachinery.data,
			availableConstructionMachinerySubCategories:availableConstructionMachinerySubCategories.data,
            counties:counties.data,
            constituencies:constituencies.data
		}
		
		setData(data);
        setConstructionMachineryInfo(constructionMachineryInfo.concat({
            menu:0,
            suppliers:completeCompanyInfo(data.constructionMachinery, data.counties, data.constituencies)
        }));
        loading.current.style.display="none";
    }
    useEffect(()=>{
        getData();
    }, [props.baseURL]);

    useEffect(()=>{
        if(constructionMachineryInfo[activeSuppliers]){
            setPreviousActiveSuppliers(activeSuppliers);
        }
    }, [constructionMachineryInfo, activeSuppliers])

    useEffect(()=>{
        console.log(constructionMachineryInfo);
    }, [constructionMachineryInfo])
    //This function checks whether the menu already exists
    function checkAvailablility(array, value){
        let indexOf = -1;
        array.map((element, index)=>{
            if(element.menu == value){
                indexOf = index;
            }
        })
        return indexOf;
    }

    async function getCategorizedData(url, depth, value){
        let data = await axios.get(props.baseURL+url+"?"+depth+"="+value+"&_limit=10")
        .then(res=>{
            return res.data;
        })
        .catch(err=>{
            console.log(err.response);
        })
        return data;
    }

    //This function helps making the more
    function moreLink(menuSelected){
        if(menuSelected === undefined){
            setNewLink("#All")
        } else if (menuSelected.categories !== undefined){
            setNewLink("#"+menuSelected.subCategory.replace(/\s/g, ''));
        } else if (menuSelected.speCatName !== undefined){
            setNewLink("?specificCategory="+ menuSelected.speCatName);
        } else {
            setNewLink("#All");   
        }
    }

    useEffect(()=>{
        if(menuSelected){
            if(checkAvailablility(constructionMachineryInfo, menuSelected.id) !== -1){
                //console.log(menuSelected);
                //console.log(checkAvailablility(companyInfo, menuSelected.id));
                setActiveSuppliers(checkAvailablility(constructionMachineryInfo, menuSelected.id));
            } else {
                //console.log(menuSelected);
                if(menuSelected.categories !== undefined){
                    //This method is for getting products in a subCategory
                    getCategorizedData("/plant-and-machinery-specializations","subCategory", menuSelected.id)
                    .then(res=>{
                        //console.log(res);
                        getConstructionMachineries(res, props.baseURL)
                        .then(res=>{
                            //console.log(res);
                            let object = {};
                            object.menu = menuSelected.id;
                            object.suppliers = completeCompanyInfo(res, data.counties, data.constituencies);
                            setConstructionMachineryInfo(constructionMachineryInfo.concat(object));
                        })
                    })
                    .catch(err=>{
                        console.log(err.response);
                    })
                }else if (menuSelected.speCatName !== undefined){
                    //This method is for getting products in a subCategory
                    getCategorizedData("/product-specializations","productSpecificCategory", menuSelected.id)
                    .then(res=>{
                        //console.log(res);
                        getConstructionMachineries(res, props.baseURL)
                        .then(res=>{
                            let object = {};
                            object.menu = menuSelected.id;
                            object.suppliers = completeCompanyInfo(res, data.counties, data.constituencies);
                            setConstructionMachineryInfo(constructionMachineryInfo.concat(object));
                        })
                    })
                    .catch(err=>{
                        console.log(err.response);
                    })
                }
                setActiveSuppliers(constructionMachineryInfo.length);
            }
        }
    }, [menuSelected])

    useEffect(()=>{
        window.dataLayer = window.dataLayer || [];

        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-8VYK6XCD9G');
    }, [props.baseURL])

    //const [menuSelected, setMenuSelected] = useState("All");
    
    return (
        <div>
            <Head>
                {/* Global site tag (gtag.js) - Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-8VYK6XCD9G"></script>

                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />

                <title>Plants and Machineries</title>
            </Head>
            
            <Header title='Plants and Machineries' />
            <main className={"body"}>
                <div className={"categoryNavigation"}>
                    {
                        data!=undefined?
                            <CategorySectionSlider 
                                subCategories={data.availableConstructionMachinerySubCategories}
                                setMenuSelected = {(menu)=>setMenuSelected(menu)}
                                menuSelected={menuSelected} 
                            />
                        :undefined
                    }
                </div>
                
                <div className={style.components}>
                    {/* <ConstructionMachinery fullWidth={true} /> */}
                    {
                        constructionMachineryInfo?
                            constructionMachineryInfo.length>0?
                                <ManufacturerAndSupplierComponent
                                    constructionMachineryInfo={constructionMachineryInfo}
                                    activeSuppliers={constructionMachineryInfo[activeSuppliers]?activeSuppliers:previousActiveSuppliers}
                                    baseURL={props.baseURL}
                                    fullWidth={true}
                                />
                            :undefined
                        :undefined
                    }
                </div>
                <div ref={loading}>
                    <Loading />
                </div>
            </main>
        </div>
    )
}
