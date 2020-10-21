import style from './ConstructionMachinery.module.css'
import Link from 'next/link'

export default function ConstructionMachinery({fullWidth=false}) {

    const data = [
        {
            src:'/images/Construction-resized.jpg',
            alt:'constructionImage',
            name:'Crane',
            price:'Ksh. 20,000/hr',
            location:'Nairobi/Langata'
        },
        {
            src:'/images/Construction-resized.jpg',
            alt:'constructionImage',
            name:'Crane',
            price:'Ksh. 20,000/hr',
            location:'Nairobi/Langata'
        },
        {
            src:'/images/Construction-resized.jpg',
            alt:'constructionImage',
            name:'Crane',
            price:'Ksh. 20,000/hr',
            location:'Nairobi/Langata'
        },
        {
            src:'/images/Construction-resized.jpg',
            alt:'constructionImage',
            name:'Crane',
            price:'Ksh. 20,000/hr',
            location:'Nairobi/Langata'
        },
        {
            src:'/images/Construction-resized.jpg',
            alt:'constructionImage',
            name:'Crane',
            price:'Ksh. 20,000/hr',
            location:'Nairobi/Langata'
        },
        {
            src:'/images/Construction-resized.jpg',
            alt:'constructionImage',
            name:'Crane',
            price:'Ksh. 20,000/hr',
            location:'Nairobi/Langata'
        },
        {
            src:'/images/Construction-resized.jpg',
            alt:'constructionImage',
            name:'Crane',
            price:'Ksh. 20,000/hr',
            location:'Nairobi/Langata'
        },
        {
            src:'/images/Construction-resized.jpg',
            alt:'constructionImage',
            name:'Crane',
            price:'Ksh. 20,000/hr',
            location:'Nairobi/Langata'
        },
        {
            src:'/images/Construction-resized.jpg',
            alt:'constructionImage',
            name:'Crane',
            price:'Ksh. 20,000/hr',
            location:'Nairobi/Langata'
        },
    ];

    return (
        data.map( (machinery,index) => (
            <Link key={index} href={{
                pathname:"/constructionMachinery/singleConstructionMachinery",
                query:{
                    machinery:machinery.name,
                }
            }}>
                <div className={fullWidth? style.constructionMachinery_FullWidth : style.constructionMachinery}>
                    <div className={fullWidth? style.imageContainer_FullWidth : style.imageContainer}>
                        <img src={machinery.src} alt={machinery.alt} />
                    </div>
                    <div className={fullWidth? style.details_FullWidth : style.details}>
                        <p><span><i className={'fas fa-truck-monster'}></i></span> {machinery.name}</p>
                        <p><span><i className={'fas fa-tag'}></i></span> {machinery.price}</p>
                        <p><span><i className={'fas fa-map-marker-alt'}></i></span> {machinery.location}</p>
                    </div>
                </div>
            </Link>
        ))
    )
}
