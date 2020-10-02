import style from './featuredImage.module.css'

export default function FeaturedImage() {
    return (
        <div className={style.featuredImageContainer}>
            <img className={style.featuredImage} src='/images/Tonys-Farm-by-Playze.jpg' alt='construction image' />
        </div>
    )
}
