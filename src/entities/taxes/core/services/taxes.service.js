import validatTax from "./tax.validator";

const getTaxes = async (request , company)=>{
    const taxes = await request.taxes.getTaxes(company)
    return taxes;
}

const setNewTax = async (request, payload)=>{
    const taxValidation = validatTax.validatTaxBeforeToSave(payload)
    if (taxValidation.result) {
        const newTaxResponse = await request.taxes.setTaxes(payload)
        return newTaxResponse;
    }
    return taxValidation;
}

const getTableTaxes = async(request, payload)=>{
    const taxes = await request.taxes.getTableTaxes(payload)
    return taxes
}

const deleteTax = async(request, payload)=>{
    const deleteResponse = await request.taxes.deleteTax(payload)
    return deleteResponse;
}

const getTaxById = async(request, payload)=>{
    const tax = await request.taxes.getTaxById(payload)
    return tax;
}

const updateTax = async(request, payload)=>{
    const taxValidation = validatTax.validatTaxBeforeToSave(payload)
    if (taxValidation.result) {
        const updateResponse = await request.taxes.updateTax(payload)
        return updateResponse;
    }
    
    return taxValidation;
}

const Taxes = {
    getTaxes: getTaxes,
    setNewTax: setNewTax,
    getTableTaxes: getTableTaxes,
    deleteTax: deleteTax,
    getTaxById: getTaxById,
    updateTax: updateTax
}


export default Taxes