import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/form'
import DeleteIcon from '@material-ui/icons/Delete';
import { getAllProjects, getRoleByProject } from '../../../../api/admin';


class AddProjectAndRoles extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState(props);
    }

    getInitialState = (props) => {
        const initialState = {
            projectsList: [],
            roleList: [],
        }
        return initialState;
    }

    componentDidUpdate(prevProps) {
        if (this.props.projectNames !== prevProps.projectNames) {
            let data = JSON.parse(this.props.projectNames)
            getRoleByProject(this.postAllRolesName, data.id)
            console.log(data)
        }
      }

    componentDidMount () {
        getAllProjects(this.postProjectsDetails);
        // console.log('did project props===>',this.props.projectNames);
        // console.log(' did check,ckeck'); 
    }
    

    postProjectsDetails = (response) => {
        this.setState({
            projectsList: [].concat(response.data)
        })
    }

    handleChange = (event) => {
        switch( event.target.name ) {
        case 'project':
            let data = JSON.parse(event.target.value)
            this.props.addProjectHandler(event)
            getRoleByProject(this.postAllRolesName, data.id)
            break;

        case 'role' :
            this.props.addRolesHanlder(event);
            //this.roleAddFunction(event);
            break;
        default:
            break;
        }
    }

    postAllRolesName = (response) => {
        this.setState({
            roleList: [].concat(response.data)
        })
    }

    deleteProject = (event) => {
        this.props.deleteProject(event)
    }

    render() {
        
        return(
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <Form.Group controlId="formBasic.ControlSelect6">
                        <Form.Group controlId="formBasic.ControlSelect5">
                            <Form.Label>Projects</Form.Label>
                            <Form.Control name = 'project' as="select" onChange = {(event) => this.handleChange(event)} value = {this.props.projectNames}>
                                <option defaultValue>--Select--</option>
                                {this.state.projectsList.map( data => {  
                                    return <option key = {data.id} value = {JSON.stringify(data)}>{data.name}</option>      
                                })}
                            </Form.Control>        
                        </Form.Group>      
                    </Form.Group>
                </Col>
                <Col xs lg="5">
                    <Form.Group controlId="formBasic.ControlSelect6">
                        <Form.Group controlId="formBasic.ControlSelect5">
                            <Form.Label>Roles</Form.Label>
                            <Form.Control name = 'role' as="select" multiple onChange = {this.handleChange} value = {this.props.rolesValue}>
                                <option defaultValue>--Select--</option>
                                {this.state.roleList ?
                                    this.state.roleList.map( (data) => {
                                        return <option key = {data.id} value = {JSON.stringify(data)}>{data.name}</option>
                                    })
                                    :
                                        <React.Fragment />
                                }
                            </Form.Control>        
                        </Form.Group>     
                    </Form.Group>
                </Col>
                <Col xs lg = '1'>
                    <DeleteIcon onClick = {this.deleteProject} />     
                </Col>
            </Row>
        )
    }
}

export default AddProjectAndRoles