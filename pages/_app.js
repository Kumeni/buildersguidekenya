import '../styles/bootstrap.css'
import 'swiper/swiper-bundle.min.css'
import '../styles/customscrollbar.css'
import {useState} from 'react'

function MyApp({ Component, pageProps }) {
  const [baseURL, setBaseURL] = useState("http://localhost:1337");
  return <Component {...pageProps} baseURL={baseURL} />
}

export default MyApp
