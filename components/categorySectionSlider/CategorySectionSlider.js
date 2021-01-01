import style from './CategorySectionSlider.module.css'
import {useRef, useState, useEffect} from 'react'

function CategorySectionSlider({subCategories, name, setMenuSelected, menuSelected}) {

    const [availableMenu, setAvailableMenu] = useState([]);
    const [activeMenu, setActiveMenu] = useState();

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
            }
        }
    }, [subCategories])

    function handleNavigationClick(event){
        if (event.target.childNodes.length === 1){
            let i=0;
            for(i; i<menu.current.children.length; i++){
                if (menu.current.children[i].innerHTML === event.target.innerHTML){
                    menu.current.children[i].style.color='blue';
                    menu.current.children[i].style.borderBottomColor='black';
                    setActiveMenu(menu.current.children[i].innerHTML);
                    setMenuSelected(availableMenu[i]);
                } else {
                    menu.current.children[i].style.color='black';
                    menu.current.children[i].borderBottomColor='transparent';
                }
            }
        }
    }

    useEffect(()=>{
        if(activeMenu){
            let i=0;
            for(i; i<menu.current.children.length;i++){
                if (menu.current.children[i].innerHTML === activeMenu){
                    menu.current.children[i].style.color='blue';
                    menu.current.children[i].style.borderBottomColor='blue';
                } else {
                    menu.current.children[i].style.color='black';
                    menu.current.children[i].style.borderBottomColor='transparent';
                }
            }
        }
    }, [activeMenu])

    useEffect(()=>{
        console.log(availableMenu);
    })

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
                        <li key={index} value={element} ref={menu[index]} >{element.categories?element.subCategory:element.speCatName}</li>
                    ))
                }
            </ul>
            :''
        }
        </>
    )
}

export default CategorySectionSlider
