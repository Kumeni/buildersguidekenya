import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import {useEffect, useState, useRef} from 'react'
import Header from '../../../components/manufacturersandsuppliers/Header/Header'
import ProductDetails from '../../../components/productpage/productDetails/ProductDetails'
import ProductImage from '../../../components/productpage/productImageContainer/ProductImage'
import productInfo from '../../../server_data/hot_deals'
import Section from '../../../components/categorySections/section'
import style from '../../../components/productpage/productpage.module.css'
import TrendingComponent from '../../../components/trendingComponent/trendingComponent'
import {useRouter} from 'next/router'
import companyInfoComplete from '../../../utilities/CompanyInfoComplete'
import Footer from '../../../components/footerComponent/Footer'
import CallToAction from '../../../components/productpage/callToAction/CallToAction'
import WindowPopUp from '../../../components/WindowPopUp/WindowPopUp'
import UserAction from '../../../components/callToAction/UserAction'
import Notification from '../../../components/notification/Notification'

function MaterialProductPage(props){

    const router = useRouter();

    const [productImages, setProductImages] = useState();
    const [productDetails, setProductDetails] = useState();
    const [supplierInformation, setSupplierInformation] = useState();
    const [supplierContact, setSupplierContact] = useState();
    const [supplierEmails, setSupplierEmails] = useState();
    const [productPricings, setProductPricings] = useState();
    const [productBrochure, setProductBrochure] = useState([]);
    const [articles, setArticles] = useState();
    const [brochureExtension, setBrochureExtension] = useState();
    const [showCover, setShowCover] = useState(false);
    const [lastScrollPos, setLastScrollPos] = useState();
    const [price, setPrice] = useState();
    const [initialPrice, setInitialPrice] = useState();
    const [activePricing, setActivePricing] = useState(0);
    const [pickupLocations, setPickupLocations] = useState();
    const [transportationCosts, setTransportationCosts] = useState();
    const [pickupCounties, setPickupCounties] = useState();
    const [pickupConstituencies, setPickupConstituencies] = useState();

    const [orderResponse, setOrderResponse] = useState();
    const [showNotification, setShowNotification] = useState();
    const [position, setPosition] = useState();

    const body = useRef(null);
    const userAction = useRef(null);
    /*useEffect(()=>{
        console.log(productPricings);
    }, [productPricings])*/

    const handleVariation = index => {
        console.log(index);
        updateProductPrice(productPricings, index);
    }

    const updateProductPrice = (pricingArray, index=activePricing) => {
        if(pricingArray[index]){
            setPrice(pricingArray[index].unitPrice);
            if( 
                pricingArray[index].initialUnitPrice == null || pricingArray[index].initialUnitPrice == '' || 
                    pricingArray[index].initialUnitPrice == pricingArray[index].unitPrice){
                setInitialPrice();
            } else 
                setInitialPrice(pricingArray[index].initialUnitPrice);
            setProductPricings(pricingArray.concat([]));
        }
    }
    
    useEffect(()=>{
        if(productBrochure.length > 0){
			//console.log("Product brochure");
            //console.log(productBrochure);
            setBrochureExtension(productBrochure[0].productBrochure.ext);
        }
    }, [productBrochure])

    useEffect(()=>{
        if (router.query.v){
            async function getProductData(){
                const productId = parseInt(router.query.v, 32);

                const counties = await axios.get(props.baseURL+'/counties?_limit=-1');

                const constituencies = await axios.get(props.baseURL+'/constituencies?_limit=-1');

                const productDetailsFromDB = await axios.get(props.baseURL+'/products/'+ productId)
                .then(async res=>{
                    setProductDetails(companyInfoComplete([res.data], counties.data, constituencies.data));
                    //console.log(companyInfoComplete([res.data], counties.data, constituencies.data));
                    return res;
                })
                .catch(err=>{
                    console.log(err.response);
                })

                /*const productImages = await*/ axios.get(props.baseURL+'/product-images?productId='+ productId +'&approved=true&deleted=false&blocked=false')
                .then(res=>{
                    //console.log(res.data);
                    setProductImages(res.data);
                })
                .catch(err=>{
                    console.log(err.response);
                })

                /*await*/ axios.get(props.baseURL+'/product-pricings?productId='+ productId)
                .then(res=>{
                    //console.log(res.data);
                    setProductPricings(res.data);
                    if(res.data.length > 0){
                        console.log("Im running 1");
                        updateProductPrice(res.data);
                    }
                    return res;
                })
                .catch(err=>{
                    console.log(err.response);
                })

                /*await*/ axios.get(props.baseURL+'/product-brochures?productId='+ productId)
                .then(res=>{
					//console.log("Product brochure");
                    //console.log(res.data);
                    setProductBrochure(res.data);
                    return res;
                })
                .catch(err=>{
                    console.log(err.response);
                })

                /*await*/ axios.get(props.baseURL+"/articles?_limit=7",{
                    transformResponse:[function(data){
                        let newData = JSON.parse(data);
                        newData.map(element=>{
                        element.content=null;
                        })
                        //console.log(newData);
                        return newData;
                    }]
                }).then(res=>{
                    //console.log(res.data);
                    setArticles(res.data);
                })

                axios.get(props.baseURL+'/pickup-locations?_limit=-1')
                .then( res => {
                    setPickupLocations(res.data);
                    let countiesArray =[], constituenciesArray = [];
                    
                    res.data.map((element, index) => {
                        if(countiesArray.indexOf(element.countyId) == -1)
                            countiesArray.push(element.countyId);
                        if(constituenciesArray.indexOf(element.constituencyId) == -1)
                            constituenciesArray.push(element.constituencyId);
                    })

                    let i, j;
                    for (i = 0; i < countiesArray.length; i++){
                        for(j = 0; j < counties.data.length; j++){
                            if(counties.data[j].id == countiesArray[i]){
                                countiesArray[i] = counties.data[j];
                                break;
                            }
                        }
                    }
                    
                    for(i = 0; i < constituenciesArray.length; i++){
                        for(j = 0; j < constituencies.data.length; j++){
                            if(constituencies.data[j].id == constituenciesArray[i]){
                                constituenciesArray[i] = constituencies.data[j];
                                break;
                            }
                        }
                    }
                   
                    setPickupCounties(countiesArray);
                    setPickupConstituencies(constituenciesArray);
                })

                axios.get(props.baseURL+"/transportation-costs?_limit=-1")
                .then( res =>{
                    setTransportationCosts(res.data);
                })
            }
            getProductData();
        }
    },[router.query])

    useEffect(()=>{
        if(productDetails!==undefined){
            axios.get(props.baseURL+'/suppliers?userId='+productDetails[0].supplierId)
            .then(res=>{
                //console.log(res.data[0]);
                setSupplierInformation(res.data[0]);
                return res;
            })

            axios.get(props.baseURL+'/supplier-cellphone-nos?userId='+productDetails[0].supplierId+'&_limit=2')
            .then(res=>{
                //console.log(res.data);
                setSupplierContact(res.data);
                return res;
            })

            axios.get(props.baseURL+'/supplier-emails?userId='+productDetails[0].supplierId+'&_limit=2')
            .then(res=>{
                //console.log(res.data);
                setSupplierEmails(res.data);
                return res;
            })
        }
    }, [productDetails])

    const brochureType = brochureExtension => {
        let imageTypes = ['.jpg','.jpeg', '.png', '.PNG', '.JPG', '.JPEG'];
        let docTypes = ['.doc', '.docx', '.pdf', '.DOC', '.DOCX', '.PDF'];
        let excelTypes = ['.xls', '.xlsx', '.XLS', '.XLSX'];

        if(imageTypes.indexOf(brochureExtension) !== -1){
			console.log("Extension found");
            return 1;
        }else if(docTypes.indexOf(brochureExtension) !== -1){
			console.log("Extension found");
            return 2;
        }else if(excelTypes.indexOf(brochureExtension) !==-1){
			console.log("Extension found");
            return 3;
        }else{
			console.log("Extension not found");
            return 0;
        }
    }

    const handleShowCover = data => {
        //Display the cover.
        //Reduce the document height to that of the cover.
        //On resize show cover should be called.
        if(data === true){
            setShowCover(true);
            setTimeout(()=>{
                body.current.style.height = userAction.current.getBoundingClientRect().height+"px";
            }, 500)
            setLastScrollPos(window.scrollY);
            body.current.style.overflowY= "hidden";
            window.scroll(0,0);
        } else if ( data === false){
            setShowCover(false);
            window.scroll(0,lastScrollPos);
            setLastScrollPos();
            body.current.style.height = "auto";
        } else {
            handleShowCover(false);
        }
    }

    const handleShowNotification = (data) => {
        console.log(orderResponse);
        if(data === false){
            setShowNotification(false);
            //if its a success
            handleShowCover(false);

            //if its a failure
        }
    }

    
    function metaDescription(){
        let fullDescription = "";
        if(productDetails){
            fullDescription += productDetails[0].productDescription;
        }
        return fullDescription;
    }

    function keywords(){
        let keywords = "";
        if(productDetails){
            keywords += productDetails[0].productName.replace(/\s/, " , ")+productDetails[0].county+" ,"+productDetails[0].constituency;
        }
        if(supplierInformation){
            keywords += supplierInformation.companyName;
        }
        return keywords;
    }

    function title(){
        let title = "";
        if(productDetails){
            title += productDetails[0].productName+" in "+productDetails[0].county+ " -> "+productDetails[0].constituency +" -> "+ productDetails[0].estate;
        }
        if(supplierInformation){
            title += " supplied by "+supplierInformation.companyName;
            title += " | Builders Guide Kenya";
        }
        return title;
    }

    return (
        <div ref={body}>
            <Head>
                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />

                <meta name="content" description={metaDescription()} />

                <meta name="keywords" description={keywords()} />

                <title> {title()}</title>

            </Head>
            <Header title='Material and/or service' />
            
            <div className={style.container}>
                <div className={style.ProductImage}>
                    {
                        productImages?
                            productImages.length >  0?
                                productDetails?
                                    productDetails.length > 0?
                                        <ProductImage 
                                            productImages={productImages}
                                            productDescription={productDetails?productDetails[0].productDescription:'productImage'}
                                            baseURL={props.baseURL}
                                        />
                                    :undefined
                                :undefined
                            :undefined
                        :undefined
                    }
                </div>
                <div className={style.productDetails}>
                    {
                        productDetails?
                            productDetails.length > 0?
                                <ProductDetails 
                                    productDetails={productDetails[0]}
                                    supplierInformation={supplierInformation}
                                    supplierContact={supplierContact}
                                    supplierEmails={supplierEmails}
                                    productPricings={productPricings}
                                    price={price}
                                    initialPrice = {initialPrice}
                                    activePricing = {activePricing}
                                    setActivePricing = { data => setActivePricing(data)}
                                    handleVariation = { data => handleVariation(data)}
                                />
                            :undefined
                        :undefined
                    }
                </div>
                <div className={style.callToAction}>
                    <CallToAction 
                        handleShowCover={data=>handleShowCover(data)}
                        loginData = {props.loginData}
                    />
                </div>
            </div>
            {
                productBrochure?
                    productBrochure.length > 0 ?
						<div className={style.companyBrochure}>
							<h6>Brochure</h6>
							<div>
								{
									brochureType(brochureExtension) === 1? 
										<>
											<div className={style.imageBrochure}>
											<img src={productBrochure?productBrochure.length !== 0 ?productBrochure[0].productBrochure.formats.medium ? props.baseURL+productBrochure[0].productBrochure.formats.medium.url:props.baseURL+productBrochure[0].productBrochure.url:"" :""} alt='' />
											</div>
											<p><strong>Name: </strong> {productBrochure[0].productBrochure.name}</p>
										</>
									: brochureType(brochureExtension) === 2?
										<>
											<div className={style.documentBrochure+ ' d-flex flex-row justify-content-center align-items-center'}>
											<img src='/images/pngkey.com-certificate-icon-png-3045071.png' alt='certificate-icon-png' />
											</div>
											<p><strong>Name: </strong> {productBrochure[0].productBrochure.name}</p>
										</>
									: brochureType(brochureExtension) === 3?
										<>
											<div className={style.excelBrochure+ ' d-flex flex-row justify-content-center align-items-center'}>
											<img src='/images/pngkey.com-certificate-icon-png-3045071.png' alt='excel-document-icon' />
											</div>
											<p><strong>Name: </strong> {productBrochure[0].productBrochure.name}</p>
										</>
									:'Nothing found'
								}
								{
									productBrochure.length > 0?
										<div className={style.downloadButton}>
											<a 
												className={'bg-success text-white'}
												href={props.baseURL+productBrochure[0].productBrochure.url}
												download
											>Download</a>
										</div>
									:''
								}
							</div>
						</div>
                    :undefined
                :undefined
            }

            {/* <Section title={'Related products'} productInfo={productInfo} shadow={false} />*/}
            <WindowPopUp 
                handleShowCover={data=>handleShowCover(data)}
                showCover={showCover}
            >
                <UserAction 
                    userAction = {userAction}
                    productDetails = {productDetails?productDetails[0]:undefined}
                    productPricings = {productPricings}
                    activePricing = {activePricing}
                    pickupLocations =  {pickupLocations}
                    pickupCounties = {pickupCounties}
                    pickupConstituencies = {pickupConstituencies}
                    baseURL = {props.baseURL}
                    loginData = {props.loginData}
                    productImages = {productImages}
                    transportationCosts = {transportationCosts}
                    supplierInformation={supplierInformation}
                    setShowNotification = { data => setShowNotification(data)}
                    setPosition = { data => setPosition(data)}
                    setOrderResponse = { data => setOrderResponse(data)}
                />
            </WindowPopUp>
            <WindowPopUp
                handleShowCover = {data => handleShowNotification(data)}
                showNotification = {showNotification}
                position = {position}
                orderResponse = {orderResponse}
            >
                <Notification
                    handleShowNotification={data=>handleShowNotification(data)}
                />
            </WindowPopUp>
            <div className={style.articlesContainer}>
                {
                    articles?
                        articles.length>0?
                            <TrendingComponent 
                                title='Related Tips and Advices' 
                                isNotWide={false} 
                                baseURL={props.baseURL} 
                                articles={articles}
                            />
                        :undefined
                    :undefined
                }
            </div>
            {
                articles?
                    <Footer />
                :undefined
            }
        </div>
    )
}

export default MaterialProductPage