import axios from 'axios'

const getProducts = async (specialization, baseURL)=>{

    let query = '';

    specialization.map((element,index)=>{
        index===0?query=query+"id="+element.productId:query=query+"&id="+element.productId;
    })
    const products = await axios.get(baseURL+"/products?"+query+'&blocked=false&approved=true&deleted=false', {
        transformResponse:[function(data){
            let newData = [];
            let originalData = JSON.parse(data);

            originalData.map(element=>{
                let object = {};

                object.id = element.id;
                object.productName = element.productName;
                object.county = element.county;
                object.constituency = element.constituency;
                object.buildingOrEstate = element.estate;
                object.productDescription = element.productDescription;

                newData = newData.concat(object);
            })

            return newData;
        }]
    });

    return products.data;
}

export default getProducts;