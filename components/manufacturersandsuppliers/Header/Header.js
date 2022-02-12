import {useRouter} from 'next/router'
import style from './Header.module.css'
import {useState, useRef, useEffect} from 'react'
import Menu from './Menu';

export default function Header({title = 'Manufacturers and Suppliers', router=""}) {

    const searchComponent = useRef();
    const minInput = useRef(null);
    const mainRouter = useRouter();
    const [inputValue, setInputValue] = useState('');

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
                    <input className={'flex-shrink-0'} type='search' placeholder='i.e search' value={inputValue} onChange={(event)=>{handleInputChange(event)}} onKeyUp={(event)=>submitInputValue(event)}/>
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
                    />
                    <Menu
                        src = {"/icons/832921-200.png"}
                        menu = {"orders"}
                        title = {"My orders"}
                    />
                    <Menu
                        src = {"/icons/saved.png"}
                        menu = {"saved"}
                        title = {"Saved"}
                    />
                    <Menu
                        src = {"/icons/user.png"}
                        menu = {"user"}
                    />
                </div>
            </div>
        </div>
    )
}
