import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EmployeeList from './component/EmployeeList/index';
import EmployeeOperation from './component/EmployeeOperation/index';
import employeeDummyData from './dummyData';
export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = { employeeData: employeeDummyData };
    }

    deleteEmployee = (empId) => {
        const dummyEmployeeData = JSON.parse(JSON.stringify(this.state.employeeData));
        const targetIndex = dummyEmployeeData.findIndex((emp) => emp.id === empId);
        dummyEmployeeData.splice(targetIndex, 1);
        this.setState({
            employeeData: dummyEmployeeData,
            targetedEmployeeId: 0,
        });
    }

    setSelectedEmployeeId = (empId) => {
        this.setState({ targetedEmployeeId: empId });
    }

    saveUserInfo = (empInfo) => {
        const dummyData = JSON.parse(JSON.stringify(this.state.employeeData));
        if (empInfo.id === -1) {
            empInfo.id = dummyData.length + 1;
            dummyData.push(empInfo);
        } else {
            const employeeToBeEditedIndex = dummyData.findIndex(emp => emp.id === empInfo.id);
            dummyData[employeeToBeEditedIndex] = empInfo;
        }

        this.setState({ employeeData: dummyData });
    }

    returnEmployeeList = () => {
        return (
            <EmployeeList
                setSelectedEmployeeId={this.setSelectedEmployeeId}
                employeeData={this.state.employeeData}
                deleteEmployee={this.deleteEmployee}
            />
        );
    }

    returnEmployeeOperation = () => {
        const { employeeData, targetedEmployeeId } = this.state;
        let employeeToBeAdded = {
            id: -1,
            firstName: '',
            lastName: '',
            dob: new Date().getTime(),
            designation: '',
            profilePhotoLink: 'https://statinfer.com/wp-content/uploads/dummy-user.png',
            experience: 0,
        };

        if (targetedEmployeeId) {
            employeeToBeAdded = employeeData.filter(emp => emp.id === targetedEmployeeId)[0];
        }
        return (
            <EmployeeOperation
                employeeData={employeeToBeAdded}
                saveUserInfo={this.saveUserInfo}
            />
        );
    }

    render() { 
        return (
            <div className="container">
                <Router>
                    <div className="col-md-12">
                        <Switch>
                                <Route path="/list" render={this.returnEmployeeList} />
                                <Route path="/addEmployee" render={this.returnEmployeeOperation} />
                                <Route path="/employee/:id" render={this.returnEmployeeOperation} />
                                <Route path="/" exact render={this.returnEmployeeList} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    };
}
