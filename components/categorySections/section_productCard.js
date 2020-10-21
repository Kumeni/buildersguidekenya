import style from './section_productCard.module.css'
import Link from 'next/link'

function ProductCard({productInfo}){
    return (
        productInfo.map( (product, index) => (
        <Link key={index} href={{
            pathname:'product',
            query:{
                p:product.productName,
            }
        }}>
            <div key={index} className={style.productCard}>
                <div className={style.p_imageContainer}>
                    <img className={style.productImage} src={product.url} alt={product.productName} />
                </div>
                <div className={style.productInfo}>
                    <p className={style.productName}>{product.productName}</p>
                    <p className={style.productPrice}>Ksh. 0</p>
                    <p className={style.productSupplier}>{product.supplier}</p>
                </div>
            </div>
        </Link>
        ))         
    )
}

export default ProductCard