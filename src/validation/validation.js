const requiredValidation   = (formState)=>{    
    let validated   = true;
    let emptyFields = []    
    formState.required.forEach((field)=>{
        if([undefined, ""].includes(formState[field]) ){            
            validated=false
            emptyFields.push(field)
        }
    })

    return {validated: validated, emptyFields: emptyFields} 
}

const compareValidation    = (formState)=>{
    let validated   = true;
    let exeptionMsj = "";
    for(let i = 0; i < formState.compare.length; i++){
        if(formState[formState.compare[i].key1] !== formState[formState.compare[i].key2] ){
            validated   = false;
            exeptionMsj = formState.compare[i].errordescription;
            break;
        }
    }

    return {validated: validated, exeptionMsj: exeptionMsj}
}

const passwordValidation   = (password)=>{
    
    if(password.length<=2){
        return {securityLevel:0}
    }

    if(password.length>2 && password.length <=4){
        return {securityLevel:1}
    }

    if(password.length>4 && password.length <=6){
        return {securityLevel:2}
    }

    
    if(password.length>6 && password.length <=7){
        return {securityLevel:3}
    }

    if(password.length>=8){
        return {securityLevel:4}
    }


}

const GreatherThan         = (formState)=>{
    let validated   = true;
    let exeptionMsj = "";
    
    for(let i=0; i < formState.greater.length; i++){
        if( formState[formState.greater[i].key1] <=  formState.greater[i].greatherThan){
            validated = false;
            exeptionMsj = formState.greater[i].errordescription;
            break;
        }
    } 

    return {validated: validated, exeptionMsj: exeptionMsj}
}

const RequieredDataArrayByCondition = (formState)=> {

    let validated   = true;
    let response    = "";
    let emptyFields = [];
    
    for(let i=0; i < formState.condition.conditions.length; i++){
        if(formState.condition.conditions[i]["value"] === formState[formState.condition.key]){
            for(let y=0; y < formState.items.length; y++){
                const check_response = requiredValidation({...formState.items[y].data, required: formState.condition.conditions[i]["required"]})  
                if(!check_response.validated) {                   
                    validated   = check_response.validated;
                    response    = formState.condition.conditions[i]["msj"]  
                    emptyFields =  check_response.emptyFields            
                    break;
                }
            }            
         }
    }

    return {validated: validated, msj: response, emptyFields: emptyFields} 
}

const RequiredOneField     = (formState) =>{
    let validated = false;
    for(let i=0; i < formState.onRequired.keys.length; i++ ){
        if(formState.onRequired.value === formState[ formState.onRequired.keys[i] ].toString()  ){
            validated = true;
            break;
        }
    }
    return {validated: validated}
}

const validations = {
    requiredValidation  : requiredValidation  ,
    compareValidation   : compareValidation   ,
    passwordValidation  : passwordValidation  ,
    GreatherThan        : GreatherThan        ,
    RequieredDataArrayByCondition: RequieredDataArrayByCondition,
    RequiredOneField    : RequiredOneField
}

export default validations;