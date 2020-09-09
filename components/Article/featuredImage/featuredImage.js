import style from './featuredImage.module.css'

export default function FeaturedImage() {
    return (
        <div className={style.featuredImageContainer}>
            <img className={style.featuredImage} src='https://www.lhsfna.org/LHSFNA/assets/File/severe%20weather%20construction97.jpg' alt='construction image' />
        </div>
    )
}
