import firebase from '../../../../Service/firebase/firebase.service';

const getCategories = async(company) => {

    const categories = await firebase.firestore().collection("Categories")
        .where("categoryCompanyId","==", company)
        .where("categoryState","==", 1)
        .get().then(res=>{
            var categories= []
            categories.push(     
                res.docs.map(dataSnapShot=>{
                    const category = { id: dataSnapShot.id,
                        name: dataSnapShot.data().categoryName,
                        counter: dataSnapShot.data().categoryProducts || 0,
                        selected: false
                    }
                    return category;
                })
            )
            return categories;
        })    
    return categories;
}

const createCategory = async(category)=>{

    const response = firebase.firestore().collection("Categories")
        .add({
            categoryName: category.name.toUpperCase(),
            categoryCompanyId: category.company,
            categoryState: 1,
            categoryProducts: 0})
        .then(()=>{ return true  })
        .catch(()=>{  return false   })
    
    return response
}

const getCategoryById = async(categoryId)=>{
    const category = await firebase.firestore().collection("Categories").doc(categoryId).get()
    return category.data()
}

const updateCategoryById = async(payload)=>{    
    
    const product = await firebase.firestore().collection("Products")
                        .where("productCategory.id","==",payload.id)
                        .get()
                        .then((res)=>{ 
                          return  res.docs.length
                        })
 
    const response = await firebase.firestore().collection("Categories").doc(payload.id)
                            .update({ categoryName: payload.name.toUpperCase(),
                                categoryProducts: product })
                            .then(()=>{ return { response: true, msj:"La actualización de la categoría se ha realizado de forma correcta"}})
                            .catch(()=>{ return { response: false, msj: "Error al realizar la actualización de la categoría"}})    
    return response
}

const deleteCategoryById = async(category_id)=>{
    const response = firebase.firestore().collection("Categories").doc(category_id)
                        .delete()
                        .then(()=>{ return true })
                        .catch(()=>{ return false })
    return response
}

const getCategoryList = async(company)=>{
    const categories = await firebase.firestore().collection("Categories")
            .where("categoryCompanyId","==", company)
            .where("categoryState","==", 1)
            .get().then(res=>{
                var categories= []
                categories.push(     res.docs.map(dataSnapShot=>{
                                        const category = { id : dataSnapShot.id , name : dataSnapShot.data().categoryName }
                                        return category;
                                    })
                                )

                return categories;
            })    
    return categories[0];
}

const category_services = {
    getCategories     : getCategories,
    createCategory    : createCategory,
    getCategoryById   : getCategoryById,
    updateCategoryById: updateCategoryById,
    deleteCategoryById: deleteCategoryById,
    getCategoryList   : getCategoryList
}


export default category_services;