import React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from 'react-bootstrap/Button';
import './Login.css'
import EmailRegex from './../../components/assets/EmailRegex';
import {Link } from 'react-router-dom';
import { authenticateUser } from './../../api/login';

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
            email: null,
            password: null,
            errors: {
                email: '',
                password: '',
            }
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
    
        switch (name) {
            case 'email':  
                this.setState({
                    email: event.target.value
                })
                errors.email = 
                EmailRegex.test(value)
                    ? ''
                    : 'Email is not valid!';
                break;
            case 'password': 
                this.setState({
                    password: event.target.value
                })
                errors.password = 
                value.length < 5
                    ? 'Password must be 5 characters long!'
                    : '';
                break;
            default:
                break;
        }
    
        this.setState({errors, [name]: value});
    }

    postAuthenticateUser = (response) => {
        if(response.data.user.status === 'active'){
            const saveSession={
                access_token: response.data.id,
                userId: response.data.userId,
                userDetails: response.data.user
            }
            sessionStorage.setItem('access_token',JSON.stringify(saveSession));
            if(response.data.user.username === 'admin'){
                this.props.history.push('/admin-dashboard');
            } else {
                this.props.history.push('/planned-efforts');
            }
                        
        } else {
            alert("Username: " + response.data.user.username + ' is ' + response.data.user.status);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm(this.state.errors) && (this.state.email !== null && this.state.password !== null ) ) {
            const userData = { 
                email: this.state.email, 
                password: this.state.password 
            }

            authenticateUser(this.postAuthenticateUser, userData);
        } else {
            alert("Username or Password didn't match!!.\nPlease provide correct details.")
        }
    }

    signUpClicked = (event) => {
        event.preventDefault();
        this.props.history.push('/sign-up');
    }

    render() {
        const {errors} = this.state;
        return(
            <div>
                <Container maxWidth="sm"  className="Login-Form-Container">
                <div className = "Login-Heading">
                    <p>Login</p>
                </div>
                    <Grid container spacing={0} className = "Login-Form-Body">
                        <form autoComplete="off" >
                            <Grid item xs={12} className = "Login-Input" >    
                                <TextField
                                    required
                                    label = "Email-id"
                                    type = "text"
                                    //className = {classes.textField}
                                    margin = "normal"
                                    onChange = {this.handleChange}
                                    name = "email"
                                />  
                                {errors.email.length > 0 && 
                                            <span className='error'>{errors.email}</span>}
                            </Grid>
                                
                            <Grid item xs={12} className = "Login-Input" >
                                <TextField
                                    required
                                    label = "Password"
                                    type = "password"
                                    autoComplete = "current-password"
                                    margin = "normal"
                                    onChange = {this.handleChange}
                                    name = 'password'
                                />
                                    {errors.password.length > 0 && 
                                            <span className='error'>{errors.password}</span>}
                            </Grid>     
                            <Grid item xs={12} className = "Form-Button">
                                <Button variant="primary" onClick = {this.handleSubmit} type="submit">
                                    Login
                                </Button>
                            </Grid>
                            <Link to="/forget-password">Forget Password ?</Link>   
                            <Grid item xs={12} className = "Form-Button">
                                <span>Not yet Register. Register Now</span>
                            </Grid>
                            <Grid item xs={12} className = "Form-Button"> 
                                <Button variant="primary" onClick = {this.signUpClicked} type="submit">Sign Up</Button>
                            </Grid>   
                                  
                        </form>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default LoginForm;