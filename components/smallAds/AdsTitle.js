import style from './AdsTitle.module.css'

function AdsTitle({title}) {
    return (
        <div className={style.adsTitle}>
                <h3><span className={style.ads}>ads-</span>{title}</h3>
        </div>
    )
}

export default AdsTitle
