import style from './Footer.module.css'

function Footer() {
    return (
        <div className={style.footerContainer}>
            <div className={style.footer}>
                <div>
                    <h5>What we offer</h5>
                    <ul>
                        <li><a href='#'>Manufacturers and Supplier</a></li>
                        <li><a href='#'>Plants and Machinery</a></li>
                        <li><a href='#'>Hardware and Yards</a></li>
                        <li><a href='#'>Contractors</a></li>
                        <li><a href='#'>Artisans and Professionals</a></li>
                        <li><a href='#'>Transpoters</a></li>
                        <li><a href='#'>Building Institution</a></li>
                        <li><a href='#'>Tenders</a></li>
                        <li><a href='#'>Tips and Advices</a></li>
                        <li><a href='#'>Project reviews</a></li>
                    </ul>
                </div>
                <div>
                    <h5>Important Links</h5>
                    <ul>
                        <li><a href='#'>seller signUp</a></li>
                        <li><a href='#'>Recomended for you</a></li>
                        <li><a href='#'>Special offers</a></li>
                        <li><a href='#'>New and Upgraded Products</a></li>
                        <li><a href='#'>Featured Articles</a></li>
                    </ul>
                </div>
                <div>
                    <h5>Contact us</h5>
                    <ul>
                        <li><a href='#'>+254 717 551542</a></li>
                        <li><a href='#'>help@buildersguidekenya.co.ke</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer
