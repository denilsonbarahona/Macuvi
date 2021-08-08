import validationsService  from '../../../../validation/validation';

const IncomeExpenseValidator =(state)=>{
    const required = validationsService.requiredValidation(state)
    if(!required.validated){        
        return { result: false, msj:"",emptyFields:required.emptyFields}
    }

    const greatherThan = validationsService.GreatherThan(state);
    if(!greatherThan.validated){
         return { result: false, msj:greatherThan.exeptionMsj,  emptyFields:required.emptyFields}
     }

    return { result:true, msj:"", emptyFields:[] }
}

const validators = {
    IncomeExpenseValidator: IncomeExpenseValidator
}

export default validators;