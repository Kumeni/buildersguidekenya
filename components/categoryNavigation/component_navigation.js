import style from './component_navigation.module.css'

export default function ComponentNavigation(){
    return <div className={style.categories}>
        <h4 className={style.categoryNavigationTitle}>What we offer</h4>
        <div className={style.cateNav}>
            <div className={style.category}>
                <img className={style.cateIcon} src='/categoryIcons/icons8-hammer-and-anvil-100.png' alt='icons8-hammer-and-anvil-100' />
                <p className={style.cateName}> Materials and Services</p>
            </div>
            <div className={style.category}>
                <img className={style.cateIcon} src='/categoryIcons/icons8-bulldozer-96.png' alt='icons8-bulldozer-96' />
                <p className={style.cateName}>Construction Machinery</p>
            </div>
            <div className={style.category}>
                <img className={style.cateIcon} src='/categoryIcons/icons8-warehouse-200.png' alt='icons8-warehouse-200' />
                <p className={style.cateName}>Hardwares and Stores</p>
            </div>  
            <div className={style.category}>
                <img className={style.cateIcon} src='/categoryIcons/icons8-engineer-40.png' alt='icons8-engineer-40' />
                <p className={style.cateName}>Artisans and Professionals</p>
            </div>
            <div className={style.category}>
                <img className={style.cateIcon} src='/categoryIcons/icons8-businesswoman-96.png' alt='icons8-businesswoman-96' />
                <p className={style.cateName}>Contractors</p>
            </div>
            <div className={style.category}>
                <img className={style.cateIcon} src='/categoryIcons/icons8-truck-80.png' alt='icons8-truck-80' />
                <p className={style.cateName}>Transporters</p>
            </div>
            <div className={style.category}>
                <img className={style.cateIcon} src='/categoryIcons/icons8-shield-64.png' alt='icons8-shield-64' />
                <p className={style.cateName}>Finance and Insurance</p>
            </div>
            <div className={style.category}>
                <img className={style.cateIcon} src='/categoryIcons/icons8-education-80.png' alt='icons8-education-80' />
                <p className={style.cateName}>Education and Training</p>
            </div>
        </div>
    </div>
}