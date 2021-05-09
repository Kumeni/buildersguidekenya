import Head from 'next/head'
import Header from '../../components/manufacturersandsuppliers/Header/Header'
import style from '../../components/ConstructionMachinery/singleConstructionMachinery/singleConstructionMachinery.module.css'
import axios from 'axios'
import SectionTitle from '../../components/categorySections/sectionTitle'
import ManufacturerAndSupplierComponent from '../../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent'
import SwiperCore, {Pagination, Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import TilesArticleListing from '../../components/tilesArticleListing/TilesArticleListing'
import ConstructionMachinery from '../../components/ConstructionMachinery/ConstructionMachineryComponent/ConstructionMachinery'
import companyInfoComplete from '../../utilities/CompanyInfoComplete'
import Footer from '../../components/footerComponent/Footer'
import { useRouter } from 'next/router'
import {useState, useEffect, useRef} from 'react'

SwiperCore.use([Navigation, Pagination]);
export default function index(props) {

    const router = useRouter();

    const [plantAndMachineryImages, setPlantAndMachineryImages] = useState([]);
    const [plantAndMachineryDetails, setPlantAndMachineryDetails] = useState();
    const [supplierInformation, setSupplierInformation] = useState();
    const [supplierContact, setSupplierContact] = useState();
    const [supplierEmails, setSupplierEmails] = useState();
    const [plantAndMachinerySale, setPlantAndMachinerySale] = useState();
    const [plantAndMachineryLease, setPlantAndMachineryLease] = useState();
    const [articles, setArticles] = useState();
    //const [productBrochure, setProductBrochure] = useState([]);
    //const [brochureExtension, setBrochureExtension] = useState();

    useEffect(()=>{
        if (router.query.plantAndMachineryId){
            async function getPlantAndMachineryData(){
                const plantAndMachineryImages = await axios.get(props.baseURL+'/plant-and-machinery-images?plantAndMachineryId='+router.query.plantAndMachineryId+'&approved=true&deleted=false&blocked=false')
                .then(res=>{
                    console.log("Complete plant and machinery images");
                    console.log(res.data);
                    setPlantAndMachineryImages(res.data);
                })
                .catch(err=>{
                    console.log(err.response);
                })

                const counties = await axios.get(props.baseURL+'/counties?_limit=-1');

                const constituencies = await axios.get(props.baseURL+'/constituencies?_limit=-1');

                /*const productDetailsFromDB = */
                await axios.get(props.baseURL+'/plant-and-machineries/'+router.query.plantAndMachineryId)
                .then( res=>{
                    console.log("complete plant and machinery information");
                    console.log(res.data);
                    setPlantAndMachineryDetails(companyInfoComplete([].concat(res.data), counties.data, constituencies.data));
                    console.log(companyInfoComplete([].concat(res.data), counties.data, constituencies.data));
                })
                .catch(err=>{
                    console.log(err.response);
                })

                await axios.get(props.baseURL+'/plant-and-machinery-sales?plantAndMachineryId='+router.query.plantAndMachineryId)
                .then(res=>{
                    //console.log(res.data);
                    if(res.data[0]){
                        console.log("machinery sale");
                        console.log(res.data[0]);
                        setPlantAndMachinerySale(res.data[0]);
                    }
                    return res;
                })
                .catch(err=>{
                    console.log(err.response);
                })

                await axios.get(props.baseURL+'/plant-and-machinery-leases?plantAndMachineryId='+router.query.plantAndMachineryId)
                .then(res=>{
                    //console.log(res.data);
                    if(res.data[0]){
                        console.log("Machinery lease")
                        setPlantAndMachineryLease(res.data[0]);
                    }
                    return res;
                })
                .catch(err=>{
                    console.log(err.response);
                })

                /*await axios.get(props.baseURL+'/product-brochures?productId='+router.query.materialId)
                .then(res=>{
					console.log("Product brochure");
                    console.log(res.data);
                    setProductBrochure(res.data);
                    return res;
                })
                .catch(err=>{
                    console.log(err.response);
                })*/

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
                .catch(err=>{
                    console.log(err.response);
                })
            }
            getPlantAndMachineryData();
        }
    },[router.query])

    useEffect(()=>{
        if(plantAndMachineryDetails!==undefined){
            axios.get(props.baseURL+'/suppliers?userId='+plantAndMachineryDetails[0].userId)
            .then(res=>{
                console.log("supplierInfo");
                console.log(res.data[0]);
                setSupplierInformation(res.data[0]);
                return res;
            })
            .catch(err=>{
                console.log(err.response);
            })

            axios.get(props.baseURL+'/supplier-cellphone-nos?userId='+plantAndMachineryDetails[0].userId+'&_limit=2')
            .then(res=>{
                console.log('supplierCellphones');
                console.log(res.data);
                setSupplierContact(res.data);
                return res;
            })
            .catch(err=>{
                console.log(err.response);
            })

            axios.get(props.baseURL+'/supplier-emails?userId='+plantAndMachineryDetails[0].userId+'&_limit=2')
            .then(res=>{
                console.log("supplier emails");
                console.log(res.data);
                setSupplierEmails(res.data);
                return res;
            })
            .catch(err=>{
                console.log(err.response);
            })
        }
    }, [plantAndMachineryDetails])

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

                {/* Global site tag (gtag.js) - Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-8VYK6XCD9G"></script>

                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />

                <meta rel="icon" src="/images/buildersguidekenyalogo.png" type='image/png'/>

                <title>Nothing</title>
            </Head>
            <Header title="Plant and Machinery"/>
            <main className={style.body}>
                <div className={style.company}>
                    <div>
                        <Swiper
                            slidesPerView={1}
                            pagination={{clickable:true}}
                            navigation
                        >   
                            {
                                plantAndMachineryImages.length==0?
                                    <SwiperSlide>
                                        <div className={style.companyImages}>
                                            <img 
                                                src={'/icons/bgkNoImage.jpg'}
                                                alt={'builders guide kenya logo'}
                                            />
                                        </div>
                                    </SwiperSlide>
                                : plantAndMachineryImages.map((element, index)=>(
                                    <SwiperSlide>
                                        <div key={element.id} className={style.companyImages}>
                                            <img 
                                                src={element?element.image.formats.medium?props.baseURL+element.image.formats.medium.url:props.baseURL+element.image.url:'/icons/bgkNoImage.jpg'}
                                                alt={plantAndMachineryDetails?plantAndMachineryDetails.description:undefined}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                    <div>
                        <div className={style.companyDetails}>
                            <p><span><i className={'fas fa-truck-monster'}></i></span> {plantAndMachineryDetails?plantAndMachineryDetails[0].name:"..."}</p>
                            {/* <p><span><i className={'fas fa-tag'}></i></span>  </p> */}
                            {
                                plantAndMachineryLease||plantAndMachinerySale?
                                    // <div className={style.companyDescriptionCopy}>
                                        //{/* <h6><span><i className={'fas fa-tag'}></i></span> Plant and/or Machinery Pricing</h6> */}
                                        <p><span>
                                            <span><i className={'fas fa-tag'}></i></span> 
                                                {plantAndMachinerySale?" Sold at Ksh. "+plantAndMachinerySale.sellingPrice:undefined}
                                                {plantAndMachinerySale&&plantAndMachineryLease?" and":undefined}
                                                {plantAndMachineryLease?" Leased at Ksh. "+plantAndMachineryLease.amount+" per "+plantAndMachineryLease.period:undefined}
                                            </span>
                                        </p>
                                    //</div>
                                :undefined
                            }
                            <p><span><i className={'fas fa-map-marker-alt'}></i></span> {plantAndMachineryDetails?plantAndMachineryDetails[0].county+" >> "+plantAndMachineryDetails[0].constituency:'...'}</p>
                            {
                                supplierInformation?
                                    <p className={style.dealer}><b>Dealer</b></p>
                                :undefined
                            }
                            <p><span className={style.companyName}><span><i className={'fas fa-warehouse'}></i></span> <b> {supplierInformation?supplierInformation.companyName:undefined}</b></span></p>
                            <p><span><i className={'fas fa-phone'}></i></span>
                                {supplierContact?"  +"+supplierContact[0].cellphoneNo:undefined}
                                {supplierContact?supplierContact[1]?" || +"+supplierContact[1].cellphoneNo:undefined:undefined}
                            </p>
                            <p><span><i className={'far fa-envelope'}></i></span>
                                {supplierEmails?"  "+supplierEmails[0].supplierEmail:undefined}
                                {supplierEmails?supplierEmails[1]?" || "+supplierEmails[1].supplierEmail:undefined:undefined}
                            </p>
                            {/* <p><span><i className={'fas fa-globe-africa'}></i></span> companywebsite</p> */}
                            {/* <p><span><i className={'fas fa-industry'}></i></span> Cranes and hoists</p> */}
                        </div>
                    </div>
                </div>
                
                {
                    plantAndMachinerySale?
                        plantAndMachinerySale.additionalSellingInfo?
                            <div className={style.companyDescriptionCopy}>
                                <h6><span><i className={'fas fa-tag'}></i></span> Additional selling information</h6>
                                {
                                    plantAndMachinerySale.AdditionalSellingInfo?
                                        <p>
                                            {plantAndMachinerySale.additionalSellingInfo}
                                        </p>
                                    :undefined
                                }
                            </div>
                        :undefined
                    :undefined
                }
                {
                    plantAndMachineryLease?
                        plantAndMachineryLease.additionalLeaseInformation?
                            <div className={style.companyDescriptionCopy}>
                                <h6><span><i className={'fas fa-tag'}></i></span> Additional Lease information</h6>
                                {
                                    plantAndMachineryLease.additionalLeaseInformation?
                                        <p>
                                            {plantAndMachineryLease.additionalLeaseInformation}
                                        </p>
                                    :undefined
                                }
                            </div>
                        :undefined
                    :undefined
                }
                {
                    plantAndMachineryDetails?
                        <div className={style.companyDescriptionCopy}>
                            <h6>Machinery Description</h6>
                            <p>
                                {plantAndMachineryDetails[0].description}
                            </p>
                        </div>
                    :undefined
                }
                {/* <div className={style.moreLikeThis}>
                    <SectionTitle title="More Like this"/>
                    <div className={'componentScroll'}>
                        <ConstructionMachinery />
                    </div>
                </div> */}
                
                {/* <div className={style.moreLikeThis}>
                    <SectionTitle title="related.Tips and Advices" />
                    <div className={'componentScroll'}>
                        <TilesArticleListing />

                    </div>
                </div> */}
                
            </main>
            {
                plantAndMachineryDetails?
                    <Footer />
                :undefined
            }
        </div>
    )
}
