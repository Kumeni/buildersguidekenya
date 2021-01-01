import {useState, useEffect, useCallback} from 'react'
import style from './CategorySection.module.css'
import SectionTitle from '../categorySections/sectionTitle'
import CategorySectionSlider from '../categorySectionSlider/CategorySectionSlider'
import ManufacturerAndSupplierComponent from '../manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent';
import axios from 'axios'
import getSuppliers from '../../utilities/CompanyData'
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
    const [newLink, setNewLink] = useState("#All");

    const router = useRouter();

    console.log(router.pathname);
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
    useEffect(()=>{
        if(menuSelected){
            //console.log(menuSelected.speCatName);
            moreLink(menuSelected);
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
                            object.suppliers = completeCompanyInfo(res, props.counties, props.constituencies);
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
        }
    }, [menuSelected])

    useEffect(()=>{
        if(companyInfo[activeSuppliers]){
            setPreviousActiveSuppliers(activeSuppliers);
        }
    }, [companyInfo, activeSuppliers])

    useEffect(()=>{
        //console.log(props.subCategories);
    }, [props.subCategories])

    useEffect(()=>{
        console.log(props.link + newLink);
    }, [newLink])
    return (
        <div className={style.categorySection}>
            <SectionTitle title={props.title} link={props.link + newLink} />
            <div className={style.categorySectionContent}>
                <CategorySectionSlider
                    subCategories={props.subCategories}
                    name="manufacturersandsuppliers"
                    setMenuSelected = {(menu)=>setMenuSelected(menu)}
                    menuSelected={menuSelected}
                />
                    <div className={style.categorySectionProducts + ' componentScroll'}>
                        <ManufacturerAndSupplierComponent
                            companyInfo={companyInfo}
                            activeSuppliers={companyInfo[activeSuppliers]?activeSuppliers:previousActiveSuppliers}
                            baseURL={props.baseURL}
                        />
                    </div>
            </div>
        </div>
    )
}

export default CategorySection
