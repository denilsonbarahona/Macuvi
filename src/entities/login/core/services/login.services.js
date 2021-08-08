import loginValidations from './login.validations'

const login = async(request, payload)=>{
  const loginResponse = await request.login.login(payload)
  return loginResponse
}

const signUp = async(signUpState, requests)=>{
       
    const signUpValidator = await loginValidations.signUpValidator(requests, signUpState, true).then(res=>{ return res })
    
    if(signUpValidator.result){
      /** signUp */ 
      const response = await requests.login.signUpByEmail(signUpState).then(res=>{ return res });
      
      return {result: response.result, msj: response.msj, emptyFields:[]}
    }

    return  signUpValidator;
}

const passSecurityLevel = (password)=>{

  const passLevel = loginValidations.securityLevelValidator(password)
  return passLevel;
}

const signUpFromInvitation = async(request, payload)=>{
  const signUpValidator = await loginValidations.signUpValidator(request, payload, false)
  if(signUpValidator.result){
    const response = await request.login.signUpFromInvitation(payload)
    return response;
  }
  return signUpValidator;
}

const requestChangePassword = async(request, payload)=>{
    const requestValidation = await loginValidations.requestValidation(request, payload)

    if(requestValidation.result){
      const requestResponse = await request.login.requestChangePassword(payload);
      return requestResponse
    }

    return requestValidation
}

const changeLoginPassword = async(request, payload)=>{
  const changeValidator = await loginValidations.changePasswordValidation(payload)
  if(changeValidator.result){
     const ChangeResponse = await request.login.changePassword(payload)
     return ChangeResponse;
  }
  return changeValidator
}

const ActivateAccount = async(request, payload)=>{
  const activateResponse = await request.login.activateAccount(payload)
  return activateResponse
}

const loginModel = {
    login                : login,
    signUp               : signUp,
    passSecurityLevel    : passSecurityLevel,
    signUpFromInvitation : signUpFromInvitation,
    requestChangePassword: requestChangePassword,
    changeLoginPassword  : changeLoginPassword,
    ActivateAccount      : ActivateAccount
}


export default loginModel;