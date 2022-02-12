import style from './Footer.module.css'
import {useRouter} from 'next/router'
import Link from 'next/link'

function Footer() {
    const router = useRouter();

    return (
        <div className={style.footerContainer}>
            <div className={style.footer}>
                <section>
                    <a href="mailto:help@buildersguidekenya.com" target="_blank"><img src="/icons/gmail.PNG" alt="Builders Guide Kenya - gmail" /></a>
                    {/* <a href="#"><img src="/icons/linkedIN.png" alt="instagram icon" /></a> */}
                    <a href="https://twitter.com/builders_kenya" target="_blank"><img src="/icons/twitter.PNG" alt="Builders Guide Kenya - twiter" /></a>
                    <a href="tel:+254724262680" target="_blank"><img src="/icons/phone-call.PNG" alt="instagram icon" /></a>
                    <a href="https://wa.me/254724262680?text=Hello%20 Mr. Tambo," target="_blank"><img src="/icons/whatsapp.PNG" alt="Builders Guide Kenya -whatsapp" /></a>
                    {/* <a href="#"><img src="/icons/instagram.PNG" alt="instagram icon" /></a> */}
                    <a href="https://www.facebook.com/Builders-Guide-Kenya-220152724848107" target="_blank"><img src="/icons/facebook.PNG" alt="Builders Guide Kenya - facebook" /></a>
                </section>
                <div>
                    <div>
                        <h5>What we offer</h5>
                        <ul>
                            <li>
                                <Link href='/products-and-services'>
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
                            <li>
                                <Link href='/hardwares-and-yards'>
                                    <a>Hardwares and Yards</a>
                                </Link>
                            </li>
                            
                            {/**
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
                            
                            
                            <li><a href='https://admin.buildersguidekenya.com/signup'>Manufacturer and supplier signup</a></li>
                            <li><a href='https://admin.buildersguidekenya.com/signup'>Plant and machinery dealer signup</a></li>
                            <li><a href='https://admin.buildersguidekenya.com'>Hardware and yard signup</a></li>
                            <li><a href='https://admin.buildersguidekenya.com'>Transpoter signup</a></li>
                            {
                                router.pathname !== '/about-us'?
                                    <li>
                                        <Link href='/about-us'>
                                            <a>About us</a>
                                        </Link>
                                    </li>
                                :undefined
                            }
                            <Link href='/articles'>
                                <a>Featured articles</a>
                            </Link>
                            {/**
                             * <li><a href='#'>Recomended for you</a></li>
                                <li><a href='#'>Special offers</a></li>
                                <li><a href='#'>New and Upgraded Products</a></li>
                            */}
                        </ul>
                    </div>
                </div>
            </div>
            <div><i>&copy; copyright 2021 | All rights reserved | buildersguidekenya.com</i></div>
        </div>
    )
}

export default Footer
