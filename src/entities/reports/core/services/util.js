export const convertToMonth =(monthIndex)=>{
    switch(monthIndex){
        case 0: return "Ene"
        case 1: return "Feb"
        case 2: return "Mar"
        case 3: return "Abr"
        case 4: return "May"
        case 5: return "Jun"
        case 6: return "Jul"
        case 7: return "Ago"
        case 8: return "Sep"
        case 9: return "Oct"
        case 10: return "Nov"
        default: return "Dic"
    }
}