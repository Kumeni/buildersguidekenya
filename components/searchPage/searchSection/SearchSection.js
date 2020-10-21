import SectionTitle from '../../categorySections/sectionTitle'
import style from './SearchSection.module.css'

export default function SearchSection(props) {
    return (
        <div className={style.searchSection}>
            <SectionTitle title={props.title} setMenuSelected={(menu)=>props.setMenuSelected(menu)} link={'#'} />
            <div className={'componentScroll'}>
                {props.content}
            </div>
        </div>
    )
}
