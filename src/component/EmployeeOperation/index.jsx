import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EmployeeOperation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            employeeData: this.props.employeeData,
        };
    }

    fieldChange = ({ target }) => {
        const dummyData = JSON.parse(JSON.stringify(this.state.employeeData));
        dummyData[target.name] = target.value;
        this.setState({ employeeData: dummyData });
    }

    save = () => {
        this.props.saveUserInfo(this.state.employeeData);
    }

    render() { 
        const { id, firstName, lastName, experience, dob, profilePhotoLink, designation } = this.state.employeeData;

        return (
            <section>
                <img src={profilePhotoLink} alt="Profile" width="50" height="50"></img>
                <table>
                    <tbody>
                        {id !== -1 && (<tr>
                            <td>
                                <label>ID</label>
                            </td>
                            <td>
                                <label>{id}</label>
                            </td>
                        </tr>) }
                        <tr>
                            <td>
                                <label>First Name</label>
                            </td>
                            <td>
                                <input type="text" name="firstName" value={firstName} onChange={this.fieldChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Last Name</label>
                            </td>
                            <td>
                                <input type="text" name="lastName"  value={lastName} onChange={this.fieldChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Profile Image URL</label>
                            </td>
                            <td>
                                <input type="text" name="profilePhotoLink"  value={profilePhotoLink} onChange={this.fieldChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Designation</label>
                            </td>
                            <td>
                                <input type="text" name="designation"  value={designation} onChange={this.fieldChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Experience (Months)</label>
                            </td>
                            <td>
                                <input type="text" name="experience" value={experience} onChange={this.fieldChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Date of Birth</label>
                            </td>
                            <td>
                                <input type="date" name="dob" value={new Date(dob).toISOString().split('T')[0]} onChange={this.fieldChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Link to="/list" onClick={this.save}><button >Save</button></Link>
                <Link to="/list"><button>Cancel</button></Link>
            </section>
        );
    }
}
 
export default EmployeeOperation;