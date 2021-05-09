import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import {useEffect, useState} from 'react'
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

    /*useEffect(()=>{
        console.log(productPricings);
    }, [productPricings])*/

    useEffect(()=>{
        if(productBrochure.length > 0){
			console.log("Product brochure");
            console.log(productBrochure);
            setBrochureExtension(productBrochure[0].productBrochure.ext);
        }
    }, [productBrochure])

    useEffect(()=>{
        if (router.query.materialId){
            async function getProductData(){
                const productImages = await axios.get(props.baseURL+'/product-images?productId='+router.query.materialId+'&approved=true&deleted=false&blocked=false')
                .then(res=>{
                    //console.log(res.data);
                    setProductImages(res.data);
                })
                .catch(err=>{
                    console.log(err.response);
                })

                const counties = await axios.get(props.baseURL+'/counties?_limit=-1');

                const constituencies = await axios.get(props.baseURL+'/constituencies?_limit=-1');

                const productDetailsFromDB = await axios.get(props.baseURL+'/products/'+router.query.materialId)
                .then(async res=>{
                    //console.log(res.data);
                    setProductDetails(companyInfoComplete([res.data], counties.data, constituencies.data));
                    //console.log(companyInfoComplete([res.data], counties.data, constituencies.data));
                    //return res;
                })
                .catch(err=>{
                    console.log(err.response);
                })

                await axios.get(props.baseURL+'/product-pricings?productId='+router.query.materialId)
                .then(res=>{
                    //console.log(res.data);
                    setProductPricings(res.data);
                    return res;
                })
                .catch(err=>{
                    console.log(err.response);
                })

                await axios.get(props.baseURL+'/product-brochures?productId='+router.query.materialId)
                .then(res=>{
					console.log("Product brochure");
                    console.log(res.data);
                    setProductBrochure(res.data);
                    return res;
                })
                .catch(err=>{
                    console.log(err.response);
                })

                await axios.get(props.baseURL+"/articles?_limit=7",{
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

    function brochureType(brochureExtension){
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
    useEffect(()=>{
        /*console.log(productPricings);
        console.log(productImages);
        console.log(productDetails);
        console.log(supplierInformation);
        console.log(supplierContact);*/
    })
    return (
        <div>
            <Head>
                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />

                <meta name="content" description={productDetails? productDetails[0].productDescription :''} />

                <meta name="keywords" description={productDetails? productDetails[0].productName:''} />

                <title> {productDetails? productDetails[0].productName : 'material' } | Builders Guide Kenya</title>

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
                                />
                            :undefined
                        :undefined
                    }
                </div>
                <div className={style.callToAction}>
                    {/* <button className={'btn-primary ' + style.addToCart} >Add to cart</button>
                    <button className={'btn-dark ' + style.addToCart} >Add to wishlist</button> */}
                    {/* <div className={style.sponsoredProduct}>
                        <div></div>
                        <span>sponsored product</span>
                    </div> */}
                </div>
            </div>
            {
                productPricings!==undefined?
                    productPricings.length!==0?
                        <h5 className={style.productPricing}>Product pricing</h5>
                    :undefined
                :undefined
            }
            {
                productPricings?
                    productPricings.length > 0?
                        <div className={style.tableContainerContainer}>
                            <div className={'table-responsive ' +style.tableContainer}>
                                <table className={'table table-striped table-hover table-dark table-bordered'}>
                                    <thead>
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Unit Capacity</th>
                                            <th scope='col'>Unit Price</th>
                                            <th scope='col'>Minimum Order</th>
                                            <th scope='col'>Daily capability</th>
                                            <th scope='col'>Quantity Discount</th>
                                            <th scope='col'>Price Discount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productPricings.map((element, index)=>(
                                                <tr key={index}>
                                                    <th>{index+1}</th>
                                                    <td>{element.unitCapacity}</td>
                                                    <td>Ksh. {element.unitPrice}</td>
                                                    <td>{element.minimumOrderQuantity}</td>
                                                    <td>{element.dailyCapability}</td>
                                                    <td>{element.quantityDiscount != ''?element.quantityDiscount:'-'}</td>
                                                    <td>{element.priceDiscount != ''?element.priceDiscount:'-'}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    :undefined
                :undefined
            }
			{/* This block tests if the file is actually saving data */}
            {
                productBrochure?
                    productBrochure.length>0?
						<div className={style.companyBrochure}>
							<h6>Product Brochure</h6>
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

            {/* <Section title={'Related products'} productInfo={productInfo} shadow={false} />
            <div className={style.productDescription}>
                <h5>Product Details</h5>
                <ul>
                    <li><strong>Product Dimensions</strong>: 124*34*44 mm</li>
                    <li><strong>Item model number</strong>: WE345K</li>
                    <li><strong>First Available on</strong>: Sept 13, 2020</li>
                    <li><strong>Manufacturer</strong>: Chem ltd</li>
                    <li><strong>Best sellers rank</strong>: #25</li>
                    <li><strong>Customer reviews</strong>:500</li>
                </ul>
            </div> */}
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