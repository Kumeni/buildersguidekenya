export default function sam(array, counties, constituencies){
    if(array.length>0){
        //swaps countyId with the actual value
        if(array[0].county)
            array.map(element=>{
                counties.map(county=>{
                    if(county.id == element.county){
                        element.countyId = county.id;
                        element.county = county.countyName;
                    }
                })
            })

        /*if(array[0].countyId)
            array.map(element=>{
                counties.map(county=>{
                    if(county.id == element.countyId){
                        element.countyId = county.countyName;
                    }
                })
            })*/

        //swaps constituency id with the constituency name
        if(array[0].constituency)
            array.map(element=>{
                constituencies.map(constituency=>{
                    if(constituency.id == element.constituency){
                        element.constituencyId = constituency.id;
                        element.constituency = constituency.constituency;
                    }
                })
            })
        
        /*if(array[0].constituencyId)
            array.map(element=>{
                constituencies.map(constituency=>{
                    if(constituency.id == element.constituencyId){
                        element.constituencyId = constituency.constituency;
                    }
                })
            })*/
    
    
        if(array[0].services)
            array.map(element=>{
                switch(element.services){
                    case 1: element.services = 'Manufacturer';break;
                    case 2: element.services = 'Supplier'; break;
                    case 3: element.services = 'Manufacturer and Supplier'; break;
                }
            })
    }
    
    return array;
}