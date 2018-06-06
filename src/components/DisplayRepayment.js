import React, { Component } from 'react';

class DisplayRepayment extends React.Component{
    constructor(props){
        super(props);
        this.repayCalcResponse=this.props.repayCalcResponse;
    };

    render(){
        
        return(
            <div className="calc-repay">
                <div>
                    <h3>Your Repayments</h3>
                </div>
                <div><h2>{this.repayCalcResponse.totalInclFees.currency === 'USD'?<p>${this.repayCalcResponse.totalInclFees.amount}</p> : null}</h2></div>
                <p>Per month</p>
                <div>
                    <p>Interest rate      {this.repayCalcResponse.interestRate.rate+this.repayCalcResponse.interestRate.unit+this.repayCalcResponse.interestRate.periodType}</p>    
                    <p>Comparison rate    {this.repayCalcResponse.comparisionRate.rate+this.repayCalcResponse.comparisionRate.unit+this.repayCalcResponse.comparisionRate.periodType}</p>  
                </div>
                <hr/>
                <div>
                    <p>Total amount borrowed</p>  {this.repayCalcResponse.totalAmount.currency === 'USD'?<p>${this.repayCalcResponse.totalAmount.amount}</p> : null}
                    <p>Establishment fee</p>      {this.repayCalcResponse.establishmentFee.currency === 'USD'?<p>${this.repayCalcResponse.establishmentFee.amount}</p> : null}
                    <p>Government charges</p>     {this.repayCalcResponse.govtCharges.currency === 'USD'?<p>${this.repayCalcResponse.govtCharges.amount}</p> : null}
                    <p>Service fee</p>            {this.repayCalcResponse.serviceFee.amount.currency === 'SGD'?<p>${this.repayCalcResponse.serviceFee.amount.amount}{this.repayCalcResponse.serviceFee.periodType}</p> : null}
                </div>
                <p>All lending fees and charges</p>
                <div>
                    <button>Continue</button>
                </div>
            </div>
        );
    }
}

export default DisplayRepayment;