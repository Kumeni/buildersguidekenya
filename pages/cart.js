import React, {useEffect, useState, useRef} from 'react';
import Head from 'next/head';
import Header from '../components/manufacturersandsuppliers/Header/Header';
import {useRouter} from 'next/router';
import style from '../components/cart/cartPage.module.css';
import Product from '../components/cart/Product';
import CartAmount from '../components/cartAmount/cartAmount';
import axios from 'axios';
import WindowPopUp from '../components/WindowPopUp/WindowPopUp';
import PickupLocation from '../components/pickupLocation/PickupLocation';
import PickupLocationDetails from '../components/pickupLocationDetails/PickupLocationDetails';
import Payment from '../components/payment/Payment';
import Validator from 'validatorjs';

function cart(props) {

    const [cart, setCart] = useState();
    const [products, setProducts] = useState();
    const [pricings, setPricings] = useState();
    const [suppliers, setSuppliers] = useState();
    const [images, setImages] = useState();
    const [counties, setCounties] = useState();
    const [constituencies, setConstituencies] = useState();

    const [communicationPhoneNumber, setCommunicationPhoneNumber] = useState("");
    const [communicationEmail, setCommunicationEmail] = useState("");
    const [communicationContactError, setCommunicationContactError] = useState();

    const [selectedCounty, setSelectedCounty] = useState(0);
    const [selectedConstituency, setSelectedConstituency] = useState(0);
    const [selectedPickupLocation, setSelectedPickupLocation] = useState();
    const [validatedPickupLocation, setValidatedPickupLocation] = useState();

    const [showPickupLocation, setShowPickupLocation] = useState();
    const [showPayment, setShowPayment] = useState();
    const [lastScrollPos, setLastScrollPos] = useState();
    const [pickupLocations, setPickupLocations] = useState();

    const [pickupCounties, setPickupCounties] = useState();
    const [pickupConstituencies, setPickupConstituencies] = useState();

    const [pickupLocationMapsLink, setPickupLocationMapsLink] = useState();
    const [pickupLocationDirection, setPickupLocationDirection] = useState();
    const [advancedPickupLocationError, setAdvancedPickupLocationError] = useState();

    const [transportationCosts, setTransportationCosts] = useState();
    const [pickupLocationError, setPickupLocationError] = useState("");
    const [generalPickupLocationError, setGeneralPickupLocationError] = useState();
    const [formError, setFormError] = useState("");
    const [transportationCost, setTransportationCost] = useState("...");
    const [totalCost, setTotalCost] = useState("...");
    const [mpesaPhoneNumber, setMpesaPhoneNumber] = useState();
    const [mpesaError, setMpesaError] = useState("");

    const body = useRef(null);

    useEffect(()=>{
        if(cart != undefined){
            //save cart updates in the session storage.
            
        }
    }, [cart])

    useEffect(()=>{
    }, [showPickupLocation])

    const handlePurchase = async event => {
        let holder = [], i , j, cartObject = {};
        products;
        pricings;
        pickupLocations;
        cart;

        if(cart.length < 1)
            return null;
            
        
        for ( i = 0; i < cart.length; i++){

            cartObject.pricingId = cart[i].pricingId;
            cartObject.productId = cart[i].productId;
            cartObject.units = cart[i].units;
            cartObject.userId = cart[i].userId;
            holder[i] = cartObject;

            for( j = 0; j < products.length; j++){
                if( holder[i].productId == products[j].id){
                    holder[i].productConstituency = products[j].constituency;
                    holder[i].productCounty = products[j].county;
                    holder[i].productEstate = products[j].estate;
                    holder[i].productName = products[j].productName;
                    holder[i].supplierId = products[j].supplierId;
                    break;
                }
            }

            for( j = 0; j < pricings.length; j++){
                if( holder[i].pricingId == pricings[j].id){
                    holder[i].productPricingId = holder[i].pricingId;
                    holder[i].unitCapacity = pricings[j].unitCapacity;
                    holder[i].pricePerUnit = pricings[j].unitPrice;
                    break;
                }
            }

            holder[i].pickupLocationId = selectedPickupLocation;
            holder[i].communicationEmail = communicationEmail;
            holder[i].communicationPhoneNumber = communicationPhoneNumber;
            if(pickupLocationDirection != undefined && pickupLocationDirection != "")
                holder[i].direction = pickupLocationDirection;
            if(pickupLocationMapsLink != undefined && pickupLocationMapsLink != "")
                holder[i].mapsLink = pickupLocationMapsLink;

            console.log(holder);
        }

        //loop through cart to make the query for calling the suppliers
        let query = "";
        for( i = 0; i < holder.length; i++){
            if(i == (holder.length-1)){
                query += "id="+holder[i].supplierId;
                continue;
            }
            query += ("id=" + holder[i].supplierId + "&");
        }

        const suppliers = await axios(props.baseURL+"/suppliers?"+query).then(res=>res.data);
        //console.log(suppliers);

        for ( i = 0; i < holder.length; i++){
            for (j = 0; j < suppliers.length; j++){
                if(holder[i].supplierId == suppliers[j].id){
                    holder[i].supplierConstituency = suppliers[j].constituency;
                    holder[i].supplierCounty = suppliers[j].county;
                    holder[i].supplierEstate = suppliers[j].buildingOrEstate;
                    holder[i].supplierName = suppliers[j].companyName;
                    holder[i].dropLocationId = suppliers[j].dropLocationId;
                    break;
                }
            }
        }
        
        console.log(holder);

        //productId
        //supplierId
        //pickupLocationId
        /*if(selectedPickupLocation == undefined){
            validation.push(false);
            setPickupLocationError("Please select a pickup location");
        }
        if(props.productDetails == undefined){
            validation.push(false);
            setFormError("Something went wrong, please refresh the page");
        }
        //customerPhoneNumber
        //customerEmail
        if(communicationEmail === "" && communicationPhoneNumber === ""){
            validation.push(false);
            setCommunicationContactError("Please provide one or all of the contact information");

            //validate if the email or communicationPhoneNumber is valid
        } else if(communicationEmail != "" && communicationPhoneNumber == ""){
            let data = {
                email:communicationEmail
            },
            rules = {
                email: "email"
            }
            
            let validator = new Validator(data, rules);
            if(validator.fails()){
                validation.push(false);
                setCommunicationContactError("Invalid email format");
            }
        } else if (communicationPhoneNumber != "" && communicationEmail == ""){
            if(/\d{12}/.test(communicationPhoneNumber) == false){
                validation.push(false);
                setCommunicationContactError("Phone number is invalid, check and renter the phone number");
            }
        } else if (communicationPhoneNumber != "" && communicationEmail != ""){
            let data = {
                email:communicationEmail
            },
            rules = {
                email: "email"
            }
            let error = "";
            
            let validator = new Validator(data, rules);
            if(validator.fails()){
                validation.push(false);
                error = error+"Email";
            }
            if(/\d{12}/.test(communicationPhoneNumber) == false){
                if(error != "")
                    error = error + " and phone number format is invalid";
                else
                    error = "Phone number format is invalid";
                validation.push(false);
            } else {
                if(error != "")
                    error += " format is invalid";
            }
            setCommunicationContactError(error);
        }

        if(mpesaPhoneNumber == false){
            validation.push(false);
            setMpesaError("Please provide your mpesa phone number that will be used for mpesa payment");
            //Set error message 
            //validate if phone no format is valid Invalid format i.e 254700000000
        }
        if(/\d{12}/.test(mpesaPhoneNumber) == false){
            validation.push(false);
            setMpesaError("Phone number is invalid, check and renter the phone number");
        }
        if(props.activePricing == undefined || props.productPricings == undefined){
            validation.push(false);
            setFormError("Something went wrong, please refresh the page");
            //Something went wrong with the form.
        }

        if(validation.indexOf(false) === -1){
            console.log("Awesome");
            //Below we organize for the purchase.
            setFormError("");
            axios({
                url:props.baseURL + '/products-orders',
                method:'post',
                headers:{
                    "Authorization":"Bearer "+props.loginData.jwt,
                },//this is the required data
                data:[{
                    userId:props.loginData.user.id,//required

                    units:props.units,//required
                    unitCapacity:unitCapacity(props.productPricings, props.activePricing),//required
                    productPricingId:props.productPricings[props.activePricing].id,//required

                    supplierName:props.supplierInformation.companyName,//required
                    supplierConstituency:props.supplierInformation.constituency,//required
                    supplierCounty:props.supplierInformation.county,//required
                    supplierEstate:props.supplierInformation.buildingOrEstate,//required
                    supplierId:props.supplierInformation.id,//required

                    productName:props.productDetails.productName,//required
                    productId:props.productDetails.id,//required
                    productEstate:props.productDetails.estate,//required
                    productCounty:props.productDetails.county,//required
                    productConstituency:props.productDetails.constituency,//required
                    pricePerUnit:props.productPricings[props.activePricing].unitPrice,//required

                    pickupLocationId:selectedPickupLocation.id,//required
                    dropLocationId:props.productDetails.countyId,//required
                    direction:directions,//optional
                    mapsLink:mapsLink,//optional
                    communicationPhoneNo:communicationPhoneNumber,//required
                    communicationEmail:communicationEmail,//required

                    mpesaPhoneNo:mpesaPhoneNumber,//required
                }]
            })
            .then ( res => {
                console.log(res);
                props.setOrderResponse(res);
                props.setShowNotification(true);
                props.setPosition("fixed");
                //The code for handling success;
            })
            .catch( err => {
                console.log(err.response);
                setFormError("Something went wrong, please try again");
            })
        } else {
            setFormError("Something went wrong, please check the form");
        }*/
    }

    useEffect( () => {
        async function getProductData(){
            const counties = await axios.get(props.baseURL+'/counties?_limit=-1');

            const constituencies = await axios.get(props.baseURL+'/constituencies?_limit=-1');


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
    }, []);

    const validatePickupLocation = () =>{
        let failedValidation = [];
        if(selectedPickupLocation == undefined){
            failedValidation.push(false);
            //handle failure text
            setPickupLocationError("Please select a pickup location!");
        }
        console.log(communicationPhoneNumber);
        console.log(communicationEmail);
        if(communicationPhoneNumber == "" && communicationEmail != ""){
            failedValidation.push(false);
            setCommunicationContactError("Phone number is required for communication during delivery!");
        } else if(communicationEmail == "" && communicationPhoneNumber != ""){
            failedValidation.push(false);
            setCommunicationContactError("Email is required for communication during delivery!");
        } else if (communicationPhoneNumber == "" && communicationEmail == ""){
            failedValidation.push(false);
            setCommunicationContactError("Both email and phone number are required for communication during delivery!");
        }

        let data = {
            pickupLocationMapsLink: pickupLocationMapsLink,
            pickupLocationDirection: pickupLocationDirection,
            email:communicationEmail
        },
        rules ={
            pickupLocationMapsLink:"text",
            pickupLocationDirection:"text",
            email:"email"
        };

        let validator = new Validator(data, rules);

        if (validator.fails()){
            failedValidation.push(false);
            if(validator.errors.get('pickupLocationMapsLink')){
                setAdvancedPickupLocationError(validator.errors.first('pickupLocationMapsLink'));
            }
            if(validator.errors.get('pickupLocationDirection')){
                setAdvancedPickupLocationError(validator.errors.first('pickupLocationDirection'));
            }
            if(validator.errors.get('email')){
                setCommunicationContactError(validator.errors.first('email'));
            }
        }

        //Add validation for phone number to ensure its a kenya phone number.
        if(failedValidation.indexOf(false) == -1){
            setValidatedPickupLocation(selectedPickupLocation);
            handleShowPickupLocation(false);
            setGeneralPickupLocationError("");
        }
    }

    const handleValidatePickupLocation = data => {
        console.log("This is amazing");
    }

    const handlePickupLocationMapsLink = event => {
        setPickupLocationMapsLink(event.target.value);
        setAdvancedPickupLocationError("");
    }

    const handlePickupLocationDirection = event => {
        setPickupLocationDirection(event.target.value);
        setAdvancedPickupLocationError("");
    }

    const handleMpesaPhoneNumber = event => {
        console.log(event.target)
        setMpesaPhoneNumber(event.target.value);
        setMpesaError("");
        setFormError("");
    }

    const handleCommunicationEmail = event => {
        setCommunicationEmail(event.target.value);
        setCommunicationContactError("");
        setFormError("");
    }

    const handleCommunicationPhoneNumber = event => {
        setCommunicationPhoneNumber(event.target.value);
        setCommunicationContactError("");
        setFormError("");
    }

    const pickupLocationLink = () => {
        if(selectedPickupLocation != undefined)
            return selectedPickupLocation.mapsLink;
        else
            return "#";
    }

    const pickupLocationName = () => {
        if(selectedPickupLocation != undefined){
            return selectedPickupLocation.name;
        } else {
            return "...";
        }
    }

    const pickupLocationImage = type => {
        if(type == "IMAGE"){
            if (selectedPickupLocation == undefined)
                return "/icons/builders guide logo-01 white background.jpg";
            
            return props.baseURL+selectedPickupLocation.image.formats.thumbnail.url;
        } else {
            if (selectedPickupLocation == undefined)
                return "buildersguidekenya logo";
            
            return props.baseURL+selectedPickupLocation.image.formats.thumbnail.hash;
        }
    }

    const handlePickupLocationChange = event => {
        let i;
        if(event.target.value == 0){
            setSelectedPickupLocation();
            return null;
        } else 
            for (i=0; i < pickupLocations.length; i++){
                if(pickupLocations[i].id == event.target.value){
                    setSelectedCounty(pickupLocations[i].countyId);
                    setSelectedConstituency(pickupLocations[i].constituencyId);
                    setSelectedPickupLocation(pickupLocations[i]);
                    break;
                }
            }
        //setSelectedPickupLocation(event.target.value);

        setPickupLocationError("");
        setFormError("");
    }

    const handleConstituencyChange = event => {
        let holder = [];
        setSelectedConstituency(event.target.value);
        if(Number(event.target.value) !== 0){
            pickupLocations.map((element, index) => {
                if( element.constituencyId == event.target.value){
                    holder.push(element);
                }
            })
        } else {
            holder = holder.concat(pickupLocations);
        }
        setPickupLocations(holder.slice());
        setPickupLocationError("");
        setFormError("");
    }

    const handleCountyChange = event => {
        let holder = [];
        setSelectedCounty(event.target.value);
        
        if (Number(event.target.value) !== 0){
            pickupLocations.map((element, index) => {
                if( element.countyId == event.target.value ){
                    holder.push(element);
                }
            })
        } else {
            holder = holder.concat(pickupLocations);
        }
        setPickupLocations(holder.slice());
        setPickupLocationError("");
        setFormError("");
    }

    useEffect(()=>{
        console.log(showPayment);
    },[showPayment])
    const handleShowPayment = data => {
        if(validatedPickupLocation == undefined){
            setGeneralPickupLocationError("Please select a pickup location!");
            setShowPayment(false);
            return null;
        }
        if(data === true){
            console.log(data);
            setShowPayment(true);
            setTimeout(()=>{
                //body.current.style.height = userAction.current.getBoundingClientRect().height+"px";
            }, 500)
            setLastScrollPos(window.scrollY);
            body.current.style.overflowY= "hidden";
            window.scroll(0,0);

        } else if( data === false) {

            setShowPayment(false);
            window.scroll(0,lastScrollPos);
            setLastScrollPos();
            body.current.style.height = "auto";

        } else {
            handleShowCover(false);
        }
    }

    const handleShowPickupLocation = data => {
        console.log("data");
        if(data === true){

            setShowPickupLocation(true);
            setTimeout(()=>{
                //body.current.style.height = userAction.current.getBoundingClientRect().height+"px";
            }, 500)
            setLastScrollPos(window.scrollY);
            body.current.style.overflowY= "hidden";
            window.scroll(0,0);

        } else if( data === false) {

            setShowPickupLocation(false);
            window.scroll(0,lastScrollPos);
            setLastScrollPos();
            body.current.style.height = "auto";

        } else {
            handleShowCover(false);
        }
    }

    const subTotal = () => {
        if(cart != undefined && cart[0] != undefined && cart[0].pricing != undefined){
            let sum = 0
            cart.map((element, index) => {
                sum += (element.units*element.pricing.unitPrice);
            })
            return sum;
        }
    }
    useEffect(()=>{
        //This block is responsible for filling the cart fully;
        if(cart !== undefined && pricings !== undefined && products !== undefined && images !== undefined){
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

                holder[i].images = [];
                for(j= 0; j < images.length; j++){
                    if(images[j].productId == holder[i].productId){
                        holder[i].images.push(images[j]);
                    }
                }
            }

            console.log(holder);
            setCart(holder.slice());
        }
    },[pricings, products, images])

    useEffect(()=>{
        setTimeout(()=>{
            if(cart !== undefined && cart.length > 0 && props.loginData != undefined && cart[0].product == undefined && cart[0].pricing == undefined){
                //This method fills gets all the cart dependencies from the database
                let products = "";
                let pricings = "";
                let images = "";
    
                //console.log(cart);
                cart.map((element, index) => {
                    if(index == cart.length-1){
                        products += "id="+element.productId;
                        pricings += "id="+element.pricingId;
                        images += "productId="+element.productId;
                    } else {
                        products += "id="+element.productId+"&";
                        pricings += "id="+element.pricingId+"&";
                        images += "productId="+element.productId+"&";
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
                getDataFromDB("/product-images?", images, "deleted=false&approved=true&blocked=false&", setImages);
            }
        }, 500)
    }, [cart, props.loginData])

    useEffect(()=>{
        if(props.loginData !== undefined && props.loginData !== null){
            //get cart from the database
            axios({
                url:props.baseURL+"/carts?deleted=false&userId="+props.loginData.user.id,
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
        <div ref={body} className = {style.cartPage}>
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
            <Header title="Shopping cart" router={router} loginData = {props.loginData} setLoginData = { data => props.setLoginData(data)}/>
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
                                    images = {element.images}
                                    baseURL = {props.baseURL}
                                    cartComplete = {cart}
                                    setCart = {data => setCart(data)}
                                    index = {index}
                                    loginData = {props.loginData}
                                />
                            ))
                        :undefined
                    }
                </section>
                <section>
                    <div>
                        <div className = {style.pickupLocation}>
                            <label htmlFor="pickupLocation">Pickup location<span className={style.required}>*</span></label>
                            <PickupLocationDetails
                                pickupLocationImage = {(data) => pickupLocationImage(data)}
                                pickupLocationName = { () => pickupLocationName()}
                                pickupLocationLink = { () => pickupLocationLink()}
                                selectedPickupLocation = { validatedPickupLocation }
                            />
                            <button onClick = {event => handleShowPickupLocation(true)} className={"bg-primary"}>{ validatedPickupLocation == undefined ? "Select" : "Change"}</button>
                            <p className={"text-danger"}>{generalPickupLocationError}</p>
                        </div>
                        <CartAmount
                            subTotal = {subTotal()}
                            handleShowPayment = {data => handleShowPayment(data)}
                        />
                    </div>
                </section>
            </div>
            <WindowPopUp
                handleShowCover = {data => handleShowPickupLocation(data)}
                showPickupLocation = {showPickupLocation}
            >
                <div className={style.padding}>
                    <PickupLocation
                        handleCountyChange = { data => handleCountyChange(data) }
                        counties = { pickupCounties }
                        handleConstituencyChange = { data => handleConstituencyChange(data) }
                        constituencies = { pickupConstituencies }
                        handlePickupLocationChange = { data => handlePickupLocationChange(data) }
                        pickupLocations = { pickupLocations }
                        pickupLocationImage = {data => pickupLocationImage(data) }
                        pickupLocationName = { data => pickupLocationName(data) }
                        pickupLocationLink = { data => pickupLocationLink(data) }
                        selectedPickupLocation = { selectedPickupLocation }
                        pickupLocationError = { pickupLocationError }
                        transportationCost = { transportationCost }
                        totalCost = { totalCost }
                        communicationPhoneNumber = {communicationPhoneNumber}
                        handleCommunicationPhoneNumber = { data => handleCommunicationPhoneNumber(data)}
                        communicationEmail = {communicationEmail}
                        communicationContactError = {communicationContactError}
                        handleCommunicationEmail = { data => handleCommunicationEmail(data) }
                        pickupLocationMapsLink = {pickupLocationMapsLink}
                        pickupLocationDirection = {pickupLocationDirection}
                        advancedPickupLocationError = {advancedPickupLocationError}
                        handlePickupLocationMapsLink = {data => handlePickupLocationMapsLink(data)}
                        handlePickupLocationDirection = {data => handlePickupLocationDirection(data)}
                        validatedPickupLocation = {validatedPickupLocation}
                    />
                    <button className = "bg-success text-white" onClick = {data => validatePickupLocation(data)}>Validate</button>
                </div>
            </WindowPopUp>
            <WindowPopUp
                handleShowCover = {data => handleShowPayment(data)}
                showPayment = {showPayment}
            >
                <div>
                    <Payment
                        totalCost = {totalCost}
                        mpesaPhoneNumber = {mpesaPhoneNumber}
                        handleMpesaPhoneNumber = {data => handleMpesaPhoneNumber(data)}
                        mpesaError = {mpesaError}
                    />
                    <button onClick = { event => handlePurchase(event)} className={"bg-success text-white"}>Checkout</button>
                </div>
            </WindowPopUp>
        </div>
    )
}

export default cart
