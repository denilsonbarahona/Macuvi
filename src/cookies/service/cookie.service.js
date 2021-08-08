const saveCookie = (cookie)=>{
    document.cookie = cookie+";path=/"
    return true
}

const getCookie =()=>{
    let cookie =""
    try {
      cookie = document.cookie.replaceAll("\\","");
      cookie = cookie.substr(1,cookie.length -2 )
      cookie = JSON.parse(cookie)          
    }catch(e){
      cookie =""
    }
    return cookie
}

const deleteCookie=()=>{
    let cookie_ =""
    if(document.cookie !== ""){
        document.cookie = document.cookie+";path=/;expires = "+Date()
        cookie_ = document.cookie
    }
    
    return cookie_
}

const cookie = {
    saveCookie  : saveCookie ,
    getCookie   : getCookie  ,
    deleteCookie: deleteCookie
}

export default cookie;