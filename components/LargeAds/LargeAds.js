import AdsTitle from '../smallAds/AdsTitle'
import style from './LargeAds.module.css'

function LargeAds() {
    return (
        <div className={style.section}>
            <AdsTitle />
            <div className={style.adsContainer}>
                <div className={style.add}>

                </div>
                <div className={style.add}>

                </div>
                <div className={style.add}>

                </div>
                <div className={style.add}>

                </div>
                <div className={style.add}>

                </div>
                <div className={style.add}>

                </div>
                <div className={style.add}>

                </div>
            </div>
        </div>
    )
}

export default LargeAds
