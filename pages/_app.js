import '../styles/bootstrap.css'
//import '../node_modules/swiper/swiper-bundle.min.css'
import 'swiper/swiper-bundle.min.css'
import '../styles/customscrollbar.css'
import {useState, useEffect} from 'react'
import Head from 'next/head'

//import "swiper/swiper.min.css";
//import "swiper/components/pagination/pagination.min.css"
//import "swiper/components/navigation/navigation.min.css"
function MyApp({ Component, pageProps }) {
const [baseURL, setBaseURL] = useState("http://localhost:1337");
// const [baseURL, setBaseURL] = useState("http://192.168.88.200:1337");
const [loginData, setLoginData] = useState();
const [pagesData, setPagesData] = useState({
	home:{},
	productsAndServices:{},
	manufacturersAndSuppliers:{},
	plantsAndMachineries:{},
	transportVehicles:{}
});

useEffect(() => {
	if(loginData !== undefined && loginData !== null){
		//If login data is present save it in the sessionStorage temporarily;
		sessionStorage.setItem("loginData", JSON.stringify(loginData))
	} else {
		let storedLoginData = sessionStorage.getItem("loginData");
		if( storedLoginData!= undefined)
			setLoginData(JSON.parse(storedLoginData));
	}
}, [loginData])

//on logout
/**
 * 1. The data stored in the sessionStorage should be deleted
 * 2. The data stored in the program memory should also be deleted.
 */

/*useEffect(()=>{
	if(pagesData)
		if(pagesData.home.data == undefined && sessionStorage.getItem("pagesData"))
			setPagesData(JSON.parse(sessionStorage.getItem("pagesData")));
		else 
			sessionStorage.setItem("pagesData",JSON.stringify(pagesData));
}, [pagesData])*/
return (
		<div>
			<Head>
				<link rel="shortcut icon" href="/icons/bgk_icon.png"/>
			</Head>
			<Component {...pageProps} 
				baseURL={baseURL} 
				pagesData={pagesData} 
				setPagesData={data=>setPagesData(data)} 
				loginData = {loginData}
				setLoginData = { data => setLoginData(data)}
			/>
		</div>
	)
}

export default MyApp
