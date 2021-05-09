import style from './Footer.module.css'
import {useRouter} from 'next/router'
import Link from 'next/link'

function Footer() {
    const router = useRouter();

    return (
        <div className={style.footerContainer}>
            <div className={style.footer}>
                <div>
                    <h5>What we offer</h5>
                    <ul>
                        <li>
                            <Link href='/products and services'>
                                <a>Products and services</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/manufacturersandsuppliers'>
                                <a>Manufacturers and Suppliers</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/plants-and-machineries'>
                                <a>Plants and machineries</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/transport-vehicles'>
                                <a>Transport Vehicles</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/articles'>
                                <a>Tips and Advices</a>
                            </Link>
                        </li>
                        
                        {/**
                        <li><a href='#'>Hardware and Yards</a></li>
                        <li><a href='#'>Contractors</a></li>
                        <li><a href='#'>Artisans and Professionals</a></li>
                        <li><a href='#'>Building Institution</a></li>
                        <li><a href='#'>Tenders</a></li>
                        <li><a href='#'>Project reviews</a></li>
                         */}
                    </ul>
                </div>
                <div>
                    <h5>Important Links</h5>
                    <ul>
                        {
                            router.pathname !== '/'?
                                <li>
                                    <Link href='/'>
                                        <a>Homepage</a>
                                    </Link>
                                </li>
                            :undefined
                        }
                        
                        <li><a href='https://suppliers.buildersguidekenya.com/signup'>seller signUp</a></li>
                        <li><a href='https://suppliers.buildersguidekenya.com'>seller Login</a></li>

                        <Link href='/articles'>
                            <a>Featured Articles</a>
                        </Link>
                        {/**
                         * <li><a href='#'>Recomended for you</a></li>
                            <li><a href='#'>Special offers</a></li>
                            <li><a href='#'>New and Upgraded Products</a></li>
                         */}
                    </ul>
                </div>
                <div>
                    <h5>Contact us</h5>
                    <ul>
                        <li><a href='mailto:help@buildersguidekenya.com'>help@buildersguidekenya.com</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer
