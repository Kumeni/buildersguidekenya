import React, {useEffect, useState} from 'react'
import style from './TotalUnits.module.css';

function TotalUnits(props) {

    const unitsAdjustment = (action, initialUnits) => {
        let initialValue = initialUnits;
        if(initialValue != undefined)
            if(action == "INCREMENT"){
                props.setUnits(initialValue + 1);
                return null;
            } else if(action == "DECREMENT"){
                if(props.units == 1)
                    return null;
                props.setUnits(initialValue - 1);
                return null;
            }
        else 
            props.setUnits(1);
        
    }

    const unitsDisplay = () =>{
//        console.log(props.units);
        if(props.units == 1)
            return "1 unit"
        else 
            return `${props.units} units`;
    }

    return (
        <div className={style.container}>
            <span onClick={()=>unitsAdjustment("DECREMENT", props.units)}>-</span>
            <span>{unitsDisplay()}</span>
            <span onClick={()=>unitsAdjustment("INCREMENT", props.units)}>+</span>
        </div>
    )
}

export default TotalUnits
