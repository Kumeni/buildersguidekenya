import style from './layout.module.css'

function Layout({children}) {
    return <div className={style.body}>
        {children}
    </div>
}

export default Layout