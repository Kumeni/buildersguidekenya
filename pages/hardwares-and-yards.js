import React, {useEffect, useState, useRef} from 'react'
import style from '../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/subCategory/SubCategory.module.css'
import ManufacturerAndSupplierComponent from '../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent'
import Header from '../components/manufacturersandsuppliers/Header/Header'
import Head from 'next/head'
import {useRouter} from 'next/router'
import axios from 'axios'
import completeCompanyInfo from '../utilities/CompanyInfoComplete'
import Loading from '../components/loading/Loading'

function HardwaresAndYards(props) {

    const [companyInfo, setCompanyInfo] = useState([]);
    const [counties,setCounties] = useState();
	const [constituencies, setConstituencies] = useState();

    const router = useRouter();
    const loading = useRef(null);

    //This block is responsible for restoring initial scroll position
	useEffect(()=>{
        window.scrollTo(0, sessionStorage.getItem(router.pathname+'InitialScrollPos'));
	}, [companyInfo])

	useEffect(()=>{
		window.addEventListener('scroll', ()=>{
			sessionStorage.setItem(router.pathname+'InitialScrollPos', window.scrollY)
		});
	}, [])

    async function getSpecificCategories(){

        loading.current.style.display = 'block';

        const counties = await axios.get(props.baseURL+"/counties?_limit=-1");
        setCounties(counties.data);

        const constituencies = await axios.get(props.baseURL+"/constituencies?_limit=-1");
        setConstituencies(constituencies.data);

        //Getting the first 30 suppliers in this category
        const suppliers = await axios.get(props.baseURL+"/suppliers?supplierCategoryId=2&_limit=10&Approved=true&confirmed=true");

        console.log(suppliers.data);
        setCompanyInfo(companyInfo.concat({
            menu:0,
            suppliers:completeCompanyInfo(suppliers.data, counties.data, constituencies.data)
        }));

        loading.current.style.display="none";
    }

    useEffect(()=>{
        getSpecificCategories();
    },[router.query])

    useEffect(()=>{
        window.dataLayer = window.dataLayer || [];

        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-8VYK6XCD9G');
    }, [props.baseURL])

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

                <meta name="keywords" description={"hardwares, yards, kenya, construction"} />

                <meta name="content" description={"Below is a comprehensive list of hardwares and yards all over Kenya with the products they are selling and location"} />

                <title>Find Hardwares and Yards anywhere in Kenya | Builders Guide Kenya</title>
            </Head>
            
            <Header title={"Hardwares and Yards"} loginData = {props.loginData} setLoginData = { data => props.setLoginData(data)}/>

            <div className={"body"}>
                <div ref={loading}>
                    <Loading />
                </div>
                    
                <div className={style.components}>
                {
                    companyInfo[0]?
                        <ManufacturerAndSupplierComponent 
                                fullWidth={true}
                                companyInfo={companyInfo}
                                activeSuppliers={0}
                                baseURL={props.baseURL}
                        />
                    :''
                }
                </div>
            </div>
        </div>
    )
}

export default HardwaresAndYards
