import React from 'react';
import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './SignUp.css'
import EmailRegex from '../../components/assets/EmailRegex';
import MuiContainer from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import { getAllProjects, getRoleByProject, addUserData } from './../../api/admin';


const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class SignUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        const initialState = {
            employeeId: null,
            email: null,
            password: null,
            username: null,
            project: null,
            role: null,
            errors: {
                email: '',
                password: '',
                employeeId: '',
                username: '',
                project: '',
                role: ''
            },
            isInvalid: false,
            allRoleName: [],
            allProjectName: [],
            isDisabled: true
        };
        return initialState;
    }

    componentDidMount () {
        getAllProjects(this.postAllProjectName);
    }

    postAllProjectName = (response) => {
        //console.log(response.data);
        this.setState({
            ...this.state,
            allProjectName: response.data
        })    
    }

    postAllRolesName = (response) => {
            this.setState({
                ...this.state,
                allRoleName: response.data,
            })
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
    
        switch (name) {
            case 'email':  
                this.setState({
                    ...this.state,
                    email: event.target.value
                })
                errors.email = 
                EmailRegex.test(value)
                    ? ''
                    : 'Email is not valid!';
                break;
            case 'password': 
                this.setState({
                    ...this.state,
                    password: event.target.value
                })
                errors.password = 
                value.length < 5
                    ? 'Password must be 5 characters long!'
                    : '';
                break;
            case 'employeeId':
                this.setState({
                    ...this.state,
                    employeeId: event.target.value
                })
                errors.employeeId = 
                Number(value) < 1
                    ? 'Please enter employee id'
                    : '';
                break;
            case 'username':
                this.setState({
                    ...this.state,
                    username: event.target.value
                })
                errors.username = 
                value.length < 3 
                    ? 'Username must be 4 characters long!'
                    : '';
                break;
            case 'project':
                let data = JSON.parse(event.target.value)
                getRoleByProject(this.postAllRolesName, data.id)
                this.setState({
                    ...this.state,
                    project: event.target.value,
                    isDisabled: false
                })
                errors.project = 
                value === null 
                    ? 'Project cannot be blank!'
                    : '';
                break;
            case 'role':
                this.setState({
                    ...this.state,
                    role: event.target.value
                })
                errors.role = 
                value === null 
                    ? 'Role cannot be blank!'
                    : '';
                break;
            default:
                break;
        }
    
        this.setState({errors, [name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let currentData = this.state;
        let projectData = JSON.parse(this.state.project);
        let roleData = JSON.parse(this.state.role)
        if(validateForm(this.state.errors) && projectData && roleData && currentData.employeeId && currentData.email && currentData.username && currentData.password) {
            let newUserData = {
                employee_id: this.state.employeeId,
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                project: [
                    {
                        'id': projectData.id,
                        'name': projectData.name,
                        'roles': [roleData]
                    }
                ],
            }
            this.setState({
                ...this.state,
                isInvalid: false
            })
            addUserData(this.postAddUserData, newUserData);
        } else {
            alert('All fields are mandetory!!!\nPlease fill all details.')
            this.setState({
                ...this.state,
                isInvalid: true
            })
        }
    }

    postAddUserData = (response) => {
        this.props.history.push('/login')
        alert('New User Registered!!!');
    }

    handleLogin = (event) => {
        event.preventDefault();
        this.props.history.push('/');
    }

    render() {
        const {errors} = this.state;
        return(
            <div>
                <MuiContainer maxWidth="md"  className="SignUp-Form-Container">
                    <div className = "SignUp-Heading">
                        <p>Enter Your Details</p>
                    </div>
                    <Grid container spacing={0} className = "SignUp-Form-Body">
                        <Form>
                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col xs lg="4">
                                        <Form.Group controlId="formBasic.ControlSelect1">
                                            <Form.Label>Employee Id</Form.Label>
                                            <Form.Control 
                                                type="number" 
                                                placeholder="Employee Id"
                                                name='employeeId' 
                                                onChange = {this.handleChange} 
                                                noValidate 
                                            />
                                            {errors.employeeId.length > 0 && 
                                            <span className='error'>{errors.employeeId}</span>}  
                                        </Form.Group>
                                    </Col>
                                    <Col xs lg="4">
                                        <Form.Group controlId="formBasic.ControlSelect2">
                                            <Form.Label>Username (in JIRA)</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Username" 
                                                name='username' 
                                                onChange = {this.handleChange} 
                                                noValidate
                                            />  
                                            {errors.username.length > 0 && 
                                            <span className='error'>{errors.username}</span>}      
                                        </Form.Group>
                                    </Col>
                                    <Col xs lg="4">
                                        <Form.Group controlId="formBasic.ControlSelect3">
                                            <Form.Label>Email address (in marlabs)</Form.Label>
                                            <Form.Control 
                                                type="email" 
                                                placeholder="Email" 
                                                name='email' 
                                                onChange = {this.handleChange} 
                                                noValidate 
                                            />   
                                            {errors.email.length > 0 && 
                                                <span className='error'>{errors.email}</span>}     
                                        </Form.Group>
                                        
                                    </Col>
                                    <Col xs lg="4">
                                        <Form.Group controlId="formBasic.ControlSelect4">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control 
                                                type="password" 
                                                placeholder="Password" 
                                                name='password' 
                                                onChange = {this.handleChange}
                                                //className = {this.state.isInvalid ? 'error-message' : ''} 
                                                noValidate  /> 
                                                {errors.password.length > 0 && 
                                                    <span className='error'>{errors.password}</span>}       
                                        </Form.Group>
                                        
                                    </Col>
                                    <Col xs lg="4">
                                        <Form.Group controlId="formBasic.ControlSelect5">
                                            <Form.Label>Project</Form.Label>
                                            <Form.Control as="select" onChange = {this.handleChange} name = 'project' >
                                                <option defaultValue>--Select--</option>
                                                {this.state.allProjectName.map( (data) => {
                                                    return <option key = {data.id} value = {JSON.stringify(data)}>{data.name}</option>
                                                } )}
                                            </Form.Control>        
                                        </Form.Group>
                                    </Col>
                                    <Col xs lg="4">
                                        <Form.Group controlId="formBasic.ControlSelect6">
                                            <Form.Group controlId="formBasic.ControlSelect5">
                                                <Form.Label>Role</Form.Label>
                                                <Form.Control as="select" onChange = {this.handleChange} name = 'role' disabled = {this.state.isDisabled}>
                                                <option defaultValue>--Select--</option>
                                                {this.state.allRoleName ?
                                                    this.state.allRoleName.map( (data) => {
                                                        return <option key = {data.id} value = {JSON.stringify(data)}>{data.name}</option>
                                                    })
                                                    :
                                                        <React.Fragment />
                                                }
                                                </Form.Control>        
                                            </Form.Group>      
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>
                            <div className="SignUp-Button">
                                <Button variant="primary" style = {{margin : '5px'}} onClick = {this.handleSubmit} type="submit">Submit</Button>
                                <Button variant="primary" style = {{margin : '5px'}} onClick = {this.handleLogin} type="button">Login</Button>
                            </div> 
                        </Form>
                    </Grid>
                </MuiContainer>
                
            </div>
        );
    }
}

export default withRouter(SignUpForm);