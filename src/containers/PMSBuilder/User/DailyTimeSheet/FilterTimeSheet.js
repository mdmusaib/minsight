import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/form'
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import Grid from '@material-ui/core/Grid';

class FilterTimeSheet extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState(props);    
    }

    getInitialState = (props) => {
        const initialState = {
            allProjectName: props.allProjectName,
            allRoleName: props.allRoleName,
            project: props.project,
            role: props.role,
            types: props.type,
            isDisabled: true,
            date: props.date,
            roleName: props.roleName,
            projectName: props.projectName,
            typeName: props.typeName,
        }  
        return initialState;
    }

    static getDerivedStateFromProps(nextProps) {
        return nextProps;
    }

    handleChange = (event) => {    
        this.props.handleChange(event);
    }

    render() {
        return(
        <React.Fragment key = "filterTImeSheet">
            <hr></hr>
            <Row className="justify-content-md-center">
                <Col xs lg="3">
                        <Form.Group controlId="formBasic.ControlSelect6">
                            <Form.Group controlId="formBasic.ControlSelect5">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={this.state.date}
                                    //maxDate = {this.state.date}
                                    onChange={this.props.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                                    </Grid></MuiPickersUtilsProvider>        
                            </Form.Group>      
                        </Form.Group>
                    </Col>
                <Col xs lg="3">
                    <Form.Group controlId="formBasic.ControlSelect6">
                        <Form.Group controlId="formBasic.ControlSelect5">
                            <Form.Label>Projects</Form.Label>
                            <Form.Control name = 'project' as="select" onChange = {(event) => this.handleChange(event)} value = {this.state.project}>
                                <option defaultValue>--Select--</option>
                                {this.state.allProjectName.map( data => {  
                                    return <option key = {data.id} value = {JSON.stringify(data)}>{data.name}</option>      
                                })}
                            </Form.Control>        
                        </Form.Group>      
                    </Form.Group>
                </Col>
                <Col xs lg="3">
                    <Form.Group controlId="formBasic.ControlSelect6">
                        <Form.Group controlId="formBasic.ControlSelect5">
                            <Form.Label>Roles</Form.Label>
                            <Form.Control name = 'role' as="select" onChange = {this.handleChange} value = {this.state.role} disabled = {this.state.isDisabled}>
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
                <Col xs lg="3">
                    <Form.Group controlId="formBasic.ControlSelect6">
                        <Form.Group controlId="formBasic.ControlSelect5">
                            <Form.Label>Types</Form.Label>
                            <Form.Control name = 'types' as="select" onChange = {this.handleChange} value = {this.state.types} >
                                <option defaultValue>--Select--</option>
                                <option value = 'jira'>JIRA</option>
                                <option value = "task">TASK</option>
                                <option value = "meeting">MEETING</option>
                                
                            </Form.Control>        
                        </Form.Group>     
                    </Form.Group>
                </Col>
                <Col xs lg="1">
                <Form.Group controlId="formBasic.ControlSelect6">
                    <Button variant="contained" onClick = {this.props.filterSaveClicked} color="primary" style = {{    marginTop: '26%'}}>
                        Filter
                    </Button>
                </Form.Group>
                    
                </Col>
            </Row>
        </React.Fragment>
        )
    }
}

export default FilterTimeSheet;