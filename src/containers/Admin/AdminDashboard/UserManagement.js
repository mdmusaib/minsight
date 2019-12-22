import React from 'react';
import Paper from '@material-ui/core/Paper';
import { getAllUsers, changeUserStatus } from './../../../api/admin'
import TableData from './../../../components/UiElements/Table/Table';
import Modal from './../../../components/UiElements/Modal/Modal'
import { getUserById } from './../../../api/admin';
import UserEdit from './UserEdit/UserEdit';
import EmailRegex from '../../../components/assets/EmailRegex'
import MuiContainer from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import AddProjectAndRoles from './UserEdit/AddProjectAndRoles';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/form'
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ConfirmationMessage from './../../../components/UiElements/ConfirmationMessage/ConfirmationMessage'


class UserManagement extends React.Component {

    constructor(props){
        super(props)
        this.textInput = React.createRef()
        this.state = this.getInitialState(); 
    }

    getInitialState = () => {
        const initialState = {
            tableHeading: ["username", "email", "projectName"],
            tableData: [],
            email: '',
            username: '',
            errors: {
                email: '',
                username: '',
            },
            openForEdit: false,
            projectNames: [],
            roleNames: [],
            userStatus: false,
            addProjectProperty: 1,
            projNamesForSave: [],
            roleNameForSave: [],
            userID: '',
            status: '',
            openForConfirmation: false
        }
        return initialState;
    }

    componentDidMount() {
        this.viewUserList()
    }

    viewUserList = () => {
        let getToken;
        if(sessionStorage.getItem('access_token')){
            getToken = JSON.parse(sessionStorage.getItem('access_token'));
            getAllUsers(this.postAllUserData,getToken.access_token)
        }   
    }

    postAllUserData = (response) => {
        console.log('response-->',response.data);
        
        this.setState({
            ...this.state,
            tableData: response.data,
        }); 
        this.getAllRolesAndProjects();
    }

    getAllRolesAndProjects = () => {
       this.state.tableData.map( (data, index) => {
            if(data.status === 'active') {
                this.setState({
                    ...this.state,
                    userStatus: true
                })
            } else {
                this.setState({
                    ...this.state,
                    userStatus: false
                }) 
            }
            this.getProjectNames(data,index);
            return 1;
        });
    }

    getRolesName = (data, index) => {
        let role = []
        let tableData = this.state.tableData
        if(data.roles !== undefined) {
            //console.log("data.roles",data.roles);
            
            data.roles.length === 0
            ? role.push(null)
            : data.roles.forEach( roleData => {
                role.push(roleData.name);
            }) 
            //console.log(role,'role,,,,')
            tableData.forEach((tableDetails, index1) => {  
                if(index === index1) {
                    tableDetails.roleName = role;  
                }
            })
            this.setState({
                ...this.state,
                tableData: tableData
            }) 
        }    
    }

    getProjectNames = (data, index) => {
        let project = []
        let tableData = this.state.tableData
        if(data.project !== undefined) {
            //console.log("data.roles",data.project);
            
            data.project.length === 0
            ? project.push(null)
            : data.project.forEach( projData => {
                project.push(projData.name);
                this.getRolesName(projData,index);
            }) 
            //console.log(project,'role,,,,')
            tableData.forEach((tableDetails, index1) => {  
                if(index === index1) {
                    tableDetails.projectName = project;  
                }
            }) 
            this.setState({
                ...this.state,
                tableData: tableData
            })
        }  
    }

    editClicked = (event, rowData) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            openForEdit: true,
            userID: rowData.id,
        })
        getUserById(this.postUserDataById, rowData.id);
    }

    postUserDataById = (response) => {
        //console.log('response==>',response.data)
        this.setState({
            ...this.state,
            email: response.data.email,
            status: response.data.status,
            username: response.data.username,
            addProjectProperty: response.data.project.length > 1 ? response.data.project.length : 1 
        })
        this.fetchProjectDetails(response);
        //this.fetchRoleDetails(response);
    }

    fetchProjectDetails = (response) => {
        let projectNameList = this.state.projectNames
        let projectNameListJSON = this.state.projNamesForSave
        let roleNameList = this.state.roleNames
        let roleNameListJSON = this.state.roleNameForSave
        response.data.project.map( (data, index) => {
            let details = []
            let detailsJSON = []
            data.roles.map( (roleData, roleIndex) => {
                details[roleIndex] = JSON.stringify({
                    id: roleData.id,
                    name: roleData.name,
                    projectId: roleData.projectId
                });
                detailsJSON[roleIndex] = {
                    id: roleData.id,
                    name: roleData.name,
                    projectId: roleData.projectId
                }
                return 1;
            })
            roleNameList[index] = details
            roleNameListJSON[index] = detailsJSON;

            projectNameList[index] = JSON.stringify({
                id: data.id,
                name: data.name,
            })
           
            projectNameListJSON[index] = {
                id: data.id,
                name: data.name,   
            } 
            return 1;   
        })
        // console.log('proj data=====>',projectNameList);
        // console.log('roles data=====>',roleNameList);
        this.setState({
            projectNames: projectNameList,
            roleNames: roleNameList,
            projNamesForSave: projectNameListJSON,
            roleNameForSave: roleNameListJSON
        })
        // console.log('proj data=====>',this.state.projectNameList);
        // console.log('roles data=====>',this.state.roleNames);
    }


    handleClose = () => {
        this.setState({
            ...this.state,
            openForEdit: false
        })
        this.viewUserList();
        this.setState(this.getInitialState())
    }

    handleCloseConfirmation = () => {
        this.setState({
            ...this.state,
            openForConfirmation: false
        })
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
            case 'employeeId':
                this.setState({
                    employeeId: event.target.value
                })
                errors.employeeId = 
                Number(value) < 1
                    ? 'Please enter employee id'
                    : '';
                break;
            case 'username':
                this.setState({
                    username: event.target.value
                })
                errors.username = 
                value.length < 3 
                    ? 'Username must be 4 characters long!'
                    : '';
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value});
    }

    handleSubmit = (event) => {
        //console.log(this.state.projNamesForSave,'data===>');
        this.state.projNamesForSave.map(( data, index )=> {
            return data.roles = this.state.roleNameForSave[index]
        })

        const data = {
            username: this.state.username,
            email: this.state.email,
            project: this.state.projNamesForSave
        }
        //console.log(data,'data===>');
        changeUserStatus(this.postUserUpdate, this.state.username, data)
    }

    postUserUpdate = (response) => {
        this.viewUserList()
    }

    statusChanged = (event, rowData) => {
        if(rowData.status === 'active') {
            changeUserStatus(this.postUserStatusChange, rowData.username, {"status": 'inactive'})
        } else {
            changeUserStatus(this.postUserStatusChange, rowData.username, {"status": 'active'})
        }
    }

    addNewProjectClicked = () => {
        this.setState({
            ...this.state,
            addProjectProperty: this.state.addProjectProperty + Number(1)
        })
    }

    removeNewProjectClicked = () => {
        this.setState({
            ...this.state,
            addProjectProperty: this.state.addProjectProperty - Number(1)
        })
    }

    addProjectHandler = (event, index) => {
        let selectedProject = this.state.projectNames;
        let projNamesForSave = this.state.projNamesForSave;
        let Index = selectedProject.findIndex( obj => obj === event.target.value)
        if(Index > -1) {
            alert("SORRY!!..You cannot select same project twice.!!")
            this.removeNewProjectClicked()
        } else {
            selectedProject[index] = event.target.value;
            projNamesForSave[index] = JSON.parse(event.target.value);
            this.setState({
                projectNames: selectedProject,
                projNamesForSave: projNamesForSave
            })
        }
       
    }

    addRolesHandler = (event, index) => {
        //console.log(JSON.parse(event.target.value).id);
        
        
        let selectedRoles = this.state.roleNames[index];
        let roleDetails = this.state.roleNames;

        let selectedRolesForSave = this.state.roleNameForSave[index]
        let roleNameForSave = this.state.roleNameForSave

        
        if(!selectedRoles) {
            selectedRoles = []
        }
        if(!selectedRolesForSave) {
            selectedRolesForSave = []
        }
        //console.log(JSON.parse(event.target.value),'..........',selectedRoles)

        let Index = selectedRoles.findIndex( obj => obj === event.target.value)
        //console.log('Index--->', Index);
        
        if(Index > -1) {
            selectedRoles.splice(Index, 1);
            selectedRolesForSave.splice(Index, 1);
            if(!roleDetails) {
                roleDetails = []
            }
            if(!roleNameForSave) {
                roleNameForSave = []
            }
            roleDetails[index] = selectedRoles
            roleNameForSave[index] = selectedRolesForSave 
            this.setState({
                roleNames: roleDetails,
                roleNameForSave: roleNameForSave
            })
        } else {
            selectedRoles.push(event.target.value);
            selectedRolesForSave.push(JSON.parse(event.target.value));
            if(!roleDetails) {
                roleDetails = []
            }
            if(!roleNameForSave) {
                roleNameForSave = []
            }

            roleDetails[index] = selectedRoles
            roleNameForSave[index] = selectedRolesForSave
            this.setState({
                roleNames: roleDetails,
                roleNameForSave: roleNameForSave
            })
        }
    }

    deactivateUser = () => {
        this.setState({
            ...this.state,
            openForConfirmation: true
        })
        
    }

    primaryClicked = (event) => {
        event.preventDefault();
        changeUserStatus(this.postUserStatusChange, this.state.username, {"status": 'deactivate'})
    }

    secondaryClicked = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            openForConfirmation: false
        })
    }

    postUserStatusChange = (response) => {
        this.setState({
            ...this.state,
            openForConfirmation: false,
            openForEdit: false
        })
        this.viewUserList()
    }

    deleteProject = (event, index) => {
        let addProjectProperty = this.state.addProjectProperty
        let roles = this.state.roleNames;
        let projects = this.state.projectNames;
        let rolesSave = this.state.roleNameForSave;
        let projectsSave = this.state.projNamesForSave
        console.log(roles, 'in delete before',index);

        roles.splice(index, 1);
        projects.splice(index, 1)
        rolesSave.splice(index, 1)
        projectsSave.splice(index, 1)
        this.setState({
            ...this.state,
            roleNames: roles,
            projectNames: projects,
            projNamesForSave: projectsSave,
            roleNameForSave: rolesSave,
            addProjectProperty: Number(addProjectProperty) - Number(1)
        })
        console.log(roles, 'in delete after',index);
    }

    render() {

        let inputs = []

        inputs.push(
            <UserEdit
                key = 'userForm'
                handleChange = {this.handleChange}
                errors = {this.state.errors}
                email = {this.state.email}
                username = {this.state.username}
            />
        );

        for(let index = 0; index < this.state.addProjectProperty; index++) {
            inputs.push(
                <AddProjectAndRoles 
                    key = {index}
                    addProjectHandler = {(event) => this.addProjectHandler(event,index)}
                    addRolesHanlder = {(event) => this.addRolesHandler(event,index)}
                    rolesValue = {this.state.roleNames[index]}
                    projectNames = {this.state.projectNames[index]}
                    deleteProject = {(event) => this.deleteProject(event, index)}
                />
            );
        }
        


        return(
            <React.Fragment>
                <Paper style = {{width: '95%', overflowX: 'auto', marginTop:'10vh'}}>
                    <TableData 
                        tableHeading = {this.state.tableHeading}
                        tableRows = {this.state.tableData}
                        isAction = {true}
                        editClicked = {this.editClicked}
                        isArray = {true}
                        isStatus = {true}
                        statusChanged = {this.statusChanged}
                    />
                </Paper>
                {/* <UserEdit /> */}
                <Modal 
                    open = {this.state.openForEdit}
                    handleClose = {this.handleClose}
                    FormatModal = {true}>
                    <MuiContainer maxWidth="md" style = {{ height: '60vh',overflow: 'auto' }}>
                        <div style = {{display: 'flex'}}>
                            <p style = {{ width: '22%' }}>Enter Your Details</p>
                            <FormControlLabel
                                value = {this.state.status !== 'deactivate' ? 'Want to Deactivate?' : 'Deactivate'}
                                control = {
                                    <Switch
                                        checked = {this.state.status !== 'deactivate' ? false : true}
                                        onChange = {this.deactivateUser}
                                        value = {this.state.status !== 'deactivate' ? false : true}
                                        color = "primary"
                                        inputProps = {{ 'aria-label': 'primary checkbox' }}
                                    />
                                }
                                label = {this.state.status !== 'deactivate' ? 'Want to Deactivate?' : 'Deactivate'}
                                labelPlacement = "end"
                            />
                        </div>
                        <Grid container spacing={0} className = "UserEdit-Form-Body">
                            <Form>
                                <Container>
                                {inputs}
                                </Container>
                            </Form>
                            
                        </Grid>
                        
                    </MuiContainer>
                    <Container style = {{display: 'inline-flex'}}>
                        <AddCircleOutlineSharpIcon onClick = {this.addNewProjectClicked} />
                        <p>Add Project</p>
                    </Container>
                    <Button onClick = {this.handleSubmit} style = {{ position:'absolute', right: '15%'}}>Save</Button>
                </Modal>
                <Modal 
                    open = {this.state.openForConfirmation} 
                    handleClose = {this.handleCloseConfirmation} >
                        <ConfirmationMessage 
                            message = "Are you sure you want to deactivate the user"
                            primaryClicked = {this.primaryClicked}
                            secondaryClicked = {this.secondaryClicked} />
                </Modal>
            </React.Fragment>
            
        )
    }
}

export default UserManagement;