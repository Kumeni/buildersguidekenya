import style from './Article.module.css'
import Link from 'next/link'

export default function Article() {
    return (
        <Link href={{
            pathname:'/article'
        }}>
            <div className={style.container}>
                <div className={style.articleContent}>
                    <div>
                        <h1>Thi is the reason why tiles break under direct sunligt </h1>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Curabitur finibus posuere nibh, eget bibendum risus iaculis ut.
                        Proin a tincidunt eros. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Duis porta quam nulla, in varius est maximus eu.
                        Fusce ut enim commodo, interdum augue sed, tristique risus.
                        Duis semper convallis fringilla. In porttitor, orci eu viverra
                        ornare, orci quam auctor nisi, vitae porta elit mi sit amet nisl.
                        Cras sagittis magna neque. Ut mattis diam tempus elementum blandit.
                        In eu dolor eget metus dictum vehicula. Integer eleifend ornare sem.
                        Vestibulum nisi tellus, commodo nec feugiat eget, faucibus a erat.
                        Vivamus sodales egestas blandit.
                        In et nisl laoreet, lacinia dolor ut, fermentum nisi.
                        Donec fermentum, sapien vel ullamcorper pulvinar, urna dui porttitor
                        ante, eu aliquam lacus nulla sed nisi. Sed vulputate tincidunt ex ac
                        fringilla.
                    </p>
                    <span>by John Doe</span>
                    <span>Published on Sept 14, 2020 </span>
                </div>
                <div className={style.articleImage}>
                    <img src='/images/unique house design.jpg' alt='image' />
                </div>
            </div>
        </Link>
    )
}
