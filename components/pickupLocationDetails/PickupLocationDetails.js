import React from 'react';
import style from './PickupLocationDetails.module.css';

function PickupLocationDetails(props) {

    if(props.selectedPickupLocation == undefined)
        return null;

    return (
        <div className = {style.pickupLocationDetails}> 
            <div>
                <img src={props.pickupLocationImage("IMAGE")} alt={props.pickupLocationImage("ALT-TEXT")} />
            </div>
            <div>
                <p>{props.pickupLocationName()}</p>
                <a href={props.pickupLocationLink()} target="_blank">{props.selectedPickupLocation? "Maps" : "..."}</a>
            </div>
        </div>
    )
}

export default PickupLocationDetails