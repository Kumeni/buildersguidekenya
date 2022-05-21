import React, {useState, useEffect} from 'react';
import TotalUnits from '../TotalUnits/TotalUnits';
import style from './UserAction.module.css';
import Validator from 'validatorjs'
import axios from 'axios'
import PickupLocation from '../pickupLocation/PickupLocation';
import Payment from '../payment/Payment';

function UserAction(props) {

    const [cost, setCost] = useState();
    const [counties, setCounties] = useState(props.pickupCounties);
    const [constituencies, setConstituencies] = useState(props.pickupConstituencies);
    const [pickupLocations, setPickupLocations] = useState(props.pickupLocations);

    const [selectedCounty, setSelectedCounty] = useState(0);
    const [selectedConstituency, setSelectedConstituency] = useState(0);
    const [selectedPickupLocation, setSelectedPickupLocation] = useState();
    const [transportationCost, setTransportationCost] = useState("...");
    const [totalCost, setTotalCost] = useState("...");
    

    const [communicationPhoneNumber, setCommunicationPhoneNumber] = useState("");
    const [communicationEmail, setCommunicationEmail] = useState("");
    const [communicationContactError, setCommunicationContactError] = useState();
    const [mpesaPhoneNumber, setMpesaPhoneNumber] = useState();

    const [mapsLink, setMapsLink] = useState();
    const [directions, setDirections] = useState();

    const [pickupLocationError, setPickupLocationError] = useState("");

    const [pickupLocationMapsLink, setPickupLocationMapsLink] = useState();
    const [pickupLocationDirection, setPickupLocationDirection] = useState();
    const [advancedPickupLocationError, setAdvancedPickupLocationError] = useState();

    const [mpesaError, setMpesaError] = useState("");
    const [formError, setFormError] = useState("");

    const productName = (productDetails) => {
        if(productDetails !== undefined)
            return productDetails.productName;

        return "";
    }

    console.log(props.units);
    useEffect(()=>{
        productCost();
    }, [props.productPricings, props.units])

    const handleOrder = () => {
        //Check if phone number format is valid.
        let validation = true, order;


        if(validation == true){
            //handle placing an order
            order = {
                userId:props.loginData.user.id,//required

                units:props.units,//required
                unitCapacity:unitCapacity(props.productPricings, props.activePricing),//required
                productPricingId:props.productPricings[activePricing].id,//required

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
                pricePerUnit:props.productPricings[activePricing].unitPrice,//required

                pickupLocationId:selectedPickupLocation.id,//required
                dropLocationId:"",//required
                direction:directions,//optional
                mapsLink:mapsLink,//optional
                communicationPhoneNo:communicationPhoneNumber,//required
                communicationEmail:communicationEmail,//required

                mpesaPhoneNo:mpesaPhoneNumber,//required
            }
        }
    }

    const unitCapacity = (productPricings, activePricing) => {
        if(productPricings !== undefined && activePricing !== undefined){
            return productPricings[activePricing].unitCapacity;
        }

        return "";
    }

    const productCost = () => {
        if ( props.productPricings !== undefined && props.units !== undefined ){
            setCost(props.productPricings[props.activePricing].unitPrice * props.units);
        } else {
            setCost(props.productPricings[props.activePricing].unitPrice);
        }
    }

    const handlePickupLocationMapsLink = event => {
        setPickupLocationMapsLink(event.target.value);
        setAdvancedPickupLocationError("");
    }

    const handlePickupLocationDirection = event => {
        setPickupLocationDirection(event.target.value);
        setAdvancedPickupLocationError("");
    }

    const handleCountyChange = event => {
        let holder = [];
        setSelectedCounty(event.target.value);
        
        if (Number(event.target.value) !== 0){
            props.pickupLocations.map((element, index) => {
                if( element.countyId == event.target.value ){
                    holder.push(element);
                }
            })
        } else {
            holder = holder.concat(props.pickupLocations);
        }
        setPickupLocations(holder.slice());
        setPickupLocationError("");
        setFormError("");
    }

    const handleConstituencyChange = event => {
        let holder = [];
        setSelectedConstituency(event.target.value);
        if(Number(event.target.value) !== 0){
            props.pickupLocations.map((element, index) => {
                if( element.constituencyId == event.target.value){
                    holder.push(element);
                }
            })
        } else {
            holder = holder.concat(props.pickupLocations);
        }
        setPickupLocations(holder.slice());
        setPickupLocationError("");
        setFormError("");
    }

    const handlePickupLocationChange = event => {
        let i;
        if(event.target.value == 0)
            setSelectedPickupLocation();
        else 
            setSelectedPickupLocation(event.target.value);
        
        for (i=0; i < props.pickupLocations.length; i++){
            if(props.pickupLocations[i].id == event.target.value){
                setSelectedCounty(props.pickupLocations[i].countyId);
                setSelectedConstituency(props.pickupLocations[i].constituencyId);
                setSelectedPickupLocation(props.pickupLocations[i]);
                break;
            }
        }

        setPickupLocationError("");
        setFormError("");
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

    const pickupLocationName = () => {
        if(selectedPickupLocation != undefined){
            return selectedPickupLocation.name;
        } else {
            return "...";
        }
    }

    const pickupLocationLink = () => {
        if(selectedPickupLocation != undefined)
            return selectedPickupLocation.mapsLink;
        else
            return "#";
    }

    const productImage = type => {
        if(props.productImages && props.productImages.length > 0){
            if(type=="IMAGE")
                return props.baseURL+props.productImages[0].productImage.formats.thumbnail.url;
            else 
                return props.baseURL+props.productImages[0].productImage.formats.thumbnail.hash;
        }
    }

    useEffect(()=>{
        if( cost == undefined || selectedPickupLocation == undefined){
            setTransportationCost("...");
        } else {
            if(props.productDetails != undefined){
                let i, supplierDropLocation;

                for (i=0; i < props.pickupLocations.length; i++){
                    console.log(props.pickupLocations[i].countyId + "  " + props.productDetails.countyId);
                    if(props.pickupLocations[i].countyId == props.productDetails.countyId){
                        supplierDropLocation = props.pickupLocations[i].id;
                        break;
                    }
                }

                for (i=0; i< props.transportationCosts.length; i++){
                    if(props.transportationCosts[i].fromLocation == supplierDropLocation && 
                        props.transportationCosts[i].toLocation == selectedPickupLocation.id){
                            setTransportationCost(props.transportationCosts[i].cost);
                            break;
                        }
                }
            }
        }
    }, [cost, selectedPickupLocation, props.productDetails])

    useEffect(()=>{
        if(transportationCost != undefined && transportationCost != "..." && cost != undefined && cost != "..."){
            setTotalCost(cost+transportationCost);
        } else {
            setTotalCost();
        }
    }, [transportationCost, cost])

    const handleCommunicationPhoneNumber = event => {
        setCommunicationPhoneNumber(event.target.value);
        setCommunicationContactError("");
        setFormError("");
    }

    const handleCommunicationEmail = event => {
        setCommunicationEmail(event.target.value);
        setCommunicationContactError("");
        setFormError("");
    }

    const handleMpesaPhoneNumber = event => {
        setMpesaPhoneNumber(event.target.value);
        setMpesaError("");
        setFormError("");
    }

    const handlePurchase = event => {
        let validation = [];
        /*console.log(props.activePricing)
        console.log(totalCost);
        console.log(transportationCost);
        console.log(cost);
        console.log(selectedPickupLocation);
        console.log(communicationPhoneNumber);
        console.log(communicationEmail);
        console.log(mpesaPhoneNumber);*/

        //productId
        //supplierId
        //pickupLocationId
        if(selectedPickupLocation == undefined){
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
                    dropLocationId:props.supplierInformation.dropLocationId,//required


                    productName:props.productDetails.productName,//required
                    productId:props.productDetails.id,//required
                    productEstate:props.productDetails.estate,//required
                    productCounty:props.productDetails.county,//required
                    productConstituency:props.productDetails.constituency,//required
                    pricePerUnit:props.productPricings[props.activePricing].unitPrice,//required

                    pickupLocationId:selectedPickupLocation.id,//required
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
        }
    }

    return (
        <div ref={props.userAction} className={style.container}>
            <div className={style.preview}>
                <div>
                    <img src={productImage("IMAGE")} alt={productImage("ALT")} />
                </div>
                <div>
                    <h1>{ productName(props.productDetails) }</h1>
                    <p>{ unitCapacity(props.productPricings, props.activePricing)}</p>
                </div>
            </div>
            <div className={style.cost}>
                <div>
                    <div>
                        <h2>Quantity</h2>
                        <h2>Cost</h2>
                    </div>
                    <div>
                        <h2>
                            <TotalUnits 
                                units={props.units}
                                setUnits={data=>props.setUnits(data)}
                            />
                        </h2>
                        <h2>{cost !== undefined? "Ksh. " + cost: undefined}</h2>
                    </div>
                </div>
                <PickupLocation 
                    handleCountyChange = { data => handleCountyChange(data) }
                    counties = { counties }
                    handleConstituencyChange = { data => handleConstituencyChange(data) }
                    constituencies = { constituencies }
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
                />
                    
            </div>
            <Payment 
                totalCost = {totalCost}
                mpesaPhoneNumber = {mpesaPhoneNumber}
                handleMpesaPhoneNumber = {data => handleMpesaPhoneNumber(data)}
                mpesaError = {mpesaError}
            />
            
            <div className={style.finish}>
                <button onClick = { event => handlePurchase(event)}>Buy now</button>
                <p className={"text-danger " + style.error}>{formError}</p>
            </div>
        </div>
    )
}

export default UserAction
