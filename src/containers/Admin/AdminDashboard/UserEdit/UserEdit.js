import React from 'react' 
import Form from 'react-bootstrap/form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './UserEdit.css'


class UserEdit extends React.Component {

    constructor(props){
        super(props)
        this.state = this.getInitialState(props); 
    }

    getInitialState = (props) => {
        const initialState = {
        }
        return initialState;
    }

    handleChange = (event) => {
        this.props.handleChange(event)  
    }
   
    render() {
        const errors = this.props.errors; 
                
        return (
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <Form.Group controlId="formBasic.ControlSelect2">
                        <Form.Label>Username (in JIRA)</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Username" 
                            name='username'
                            value = {this.props.username} 
                            onChange = {this.handleChange} 
                            noValidate
                        />  
                        {errors.username.length > 0 && 
                        <span className='error'>{errors.username}</span>}      
                    </Form.Group>
                </Col>
                <Col xs lg="6">
                    <Form.Group controlId="formBasic.ControlSelect3">
                        <Form.Label>Email address (in marlabs)</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Email" 
                            name='email' 
                            value = {this.props.email}
                            onChange = {this.handleChange} 
                            noValidate 
                        />   
                        {errors.email.length > 0 && 
                            <span className='error'>{errors.email}</span>}    
                    </Form.Group>
                </Col>
            </Row>
        );
    }
}

export default UserEdit;