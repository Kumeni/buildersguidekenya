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

    const [availableVehicleTypes, setAvailableVehicleTypes] = useState();
    const [data ,setData] = useState();
    //const [availableMenus, setAvailableMenus] = useState();
    const [menuSelected, setMenuSelected] = useState();
    const [previousActiveSuppliers, setPreviousActiveSuppliers] = useState(0);
    const [activeSuppliers, setActiveSuppliers] = useState(0);
    const [vehiclesInfo, setVehiclesInfo] = useState([]);
    const [storedSelectedMenu, setStoredSelectedMenu] = useState("All");
    const [lastScrollPos, setLastScrollPos] = useState();

    const router = useRouter();
    const loading = useRef(null);

    useEffect(()=>{
        if(router && lastScrollPos == undefined)
            if(sessionStorage.getItem(router.pathname+'InitialScrollPos'))
                setLastScrollPos(Number(sessionStorage.getItem(router.pathname+'InitialScrollPos')));
    }, [router])

    //This block is supposed to be responsible for remembering initial selectedMenu
    useEffect(()=>{
        if (sessionStorage.getItem(router.pathname+'InitialMenu'))
			setStoredSelectedMenu(sessionStorage.getItem(router.pathname+'InitialMenu'));
		else if(props.pagesData.transportVehicles && props.pagesData.transportVehicles.storedSelectedMenu)
			setStoredSelectedMenu(props.pagesData.transportVehicles.storedSelectedMenu);
        else if(router.query.category!=undefined)
			setStoredSelectedMenu(router.query.categrory);
		//console.log(sessionStorage.getItem(router.pathname+'InitialMenu'));
    }, [props.pagesData, router.pathname])

    
	//This block stores selected menu in memory and in browsers storage
    useEffect(()=>{
        console.log(menuSelected);
        if(menuSelected){
            /*if(router.query.category && menuSelected.name != router.query.category){
                router.replace('/transport-vehicles');
            }*/
            let holder = props.pagesData;
            if(holder.transportVehicles)
            holder.transportVehicles.storedSelectedMenu = menuSelected.name;
            props.setPagesData(holder);
            sessionStorage.setItem( router.pathname+'InitialMenu' , menuSelected.name);
        }
    }, [menuSelected])

	//This block is responsible for restoring initial scroll position
	useEffect(()=>{
		if(menuSelected!= undefined)
			if(lastScrollPos && vehiclesInfo.length > 0 && menuSelected.name == sessionStorage.getItem(router.pathname+'InitialMenu')){
                window.scroll({
                    top:lastScrollPos,
                    left:0,
                    behavior:'smooth'
                });
                setLastScrollPos();
            }
	}, [menuSelected, vehiclesInfo, lastScrollPos])

	useEffect(()=>{
		window.addEventListener('scroll', ()=>{
			sessionStorage.setItem(router.pathname+'InitialScrollPos', window.scrollY)
		});
	}, [])

    //This function is responsible for fetching initial page data
    const getData = async()=>{
        const availableVehicleTypes = await axios.get(props.baseURL+"/transporter-vehicle-types?vehiclesAvailable=true");

        const transportVehicles = await axios.get(props.baseURL+"/transport-vehicles?deleted=false&approved=true&blocked=false&_limit=10");

        const counties = await axios.get(props.baseURL+"/counties?_limit=-1");
  
    	const constituencies = await axios.get(props.baseURL+"/constituencies?_limit=-1");

		let data = {
			vehiclesInfo:transportVehicles.data,
			availableVehicleTypes:availableVehicleTypes.data,
            counties:counties.data,
            constituencies:constituencies.data
		}
		
		setData(data);

        setVehiclesInfo(vehiclesInfo.concat({
            menu:0,
            suppliers:completeCompanyInfo(data.vehiclesInfo, data.counties, data.constituencies)
        }));

        loading.current.style.display="none";
    }
    useEffect(()=>{
        getData();
    }, [props.baseURL]);

    useEffect(()=>{
        if(vehiclesInfo[activeSuppliers]){
            setPreviousActiveSuppliers(activeSuppliers);
        }
    }, [vehiclesInfo, activeSuppliers])

    useEffect(()=>{
        console.log(vehiclesInfo);
    }, [vehiclesInfo])
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
            if(checkAvailablility(vehiclesInfo, menuSelected.id) !== -1){
                //console.log(menuSelected);
                //console.log(checkAvailablility(companyInfo, menuSelected.id));
                setActiveSuppliers(checkAvailablility(vehiclesInfo, menuSelected.id));
            } else {
                console.log(menuSelected);
                if(menuSelected.name!=undefined){
                    //This method is for getting products in a subCategory
                    console.log("Fetching the vehicles");
                    getCategorizedData("/transport-vehicles","vehicleType", menuSelected.id)
                    .then(res=>{
                        //console.log(res);
                        let object = {};
                        object.menu = menuSelected.id;
                        console.log(object);
                        object.suppliers = completeCompanyInfo(res, data.counties, data.constituencies);
                        console.log(object);
                        setVehiclesInfo(vehiclesInfo.concat(object));
                    })
                    .catch(err=>{
                        console.log(err.response);
                    })
                }
                setActiveSuppliers(vehiclesInfo.length);
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
    function keywords(){
        let keywords = "transport, vehicles, kenya";
        if(data && data.availableVehicleTypes)
            data.availableVehicleTypes.map((element, index)=>{
                keywords += ", "+element.name;
            })
        keywords = ",lorry, kanta, lori"
            return keywords;
    }
    function metaDescription(){
        let description = "Find transport vehicles for hire or sale in Kenya";
        if(data && data.availableVehicleTypes){
            let vehicleTypes = " such as ";
            data.availableVehicleTypes.map((element, index)=>{
                if(index == data.availableVehicleTypes.length-1){
                    vehicleTypes +=element.name;
                } else {
                    vehicleTypes +=", "+element.name;
                }
            })
            description = "Find transport vehicles"+ vehicleTypes +" for hire or sale in Kenya";
        }
        return description;
    }
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

                <meta name="description" content={metaDescription()} />

                <meta name="keywords" content={keywords()} />

                <title>Find transport vehicles for hire or sale in Kenya</title>
            </Head>
            
            <Header title='Transport vehicles' />
            <main className={"body"}>
                <div className={"categoryNavigation"}>
                    {
                        data!=undefined?
                            <CategorySectionSlider 
                                subCategories={data.availableVehicleTypes}
                                setMenuSelected = {(menu)=>setMenuSelected(menu)}
                                menuSelected={menuSelected} 
                                storedSelectedMenu={storedSelectedMenu}
                            />
                        :undefined
                    }
                </div>
                
                <div className={style.components}>
                    {/* <ConstructionMachinery fullWidth={true} /> */}
                    {
                        vehiclesInfo?
                            vehiclesInfo.length>0?
                                <ManufacturerAndSupplierComponent
                                    vehiclesInfo={vehiclesInfo}
                                    activeSuppliers={vehiclesInfo[activeSuppliers]?activeSuppliers:previousActiveSuppliers}
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
