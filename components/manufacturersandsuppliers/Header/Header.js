import {useRouter} from 'next/router'
import style from './Header.module.css'
import {useState, useRef, useEffect} from 'react'
import Menu from './Menu';
import Link from 'next/link';

export default function Header({title = 'Manufacturers and Suppliers', router="", loginData, setLoginData}) {

    const searchComponent = useRef();
    const minInput = useRef(null);
    const userMenu = useRef(null);
    const mainRouter = useRouter();
    const [inputValue, setInputValue] = useState('');
    const [menuState, setMenuState] = useState(false);
    const handleSearchClick = (index) => {
        searchComponent.current.style.zIndex=index;
        if(inputValue !== "" && inputValue !== undefined){
            submitInputValue({keyCode:13});
        }
    }

    useEffect(()=>{
        if (mainRouter.pathname === '/search'){
            if (router.pathname === '/search'){
                searchComponent.current.style.zIndex=3;
            }
            if(router.query.q !== "" & router.query.q !== undefined){
                setInputValue(router.query.q);
            }
        }
    },[router.query])

    const handleLogin = event => {
        sessionStorage.setItem("initialPathname", mainRouter.pathname);
        sessionStorage.setItem((mainRouter.pathname+'InitialScrollPos'), window.scrollY);
        if(mainRouter.query != undefined){
            if(mainRouter.asPath.indexOf("?") == -1){
                sessionStorage.removeItem("initialQuery");
            } else {
                let query = mainRouter.asPath.slice(mainRouter.asPath.indexOf("?")+1,)
                sessionStorage.setItem("initialQuery", query);
            }
        }
    }

    const showUserMenu = event => {
        console.log("working");
        if(menuState === false){
            //open the menu
            userMenu.current.style.right="0px";
            setMenuState(true);
        } else {
            //close the menu
            userMenu.current.style.right="-100vw";
            setMenuState(false);
        }
    }

    function handlePhoneSearchBackButtonClick(){
        if (mainRouter.pathname === '/search'){
            mainRouter.back();
        } else {
            handleSearchClick(2);
        }
    }

    function handleBackButtonClick(event){
        event.preventDefault();
        if(mainRouter.pathname !== "/")
            mainRouter.back();
    }
    function handleInputChange (event){
        setInputValue(event.target.value);
    }

    function submitInputValue (event){
        if(event.keyCode === 13){
            if (inputValue !== ""){
                console.log(inputValue);
                mainRouter.push({
                    pathname:'/search',
                    query:{
                        q:inputValue,
                    },
                })
            };
        }
    }

    return (
        <div>
            <div className={style.positionFixed}>
                <div className={style.headerContainer}>
                    <div ref={searchComponent} className={style.phoneSearch}>
                        <span onClick={()=>handlePhoneSearchBackButtonClick()}>
                            {/* <i className={'fas fa-arrow-left '+ style.arrowLeft}></i> */}
                            <img className = {style.backIcon} src = "/icons/back.png" />
                        </span>
                        <input  ref={minInput} value={inputValue} placeholder='i.e search' type='search' onChange={(event) => handleInputChange(event)} onKeyUp={(event)=>submitInputValue(event)} />
                        <span onClick={()=>submitInputValue({keyCode:13})}>
                            {/* <i className={'fas fa-search '+ style.searchButton }></i> */}
                            <img className = {style.searchIcon} src="/icons/search.png" />
                        </span>
                    </div>
                    <div className={'d-flex flex-row justify-content-between align-items-center ' + style.header}>
                        <a className={style.homePageLink} onClick={ event => handleBackButtonClick(event)}>
                            {
                                mainRouter.pathname == "/"?
                                    <div className = {style.title}>
                                        <img src = "/icons/bgk_icon.png" />
                                        <h1>Builders Guide Kenya</h1>
                                    </div>
                                :
                                    <div className={'d-flex flex-row align-items-center flex-shrink-1 ' + style.homeLink}>
                                        {/* <i className={'fas fa-arrow-left ' + style.arrowLeft}></i> */}
                                        <div title = "Click to go back">
                                            <img className = {style.backIcon} src = "/icons/back.png" />
                                        </div>
                                        <span>{title}</span>
                                    </div>
                            }
                            
                        </a>
                        <div className={'d-flex flex-row align-items-center ' + style.search} tabIndex = {3}>
                            <input title = {"Input to search"} className={'flex-shrink-0'} type='search' placeholder='i.e search' value={inputValue} onChange={(event)=>{handleInputChange(event)}} onKeyUp={(event)=>submitInputValue(event)}/>
                            <span onClick={()=>handleSearchClick(3)}>
                                {/* <i className={'fas fa-search' }></i> */}
                                <img onClick={()=>handleSearchClick(3)} title = "Click to search" className = {style.searchIcon} src="/icons/search.png" />
                            </span>
                        </div>
                        <div>
                            <Menu
                                src = {"/icons/cart.png"}
                                menu = {"cart"}
                                title = {"Shopping cart"}
                                link = {"/cart"}
                            />
                            <Menu
                                src = {"/icons/832921-200.png"}
                                menu = {"orders"}
                                title = {"My orders"}
                                link = {"/orders"}
                            />
                            <Menu
                                src = {"/icons/saved.png"}
                                menu = {"saved"}
                                title = {"Saved"}
                                link = {"/saved"}
                            />
                            {
                                loginData == undefined || loginData == null?
                                    <span
                                        onClick = { event => showUserMenu(event)}
                                    >
                                        <Menu
                                            src = {"/icons/user.png"}
                                            menu = {"user"}
                                            title = {"user"}
                                        />
                                    </span>
                                : <p 
                                    className={style.userInitial+ " bg-primary text-white"}
                                    onClick = { event => showUserMenu(event)}
                                    >{loginData.user.username.slice(0,1)}</p>
                            }
                            
                        </div>
                    </div>
                </div>
                <div className={style.signin}>
                    {
                        loginData == undefined || loginData == null?
                            <div ref={userMenu}>
                                <a href="#">
                                    <div className={style.googleIconContainer}>
                                        <img src="/icons/icons8-google-240.png" alt="google icon" />
                                    </div>
                                    <span>Continue with google</span>
                                </a>
                                <p>OR</p>
                                <Link href="/login">
                                    <a onClick = { event => handleLogin(event)} className={"bg-primary text-white"}>LOGIN</a>
                                </Link>
                                <p>Don't have an account? <Link href="/signup"><a>Create account</a></Link></p>
                            </div>
                        :
                            <div ref={userMenu}> 
                                <button onClick = {event => { sessionStorage.removeItem("loginData");showUserMenu(event); setTimeout(()=>setLoginData(null),500)}}>LOGOUT</button>
                            </div>
                    }
                    
                </div>
            </div>
            <div className={style.positionStatic}>
                <div className={style.headerContainer} style={{"visibility":"hidden"}}>
                    <div ref={searchComponent} className={style.phoneSearch}>
                        <span onClick={()=>handlePhoneSearchBackButtonClick()}>
                            {/* <i className={'fas fa-arrow-left '+ style.arrowLeft}></i> */}
                            <img className = {style.backIcon} src = "/icons/back.png" />
                        </span>
                        <input  ref={minInput} value={inputValue} placeholder='i.e search' type='search' onChange={(event) => handleInputChange(event)} onKeyUp={(event)=>submitInputValue(event)} />
                        <span onClick={()=>submitInputValue({keyCode:13})}>
                            {/* <i className={'fas fa-search '+ style.searchButton }></i> */}
                            <img className = {style.searchIcon} src="/icons/search.png" />
                        </span>
                    </div>
                    <div className={'d-flex flex-row justify-content-between align-items-center ' + style.header}>
                        <a className={style.homePageLink} onClick={ event => handleBackButtonClick(event)}>
                            {
                                mainRouter.pathname == "/"?
                                    <div className = {style.title}>
                                        <img src = "/icons/bgk_icon.png" />
                                        <h1>Builders Guide Kenya</h1>
                                    </div>
                                :
                                    <div className={'d-flex flex-row align-items-center flex-shrink-1 ' + style.homeLink}>
                                        {/* <i className={'fas fa-arrow-left ' + style.arrowLeft}></i> */}
                                        <div title = "Click to go back">
                                            <img className = {style.backIcon} src = "/icons/back.png" />
                                        </div>
                                        <span>{title}</span>
                                    </div>
                            }
                            
                        </a>
                        <div className={'d-flex flex-row align-items-center ' + style.search} tabIndex = {3}>
                            <input title = {"Input to search"} className={'flex-shrink-0'} type='search' placeholder='i.e search' value={inputValue} onChange={(event)=>{handleInputChange(event)}} onKeyUp={(event)=>submitInputValue(event)}/>
                            <span onClick={()=>handleSearchClick(3)}>
                                {/* <i className={'fas fa-search' }></i> */}
                                <img onClick={()=>handleSearchClick(3)} title = "Click to search" className = {style.searchIcon} src="/icons/search.png" />
                            </span>
                        </div>
                        <div>
                            <Menu
                                src = {"/icons/cart.png"}
                                menu = {"cart"}
                                title = {"Shopping cart"}
                                link = {"/cart"}
                            />
                            <Menu
                                src = {"/icons/832921-200.png"}
                                menu = {"orders"}
                                title = {"My orders"}
                                link = {"/orders"}
                            />
                            <Menu
                                src = {"/icons/saved.png"}
                                menu = {"saved"}
                                title = {"Saved"}
                                link = {"/saved"}
                            />
                            <Menu
                                src = {"/icons/user.png"}
                                menu = {"user"}
                                title = {"user"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
