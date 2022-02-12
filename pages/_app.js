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
const [loginData, setLoginData] = useState();
const [pagesData, setPagesData] = useState({
	home:{},
	productsAndServices:{},
	manufacturersAndSuppliers:{},
	plantsAndMachineries:{},
	transportVehicles:{}
});

useEffect(() => {
	if(loginData !== undefined){
		sessionStorage.setItem("loginData", JSON.stringify(loginData))
	} else {
		let storedLoginData = sessionStorage.getItem("loginData");
		if( storedLoginData!= undefined)
			setLoginData(JSON.parse(storedLoginData));
	}
}, [loginData])

/*useEffect(()=>{
	if(pagesData)
		if(pagesData.home.data == undefined && sessionStorage.getItem("pagesData"))
			setPagesData(JSON.parse(sessionStorage.getItem("pagesData")));
		else 
			sessionStorage.setItem("pagesData",JSON.stringify(pagesData));
}, [pagesData])*/
return (
		<body>
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
		</body>
	)
}

export default MyApp
