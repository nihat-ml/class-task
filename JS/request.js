export async function GetAllPhones(url){
    let phones
    let error
    
    await axios.get(url)
    .then(res=>phones=res.data)
    .then(err=>error=err)

    return {
        phones,
        error
    }
}
export async function GetPhonesById(url,id){
    let phones
    let error

   await axios.get(`${url}/${id}`)
    .then(res=>phones=res.data)
    .catch(err=>error=err)

    return{
        phones,
        error
    }
}
export async function PostData(url,newData){
    let phones
    let error

   await axios.post(url,newData)
    .then(res=>phones=res.data)
    .catch(err=>error=err)

    return{
        phones,
        error
    }
}
export async function UpdateData(url,id,updateData){
    let phones
    let error

   await axios.put(`${url}/${id}`,updateData)
    .then(res=>phones=res.data)
    .catch(err=>error=err)

    return{
        phones,
        error
    }
}

