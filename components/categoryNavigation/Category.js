import React from 'react'
import style from './Category.module.css'
import Link from 'next/link'

function Category(props) {
    return (
        <Link href={props.link}>
            <div className={style.category}>
                <img className={style.cateIcon} src={props.icon} alt={props.iconAlt} />
                <p className={style.cateName}> {props.categoryTitle}</p>
            </div>
        </Link>
    )
}

export default Category
