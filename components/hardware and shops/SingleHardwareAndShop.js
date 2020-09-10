import style from './SingleHardwareAndShop.module.css'
function SingleHardwareAndShop() {
    return (
        <div className={style.hardware}>
            <div className={style.hardwareImageContainer}>
                <img className={style.hardwareImage}src='https://thumbs.dreamstime.com/z/building-materials-hardware-store-people-looking-finishing-materials-repairs-house-apartment-126859439.jpg' alt='' />
            </div>
            <div className={style.hardwareDetails}>
                <h4 className={style.hardwareName}>Joseph and Sons</h4>
                <h5 className={style.hardwareLocation}>Nairobi/Langata</h5>
            </div>
        </div>
    )
}

export default SingleHardwareAndShop
