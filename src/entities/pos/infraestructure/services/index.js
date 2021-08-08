import firebase from '../../../../Service/firebase/firebase.service';

const newPOS = async(payload)=>{
    
    const posResponse = await firebase.firestore().collection("POS")    
                                .add({
                                    PosName    :  payload.name.toUpperCase()    ,
                                    PosCompany :  payload.company ,
                                    PosFee     :  payload.percentage 
                                })
                                .then(()=>{ return {result:true  , msj:"El registro del nuevo POS se ha realizado de forma correcta"} })
                                .catch(()=>{ return {result:false, msj:"Error al realizar el registro del nuevo POS"} }) 
    return posResponse;
}

const getPOSList = async(payload)=>{

    const POSList = await firebase.firestore().collection("POS")
                                .where("PosCompany","==",payload.company).get()
                                .then(res=>{
                                    let POS = []
                                    POS.push(res.docs.map(dataSnapShot=>{
                                        return { id: dataSnapShot.id, data: dataSnapShot.data() }
                                    }))

                                    return POS[0]
                                })
                                .catch(()=>{ return [] })
    return POSList;
}

const deletePOS = async(payload)=>{    
    const deleteResponse = await firebase.firestore().collection("POS").doc(payload.id)
                                        .delete()
                                        .then (()=>{ return { result: true, msj :"La eliminación de la información del POS se hizo de forma correcta"} })
                                        .catch(()=>{ return { result: false, msj:"Error al realizar la eliminación de la información"} })
    return deleteResponse
}

const getPOSByID = async(payload)=>{
    const POS = await firebase.firestore().collection("POS").doc(payload.id).get()
    return POS.data()
}

const updatePOS = async(payload)=>{
    const updateResponse = await firebase.firestore().collection("POS").doc(payload.id)
                                        .update({
                                            PosName: payload.name.toUpperCase(),
                                            PosFee : payload.percentage
                                        })
                                        .then( ()=>{ return { result: true  , msj:"La actualización de la información se realizó de forma correcta" }})
                                        .catch(()=>{ return { result: false , msj:"Error al realizar la actualización de la información" }})
    return updateResponse
}

const posServices = {
    newPOS    : newPOS     ,
    getPOSList: getPOSList ,
    deletePOS : deletePOS  ,
    getPOSByID: getPOSByID ,
    updatePOS : updatePOS
}

export default posServices;