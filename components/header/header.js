import style from './header.module.css'

function Header(){
    return <div>
        <div className={style.headerContainer}>
            <header className={style.header}>
                    <div className={style.div + ' ' +style.bgkLogo} tabIndex='1'>
                        <img className={style.bgkIcon} src='/icons/builders guide logo-01.png' alt='buildersguidekenyalogo'/>
                    </div>
                    <input className={style.searchBar + ' ' + style.div} type='search' tabIndex='3' />
                    <div className={style.myAccountContainer} tabIndex='5'>
                        <img className={style.icon} src="/icons/icons8-person-64.png" alt="icons8-search-50.png"/><span className={style.myAccount}>My Account</span>
                    </div>
            </header>
        </div>
       {/* <div className={styles.miniHeaderContainer + ' container-fluid'}>
            <div className={styles.miniHeader + ' container'}>
                <span className={styles.categoriesLink}>
                    <span className={styles.navLink}>
                        <img className={styles.categoryIcon} src='/icons/icons8-menu-48 (1).png' alt='icons8-menu-48 (1)' />
                        <span>Categories</span>
                    </span>
                </span>
                <span className={styles.navLink}>About us</span>
                <span className={styles.navLink}>Sell</span>
                <span className={styles.navLink}>Contact us</span>
            </div>
        </div> */}

        {/* 
            The My account should create a drop down onclick or focus
            The Logo should link back to the homepage
            The search button should be clickable
            The header should move up on scroll and move down on scroll down
            Add more Icons on the header to easen navigation
            Add some awesome animation on the header
        */}
    </div>
}

export default Header