let defaultState={
    loanPeriod:[]
}

const mainReducer=(state=defaultState, action)=>{
    if(action.type==="LOAN_PERIOD"){
        return{
            ...state,
            loanDuration:action.loanDuration
        }
    }else{
        return{
            ...state
        }
    }
}

export default mainReducer;