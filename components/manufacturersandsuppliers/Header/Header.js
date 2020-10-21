import {useRouter} from 'next/router'
import style from './Header.module.css'
import {useState, useRef, useEffect} from 'react'

export default function Header({title = 'Manufacturers and Supplier', router=""}) {

    const searchComponent = useRef();
    const minInput = useRef(null);
    const mainRouter = useRouter();
    const [inputValue, setInputValue] = useState('');

    const handleSearchClick = (event) => {
        searchComponent.current.style.zIndex=3;
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
    },[])

    function handlePhoneSearchBackButtonClick(){
        if (mainRouter.pathname === '/search'){
            mainRouter.back();
        }
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
                <span onClick={(event)=>handlePhoneSearchBackButtonClick()}><i className={'fas fa-arrow-left '+ style.arrowLeft}></i></span>
                <input  ref={minInput} value={inputValue} placeholder='i.e search' type='search' onChange={(event) => handleInputChange(event)} onKeyUp={(event)=>submitInputValue(event)} />
                <span><i className={'fas fa-search '+ style.searchButton }></i></span>
            </div>
            <div className={'d-flex flex-row justify-content-between align-items-center ' +style.header}>
                <a className={style.homePageLink} onClick={(event)=>handlePhoneSearchBackButtonClick()}>
                <div className={'d-flex flex-row align-items-center flex-shrink-1 ' + style.homeLink}>
                    <i className={'fas fa-arrow-left ' + style.arrowLeft}></i>
                    <span>{title}</span>
                </div>
                </a>
                <div className={'d-flex flex-row align-items-center ' + style.search}>
                    <input className={'flex-shrink-0'} type='search' placeholder='i.e search' value={inputValue} onChange={(event)=>{handleInputChange(event)}} onKeyUp={(event)=>submitInputValue(event)}/>
                    <span onClick={(event)=>handleSearchClick(event)}><i className={'fas fa-search' }></i></span>
                </div>
                <i className={'fas fa-shopping-cart ' + style.shoppingCart}></i>
            </div>
        </div>
    )
}
