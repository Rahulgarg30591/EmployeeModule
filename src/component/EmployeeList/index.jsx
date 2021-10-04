import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            noEmployee: this.props.employeeData && this.props.employeeData.length > 0 ? false : true
        };
        this.getTableContent = this.getTableContent.bind(this);
    }

    setSelectedEmployeeId = (id) => {
        this.props.setSelectedEmployeeId(id);
    };

    deleteConfirm = (empInfo) => {
        if (window.confirm(`Are your sure, You want to delete ${empInfo.firstName} ${empInfo.lastName}?`)) {
            this.props.deleteEmployee(empInfo.id);
        }
    };

    getTableContent() {
        if (this.props.employeeData && this.props.employeeData.length > 0) {
            return this.props.employeeData.map((emplyeeInfo, index) => {
                return (
                    <tr key={emplyeeInfo.id}>
                        <td>{index + 1}</td>
                        <td><img src={emplyeeInfo.profilePhotoLink} width="50" height="50" alt="profile" /></td>
                        <td>{emplyeeInfo.firstName}</td>
                        <td>{emplyeeInfo.lastName}</td>
                        <td>{emplyeeInfo.experience}</td>
                        <td>{new Date(emplyeeInfo.dob).toLocaleDateString()}</td>
                        <td><Link onClick={this.setSelectedEmployeeId.bind(this, emplyeeInfo.id )} to={`/employee/${emplyeeInfo.id}`}><button>Edit</button></Link></td>
                        <td><button onClick={this.deleteConfirm.bind(this, emplyeeInfo )}>Delete</button></td>
                    </tr>
                )
            });
        };

        if (!this.state.noEmployee) {
            this.setState({ noEmployee: true });
        }
    }
  
    render() {
        return (
            <section>
        
                <button><Link to="/addEmployee" onClick={() => {this.props.setSelectedEmployeeId(0)}}>Add New Employee</Link></button>
                <table>
                    <thead>
                        <tr>
                            <td>S.No</td>
                            <td>Image</td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Experience</td>
                            <td>DOB</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getTableContent()}
                    </tbody>
                </table>
                {this.state.noEmployee && <span>No Employee Found !!</span>}
            </section>
        );
    }
}