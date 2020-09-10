import style from './CategorySectionSlider.module.css'

function CategorySectionSlider({subCategories}) {
    return (
        <ul className={style.categorySectionSlider_container}>
            {
                subCategories.map((category, index)=>(
                    <li key={index}>{category}</li>
                ))
            }
        </ul>
    )
}

export default CategorySectionSlider
