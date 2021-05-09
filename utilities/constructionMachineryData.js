import axios from 'axios'

const getConstructionMachineries = async (specialization, baseURL)=>{

    let query = '';

    specialization.map((element,index)=>{
        index===0?query=query+"id="+element.plantAndMachineryId:query=query+"&id="+element.plantAndMachineryId;
    })
    const constructionMachineries = await axios.get(baseURL+"/plant-and-machineries?"+query+'&blocked=false&approved=true&deleted=false', {
        transformResponse:[function(data){
            let newData = [];
            let originalData = JSON.parse(data);

            originalData.map(element=>{
                let object = {};

                object.id = element.id;
                object.name = element.name;
                object.county = element.county;
                object.constituency = element.constituency;
                object.buildingOrEstate = element.buildingOrEstate;
                object.description = element.description;

                newData = newData.concat(object);
            })

            return newData;
        }]
    });

    return constructionMachineries.data;
}

export default getConstructionMachineries;