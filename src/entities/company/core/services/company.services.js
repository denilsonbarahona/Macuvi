import validationBeforeToSave from './company.validation';

const getCompanyById = async(request, payload)=>{
    const company = await request.company.getCompanyInfoById(payload)
    return company
}

const updateCompanyById = async(request, payload)=>{
    const validation = validationBeforeToSave.companyValidationBeforeSave(payload);
    if(validation.result){
        const updateResponse = await request.company.updateCompany(payload)
        return updateResponse
    }

    return validation;
}

const companyServices = {
    getCompanyById: getCompanyById ,
    updateCompanyById: updateCompanyById
}

export default companyServices;