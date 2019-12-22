import React from 'react';
import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import MuiContainer from '@material-ui/core/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EmailRegex from './../../components/assets/EmailRegex';
import './ForgetPassword.css';
import Grid from '@material-ui/core/Grid';

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class ForgetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            errors: {
                email: '',
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
            default:
                break;
        }
    
        this.setState({errors, [name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm(this.state.errors)) {
            console.info('Valid Form');
        }else{
            console.error('Invalid Form')
        }
    }

    handleBack = (event) => {
        event.preventDefault();
        this.props.history.goBack();
    }


    render() {
        const {errors} = this.state;
        return (
            <MuiContainer maxWidth="sm"  className="Login-Form-Container">
                <div className = "Forget-Heading">
                    <p>Forget Password</p>
                </div>
                <Grid container spacing={0} className = "Login-Form-Body">
                    <Form>
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col xs lg="12">
                                    <Form.Group controlId="formBasic.ControlSelect1">
                                        <Form.Label>Email ID</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Email ID"
                                            name='email' 
                                            onChange = {this.handleChange} 
                                            noValidate 
                                        />
                                        {errors.email.length > 0 && 
                                        <span className='error'>{errors.email}</span>}        
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col xs lg="12">
                                    <Button variant="primary" style = {{margin : '5px'}} onClick = {this.handleSubmit} type="submit">Submit</Button>
                                    <Button variant="primary" style = {{margin : '5px'}} onClick = {this.handleBack} type="button">Back</Button>
                                </Col>
                            </Row>
                        </Container>
                        <div>
                            
                        </div> 
                    </Form>
                </Grid>
            </MuiContainer>
        );
    }
}

export default ForgetPassword;