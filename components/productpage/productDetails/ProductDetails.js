import style from './ProductDetails.module.css'

function ProductDetails() {
    return (
        <div className={style.detailsContainer}>
            <h5>Jumboleen6000</h5>
            <div className={style.productInformation}>
                <p><i className={'fas fa-star ' + style.rating}></i> 4.6 | 1,249 ratings</p>
                <p><strong>Location(s)</strong>:Nairobi</p>
                <p><strong>Manufacturer</strong>: JUMBO CHEM KENYA LTD</p>
                <p><strong>Supplier</strong>: JUMBO CHEM KENYA LTD</p>
            </div>
            <div className={style.sizeSelect}>
                <label for='size'>Size : </label>
                <select name='size' id='size' className={style.size}>
                    <option value='null'>select</option>
                    <option value='size1'>size 1</option>
                    <option value='size2'>size 2</option>
                    <option value='size3'>size 3</option>
                    <option value='size4'>size 4</option>
                </select>
            </div>
            <div className={style.colorSelect}>
                <h5 className={'d-flex justify-content-between align-items-center'}>Available colors <span><button className={'btn'}>See all</button></span></h5>
                <div className={"componentScroll " + style.availableColors}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={style.productDescription}>
                <h5>Product description</h5>
                <p>
                    Jumboleen6000 a product used for sealing the roof so that no element leaks into the house.
                    Elements like water, fire, air and plasma are no match for jumboleen6000
                </p>
                <button><i class="fas fa-angle-double-down"></i></button>
            </div>

        </div>
    )
}

export default ProductDetails
