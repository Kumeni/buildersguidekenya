import React, {useEffect, useState, useRef} from 'react'
import style from '../../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/subCategory/SubCategory.module.css'
import ManufacturerAndSupplierComponent from '../../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent'
import CategorySectionSlider from '../../components/categorySectionSlider/CategorySectionSlider'
import Header from '../../components/manufacturersandsuppliers/Header/Header'
import Head from 'next/head'
import {useRouter} from 'next/router'
import axios from 'axios'
import getSuppliers from '../../utilities/CompanyData'
import completeCompanyInfo from '../../utilities/CompanyInfoComplete'
import Loading from '../../components/loading/Loading'

export default function subCategory(props) {

    const [subCategory, setSubCategory] = useState();
    const [availableMenus, setAvailableMenus] = useState();
    const [menuSelected, setMenuSelected] = useState();
    const [previousActiveSuppliers, setPreviousActiveSuppliers] = useState(0);
    const [activeSuppliers, setActiveSuppliers] = useState(0);
    const [companyInfo, setCompanyInfo] = useState([]);
    const [counties,setCounties] = useState();
	const [constituencies, setConstituencies] = useState();

    const router = useRouter();
    //console.log(router.query);

    const loading = useRef(null);

    async function getSpecificCategories(){
        if(router.query.subCategory){
            loading.current.style.display = 'block';
            const subCategory = await axios.get(props.baseURL+"/sub-categories?subCategory="+router.query.subCategory);
            console.log(subCategory.data);
            setSubCategory(subCategory.data[0]);

            const availableSpecificCategories = await axios.get(props.baseURL+"/specific-categories?suppliersAvailable=true&subCategory="+subCategory.data[0].id);
            console.log(availableSpecificCategories.data);
            setAvailableMenus(availableSpecificCategories.data);

            const counties = await axios.get(props.baseURL+"/counties?_limit=-1");
            setCounties(counties.data);
    
            const constituencies = await axios.get(props.baseURL+"/constituencies?_limit=-1");
            setConstituencies(constituencies.data);

            const specializations = await axios.get(props.baseURL+"/specializations?subCategory="+subCategory.data[0].id+"&_limit=30");
            //console.log(specializations.data);

            let query = '';
    
            specializations.data.map((element,index)=>{
                index===0?query=query+"userId="+element.userId:query=query+"&userId="+element.userId;
            })
            //console.log(query);
        
            //Getting the first 30 suppliers in this category
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
                        object.companyLogo=element.companyLogo;
    
                        newData = newData.concat(object);
                    })
    
                    return newData;
                }]
            });
            console.log(suppliers.data);
            setCompanyInfo(companyInfo.concat({
                menu:0,
                suppliers:completeCompanyInfo(suppliers.data, counties.data, constituencies.data)
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
    async function specializedSuppliers(depth, value){
        let data = await axios.get(props.baseURL+"/specializations?"+depth+"="+value+"&_limit=10")
        .then(res=>{
            return res.data;
        })
        return data;
    }

    useEffect(()=>{
        if(menuSelected){
            console.log(menuSelected.speCatName);
            //moreLink(menuSelected);
            //console.log(checkAvailablility(companyInfo, menuSelected.id));
            if(checkAvailablility(companyInfo, menuSelected.id) !== -1){
                //console.log(menuSelected);
                //console.log(checkAvailablility(companyInfo, menuSelected.id));
                setActiveSuppliers(checkAvailablility(companyInfo, menuSelected.id));
            } else {
                //console.log(menuSelected);
                if(menuSelected.categories !== undefined){
                    
                    specializedSuppliers("subCategory", menuSelected.id)
                    .then(res=>{
                        getSuppliers(res, props.baseURL)
                        .then(res=>{
                            let object = {};
                            object.menu = menuSelected.id;
                            object.suppliers = completeCompanyInfo(res, counties, constituencies);
                            setCompanyInfo(companyInfo.concat(object));
                        })
                    })
                    .catch(err=>{
                        console.log(err.response);
                    })
                }else if (menuSelected.speCatName !== undefined){
                    //console.log('running');
                    specializedSuppliers("specificCategory", menuSelected.id)
                    .then(res=>{
                        //console.log(res);
                        getSuppliers(res, props.baseURL)
                        .then(res=>{
                            let object = {};
                            object.menu = menuSelected.id;
                            object.suppliers = completeCompanyInfo(res, counties, constituencies);
                            setCompanyInfo(companyInfo.concat(object));
                        })
                    })
                }
                setActiveSuppliers(companyInfo.length);
            }
        }
    }, [menuSelected])

    useEffect(()=>{
        if(companyInfo[activeSuppliers]){
            setPreviousActiveSuppliers(activeSuppliers);
        }
    }, [companyInfo, activeSuppliers])

    useEffect(()=>{
        //console.log(companyInfo[activeSuppliers]);
    }, [companyInfo])

    useEffect(()=>{
        console.log("***activeSuppliers***");
        console.log(activeSuppliers);
        console.log(companyInfo[activeSuppliers]);
    },[activeSuppliers])

    useEffect(()=>{
        console.log("***previousActiveSuppliers***");
        console.log(previousActiveSuppliers);
        console.log(companyInfo[previousActiveSuppliers])
    }, [previousActiveSuppliers])

    return (
        <div>
            <Head>
                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />

                <title>Aggregates and Quarrying</title>
            </Head>
            {
                router.query.subCategory?
                    <Header title={router.query.subCategory} />
                :''
            }
            
            {
                availableMenus?
                <div className={style.categorySlider}>
                    <CategorySectionSlider 
                        subCategories={availableMenus} 
                        setMenuSelected = {(menu)=>setMenuSelected(menu)}
                        menuSelected={menuSelected}
                    />
                </div>
                :''
            }
            <div ref={loading}>
				<Loading />
			</div>
                
            <div className={style.components}>
            {
                companyInfo[previousActiveSuppliers]?
                <ManufacturerAndSupplierComponent 
                        fullWidth={true}
                        companyInfo={companyInfo}
                        activeSuppliers={companyInfo[activeSuppliers]?activeSuppliers:previousActiveSuppliers}
                        baseURL={props.baseURL}
                />
                :''
            }
            </div>
        </div>
    )
}
