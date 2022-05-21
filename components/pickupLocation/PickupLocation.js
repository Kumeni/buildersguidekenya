import React from 'react';
import PickupLocationDetails from '../pickupLocationDetails/PickupLocationDetails';
import style from './PickupLocation.module.css';

function PickupLocation(props) {

	//This function prefills all the inputs
	const controlled = (requirement, returnValue, fallback) => {
		if(props.validatedPickupLocation == undefined || props.selectedPickupLocation == undefined)
			return fallback;
		else
			if(requirement != undefined){
				return returnValue;
			} else 
				return fallback;
	}

	return (
		<div className={style.pickup}>
			<h2>Pickup location </h2>
			<div className={style.pickupLocation}>
				<div >
					<div>
						<label>County</label>
						<select value = {controlled(props.selectedPickupLocation, (props.selectedPickupLocation && props.selectedPickupLocation.county), 0)} onChange={event => props.handleCountyChange(event)}>
							{
								props.counties !== undefined?
									<option value={0}>All</option>
								:undefined
							}
							{
								props.counties !== undefined?
									props.counties.map((element, index) => (
										<option  value={element.id} key={index}>{element.countyName}</option>
									))
								:
								<option> -- </option>
							}
						</select>
					</div>
					<div>
						<label>Constituency</label>
						<select value = {controlled(props.selectedPickupLocation, (props.selectedPickupLocation && props.selectedPickupLocation.constituency), 0)} onChange={event => props.handleConstituencyChange(event)}>
							{
								props.constituencies !== undefined?
									<option value={0}>All</option>
								:undefined
							}
							{
								props.constituencies !== undefined?
									props.constituencies.map((element, index) => (
										<option value={element.id} key={index}>{element.constituency}</option>
									))
								:
								<option> -- </option>
							}
						</select>
					</div>
					<div>
						<label>Location</label>
						<select value = {controlled(props.selectedPickupLocation, (props.selectedPickupLocation && props.selectedPickupLocation.id), 0)} onChange={ event=> props.handlePickupLocationChange(event)}>
							{
								props.pickupLocations !== undefined &&
									<option value={0}> Select </option>
							}
							{
								props.pickupLocations !== undefined?
									props.pickupLocations.map((element, index) => (
										<option value={element.id} key={index}>{element.name}</option>
									))
								:
								<option> -- </option>
							}
						</select>
					</div>
				</div>
				{/* <PickupLocationDetails
					pickupLocationImage = {(data) => props.pickupLocationImage(data)}
					pickupLocationName = { () => props.pickupLocationName()}
					pickupLocationLink = { () => props.pickupLocationLink()}
					selectedPickupLocation = { props.selectedPickupLocation }
				/> */}
				<div className = {style.pickupLocationDetails}> 
					<div>
						<img src={props.pickupLocationImage("IMAGE")} alt={props.pickupLocationImage("ALT-TEXT")} />
					</div>
					<div>
						<p>{props.pickupLocationName()}</p>
						<a href={props.pickupLocationLink()} target="_blank">{props.selectedPickupLocation? "Maps" : "..."}</a>
					</div>
				</div>
				<p className={"text-danger " + style.error}>{props.pickupLocationError}</p>
			</div>
			<div>
				<table>
					<tbody>
						<tr>
							<th>Transport cost</th>
							<td>{props.transportationCost? "Ksh. " + props.transportationCost : "..." }</td>
						</tr>
						<tr>
							<th>Total cost</th>
							<td>{props.totalCost? "Ksh. " + props.totalCost : "Ksh. ..." }</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className = {style.advancedPickupLocation}>
				<div>
					<h3>Advanced pickup location</h3>
					<h3>&times;</h3>
				</div>
				<div>
					<p>
						Your product gets delivered to the exact location you provide.
					</p>
					<p>
						Please enter the precise location where you want your products to be delivered.
						This will help the distributors get to your desired location. Additional charges may
						apply. <a href="#">Learn more</a>
					</p>
					<div className = {style.pickupLocationForm}>
						<div>
							<label htmlFor="google_maps_link">Google maps link</label>
							<input 

								value = {props.pickupLocationMapsLink} 
								id="google_maps_link" 
								type="text"
								onChange = {event => props.handlePickupLocationMapsLink(event)} 
							/>
						</div>
						<div>
							<label htmlFor = "directions">Directions</label>
							<input 
								value = {props.pickupLocationDirection} 
								id="directions" 
								type="text" 
								onChange = {event => props.handlePickupLocationDirection(event)}
							/>
						</div>
					</div>
					<p className={"text-danger " + style.error}>{props.advancedPickupLocationError}</p>
				</div>
			</div>
			<div className={style.contact}>
                <h2>For communication during delivery</h2>
                <div>
                    <div>
                        <label htmlFor="phone_number">Phone no</label>
                        <input 
							value = {props.communicationPhoneNumber}
							className = {style.commPhoneNumberSm} 
							placeholder =  {"254700000000"} 
							onChange = {event => props.handleCommunicationPhoneNumber(event)} 
							type="number" 
							name="phone_number" 
						/>
                        <label htmlFor="email">Email</label>
                        <input 
							value = {props.communicationEmail} 
							className = {style.commEmailSm} 
							placeholder = {"user@domain.com"} 
							onChange = {event => props.handleCommunicationEmail(event)} 
							type="email" 
							name="email" 
						/>
                    </div>
                    <div>
                        <input 
							value = {props.communicationPhoneNumber}
							placeholder =  {"254700000000"} 
							onChange = {event => props.handleCommunicationPhoneNumber(event)} 
							type="number" 
							name="phone_number" 
						/>
                        <input 
							value = {props.communicationEmail} 
							placeholder = {"user@domain.com"} 
							onChange = {event => props.handleCommunicationEmail(event)} 
							type="email" 
							name="email" 
						/>
                    </div>
                </div>
                <p className={"text-danger " + style.error}>{props.communicationContactError}</p>
            </div>
		</div>
	)
}

export default PickupLocation