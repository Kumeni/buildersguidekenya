import React, {useEffect, useState, useRef} from 'react'
import style from '../../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/subCategory/SubCategory.module.css'
import ManufacturerAndSupplierComponent from '../../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent'
import CategorySectionSlider from '../../components/categorySectionSlider/CategorySectionSlider'
import Header from '../../components/manufacturersandsuppliers/Header/Header'
import Head from 'next/head'
import {useRouter} from 'next/router'
import axios from 'axios'
import getProducts from '../../utilities/productData'
import completeCompanyInfo from '../../utilities/CompanyInfoComplete'
import Loading from '../../components/loading/Loading'

export default function subCategory(props) {

    const [subCategory, setSubCategory] = useState();
    const [availableMenus, setAvailableMenus] = useState();
    const [menuSelected, setMenuSelected] = useState();
    const [previousActiveSuppliers, setPreviousActiveSuppliers] = useState(0);
    const [activeSuppliers, setActiveSuppliers] = useState(0);
    const [productInfo, setProductInfo] = useState([]);
    const [counties,setCounties] = useState();
	const [constituencies, setConstituencies] = useState();
    const [pathname, setPathname] = useState();
    const [storedSelectedMenu, setStoredSelectedMenu] = useState();
    const [lastScrollPos, setLastScrollPos] = useState();

    const router = useRouter();
    const loading = useRef(null);

    function categoryExists(){
        let position = -1;
        props.pagesData.productsAndServices.categories.map((element, index)=>{
            if(element.name == router.query.subCategory){
                position = index;
            }
        })
        return position;
    }

    //This block creates a pathname page specific
    useEffect(()=>{
        if(pathname == undefined && router.query.subCategory){
            setPathname(router.pathname+'/'+router.query.subCategory);
            sessionStorage.setItem('pathname', router.pathname+'/'+router.query.subCategory);
        }
    }, [router])

    //This block stores page data in memory
    useEffect(()=>{
        let holder = props.pagesData;
        if(holder.productsAndServices.categories == undefined && router.query.subCategory){
            let object = {};
            object.name = router.query.subCategory;

            holder.productsAndServices.categories = [];
            holder.productsAndServices.categories.push(object);

            props.setPagesData(holder);
        }

        //console.log(props.pagesData);
    }, [props.pagesData, router])

    //This block is supposed to be responsible for remembering initial selectedMenu
    useEffect(()=>{
        if(storedSelectedMenu == undefined && productInfo.length > 0 && pathname != undefined){
            if(props.pagesData.productsAndServices.categories && storedSelectedMenu == undefined)
                if(router.query.category!=undefined)
                    setStoredSelectedMenu(router.query.categrory);
                else if(props.pagesData.productsAndServices.categories[categoryExists()].storedSelectedMenu)
                    setStoredSelectedMenu(props.pagesData.productsAndServices.categories[categoryExists()].storedSelectedMenu);
                else if (sessionStorage.getItem(pathname+'InitialMenu'))
                    setStoredSelectedMenu(sessionStorage.getItem(pathname+'InitialMenu'));
                
        }
    }, [pathname, productInfo])

    //This block is responsible for remembering the initial scroll position
	useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            console.log(sessionStorage.getItem('pathname')+'InitialScrollPos');
            if(window.scrollY > 0)
                sessionStorage.setItem(sessionStorage.getItem('pathname')+'InitialScrollPos', window.scrollY);
        })
	}, [])

    useEffect(()=>{
        if(pathname && lastScrollPos == undefined){
            console.log(sessionStorage.getItem(pathname+'InitialScrollPos'));
            setLastScrollPos(sessionStorage.getItem(pathname+'InitialScrollPos'));
        }
    }, [pathname])

    //This block scrolls the page to the last scroll location
    useEffect(()=>{
        if(lastScrollPos && pathname){
            if(sessionStorage.getItem(pathname+'InitialMenu') == null && menuSelected == undefined){
                if(productInfo && productInfo.length > 0 ){
                    window.scroll({
                        top:lastScrollPos,
                        left:0,
                        behavior:'smooth'
                    });
                    setLastScrollPos();
                }
            } else if (menuSelected && menuSelected.speCatName == sessionStorage.getItem(pathname+'InitialMenu')){
                //check productInfo for the menu first then scroll
                if(productInfo && productInfo.length > 0){
                    console.log("Wow");
                    let scroll = false;
                    productInfo.map((element, index)=>{
                        if(element.menu == menuSelected.id)
                            scroll = true;
                    })

                    if(scroll){
                        window.scroll({
                            top:lastScrollPos,
                            left:0,
                            behavior:'smooth'
                        })
                        setLastScrollPos();
                    }
                }
            }
        }
    }, [lastScrollPos, menuSelected, productInfo, pathname])

    //This block stores selected menu in memory and in browsers storage
    useEffect(()=>{
        if(menuSelected){
            /*if(menuSelected.speCatName != router.query.category){
                router.replace('/products-and-services/'+router.query.subCategory);
            }*/
            //console.log(menuSelected);
            //console.log(props.pagesData.productsAndServices.categories);
            
            let holder = props.pagesData, categoryIndex = categoryExists();
            holder.productsAndServices.updateTime = Date.now();
            
            if(categoryIndex == -1){
                let object = {};
                object.name = router.query.subCategory;
                object.storedSelectedMenu = menuSelected.speCatName;
                
                holder.productsAndServices.categories.push(object);

                props.setPagesData(holder);
            } else {
                holder.productsAndServices.categories[categoryIndex].storedselectedMenu = menuSelected.speCatName;
            }

            props.setPagesData(holder);

            sessionStorage.setItem( pathname+'InitialMenu' , menuSelected.speCatName);
            //console.log(sessionStorage.getItem(pathname+'InitialMenu'));
        }
    }, [menuSelected])

    async function getSpecificCategories(){
        if(router.query.subCategory){
            loading.current.style.display = 'block';
            const subCategory = await axios.get(props.baseURL+"/sub-categories?subCategory="+router.query.subCategory);
            //console.log(subCategory.data);
            setSubCategory(subCategory.data[0]);

            const availableSpecificCategories = await axios.get(props.baseURL+"/specific-categories?productsAvailable=true&subCategory="+subCategory.data[0].id);
            //console.log(availableSpecificCategories.data);
            setAvailableMenus(availableSpecificCategories.data);

            const counties = await axios.get(props.baseURL+"/counties?_limit=-1");
            setCounties(counties.data);
    
            const constituencies = await axios.get(props.baseURL+"/constituencies?_limit=-1");
            setConstituencies(constituencies.data);

            console.log(subCategory.data[0].id);
            const productSpecializations = await axios.get(props.baseURL+"/product-specializations?productSubCategory="+subCategory.data[0].id+"&_limit=30");
            console.log(productSpecializations.data);

            let query = '';
    
            productSpecializations.data.map((element,index)=>{
                index===0?query=query+"id="+element.productId:query=query+"&id="+element.productId;
            })
            //console.log(query);
        
            //Getting the first 30 suppliers in this category
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

            //console.log(products.data);
            setProductInfo(productInfo.concat({
                menu:0,
                suppliers:completeCompanyInfo(products.data, counties.data, constituencies.data)
            }));
            loading.current.style.display="none";
        }
    }

    useEffect(()=>{
        getSpecificCategories();
    },[router.query])

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

    //This function is responsible for fetching specialized suppliers from the database
    async function specializedProducts(depth, value){
        let data = await axios.get(props.baseURL+"/product-specializations?"+depth+"="+value+"&_limit=10")
        .then(res=>{
            return res.data;
        })
        return data;
    }

    useEffect(()=>{
        if(menuSelected){
            //moreLink(menuSelected);
            //console.log(checkAvailablility(companyInfo, menuSelected.id));
            if(checkAvailablility(productInfo, menuSelected.id) !== -1){
                //console.log(menuSelected);
                //console.log(checkAvailablility(companyInfo, menuSelected.id));
                setActiveSuppliers(checkAvailablility(productInfo, menuSelected.id));
            } else {
                //console.log(menuSelected);
                if(menuSelected.categories !== undefined){
                    specializedProducts("productSubCategory", menuSelected.id)
                    .then(res=>{
                        getProducts(res, props.baseURL)
                        .then(res=>{
                            let object = {};
                            object.menu = menuSelected.id;
                            object.suppliers = completeCompanyInfo(res, counties, constituencies);
                            setProductInfo(productInfo.concat(object));
                        })
                    })
                    .catch(err=>{
                        console.log(err.response);
                    })
                }else if (menuSelected.speCatName !== undefined){
                    specializedProducts("productSpecificCategory", menuSelected.id)
                    .then(res=>{
                        console.log(res);
                        getProducts(res, props.baseURL)
                        .then(res=>{
                            let object = {};
                            object.menu = menuSelected.id;
                            object.suppliers = completeCompanyInfo(res, counties, constituencies);
                            setProductInfo(productInfo.concat(object).slice());
                        })
                    })
                }
                setActiveSuppliers(productInfo.length);
            }
        }
    }, [menuSelected])

    useEffect(()=>{
        if(productInfo[activeSuppliers]){
            setPreviousActiveSuppliers(activeSuppliers);
        }
    }, [productInfo, activeSuppliers])

    useEffect(()=>{
        //console.log(companyInfo[activeSuppliers]);
    }, [productInfo])

    useEffect(()=>{
        window.dataLayer = window.dataLayer || [];

        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-8VYK6XCD9G');
    }, [props.baseURL])

    function listAvailableMenus(){
        if(availableMenus){
            let theMenus = "";
            availableMenus.map((element, index)=>{
                if(index == 0)
                    theMenus+=element.speCatName;
                else if(index == availableMenus.length-1)
                    theMenus+="and "+element.speCatName;
                else 
                    theMenus+=", "+element.speCatName;
            })
            return "such as "+theMenus;
        }
        return "";
    }

    useEffect(()=>{
        if(availableMenus)
            console.log(availableMenus)
    }, [availableMenus])
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

                <meta name='keywords' description={router.query.subCategory?router.query.subCategory.replace(/and/, '').replace(/\s/, ', ')+" kenya, materials, products, services":""} />

                <meta name="content" description= {router.query.subCategory? "Find "+ router.query.subCategory+" materials, products and related services for your construction project"+ listAvailableMenus() +" anywhere in Kenya":""} />

                <title>{router.query.subCategory?router.query.subCategory+" products and services in Kenya and East African Community | Builders Guide Kenya":''}</title>
            </Head>
            {
                router.query.subCategory?
                    <Header title={router.query.subCategory} />
                :''
            }
            <main className={"body"}>
                {
                    availableMenus?
                    <div className={"categoryNavigation "+style.categorySlider}>
                        <CategorySectionSlider 
                            subCategories={availableMenus} 
                            setMenuSelected = {(menu)=>setMenuSelected(menu)}
                            menuSelected={menuSelected}
                            storedSelectedMenu={storedSelectedMenu}
                        />
                    </div>
                    :''
                }
                <div ref={loading}>
                    <Loading />
                </div>
                    
                <div className={style.components}>
                {
                    productInfo[previousActiveSuppliers]?
                    <ManufacturerAndSupplierComponent 
                            fullWidth={true}
                            productInfo={productInfo}
                            activeSuppliers={productInfo[activeSuppliers]?activeSuppliers:previousActiveSuppliers}
                            baseURL={props.baseURL}
                    />
                    :''
                }
                </div>
            </main>
        </div>
    )
}
