import style from './bannerSlides.module.css'

function BannerSlide({url}){

    return <div className = {style.slide}>
       <img className={style.billboard}src={url} />
    </div>

}

export default BannerSlide