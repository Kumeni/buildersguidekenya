import style from './HardwareAndShops.module.css'
import SectionTitle from '../categorySections/sectionTitle'
import SingleHardwareAndShop from './SingleHardwareAndShop'

function HardwareAndShops() {
    return (
        <div className={style.hardwareAndShopsContainer}>
            <SectionTitle title={'Hardwares and Shops'} />
            <div className={style.hardwaresContainer}>
                <SingleHardwareAndShop />
                <SingleHardwareAndShop />
                <SingleHardwareAndShop />
                <SingleHardwareAndShop />
                <SingleHardwareAndShop />
                <SingleHardwareAndShop />
                <SingleHardwareAndShop />
            </div>
        </div>
    )
}

export default HardwareAndShops
