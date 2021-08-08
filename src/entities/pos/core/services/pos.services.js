import posValidation from './pos.validation';

const setNewPOS =async(request,payload)=>{
    const validatResult = posValidation.validationBeforeToSave(payload);
    if(validatResult.result){        
        const setPOSResponse = await request.pos.newPOS(payload)
        return setPOSResponse;
    }

    return validatResult
}

const getPOSList = async(request, payload)=>{ 
    const POSArray = []
    const POSList  = await request.pos.getPOSList(payload)
    const size     = POSList.length

    while(POSList.length>0){
        POSArray.push(POSList.splice(0,25))
    }
    return {array: POSArray, size: size}
}

const getPOSCombo = async(request, payload)=>{
  const POSList  = await request.pos.getPOSList(payload)
  return POSList;
}

const deletePOS = async(request, payload)=>{
    const deleteResponse = await request.pos.deletePOS(payload)
    return deleteResponse;
}

const getPOSByID = async(request, payload)=>{
    const POSByID = await request.pos.getPOSByID(payload)
    return POSByID;
}

const updatePOS = async(request, payload)=>{
    const validatResult = posValidation.validationBeforeToSave(payload);
    if(validatResult.result){        
        const updatePOSResponse = await request.pos.updatePOS(payload)
        return updatePOSResponse;
    }

    return validatResult
}

const POS_services = {
    setNewPOS: setNewPOS ,
    getPOSList: getPOSList,
    deletePOS: deletePOS ,
    getPOSByID: getPOSByID,
    updatePOS: updatePOS,
    getPOSCombo: getPOSCombo
}

export default POS_services;