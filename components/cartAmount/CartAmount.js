import React from 'react';
import style from './CartAmount.module.css';

function CartAmount(props) {
  return (
    <div className = {style.container}>
        <table className = {style.table}>
            <tbody>
                <tr>
                    <th>Sub total</th>
                    <td>Ksh. {props.subTotal}</td>
                </tr>
                <tr>
                    <th>VAT</th>
                    <td>Ksh. 200</td>
                </tr>
                <tr>
                    <th>Transport</th>
                    <td>Ksh. 600</td>
                </tr>
                <tr>
                    <th>TOTAL</th>
                    <td>Ksh. 3200</td>
                </tr>
            </tbody>
        </table>
        <button className = {style.checkout + " bg-success text-white"}>Checkout</button>
        <p className = {style.notice}>Transport to pickup location</p>
    </div>
  )
}

export default CartAmount