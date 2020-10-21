import style from './CategorySectionSlider.module.css'
import {useRef, useState, useEffect} from 'react'

function CategorySectionSlider({subCategories, name, setMenuSelected, menuSelected}) {

    const menu=[];

    function handleNavigationClick(event){
        if (event.target.childNodes.length === 1){
            menu.map(menuItem => {
                if (menuItem.current.innerHTML === event.target.innerHTML){
                    menuItem.current.style.color='blue';
                    menuItem.current.style.borderBottomColor='blue';
                    setMenuSelected(menuItem.current.innerHTML);
                } else {
                    menuItem.current.style.color='black';
                    menuItem.current.style.borderBottomColor='transparent';
                }
            })
        }
    }

    useEffect(()=>{
        if(menuSelected){
            console.log(menuSelected);
            menu.map(menuItem => {
                console.log('were in');
                if (menuItem.current.innerHTML === menuSelected){
                    menuItem.current.style.color='blue';
                    menuItem.current.style.borderBottomColor='blue';
                } else {
                    menuItem.current.style.color='black';
                    menuItem.current.style.borderBottomColor='transparent';
                }
            })
        }
    })


    return (
        <>
            <ul 
                className={style.categorySectionSlider_container + ' componentScroll'}
                onClick={(event)=>handleNavigationClick(event)}
            >
                {
                    subCategories.map((subCategory, index)=>(
                    <li key={index} ref={menu[(menu.push(useRef())-1)]} >{subCategory}</li>
                    ))
                }
            </ul>
        </>
    )
}

export default CategorySectionSlider
