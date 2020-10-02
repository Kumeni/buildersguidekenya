import Link from 'next/link'
import style from './Header.module.css'

export default function Header({title = 'Manufacturers and Supplier'}) {
    return (
        <div className={'d-flex flex-row justify-content-between align-items-center ' +style.header}>
            <Link href='/'>
                <a className={style.homePageLink}>
                <div className={'d-flex flex-row align-items-center flex-shrink-1 ' + style.homeLink}>
                    <i className={'fas fa-arrow-left ' + style.arrowLeft}></i>
                    <span>{title}</span>
                </div>
                </a>
            </Link>
            <div className={'d-flex flex-row align-items-center ' + style.search}>
                <input className={'flex-shrink-0'}type='search' />
                <span><i className={'fas fa-search' }></i></span>
            </div>
            <i className={'fas fa-shopping-cart ' + style.shoppingCart}></i>
        </div>
    )
}
