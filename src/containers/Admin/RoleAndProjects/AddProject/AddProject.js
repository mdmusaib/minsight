import React from 'react';
import MuiContainer from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from '@material-ui/core/Select';
import { putUserDetails,updateProjectNameInUsers,deleteRoleById,updateRolesById,getRoleByProject, addProjects, editProjects } from '../../../../api/admin';
import './AddProject.css'



class AddProject extends React.Component {

    constructor(props){
        super(props)
        this.state = this.getInitialState(); 
    }

    getInitialState = (props) => {
        const initialState = {
            addRoles:false,
            modelProjectName:false,
            roleNameToDelete:true,
            listRoleNames: [],
            roleNames: [],
            projectName: '',
            projectDetails: this.props.projectDetails,
            updateProjectName:[],
        }
        return initialState;
    }

    componentDidMount () {
        if(this.props.isEdit) {
            getRoleByProject(this.postRoleDetails,this.state.projectDetails.id);
        }
    }
    
    postRoleDetails = (response) => {
        console.log(response)
        this.setState({
            ...this.state,
            listRoleNames: response.data
        })
        
    }

    resetRolesName=()=>{
        let roleNames=this.state.listRoleNames;
        if(roleNames.length === 1){
            deleteRoleById(this.deleteRole,roleNames.map(item=>item.id));
        }
        else{
            console.log("No roles are there!!!")
        }
    }

    handleChangeMultiple = (event) => {
        let roleName=JSON.parse(event.target.value);
        // console.log(roleName);
        deleteRoleById(this.deleteRole,roleName.id);

        let roleData = this.state.roleNames
        let index = ''
            if ((index = roleData.indexOf(event.target.value)) > -1) {
                roleData.splice(index, 1);
            } else {
                roleData.push(event.target.value);
            }
        this.setState({
            ...this.state,
            roleNames: roleData
        })
    }

    deleteRole=(response)=>{
        if(response.status === 200){
            console.log(response.data);
            this.setState({
                addRoles:false
            },() => {
                console.log('deleted!!!')
                this.componentDidMount();
            })
        }
    }

    handleChange = (event) => {
        if(this.state.projectDetails) {
            let data = {
                id: this.state.projectDetails.id,
                name: event.target.value
            }
    
            this.setState({
                projectDetails: data
            })
        } else {
            this.setState({
                ...this.state,
                projectName: event.target.value
            })
        }
        

    }

// add roles functionality
    handleAddRoleBtn=(event)=>{ 
        event.preventDefault();
        this.setState({
            addRoles:!this.state.addRoles
        })

    }

    handleAddRole=(event)=>{
        event.preventDefault();
        // alert(this.refs.adminRoleText.value);
        
        const filteredItem=this.state.listRoleNames.filter(data=>data.name === this.refs.adminRoleText.value);
        if(filteredItem.length>0){

        }else{
            
            
            // this.setState({
            //     listRoleNames:filteredItem.length >0?this.state.listRoleNames:[...this.state.listRoleNames,this.refs.adminRoleText.value],
            //     newRoleByAdmin:[...this.state.newRoleByAdmin,this.refs.adminRoleText.value]
            //   }, () => {
            //     console.log(this.state.listRoleNames);
            //   });
            this.props.isEdit ?
            this.postProject()
            
            :   
            addProjects(this.postProject, {
                name: this.state.projectName
            })     
        }
        
          
    }
    handleDeleteRole=(event)=>{
        
        this.setState({
            roleNameToDelete:!this.state.roleNameToDelete
        })
    }


    handleAllRole=(event)=>{
        event.preventDefault();
    }

    // handleSubmit = (event) => {
    //     event.preventDefault();
        
    //     editProjects(this.updateProjectName, this.state.projectDetails)


    // }
     handleSubmit = (event) => {
                event.preventDefault();
                this.props.isEdit ?
                    editProjects(this.updateProjectName, this.state.projectDetails)
                    :   
                    addProjects(this.postProject, {
                        name: this.state.projectName
                    })
                    this.componentDidMount();     
            } 
    

    updateProjectName=(response)=>{
        if(response.data !=null && response.status === 200){
            updateProjectNameInUsers(this.updateProjectNameInUsers,response.data)
         this.props.closeModal(false);   
        }
    }

    updateProjectNameInUsers=(response,projectID)=>{
        let arr=[];
        const filteredItem=response.data.filter((item=>{
            item.project.map((project)=>{
                if(project.id === projectID.id){
                    project.name=projectID.name;
                        
                }
            })
            arr.push(item);
            
        }));

        console.log(arr);
        
        arr.forEach(function(data,index){
            putUserDetails(data.id,data);
        });
        
        // const {updateProjectName} = this.state;   
        // updateProjectName.push(arr);
        // this.setState(updateProjectName);
    }



    postProject = () => {
        
        // console.log(response)
        if(this.state.projectDetails!=null){
            let data={
                "name":this.refs.adminRoleText.value,
                "projectId":this.state.projectDetails.id
            }
            updateRolesById(this.updateRolesById, data)

        }
        
    }

    updateRolesById=(response)=>{
        // this.props.closeModal(false);
        this.setState({
            addRoles:!this.state.addRoles
        })

        this.componentDidMount();
    }

    render() {
        const addRole = (
            this.props.isEdit ?
            <>
            <Col xs lg="8">
                <Form.Label>Role</Form.Label>
                    <Select
                        multiple
                        native
                        
                        disabled={this.state.roleNameToDelete}
                        onChange={this.handleChangeMultiple}
                        inputProps={{
                            id: 'select-multiple-native',
                        }}
                        className = 'Select-Roles'
                        value={this.state.listRoleNames.map(item=>JSON.stringify(item))}
                    >
                        <option defaultValue>___ROLES___</option>
                    {this.state.listRoleNames.map( data => (
                        <option key={data.id} value={JSON.stringify(data)}>
                        {data.name}
                    </option>
                    ))}
                </Select>     
            </Col>
            <Col xs md lg="2" >
            <Grid item md={1} style={{cursor:"pointer",marginRight:"-100%"}}>
                        <AddBoxOutlinedIcon  onClick={this.handleAddRoleBtn}/>
                        <DeleteOutlinedIcon  onClick={this.handleDeleteRole}/> 
                        <CachedOutlinedIcon onClick={this.resetRolesName}/> 
                        </Grid>
            </Col>
            </>
            :
            <React.Fragment></React.Fragment>
        );

        const addRoleByAdmin = (
            this.props.isEdit?
            <Col xs lg="8">
                {this.state.addRoles?
                <Form.Group controlId="formBasic.ControlSelect1">
                    
                                            <Form.Label>Role Name</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Role Name"
                                                name='roleName' 
                                                ref="adminRoleText"
                                                noValidate 

                                            />
                                <AddCircleOutlineSharpIcon style={{cursor:"pointer"}} onClick = {this.handleAddRole}/>
                    
                                        </Form.Group>
                                        :''}
            </Col>
            :
            <React.Fragment></React.Fragment>
        );

        return(
            <MuiContainer maxWidth="sm">
                    <div>
                        <p>{this.props.modalHeading}</p>
                    </div>
                        <Form>
                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col xs lg="8">
                                    {this.state.addRoles?
                                        <Form.Group controlId="formBasic.ControlSelect1">
                                            <Form.Label>Project Name</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                disabled
                                                placeholder="Project Name"
                                                name='projectName' 
                                                onChange = {this.handleChange} 
                                                noValidate 
                                                value = {this.state.projectDetails ? this.state.projectDetails.name : this.state.projectName}
                                            />
                                        </Form.Group>
                                        :  <Form.Group controlId="formBasic.ControlSelect1">
                                        <Form.Label>Project Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Project Name"
                                            name='projectName' 
                                            onChange = {this.handleChange} 
                                            noValidate 
                                            value = {this.state.projectDetails ? this.state.projectDetails.name : this.state.projectName}
                                        />
                                    </Form.Group>}
                                    </Col>
                                    {addRole}
                                    {addRoleByAdmin}
                                </Row>
                            </Container>
                            <div className="Add-Button">
                            {this.state.addRoles?
                                <Button variant="primary" style = {{margin : '5px'}} disabled type="submit">Update</Button>:
                                <Button variant="primary" style = {{margin : '5px'}} onClick = {this.handleSubmit} type="submit">Update</Button>}
                            </div> 
                        </Form>
                   
                </MuiContainer>
        )
    }
}

export default AddProject;