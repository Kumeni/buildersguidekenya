import style from './component_navigation.module.css'
import Link from 'next/link'
import Category from './Category'

export default function ComponentNavigation(){

    return <div className={style.categories}>
        <h4 className={style.categoryNavigationTitle}>What we offer</h4>
        <div className={style.cateNav}>
            <Category 
                link={"/products-and-services"}
                icon={'/icons/icons8-product-64.png'}
                iconAlt={'icons8-hammer-and-anvil-100'}
                categoryTitle={<> Products and<br /> Services </>}
            />
            <Category
                link={"/manufacturersandsuppliers"}
                icon={"/categoryIcons/icons8-hammer-and-anvil-100.png"}
                iconAlt={"icons8-hammer-and-anvil-100"}
                categoryTitle={<>Manufacturers<br /> and Suppliers</>}
            />
            <Category
                link={"/plants-and-machineries"}
                icon={"/categoryIcons/icons8-bulldozer-96.png"}
                iconAlt={"icons8-bulldozer-96"}
                categoryTitle={<>Plants and <br /> Machineries</>}
            />
            <Category
                link={"/transport-vehicles"}
                icon={"/categoryIcons/icons8-truck-80.png"}
                iconAlt={"icons8-truck-80"}
                categoryTitle={<>Transporters</>}
            />
            <Category
                link={"/tips-and-advices"}
                icon={"/categoryIcons/icons8-education-80.png"}
                iconAlt={"icons8-truck-80"}
                categoryTitle={<>Tips and<br/>advices</>}
            />
            <Category
                link={"/hardwares-and-yards"}
                icon={"/categoryIcons/icons8-warehouse-200.png"}
                iconAlt={"icons8-warehouse-200"}
                categoryTitle={<>Hardwares <br /> and Yards</>}
            />
            <Category
                link={"/products-and-services/Landscaping and gardening"}
                icon={"/icons/icons8-grass-48.png"}
                iconAlt={"icon8-grass-48.png"}
                categoryTitle={<>Landscaping <br />& gardening</>}
            />
            <Category 
                link={"/products-and-services/Furniture and furnishings"}
                icon={"/icons/icons8-wardrobe-48.png"}
                iconAlt={"icons8-wardrobe-48.png"}
                categoryTitle={<>Furniture & Furnishings</>}
            />

            {/* <Category
                link={"/artisans-and-professionals"}
                icon={"/categoryIcons/icons8-engineer-40.png"}
                iconAlt={"icons8-engineer-40"}
                categoryTitle={<>Artisans and Professionals</>}
            />
            <Category
                link={"/contractors"}
                icon={"/categoryIcons/icons8-businesswoman-96.png"}
                iconAlt={"icons8-businesswoman-96"}
                categoryTitle={<>Contractors</>}
            />
            
            <Link href='/Building Instituions'>
                <div className={style.category}>
                    <img className={style.cateIcon} src='/categoryIcons/icons8-shield-64.png' alt='icons8-shield-64' />
                    <p className={style.cateName}>Building Institutions</p>
                </div>
            </Link>
             <Link href='tenders'>
                <div className={style.category}>
                    <img className={style.cateIcon} src='/categoryIcons/icons8-education-80.png' alt='icons8-education-80' />
                    <p className={style.cateName}>Tenders</p>
                </div>
            </Link> */}
        </div>
    </div>
}