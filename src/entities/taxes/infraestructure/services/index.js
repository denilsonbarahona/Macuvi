import firebase from '../../../../Service/firebase/firebase.service';

const getTaxes = async (company)=>{
    const taxes = await firebase.firestore().collection("Taxes").where("CompanyId","==",company).get()
                            .then(res=>{ 
                                var Taxes = []
                                Taxes.push(
                                    res.docs.map(dataSnapShot=>{
                                        const taxes = {  id: dataSnapShot.id ,value: dataSnapShot.data().Tax, label: dataSnapShot.data().TaxName+"-"+dataSnapShot.data().Tax.toString()+"%" }
                                        return taxes;
                                    })
                                )
                                return Taxes;
                            })
    const array = [{id:"0",value:0, label: "Exento"}].concat(taxes[0])
    return array;
}

const setTaxes = async(payload)=>{
    const response = await firebase.firestore().collection("Taxes")
            .add({
                CompanyId: payload.company,
                Tax: payload.tax,
                TaxName: payload.name })
            .then(()=>{ return { result: true , msj:"El impuesto se ha registrado de forma correcta" } })
            .catch(()=>{ return { result: false, msj:"Error al crear el nuevo impuesto" } })
    return response;
}

const getTableTaxes = async(payload)=>{
    const taxes = await firebase.firestore().collection("Taxes")
        .where("CompanyId", "==", payload.company)
        .get()
        .then(res=>{
            const taxesArray = [];
            taxesArray.push(
                res.docs.map(dataSnapShot=>{
                    return {id: dataSnapShot.id, data: dataSnapShot.data() }
                })
            )
            return taxesArray[0];
        })
        .catch(()=>{ return [] });
    return (taxes === undefined)?[]:taxes;
}

const deleteTax = async(payload)=>{
    const deleteResponse = await firebase.firestore().collection("Taxes").doc(payload.id).delete()
        .then(()=>{ return { result: true, msj:" "}})
        .catch(()=>{ return { result: false, msj:"Error al eliminar el impuesto"}})
    return deleteResponse
}

const getTaxById = async(payload)=>{
    const tax = await firebase.firestore().collection("Taxes").doc(payload.id)
        .get()
        .then(res=>{
            return {data: res.data()}
        })
        .catch(()=>{ return {data: {} }})

    return tax; 
}

const updateTax = async(payload)=>{
    const updateResponse = await firebase.firestore().collection("Taxes").doc(payload.id)
        .update({
            Tax: payload.tax,
            TaxName: payload.name
        })
        .then(()=>{ return {result: true, msj:"La actualización se realizó de forma correcta"} })
        .catch(()=>{ return {result: false, msj:"Error al realizar la actualización del impuesto" } });
    return updateResponse;
}

const taxes = {
    getTaxes: getTaxes,
    setTaxes: setTaxes,
    getTableTaxes: getTableTaxes,
    deleteTax: deleteTax,
    getTaxById: getTaxById,
    updateTax: updateTax
}

export default taxes;