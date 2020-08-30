import Link from 'next/link'
import style from './sectionTitle.module.css'

function SectionTitle({title}){
    return <div className={style.sectionHeader}>
        <h3 className={style.sectionTitle}>{title}</h3>
        <Link href='#'>
            <a className={style.sectionLink}></a>
        </Link>
    </div>
}

export default SectionTitle