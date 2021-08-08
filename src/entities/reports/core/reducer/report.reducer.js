import  * as ReportActions from '../actions/report.actions';

const initialState = {
    payload     : []    ,
    show        : false  
}

const report_reducer = (state = initialState , action) =>{
    switch( action.type ){
        case ReportActions.SHOW_REPORT_RESULT : return { ...state, show: true  }
       default: return state;
    }
}

export default report_reducer;