import style from './header.module.css'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'

function Header(){

    const [searchInput, setSearchInput] = useState("");
    const router = useRouter();

    //search handling ******
    function handleSubmit(){
        if (searchInput !== ""){
            console.log(searchInput);
            router.push({
                pathname:'/search',
                query:{
                    q:searchInput,
                },
            })
        };
    }

    function handleEnter(event){
        event.keyCode !== 13 ? setSearchInput(event.target.value) : handleSubmit();
    }

    function handleSearchInput(event){
        //enter.test(event.target.value)? console.log('gotcha') :console.log('notyet');
    }

    useEffect(()=>{
        router.prefetch('/search');
    })

    return <div>
        <div className={style.headerContainer}>
            <header className={style.header}>
                    <div className={style.div + ' ' +style.bgkLogo} tabIndex='1'>
                        <img className={style.bgkIcon} src='/icons/builders guide logo-01.png' alt='buildersguidekenyalogo'/>
                    </div>
                    <div className={style.div}>
                        <img className={style.searchIcon} src='/icons/icons8-search-50.png' alt='icons8-search-50.png' />
                        <input className={style.searchBar} type='search' tabIndex='3' onChange={(event)=> handleSearchInput(event)}  onKeyUp={(event)=>handleEnter(event)}/>
                    </div>
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
            The header should move up on scroll and move down on scroll down
            Add more Icons on the header to easen navigation
            Add some awesome animation on the header
        */}
    </div>
}

export default Header