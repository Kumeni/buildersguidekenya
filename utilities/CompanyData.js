import axios from 'axios'

const getSuppliers = async (specialization, baseURL)=>{

    let query = '';

    specialization.map((element,index)=>{
        index===0?query=query+"userId="+element.userId:query=query+"&userId="+element.userId;
    })

    const suppliers = await axios.get(baseURL+"/suppliers?"+query, {
        transformResponse:[function(data){
            let newData = [];
            let originalData = JSON.parse(data);
            originalData.map(element=>{
                let object = {};
                object.id = element.id;
                object.companyName = element.companyName;
                object.services = element.services;
                object.county = element.county;
                object.constituency = element.constituency;
                object.buildingOrEstate = element.buildingOrEstate;
                object.userId=element.userId;
                object.companyLogo=element.companyLogo;
                
                newData = newData.concat(object);
            })
            return newData;
        }]
    });

    return suppliers.data;
}

export default getSuppliers;