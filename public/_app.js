import '../styles/bootstrap.css'
//import '../node_modules/swiper/swiper-bundle.min.css'
import 'swiper/swiper-bundle.min.css'
import '../styles/customscrollbar.css'
import {useState, useEffect} from 'react'

//import "swiper/swiper.min.css";
//import "swiper/components/pagination/pagination.min.css"
//import "swiper/components/navigation/navigation.min.css"
function MyApp({ Component, pageProps }) {
const [baseURL, setBaseURL] = useState("https://data.buildersguidekenya.com");
const [pagesData, setPagesData] = useState({
	home:{},
	productsAndServices:{},
	manufacturersAndSuppliers:{},
	plantsAndMachineries:{},
	transportVehicles:{}
});

/*useEffect(()=>{
	if(pagesData)
		if(pagesData.home.data == undefined && sessionStorage.getItem("pagesData"))
			setPagesData(JSON.parse(sessionStorage.getItem("pagesData")));
		else 
			sessionStorage.setItem("pagesData",JSON.stringify(pagesData));
}, [pagesData])*/
return <Component {...pageProps} 
			baseURL={baseURL} 
			pagesData={pagesData} 
			setPagesData={data=>setPagesData(data)} 
		/>
}

export default MyApp
