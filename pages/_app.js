import '../styles/bootstrap.css'
//import '../node_modules/swiper/swiper-bundle.min.css'
import 'swiper/swiper-bundle.min.css'
import '../styles/customscrollbar.css'
import {useState} from 'react'

//import "swiper/swiper.min.css";
//import "swiper/components/pagination/pagination.min.css"
//import "swiper/components/navigation/navigation.min.css"
function MyApp({ Component, pageProps }) {
  const [baseURL, setBaseURL] = useState("http://localhost:1337");
  const [pagesData, setPagesData] = useState({
    home:{}
  });
  return <Component {...pageProps} baseURL={baseURL} pagesData={pagesData} setPagesData={data=>setPagesData(data)} />
}

export default MyApp
