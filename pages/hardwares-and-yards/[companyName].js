import Head from 'next/head'
import Header from '../../components/manufacturersandsuppliers/Header/Header'
import style from '../../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/subCategory/ManufacturerAndSupplier.module.css'
import SectionTitle from '../../components/categorySections/sectionTitle'
import ManufacturerAndSupplierComponent from '../../components/manufacturersandsuppliers/manufacturerAndSupplierComponent/ManufacturerAndSupplierComponent'
import SwiperCore, {Pagination, Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import TilesArticleListing from '../../components/tilesArticleListing/TilesArticleListing'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import completeCompanyInfo from '../../utilities/CompanyInfoComplete'
import Footer from '../../components/footerComponent/Footer'
import Loading from '../../components/loading/Loading'

SwiperCore.use([Navigation, Pagination]);

function HardwareAndYard(props) {

    const router = useRouter();

    const [company, setCompany] = useState();
    const [completeCompany, setCompleteCompany] = useState();
    const [counties, setCounties] = useState();
    const [constituencies, setConstituencies] = useState();
    const [companyEmails, setCompanyEmails] = useState();
    const [companyCellphones, setCompanyCellphones] = useState();
    const [companyTelephones, setCompanyTelephones] = useState();
    const [companyWebsites, setCompanyWebsites] = useState();
    const [articles, setArticles] = useState();
    const [companyLogo, setCompanyLogo] = useState();
    const [hardwareProducts, setHardwareProducts] = useState([]);
    const [brochureExtension, setBrochureExtension] = useState();
    const loading = useRef(null);

    async function getCompanyInformation(){
        loading.current.style.display = 'block';
        const company = await axios.get(props.baseURL+"/suppliers?companyName="+router.query.companyName);
        console.log(company.data);
        //console.log(company.data.companyLogo.formats.small.url);
        setCompany(company.data);

        const counties = await axios.get(props.baseURL+"/counties?_limit=-1");
        setCounties(counties.data);

        const constituencies = await axios.get(props.baseURL+"/constituencies?_limit=-1");
        setConstituencies(constituencies.data);

        setCompleteCompany(completeCompanyInfo(company.data, counties.data, constituencies.data));

        const companyEmails = await axios.get(props.baseURL+"/supplier-emails?userId="+company.data[0].userId);
        console.log(companyEmails.data);
        if(companyEmails.data.length > 0){
            setCompanyEmails(companyEmails.data);
        }

        const fetchCompanyLogo = await axios.get(props.baseURL+"/company-logos?userId="+company.data[0].userId);
        console.log(fetchCompanyLogo.data);
        if(fetchCompanyLogo.data.length > 0){
            setCompanyLogo(fetchCompanyLogo.data);
        }
        const companyCellphones = await axios.get(props.baseURL+"/supplier-cellphone-nos?userId="+company.data[0].userId);
        console.log(companyCellphones.data);
        if(companyCellphones.data.length > 0){
            setCompanyCellphones(companyCellphones.data);
        }

        const companyTelephones = await axios.get(props.baseURL+"/supplier-telephone-nos?userId="+company.data[0].userId);
        console.log(companyTelephones.data);
        if(companyTelephones.data.length > 0){
            setCompanyTelephones(companyTelephones.data);
        }

        const companyWebsites = await axios.get(props.baseURL+"/supplier-websites?userId="+company.data[0].userId);
        console.log(companyWebsites.data);
        if(companyWebsites.data.length > 0){
            setCompanyWebsites(companyWebsites.data);
        }

        const hardwareProducts = await axios.get(props.baseURL+"/hardware-and-yards-products?userId="+company.data[0].userId);
        if(hardwareProducts.data.length > 0){
            setHardwareProducts(hardwareProducts.data);
        }
    }

    async function getArticles(){
        //getting the articles
		const articles = await axios.get(props.baseURL+"/articles?_limit=7",{
			transformResponse:[function(data){
				let newData = JSON.parse(data);
				newData.map(element=>{
				element.content=null;
				})
				//console.log(newData);
				return newData;
			}]
        });
        setArticles(articles.data);
        //console.log(articles.data);
        loading.current.style.display='none';
    }

    async function getRelatedSuppliers(){
        //getting related suppliers
        const specificCategories = await axios.get(props.baseURL+"/specializations?userId="+completeCompany[0].userId);
        console.log(specificCategories.data);
    }

    function brochureType(brochureExtension){
        let imageTypes = ['.jpg','.jpeg', '.png', '.PNG', '.JPG', '.JPEG'];
        let docTypes = ['.doc', '.docx', '.pdf', '.DOC', '.DOCX', '.PDF'];
        let excelTypes = ['.xls', '.xlsx', '.XLS', '.XLSX'];

        if(imageTypes.indexOf(brochureExtension) !== -1){
            return 1;
        }else if(docTypes.indexOf(brochureExtension) !== -1){
            return 2;
        }else if(excelTypes.indexOf(brochureExtension) !==-1){
            return 3;
        }else{
            return 0;
        }
    }

    useEffect(()=>{
        console.log(articles);
    }, [articles])

    useEffect(()=>{
        if(router.query.companyName){
            getCompanyInformation()
            .then(()=>{
                getArticles()
            })
        }
    }, [router.query.companyName])

    useEffect(()=>{
        if(completeCompany !== undefined){
            getRelatedSuppliers();
        }
    }, [completeCompany])

    useEffect(()=>{
        if(hardwareProducts.length !== 0){
            console.log(hardwareProducts);
            setBrochureExtension(hardwareProducts[0].pricelist.ext);
        }
    }, [hardwareProducts])

    useEffect(()=>{
        window.dataLayer = window.dataLayer || [];

        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-8VYK6XCD9G');
    }, [props.baseURL])
    function title(){
        let title = "";
        if(completeCompany && completeCompany[0]){
            title += completeCompany[0].companyName+ " in "+completeCompany[0].county+" -> "+ completeCompany[0].constituency+" | Builders Guide Kenya";
        }
        return title;
    }
    function keywords(){
        let keywords = "";
        if(completeCompany && completeCompany[0]){
            keywords += completeCompany[0].companyName+", "+completeCompany[0].county+", "+completeCompany[0].constituency;
        }
        return keywords;
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

                <meta name="keywords" description={keywords()} />

                <meta name="content" description={completeCompany?completeCompany[0].companyDescription:''} />

                <title> {title()}</title>

            </Head>
            <Header title="Hardware and/or yard"/>
            <main className={style.body}>
                {
                    completeCompany?
                    <div className={style.company}>
                        <div>
                            {
                                completeCompany?
                                <Swiper
                                    slidesPerView={1}
                                    pagination={{clickable:true}}
                                    navigation
                                >
                                    <SwiperSlide><div className={style.companyImages}><img src={companyLogo?companyLogo.length!==0?companyLogo[0].companyLogo.formats.medium?props.baseURL+companyLogo[0].companyLogo.formats.medium.url:props.baseURL+companyLogo[0].companyLogo.url:'/icons/bgkNoImage.jpg':'/icons/bgkNoImage.jpg'} alt={completeCompany.companyLogo?props.baseURL+completeCompany.companyLogo.formats.small.hash:"builders guide kenya logo"} /></div></SwiperSlide>
                                </Swiper>
                                :''
                            }
                            
                        </div>
                        <div>
                            <div className={style.companyDetails}>
                                {
                                    completeCompany?
                                        <p><span><i className={'fas fa-warehouse'}></i></span>  <span className={style.companyName}>{completeCompany[0].companyName}</span></p>
                                    :''
                                }
                                {
                                    completeCompany?
                                        <p><span><i className={'fas fa-map-marker-alt'}></i></span> {completeCompany[0].county}{"/ "+ completeCompany[0].constituency}</p>
                                    :''
                                }
                                {
                                    completeCompany?
                                        completeCompany[0].locationLink?
                                        <p><span><i className={'fas fa-link'}></i></span><a href={completeCompany[0].locationLink}>Google maps link</a></p>
                                        :undefined
                                    :''
                                }
                                {
                                    companyCellphones?
                                        <p><span><i className={'fas fa-phone'}></i></span> 
                                            {companyCellphones[0]?" +"+companyCellphones[0].cellphoneNo:undefined}
                                            {companyCellphones[1]?" || +"+companyCellphones[1].cellphoneNo:undefined} 
                                            {companyTelephones?companyTelephones[0]?" || +"+companyTelephones[0].telephoneNo:undefined:undefined}
                                            {companyTelephones?companyTelephones[1]?" || +"+companyTelephones[1].telephoneNo:undefined:undefined}
                                        </p>
                                    :''
                                }
                                {
                                    companyEmails?
                                        <p><span><i className={'fas fa-envelope'}></i></span> 
                                        {companyEmails[0]?" "+companyEmails[0].supplierEmail:undefined} 
                                        {companyEmails[1]?" || "+companyEmails[1].supplierEmail:undefined}
                                        </p>
                                    :''
                                }
                                {
                                    companyWebsites?
                                        <p><span><i className={'fas fa-globe-africa'}></i></span> <a href={companyWebsites?"http://"+companyWebsites[0].website:undefined} target="_blank">{companyWebsites?companyWebsites[0].website:undefined}</a></p>
                                    :''
                                }
                            </div>
                            {
                                completeCompany?
                                <div className={style.companyDescription}>
                                    <h6>Hardware and/or yard description</h6>
                                    <p>{completeCompany[0].companyDescription}</p>
                                </div>
                                :''
                            }
                        </div>
                    </div>
                    :''
                }
                {
                    completeCompany?
                        <div className={style.companyDescriptionCopy}>
                            <h6>Hardware and/or yard description</h6>
                            <p>{completeCompany[0].companyDescription}</p>
                        </div>
                    :''
                }
                {
                    hardwareProducts[0]?
                        <div className={style.companyBrochure}>
                            <h6>Products</h6>
                            <p>{hardwareProducts[0].products}</p>
                        </div>
                    :undefined
                }
                {
                    hardwareProducts.length!==0?
                        <div className={style.companyBrochure}>
                            <h6>Products pricelist</h6>
                            <div>
                                {
                                    hardwareProducts.length === 0?
                                        <>
                                            <div className={style.brochureContainer}>
                                                <img src='/images/companyBrochure.jpg' alt='Company Brochure'/>
                                            </div>
                                            <button className={'bg-primary text-white'} onClick={()=>handleAddBrochure(1)}>Add</button>
                                        </>
                                    : brochureType(brochureExtension) === 1? 
                                        <>
                                            <div className={style.imageBrochure}>
                                                <img src={hardwareProducts?hardwareProducts.length !== 0 ? hardwareProducts[0].pricelist.formats.medium ? props.baseURL+hardwareProducts[0].pricelist.formats.medium.url:baseURL+hardwareProducts[0].pricelist.url:"" :""} alt='' />
                                            </div>
                                            <p><strong>Name: </strong> {hardwareProducts[0].pricelist.name}</p>
                                        </>
                                    : brochureType(brochureExtension) === 2?
                                        <>
                                            <div className={style.documentBrochure+ ' d-flex flex-row justify-content-center align-items-center'}>
                                                <img src='/images/pngkey.com-certificate-icon-png-3045071.png' alt='certificate-icon-png' />
                                            </div>
                                            <p><strong>Name: </strong> {hardwareProducts[0].pricelist.name}</p>
                                        </>
                                    : brochureType(brochureExtension) === 3?
                                        <>
                                            <div className={style.excelBrochure+ ' d-flex flex-row justify-content-center align-items-center'}>
                                                <img src='/images/pngkey.com-document-icon-png-1394906.png' alt='excel-document-icon' />
                                            </div>
                                            <p><strong>Name: </strong> {hardwareProducts[0].pricelist.name}</p>
                                        </>
                                    :''
                                }
                                {
                                    hardwareProducts.length!==0?
                                        <div className={style.downloadButton}>
                                            <a 
                                                className={'bg-success text-white'}
                                                href={props.baseURL+hardwareProducts[0].pricelist.url}
                                                download
                                            >Download</a>
                                        </div>
                                    :''
                                }
                                
                            </div>
                        </div>
                    :''
                }
                
                {/*
                    <div className={style.moreLikeThis}>
                        <SectionTitle title="More Like this"/>
                        <div className={'componentScroll'}>
                            <ManufacturerAndSupplierComponent />
                        </div>
                    </div>
                */}
                
                {
                    articles?
                        <div className={style.moreLikeThis}>
                            <SectionTitle title="related.Tips and Advices" />
                                <div className={'componentScroll'}>
                                    {
                                        articles.map((element, index)=>(
                                            <span key={index}>
                                                <TilesArticleListing
                                                    articleId={articles?element.id:""}
                                                    featuredImage={element.featuredImages.url}
                                                    articleTitle={element.title}
                                                    actualTitle={articles?articles[index].title:undefined}
                                                    imageTitle={element.featuredImages.name}
                                                    propKey={element.title+element.id}
                                                    baseURL={props.baseURL}
                                                />
                                            </span>
                                        ))
                                    }
                                </div>
                        </div>
                    :''
                }

                <div ref={loading}>
                    <Loading />
                </div>
            </main>
            {
                completeCompany?
                    <Footer />
                :undefined
            }
        </div>
    )
}

export default HardwareAndYard
