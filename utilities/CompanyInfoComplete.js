export default function sam(array, counties, constituencies){
    array.map(element=>{
        counties.map(county=>{
            if(county.id == element.county){
                element.county = county.countyName;
            }
        })
    })
    array.map(element=>{
        constituencies.map(constituency=>{
            if(constituency.id == element.constituency){
                element.constituency = constituency.constituency;
            }
        })
    })
    array.map(element=>{
        switch(element.services){
            case 1: element.services = 'Manufacturer';break;
            case 2: element.services = 'Supplier'; break;
            case 3: element.services = 'Manufacturer and Supplier'; break;
        }
    })
    
    return array;
}