import axios from 'axios';

export function getLoanPeriod(){
    return (dispatch)=>{
        return axios.get('http://localhost:8080/api/repay/loanPeriod'), then((response)=>{
            dispatch(getLoanDuration(response.data));
        })
    }
}

export function getLoanDuration(loanDuration){
    return{
        type:"LOAN_PERIOD",
        loanDuration:loanDuration
    }
}