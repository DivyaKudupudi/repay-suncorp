import React, { Component } from 'react';
import axios from 'axios';
import {createStore, applyMiddleware} from 'redux';
import Provider from 'react-redux';
import thunk from 'redux-thunk';
///import reducers from '../reducers/calculator_reducer';
import DisplayRepayment from './DisplayRepayment';

//let store = createStore(reducers, applyMiddleware(thunk));

class RepayCalculator extends React.Component{
    constructor(props){
        super();
        this.state = {
            loanTypes: [],
            selectLoanTypeVal:'',
            loanPurpose: [],
            selectLoanPurposeVal: '',
            loanPeriod: [],
            selectLoanPeriodVal: '',
            borrowAmount:'',
            showResults: false,
            repayCalcResponse:{}
        };

        this.handleLoanTypeChange = this.handleLoanTypeChange.bind(this);
        this.handleLoanPeriodChange = this.handleLoanPeriodChange.bind(this);
        this.handleLoanPurposeChange = this.handleLoanPurposeChange.bind(this);
        this.handleChangeBorrowAmount = this.handleChangeBorrowAmount.bind(this);
    }

    onCalculateRepay(e){
        e.preventDefault();

        let repayCalcRequest={}
        let loanAmount={}
        loanAmount.amount=this.state.borrowAmount;
        loanAmount.currency='$';
        repayCalcRequest.loanPurpose=this.state.selectLoanPurposeVal;
        repayCalcRequest.loanPeriod=this.state.selectLoanPeriodVal;
        repayCalcRequest.loanType=this.state.selectLoanTypeVal;
        repayCalcRequest.loanAmount=loanAmount;
       
        console.log('request api:==== '+JSON.stringify(repayCalcRequest));

        fetch('http://localhost:8080/api/repay/calculate',{
            method: 'POST',
            body: JSON.stringify(repayCalcRequest)
            //headers: 
        })
        .then((res)=>{return res.json()}
        ).then(response=>{
            
            this.setState(
                {showResults: true,
                 repayCalcResponse: response}
            );
        })
        .catch(error=>console.log('Error:', error));
        
    }

   getLoanTypes (){
        fetch('http://localhost:8080/api/repay/loanTypes')
        .then((result) => {
          // Get the result
          // If we want text, call result.text()
          console.log("====api call==="+result);
          return result.json();
        }).then((jsonResult) => {
          // Do something with the result          
          this.setState({loanTypes: jsonResult});
          
        })
    }

    getLoanPurpose(){
        axios.get(`http://localhost:8080/api/repay/loanPurpose`)
        .then(res => {
          //const persons = res.data;
          //this.setState({ persons });
          this.setState({loanPurpose: res.data});
        })
    }

    getLoanPeriod(){
        axios.get(`http://localhost:8080/api/repay/loanPeriod`)
        .then(res => {
          //const persons = res.data;
          //this.setState({ persons });
          this.setState({loanPeriod: res.data});
        })
    }

    componentWillMount(){
        this.getLoanTypes();
        this.getLoanPurpose();
        this.getLoanPeriod();
    }

    handleLoanPurposeChange(event){
            this.setState({selectLoanPurposeVal:event.target.value});
    }
    handleLoanTypeChange(event){
            this.setState({selectLoanTypeVal:event.target.value});
    }
    handleLoanPeriodChange(event){
        this.setState({selectLoanPeriodVal:event.target.value});
    }
    handleChangeBorrowAmount(event) {
        this.setState({borrowAmount: event.target.value});
      }

    render(){
        let loanTypeItems = this.state.loanTypes.map((x) =>
        <option key={x.code} value={x.code}>{x.codeDesc}</option>);
        let loanPurposeItems = this.state.loanPurpose.map(x => <option key={x.code} value={x.code}>{x.codeDesc}</option>);
        let loanPeriodItems = this.state.loanPeriod.map(x => <option key={x.code} value={x.code}>{x.codeDesc}</option>);
        return(
            <div>
                <form>
                <h4>Repayment calculator</h4>
                <div className="container">
                <div className="row">
                    <p>What will you be using the loan for?</p>
                    <select onChange={this.handleLoanPurposeChange} value={this.state.selectLoanPurposeVal}>
                    <option key={0}>Select</option>
                    {loanPurposeItems}                    
                    </select>
                </div>
                <div className="row">
                    <p>How much would you like to borrow?</p>
                    <input type="text" value={this.state.borrowAmount} onChange={this.handleChangeBorrowAmount}></input>
                </div>
                <div className="row">
                    <p>Over what period will you repay the loan?</p>
                    <select onChange={this.handleLoanPeriodChange} value={this.state.selectLoanPeriodVal}>                    
                    <option key={0}>Select</option>
                    {loanPeriodItems}
                    </select>
                </div>
                <div className="row">
                <p>What type of loan would you like?</p>                                      
                    <select onChange={this.handleLoanTypeChange} value={this.state.selectLoanTypeVal}>
                    <option key={0}>Select</option>
                    {loanTypeItems}
                    </select>
                </div>
                <div className="row">
                <br/>                    
                    <button onClick={this.onCalculateRepay.bind(this)}>Calculate repayments</button>
                    { this.state.showResults ? <DisplayRepayment repayCalcResponse={this.state.repayCalcResponse}/> : null }
                </div>
                </div>
                </form>
            </div>
        );
    }
}

export default RepayCalculator;