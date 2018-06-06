import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';

import RepayCalculator from './RepayCalculatorComponent';

class HeaderNav extends React.Component{
    constructor(){
        super();
        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
        key: 1
        };
    }
    onRepayCalcClick(){
       //return <RepayCalculator/>;
       this.setState({render:'RepayCalculator'});
    }

    handleSelect(key) {        
        this.setState({ key });
      }

    render(){
        return(
            <div>
                <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="HeaderTabs">
                    <Tab eventKey={1} title="Repayment Calculator">
                        <div><RepayCalculator/></div>
                    </Tab>
                    <Tab eventKey={2} title="Financial Details">
                    Tab 2 content
                    </Tab>
                    <Tab eventKey={3} title="Personal Details">
                    Tab 3 content
                    </Tab>
                    <Tab eventKey={4} title="Identification" disabled>
                    Tab 4 content
                    </Tab>
                    <Tab eventKey={5} title="Confirmation" disabled>
                    Tab 5 content
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default HeaderNav;