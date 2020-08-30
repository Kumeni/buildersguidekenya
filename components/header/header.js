import styles from './header.module.css'

function Header(){
    return <div>
        <header className={styles.header + ' container'}>
                <div className={styles.div} tabIndex='1'>
                    <img className={styles.bgkIcon} src='/images/buildersguidekenyalogo.png' alt='buildersguidekenyalogo'/>
                </div>
                <div className={styles.div} tabIndex='2'>
                    <input className={styles.searchBar} type='search' tabIndex='3' />
                </div>
                <div className={styles.div} tabIndex='5'>
                    <img className={styles.icon} src="/icons/icons8-person-64.png" alt="icons8-search-50.png"/><span className={styles.myAccount}>My Account</span>
                </div>
        </header>
       <div className={styles.miniHeaderContainer + ' container-fluid'}>
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
        </div>

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