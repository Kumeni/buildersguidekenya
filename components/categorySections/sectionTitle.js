import Link from 'next/link'
import style from './sectionTitle.module.css'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

function SectionTitle({title, link="/", setMenuSelected}){
    const router = useRouter();

    function handleNavigationClick(){
        //console.log('welcome');
        console.log(router.pathname);
        if(router.pathname === '/search'){
            setMenuSelected(title);
            console.log(title)
        }
    }

    return <div className={style.sectionHeader}>
        <Link href={link}>
        <h3 className={style.sectionTitle} onClick={()=>handleNavigationClick()}>{title}</h3>
        </Link>
        <Link href={link} passHref>
            <a className={style.sectionLink} onClick={()=>handleNavigationClick()}></a>
        </Link>
    </div>
}

export default SectionTitle