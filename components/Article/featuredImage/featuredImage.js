import style from './featuredImage.module.css'

export default function FeaturedImage(props) {
    return (
        <div className={style.featuredImageContainer}>
            <img className={style.featuredImage} src={props.url?props.baseURL+props.url:""} alt={props.name?props.name:""} />
        </div>
    )
}
