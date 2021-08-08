
const getCategoriesInTicket = async(requests, company)=>{
    /**
     * HERE IN THIS FUNCTION WE RECIBE THE REQUEST OBJ TO MAKE THE CONEXION WITH FIREBASE
     * AND THE COMPANY ID TO GET ALL THE CATEGORIES IN THIS COMPANY
     * AFTER GET THE CATEGORIES WE CHECK WHICH Of THEM HAS AVAILABLE PRODUCTS FOR A TICKET (INVOICE) TO BE SHOW
     * IN THI UI TO THE USER
     **/
    const CategoriesInTicket = [{id: "blank", name:"TODOS", counter: 0, selected: true}]
    const categories = await requests.categories.getCategories(company).then(res=>{ return res })
    let counter = 0;
    categories[0].forEach(element => {
      counter += Number(element.counter)
    });
    CategoriesInTicket[0]["counter"] = counter;
    return CategoriesInTicket.concat(categories[0]);
}

const getSelectedCategory = async(categories, selected)=>{
          
    for(let i=0; i < categories.length; i++){
        if(categories[i].id === selected){
            categories[i].selected = true
        }else{
            categories[i].selected = false
        }
    }
    return categories
}

const createCategory = async(request, category)=>{    
    const response = await  request.categories.createCategory(category)
    return response
}

const getCategoriesTable = async(request, company)=>{
    
    const chunk_invoices = []
    const categories = await request.categories.getCategories(company).then(res=>{ return res })
    const size = categories[0].length;

    while(categories[0].length > 0){
        chunk_invoices.push( categories[0].splice(0, 30) )
    }
    return {chunk:chunk_invoices, size: size};
}

const getCategoryById = async(request, category_id)=>{    
    const category = await request.categories.getCategoryById(category_id);
    return category
}

const updateCategoryById = async(request, payload)=>{
    let response 
    if([undefined,""].includes(payload.name)){
        response = { response: false , msj: "Se tiene que ingresar el nombre de la categoría "}
    }else{
        response = await request.categories.updateCategoryById(payload);
    }
    
    return response;
}

const deleteCategoryById = async(request, payload)=>{
    const response = await request.categories.deleteCategoryById(payload)
    return response
}

const getCategoryList = async(request , payload)=>{
    const response = await request.categories.getCategoryList(payload)
    return response;
}

const getCategoriesForDiscount = async(request, company)=>{
    
    let finalArray = []
    const categories = await request.categories.getCategories(company)
    for(let i=0; i < categories[0].length; i++){
        finalArray.push({ value: categories[0][i].id , label: categories[0][i].name, type: "category"  })
    }

    return finalArray
}

const categoryModel = {
    getCategoriesInTicket   : getCategoriesInTicket ,
    getSelectedCategory     : getSelectedCategory   ,
    createCategory          : createCategory        ,
    getCategoriesTable      : getCategoriesTable    ,
    getCategoryById         : getCategoryById       ,
    updateCategoryById      : updateCategoryById    ,
    deleteCategoryById      : deleteCategoryById    ,
    getCategoryList         : getCategoryList       ,
    getCategoriesForDiscount: getCategoriesForDiscount  
}

export default categoryModel;