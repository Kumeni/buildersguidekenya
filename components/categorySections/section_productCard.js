import style from './section_productCard.module.css'

function ProductCard({productInfo}){
    return (
        productInfo.map( (product, index) => (
        <div key={index} className={style.productCard}>
            <div className={style.p_imageContainer}>
                <img className={style.productImage} src={product.url} alt={product.productName} />
            </div>
            <div className={style.productInfo}>
                <p className={style.productName}>{product.productName}</p>
                <p className={style.productPrice}>{product.supplier}</p>
            </div>
        </div>
        ))         
    )
}

export default ProductCard