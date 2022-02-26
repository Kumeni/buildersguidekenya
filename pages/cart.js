import React, {useEffect, useState, useRef} from 'react';
import Head from 'next/head';
import Header from '../components/manufacturersandsuppliers/Header/Header';
import {useRouter} from 'next/router';
import style from '../components/cart/cartPage.module.css';
import Product from '../components/cart/Product';
import CartAmount from '../components/cartAmount/cartAmount';
import axios from 'axios';


function cart(props) {

    const [cart, setCart] = useState();
    const [products, setProducts] = useState();
    const [pricings, setPricings] = useState();
    const [counties, setCounties] = useState();
    const [constituencies, setConstituencies] = useState();

    useEffect(()=>{
        //This block is responsible for filling the cart fully;
        if(cart !== undefined && pricings !== undefined && products !== undefined){
            let i, j, holder = cart;
            for (i = 0; i < holder.length; i++){
                for (j = 0; j < pricings.length; j++){
                    if(pricings[j].id == holder[i].pricingId){
                        holder[i].pricing = pricings[j];
                        break;
                    }
                }
                
                for (j = 0; j < products.length; j++){
                    if(products[j].id == holder[i].productId){
                        holder[i].product = products[j];
                        break;
                    }
                }
            }

            console.log(holder);
            setCart(holder.slice());
        }
    },[pricings, products])

    useEffect(()=>{
        setTimeout(()=>{
            if(cart !== undefined && cart.length > 0 && props.loginData != undefined && cart[0].product == undefined && cart[0].pricing == undefined){
                //This method fills gets all the cart dependencies from the database
                let products = "";
                let pricings = "";
    
                //console.log(cart);
                cart.map((element, index) => {
                    if(index == cart.length-1){
                        products += "id="+element.productId;
                        pricings += "id="+element.pricingId;
                    }
                    else {
                        products += "id="+element.productId+"&";
                        pricings += "id="+element.pricingId+"&";
                    }
                })
                
                /*console.log("Great work");
                console.log(products);
                console.log(pricings);*/
    
                //This function gets the info from the database
                const getDataFromDB = async (route, query, supportQuery, method) => {
                    await axios({
                        url:props.baseURL + route + supportQuery + query,
                        method:"get",
                        headers:{
                            "Authorization":"Bearer "+props.loginData.jwt,
                        },
                    })
                    .then(res=>{
                        //console.log(res);
                        method(res.data);
                        return res;
                    })
                    .catch(err=>{
                        console.log(err.response);
                    })
                }
                
                getDataFromDB("/products?", products, "deleted=false&", setProducts);
                getDataFromDB("/product-pricings?", pricings, "Deleted=false&", setPricings);
            }
        }, 500)
    }, [cart, props.loginData])

    useEffect(()=>{
        if(props.loginData !== undefined && props.loginData !== null){
            //get cart from the database
            axios({
                url:props.baseURL+"/carts?userId="+props.loginData.user.id,
                method:"get",
                headers:{
                    "Authorization":"Bearer "+props.loginData.jwt,
                },
            })
            .then(res=>{
                console.log(res);
                setCart(res.data.slice());
                return res;
            })
            .catch(err=>{
                console.log(err.response);
            })
        } else {
            //use the cart info in the local storage
            if(localStorage.getItem("cart") == null){
                setCart([]);
            } else {
                setCart(JSON.parse(localStorage.getItem("cart")));
            }
        }
        
        const getCounties = async () => {
            const counties = await axios.get(props.baseURL+'/counties?_limit=-1');
            const constituencies = await axios.get(props.baseURL+'/constituencies?_limit=-1');
        }
        
        /*if (router.query.v){
            async function getProductData(){

                const productDetailsFromDB = await axios.get(props.baseURL+'/products/'+ productId)
                .then(async res=>{
                    setProductDetails(companyInfoComplete([res.data], counties.data, constituencies.data));
                    //console.log(companyInfoComplete([res.data], counties.data, constituencies.data));
                    return res;
                })
                .catch(err=>{
                    console.log(err.response);
                })*/

                /*const productImages = await*/ /*axios.get(props.baseURL+'/product-images?productId='+ productId +'&approved=true&deleted=false&blocked=false')
                .then(res=>{
                    //console.log(res.data);
                    setProductImages(res.data);
                })
                .catch(err=>{
                    console.log(err.response);
                })*/

                /*await*/ /*axios.get(props.baseURL+'/product-pricings?productId='+ productId)
                .then(res=>{
                    //console.log(res.data);
                    setProductPricings(res.data);
                    if(res.data.length > 0){
                        console.log("Im running 1");
                        updateProductPrice(res.data);
                    }
                    return res;
                })
                .catch(err=>{
                    console.log(err.response);
                })

                

                axios.get(props.baseURL+'/pickup-locations?_limit=-1')
                .then( res => {
                    setPickupLocations(res.data);
                    let countiesArray =[], constituenciesArray = [];
                    
                    res.data.map((element, index) => {
                        if(countiesArray.indexOf(element.countyId) == -1)
                            countiesArray.push(element.countyId);
                        if(constituenciesArray.indexOf(element.constituencyId) == -1)
                            constituenciesArray.push(element.constituencyId);
                    })

                    let i, j;
                    for (i = 0; i < countiesArray.length; i++){
                        for(j = 0; j < counties.data.length; j++){
                            if(counties.data[j].id == countiesArray[i]){
                                countiesArray[i] = counties.data[j];
                                break;
                            }
                        }
                    }
                    
                    for(i = 0; i < constituenciesArray.length; i++){
                        for(j = 0; j < constituencies.data.length; j++){
                            if(constituencies.data[j].id == constituenciesArray[i]){
                                constituenciesArray[i] = constituencies.data[j];
                                break;
                            }
                        }
                    }
                   
                    setPickupCounties(countiesArray);
                    setPickupConstituencies(constituenciesArray);
                })

                axios.get(props.baseURL+"/transportation-costs?_limit=-1")
                .then( res =>{
                    setTransportationCosts(res.data);
                })
            }
            getProductData();
        }*/
        
    },[props.loginData])

    const router = useRouter();

    return (
        <div className = {style.cartPage}>
            <Head>
                {/* Global site tag (gtag.js) - Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-8VYK6XCD9G"></script>

                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />

                <title> Shopping cart | Builders Guide Kenya</title>

            </Head>
            <Header title="Shopping cart" router={router} />
            <div className = {style.content}>
                <section>
                    {
                        cart !== undefined && cart.length > 0?
                            cart.map((element, index)=>(
                                <Product 
                                    type = {"CART-ITEM"}
                                    cart = {element}
                                    product = {element.product}
                                    pricing = {element.pricing}
                                    key={index}
                                />
                            ))
                        :undefined
                    }
                </section>
                <section>
                    <CartAmount />
                </section>
            </div>
        </div>
    )
}

export default cart
