import style from './CategorySectionSlider.module.css'
import {useRef, useState, useEffect} from 'react'
import {useRouter} from 'next/router'

function CategorySectionSlider({subCategories, name, setMenuSelected, menuSelected, storedSelectedMenu}) {

    const [availableMenu, setAvailableMenu] = useState([]);
    const [activeMenu, setActiveMenu] = useState();
    const router = useRouter();

    const menu = useRef();

    //Guild
    /*useEffect(()=>{
            console.log(availableMenu);
    }, [availableMenu])*/

    //Creating a menu that only shows the available subCategories
    useEffect(()=>{
        if(subCategories.length !== 0){
            if(subCategories[0].categories){
                setAvailableMenu([{
                    subCategory:"All",
                    id:0,
                    categories:-1
                }].concat(subCategories));
            } else if(subCategories[0].speCatName){
                setAvailableMenu([{
                    speCatName:"All",
                    id:0,
                    subCategory:0
                }].concat(subCategories));
            } else if(subCategories[0].name){
                setAvailableMenu([{
                    name:"All",
                    id:0,
                    subCategory:0
                }].concat(subCategories));
            } else if(subCategories[0].category){
                setAvailableMenu([{
                    name:"All",
                    id:0,
                    subCategory:0
                }].concat(subCategories));
            }
        }
    }, [subCategories])

    function handleNavigationClick(event){
        if (event.target.childNodes.length === 1){
            let i=0;
            for(i; i<menu.current.children.length; i++){
                if (menu.current.children[i].innerHTML === event.target.innerHTML){
                    menu.current.children[i].style.color='blue';
                   // menu.current.children[i].style.borderBottomColor='black';
                    setActiveMenu(menu.current.children[i].innerHTML);
                    setMenuSelected(availableMenu[i]);
                } else {
                    menu.current.children[i].style.color='black';
                    //menu.current.children[i].borderBottomColor='transparent';
                }
            }
        }
    }

    //This code is responsible for setting the color of the menus
    useEffect(()=>{
        if(activeMenu){
            let i=0;
            for(i; i<menu.current.children.length;i++){
                if (menu.current.children[i].innerHTML === activeMenu){
                    menu.current.children[i].style.color='blue';
                    //menu.current.children[i].style.borderBottomColor='blue';
                } else {
                    menu.current.children[i].style.color='black';
                    //menu.current.children[i].style.borderBottomColor='transparent';
                }
            }
        }
    }, [activeMenu])

    //This method is responsible for clicking the desired menu
    useEffect(()=>{
        if(router.query.category!==undefined&&menu.current!=null){
            //trigger a click event on link element that innerHTML=router.query.category
            let i=0;
            for(i; i<menu.current.children.length; i++){
                if(menu.current.children[i].innerHTML === router.query.category){
                    menu.current.children[i].click();
                    break;
                }
            }
        }
        if(storedSelectedMenu != undefined){
            let i=0;
            for(i; i<menu.current.children.length; i++){
                if(menu.current.children[i].innerHTML === storedSelectedMenu){
                    menu.current.children[i].click();
                    break;
                }
            }
        }
    }, [router.query.category, menu.current, storedSelectedMenu])

    return (
        <>
        {
            availableMenu?
            <ul 
                className={style.categorySectionSlider_container + ' componentScroll'}
                onClick={(event)=>handleNavigationClick(event)}
                ref={menu}
            >
                {
                    availableMenu.map((element, index)=>(
                        <li key={index} value={element} ref={menu[index]} >{element.categories?element.subCategory:element.speCatName?element.speCatName:element.name?element.name:element.category}</li>
                    ))
                }
            </ul>
            :''
        }
        </>
    )
}

export default CategorySectionSlider
