import style from './Footer.module.css'

function Footer() {
    return (
        <div className={style.footerContainer}>
            <div className={style.footer}>
                <div>
                    <h5>What we offer</h5>
                    <ul>
                        <li><a href='/manufacturersandsuppliers'>Manufacturers and Supplier</a></li>
                        <li><a href='/articles'>Tips and Advices</a></li>
                        {/**
                         * <li><a href='#'>Plants and Machinery</a></li>
                        <li><a href='#'>Hardware and Yards</a></li>
                        <li><a href='#'>Contractors</a></li>
                        <li><a href='#'>Artisans and Professionals</a></li>
                        <li><a href='#'>Transpoters</a></li>
                        <li><a href='#'>Building Institution</a></li>
                        <li><a href='#'>Tenders</a></li>
                        <li><a href='#'>Project reviews</a></li>
                         */}
                    </ul>
                </div>
                <div>
                    <h5>Important Links</h5>
                    <ul>
                        <li><a href='https://suppliers.buildersguidekenya.com/signup'>seller signUp</a></li>
                        <li><a href='/articles'>Featured Articles</a></li>
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
