import React, {useState, useEffect} from 'react';
import TotalUnits from '../TotalUnits/TotalUnits';
import style from './UserAction.module.css';
import Validator from 'validatorjs'
import axios from 'axios'

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
    const [mpesaPhoneNumber, setMpesaPhoneNumber] = useState();

    const[pickupLocationError, setPickupLocationError] = useState("");
    const [communicationContactError, setCommunicationContactError] = useState("");
    const [mpesaError, setMpesaError] = useState("");
    const [formError, setFormError] = useState("");

    const productName = (productDetails) => {
        if(productDetails !== undefined)
            return productDetails.productName;

        return "";
    }

    useEffect(()=>{
        productCost();
    }, [props.productPricings, props.units])

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
                },
                data:{
                    productId:props.productDetails.id,
                    productPricingId:props.activePricing,
                    units:props.units,
                    pickupLocationId:selectedPickupLocation.id,
                    customerPhoneNo: communicationPhoneNumber,
                    customerEmail:communicationEmail,
                    mpesaPhoneNo:mpesaPhoneNumber,
                    dropLocationId:props.productDetails.countyId,
                    userId:props.loginData.user.id,
                    supplierId:props.productDetails.supplierId
                }
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
                <div className={style.pickup}>
                    <h2>Pick-up location </h2>
                    <div className={style.pickupLocation}>
                        <div >
                            <div>
                                <label>County</label>
                                <select onChange={event => handleCountyChange(event)}>
                                    {
                                        counties !== undefined?
                                            <option value={0}>All</option>
                                        :undefined
                                    }
                                    {
                                        counties !== undefined?
                                            counties.map((element, index) => (
                                                <option  value={element.id} key={index}>{element.countyName}</option>
                                            ))
                                        :
                                        <option> -- </option>
                                    }
                                </select>
                            </div>
                            <div>
                                <label>Constituency</label>
                                <select onChange={event => handleConstituencyChange(event)}>
                                    {
                                        constituencies !== undefined?
                                            <option value={0}>All</option>
                                        :undefined
                                    }
                                    {
                                        constituencies !== undefined?
                                            constituencies.map((element, index) => (
                                                <option value={element.id} key={index}>{element.constituency}</option>
                                            ))
                                        :
                                        <option> -- </option>
                                    }
                                </select>
                            </div>
                            <div>
                                <label>Location</label>
                                <select onChange={ event=> handlePickupLocationChange(event)}>
                                    {
                                        pickupLocations !== undefined &&
                                            <option value={0}> Select </option>
                                    }
                                    {
                                        pickupLocations !== undefined?
                                            pickupLocations.map((element, index) => (
                                                <option value={element.id} key={index}>{element.name}</option>
                                            ))
                                        :
                                        <option> -- </option>
                                    }
                                </select>
                            </div>
                        </div>
                        <div className = {style.pickupLocationDetails}> 
                            <div>
                                <img src={pickupLocationImage("IMAGE")} alt={pickupLocationImage("ALT-TEXT")} />
                            </div>
                            <div>
                                <p>{pickupLocationName()}</p>
                                <a href={pickupLocationLink()} target="_blank">{selectedPickupLocation? "Maps" : "..."}</a>
                            </div>
                        </div>
                        <p className={"text-danger " + style.error}>{pickupLocationError}</p>
                    </div>
                    <div>
                        <div>
                            <h2>Transport cost</h2>
                            <h2>Total cost</h2>
                        </div> 
                        <div>
                            <p>{transportationCost? "Ksh. " + transportationCost : "..." }</p>
                            <p>{totalCost? "Ksh. " + totalCost : "Ksh. ..." }</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.contact}>
                <h2>For communication during delivery</h2>
                <div>
                    <div>
                        <label htmlFor="phone_number">Phone no</label>
                        <input className = {style.commPhoneNumberSm} placeholder =  {"254700000000"} value = {communicationPhoneNumber} onChange = {event => handleCommunicationPhoneNumber(event)} type="number" name="phone_number" />
                        <label htmlFor="email">Email</label>
                        <input className = {style.commEmailSm} placeholder = {"user@domain.com"} value = {communicationEmail} onChange = {event => handleCommunicationEmail(event)} type="email" name="email" />
                    </div>
                    <div>
                        <input placeholder =  {"254700000000"} value = {communicationPhoneNumber} onChange = {event => handleCommunicationPhoneNumber(event)} type="number" name="phone_number" />
                        <input placeholder = {"user@domain.com"} value = {communicationEmail} onChange = {event => handleCommunicationEmail(event)} type="email" name="email" />
                    </div>
                </div>
                <p className={"text-danger " + style.error}>{communicationContactError}</p>
            </div>
            <div className={style.payment}>
                <h2>Payment</h2>
                <div>
                    <div>
                        <span>M-Pesa</span>
                        <span>VISA</span>
                        <span>MasterCard</span>
                    </div>
                    <div className={style.mpesa}>
                        <div>
                            <label>Total cost</label>
                            <span className={style.totalCostSm}><strong>{totalCost? "Ksh. " + totalCost : "..." }</strong></span>
                            <label htmlFor="phone_number">Phone number(Mpesa)</label>
                            <input placeholder =  {"254700000000"} className = {style.mpesaPhoneNumberS} value = {mpesaPhoneNumber} onChange = {event => handleMpesaPhoneNumber(event)} type="number" name="phone_number" />
                        </div>
                        <div>
                            <p className = {style.totalCostLg}><strong>{totalCost? "Ksh. " + totalCost : "..." }</strong></p>
                            <input placeholder =  {"254700000000"} className = {style.mpesaPhoneNumberL} value = {mpesaPhoneNumber} onChange = {event => handleMpesaPhoneNumber(event)} type="number" name="phone_number" />
                        </div>
                    </div>
                    <p className={"text-danger " + style.error}>{mpesaError}</p>
                </div>
            </div>
            <div className={style.finish}>
                <button onClick = { event => handlePurchase(event)}>Buy now</button>
                <p className={"text-danger " + style.error}>{formError}</p>
            </div>
        </div>
    )
}

export default UserAction
