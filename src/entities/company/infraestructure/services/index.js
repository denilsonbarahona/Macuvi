import firebase from '../../../../Service/firebase/firebase.service';

const getCompanyInfoById = async(payload)=>{
    const companyInfo = await firebase.firestore().collection("Companies").doc(payload.id).get();
    return companyInfo.data()
}


const updateCompany = async(payload)=>{    
    const batch = firebase.firestore().batch();
    const cDocRef = firebase.firestore().collection("Companies").doc(payload.id);
    const companyData = getCompanyInfoById(payload.id);

    batch.update(cDocRef, {
        CompanyAddress: payload.address.toUpperCase(),
        CompanyCAI: payload.CAI,
        CompanyCity: payload.city.toUpperCase(),                                        
        CompanyDeliverySale: payload.delivery ,
        CompanyEmail: payload.email,
        CompanyEndingDate: payload.date.ending,
        CompanyEndingDocs: payload.docs.ending,
        CompanyInitDocs: payload.docs.init,
        CompanyName: payload.name.toUpperCase(),
        CompanyPhone: payload.phone,
        CompanyRTN: payload.RTN })

    if (companyData.CompanyInitDocs !== payload.docs.init) {
        const splittedArray = payload.docs.init.split("-")
        const initialDoc = splittedArray[splittedArray.length -1]
        batch.update(cDocRef,{CompanyCorrelative: Number(initialDoc) -1 })
    }

    const companyUpdate = await batch.commit()
        .then( ()=>{ return { result: true ,
            msj:"La actualización de la información de la empresa se realizó de forma correcta",
            emptyFields:[] }})
        .catch(()=>{ return { result: false,
            msj:"Error al realizar la actualización de la información",
            emptyFields:[] }})

    return companyUpdate;
}


const companyRequest = {
    getCompanyInfoById: getCompanyInfoById ,
    updateCompany     : updateCompany
}

export default companyRequest;