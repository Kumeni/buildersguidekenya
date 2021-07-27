import Link from 'next/link'
import style from './sectionTitle.module.css'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'

function SectionTitle({title, link="/", menuSelected, setMenuSelected, dataType}){
    const router = useRouter();
    const [moreLink, setMoreLink] = useState("/");

    function handleNavigationClick(){
        //console.log('welcome');
        console.log(router.pathname);
        if(router.pathname === '/search'){
            setMenuSelected(title);
            console.log(title)
        }
    }


    useEffect(()=>{
        if(menuSelected!==undefined){
            if(menuSelected.subCategory!==undefined){
                //This code is responsible for navigating to the subCategory page
                if(menuSelected.speCatName===undefined){
                    if(dataType===1 || dataType===2){
                        //navigation for products and manufacturers
                        if(menuSelected.subCategory==="All"){
                            //console.log(link);
                            setMoreLink(link);
                        } else {
                            //console.log();
                            setMoreLink(link+"/"+menuSelected.subCategory);
                        }
                        
                    } else if(dataType===3){
                        //navigation for plants and machineries
                        if(menuSelected.subCategory==="All"){
                            //console.log(link);
                            setMoreLink(link);
                        } else {
                            //console.log(link+"?category="+menuSelected.subCategory);
                            setMoreLink({
                                pathname:link,
                                query:{
                                    category:menuSelected.subCategory
                                }
                            });
                        }
                    } else if(dataType===4){
                        if(menuSelected.id==0){
                            //console.log(link);
                            setMoreLink(link);
                        }
                    }
                } else {
                    //This code is responsible for navigation to the specificCategory menu
                    if(dataType===1 || dataType===2){
                        //navigation for products and manufacturers
                        if(menuSelected.speCatName==="All"){
                            //console.log(link);
                            setMoreLink(link);
                        } else {
                            //console.log(link+"?category="+menuSelected.speCatName);
                            setMoreLink({
                                pathname:link,
                                query:{
                                    category:menuSelected.speCatName
                                }
                            })
                        }
                    }
                }
            } else if (menuSelected.vehiclesAvailable!==undefined){
                //navigation for vehicles
                //console.log(link+"?vehicleType="+menuSelected.name);
                setMoreLink({
                    pathname:link,
                    query:{
                        category:menuSelected.name
                    }
                })
            } else if (menuSelected.id==0){
                //console.log(link);
                setMoreLink(link);
            }
        } else {
            setMoreLink(link);
        }
    }, [menuSelected])

    return <div className={style.sectionHeader}>
        <Link href={link}>
        <h3 className={style.sectionTitle}>{title}</h3>
        </Link>
        <Link href={moreLink} passHref>
            <a className={style.sectionLink} onClick={()=>handleNavigationClick()}></a>
        </Link>
    </div>
}

export default SectionTitle