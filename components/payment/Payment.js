import React from 'react';
import style from './Payment.module.css';

function Payment(props) {
  return (
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
                    <span className={style.totalCostSm}><strong>{props.totalCost? "Ksh. " + props.totalCost : "..." }</strong></span>
                    <label htmlFor="phone_number">Phone number(Mpesa)</label>
                    <input placeholder =  {"254700000000"} className = {style.mpesaPhoneNumberS} value = {props.mpesaPhoneNumber} onChange = {event => props.handleMpesaPhoneNumber(event)} type="number" name="phone_number" />
                </div>
                <div>
                    <p className = {style.totalCostLg}><strong>{props.totalCost? "Ksh. " + props.totalCost : "..." }</strong></p>
                    <input placeholder =  {"254700000000"} className = {style.mpesaPhoneNumberL} value = {props.mpesaPhoneNumber} onChange = {event => props.handleMpesaPhoneNumber(event)} type="number" name="phone_number" />
                </div>
            </div>
            <p className={"text-danger " + style.error}>{props.mpesaError}</p>
        </div>
    </div>
  )
}

export default Payment