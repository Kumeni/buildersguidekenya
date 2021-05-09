import {useState, useEffect} from 'react'
import style from './CategorySection.module.css'
import SectionTitle from '../categorySections/sectionTitle'
import CategorySectionSlider from '../categorySectionSlider/CategorySectionSlider'
import ManufacturerAndSupplierComponent from '../manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent';
import axios from 'axios'
import getSuppliers from '../../utilities/CompanyData'
import getProducts from '../../utilities/productData'
import getConstructionMachineries from '../../utilities/constructionMachineryData'
import completeCompanyInfo from '../../utilities/CompanyInfoComplete'
import {useRouter} from 'next/router'

function CategorySection(props) {
    const [menuSelected, setMenuSelected] = useState();

    const [previousActiveSuppliers, setPreviousActiveSuppliers] = useState(0);
    const [activeSuppliers, setActiveSuppliers] = useState(0);

    const [companyInfo, setCompanyInfo] = useState([{
        menu:0,
        suppliers:props.companyInfo
    }]);
    const [productInfo, setProductInfo] = useState([{
        menu:0,
        suppliers:props.productInfo
    }])
    const [constructionMachineryInfo, setConstructionMachineryInfo] = useState([{
        menu:0,
        suppliers:props.constructionMachineryInfo
    }])
    const [vehiclesInfo, setVehiclesInfo] = useState([{
        menu:0,
        suppliers:props.vehiclesInfo
    }])

    const [newLink, setNewLink] = useState("#All");

    const router = useRouter();

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
    async function getCategorizedData(url, depth, value){
        let data = await axios.get(props.baseURL+url+"?"+depth+"="+value+"&_limit=10")
        .then(res=>{
            return res.data;
        })
        return data;
    }
    // async function specializedSuppliers(depth, value){
    //     let data = await axios.get(props.baseURL+"/specializations?"+depth+"="+value+"&_limit=10")
    //     .then(res=>{
    //         return res.data;
    //     })
    //     return data;
    // }

    //This function is responsible for fetching specialized products from the database
    // async function specializedProducts(depth, value){
    //     let data = await axios.get(props.baseURL+"/product-specializations?"+depth+"="+value+"&_limit=10")
    //     .then(res=>{
    //         return res.data;
    //     })
    //     return data;
    // }

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

    //This hook will be used to check which menu was selected
    //Add the functionality for menu selection
    useEffect(()=>{
        if(menuSelected){
            moreLink(menuSelected);
            if(props.companyInfo){
                if(checkAvailablility(companyInfo, menuSelected.id) !== -1){
                    //console.log(menuSelected);
                    //console.log(checkAvailablility(companyInfo, menuSelected.id));
                    setActiveSuppliers(checkAvailablility(companyInfo, menuSelected.id));
                } else {
                    //console.log(menuSelected);
                    if(menuSelected.categories !== undefined){
                        //This method is for getting suppliers in a subCategory
                        getCategorizedData("/specializations","subCategory", menuSelected.id)
                        .then(res=>{
                            getSuppliers(res, props.baseURL)
                            .then(res=>{
                                let object = {};
                                object.menu = menuSelected.id;
                                object.suppliers = completeCompanyInfo(res, props.counties, props.constituencies);
                                setCompanyInfo(companyInfo.concat(object));
                            })
                        })
                        .catch(err=>{
                            console.log(err.response);
                        })
                    }else if (menuSelected.speCatName !== undefined){
                        //console.log('running');
                        //This method is for getting suppliers in a specificCategory
                        getCategorizedData("/specializations","specificCategory", menuSelected.id)
                        .then(res=>{
                            //console.log(res);
                            getSuppliers(res, props.baseURL)
                            .then(res=>{
                                let object = {};
                                object.menu = menuSelected.id;
                                object.suppliers = completeCompanyInfo(res, props.counties, props.constituencies);
                                setCompanyInfo(companyInfo.concat(object));
                            })
                        })
                        .catch(err=>{
                            console.log(err.response);
                        })
                    }
                    setActiveSuppliers(companyInfo.length);
                }
            } else if(props.productInfo){
                if(checkAvailablility(productInfo, menuSelected.id) !== -1){
                    //console.log(menuSelected);
                    //console.log(checkAvailablility(companyInfo, menuSelected.id));
                    setActiveSuppliers(checkAvailablility(productInfo, menuSelected.id));
                } else {
                    //console.log(menuSelected);
                    if(menuSelected.categories !== undefined){
                        //This method is for getting products in a subCategory
                        getCategorizedData("/product-specializations","productSubCategory", menuSelected.id)
                        .then(res=>{
                            //console.log(res);
                            getProducts(res, props.baseURL)
                            .then(res=>{
                                //console.log(res);
                                let object = {};
                                object.menu = menuSelected.id;
                                object.suppliers = completeCompanyInfo(res, props.counties, props.constituencies);
                                setProductInfo(productInfo.concat(object));
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
                            getProducts(res, props.baseURL)
                            .then(res=>{
                                let object = {};
                                object.menu = menuSelected.id;
                                object.suppliers = completeCompanyInfo(res, props.counties, props.constituencies);
                                setProductInfo(productInfo.concat(object));
                            })
                        })
                        .catch(err=>{
                            console.log(err.response);
                        })
                    }
                    setActiveSuppliers(productInfo.length);
                }
            } else if(props.constructionMachineryInfo){
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
                                object.suppliers = completeCompanyInfo(res, props.counties, props.constituencies);
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
                                object.suppliers = completeCompanyInfo(res, props.counties, props.constituencies);
                                setConstructionMachineryInfo(constructionMachineryInfo.concat(object));
                            })
                        })
                        .catch(err=>{
                            console.log(err.response);
                        })
                    }
                    setActiveSuppliers(constructionMachineryInfo.length);
                }
            } else if(props.vehiclesInfo){
                if(checkAvailablility(vehiclesInfo, menuSelected.id) !== -1){
                    //console.log(menuSelected);
                    //console.log(checkAvailablility(companyInfo, menuSelected.id));
                    setActiveSuppliers(checkAvailablility(vehiclesInfo, menuSelected.id));
                } else {
                    console.log(menuSelected);
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
                                object.suppliers = completeCompanyInfo(res, props.counties, props.constituencies);
                                setConstructionMachineryInfo(constructionMachineryInfo.concat(object));
                            })
                        })
                        .catch(err=>{
                            console.log(err.response);
                        })
                    }else if (menuSelected.speCatName !== undefined){
                        //This method is for getting products in a subCategory
                        getCategorizedData("/transport-vehicles","vehicleType", menuSelected.id)
                        .then(res=>{
                            //console.log(res);
                            getConstructionMachineries(res, props.baseURL)
                            .then(res=>{
                                let object = {};
                                object.menu = menuSelected.id;
                                object.suppliers = completeCompanyInfo(res, props.counties, props.constituencies);
                                setConstructionMachineryInfo(constructionMachineryInfo.concat(object));
                            })
                        })
                        .catch(err=>{
                            console.log(err.response);
                        })
                    } else if(menuSelected.name!=undefined){
                        //This method is for getting products in a subCategory
                        console.log("Fetching the vehicles");
                        getCategorizedData("/transport-vehicles","vehicleType", menuSelected.id)
                        .then(res=>{
                            //console.log(res);
                            let object = {};
                            object.menu = menuSelected.id;
                            object.suppliers = completeCompanyInfo(res, props.counties, props.constituencies);
                            setVehiclesInfo(vehiclesInfo.concat(object));
                        })
                        .catch(err=>{
                            console.log(err.response);
                        })
                    }
                    setActiveSuppliers(vehiclesInfo.length);
                }
            }
        }
    }, [menuSelected])

    if(props.companyInfo){
        useEffect(()=>{
            if(companyInfo[activeSuppliers]){
                setPreviousActiveSuppliers(activeSuppliers);
            }
        }, [companyInfo, activeSuppliers])    
    } else if(props.productInfo){
        useEffect(()=>{
            if(productInfo[activeSuppliers]){
                setPreviousActiveSuppliers(activeSuppliers);
            }
        }, [productInfo, activeSuppliers])
    } else if(props.constructionMachineryInfo){
        useEffect(()=>{
            if(constructionMachineryInfo[activeSuppliers]){
                setPreviousActiveSuppliers(activeSuppliers);
            }
        }, [constructionMachineryInfo, activeSuppliers])
    } else if(props.vehiclesInfo){
        useEffect(()=>{
            if(vehiclesInfo[activeSuppliers]){
                setPreviousActiveSuppliers(activeSuppliers);
            }
        }, [vehiclesInfo, activeSuppliers])
    }

    return (
        <div className={style.categorySection}>
            <SectionTitle title={props.title} link={props.link + newLink} />
            <div className={style.categorySectionContent}>
                {
                    props.subCategories?
                        <CategorySectionSlider
                            subCategories={props.subCategories}
                            name="manufacturersandsuppliers"
                            setMenuSelected = {(menu)=>setMenuSelected(menu)}
                            menuSelected={menuSelected}
                        />
                    :undefined
                }
                    <div className={style.categorySectionProducts + ' componentScroll'}>
                        {
                            props.companyInfo?
                                <ManufacturerAndSupplierComponent
                                    companyInfo={companyInfo}
                                    activeSuppliers={companyInfo[activeSuppliers]?activeSuppliers:previousActiveSuppliers}
                                    baseURL={props.baseURL}
                                />
                            :props.productInfo?
                                <ManufacturerAndSupplierComponent
                                    productInfo={productInfo}
                                    activeSuppliers={productInfo[activeSuppliers]?activeSuppliers:previousActiveSuppliers}
                                    baseURL={props.baseURL}
                                />
                            :props.constructionMachineryInfo?
                                <ManufacturerAndSupplierComponent
                                    constructionMachineryInfo={constructionMachineryInfo}
                                    activeSuppliers={constructionMachineryInfo[activeSuppliers]?activeSuppliers:previousActiveSuppliers}
                                    baseURL={props.baseURL}
                                />
                            :props.vehiclesInfo?
                                <ManufacturerAndSupplierComponent
                                    vehiclesInfo={vehiclesInfo}
                                    activeSuppliers={vehiclesInfo[activeSuppliers]?activeSuppliers:previousActiveSuppliers}
                                    baseURL={props.baseURL}
                                />
                            :undefined
                        }
                    </div>
            </div>
        </div>
    )
}

export default CategorySection