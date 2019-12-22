import React from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TableData from './../../../../components/UiElements/Table/Table';
import { getAllProjects, getRoleByProject } from './../../../../api/admin';
import Modal from './../../../../components/UiElements/Modal/Modal'
import { getPlannedEffortsByUser } from '../../../../api/user';
import './DailyTimeSheet.css'
import CloseIcon from '@material-ui/icons/Close';
//import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { dateFormatter } from '../../../../components/assets/DateFormatter';
import FilterTimeSheet from './FilterTimeSheet';
import ConfirmationMessage from '../../../../components/UiElements/ConfirmationMessage/ConfirmationMessage';


class DailyTimeSheet extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();    
    }

    getInitialState = (props) => {
        const initialState = {
            allProjectName: [],
            allRoleName: [],
            project: '',
            role: '',
            types: '',
            isDisabled: true,
            date: '',
            roleName: '',
            projectName: '',
            typeName: '',
            openForAdd: false,
            openForEdit: false,
            // ----For Table----- 
            tableData: [
                {
                    'tasks':"Test Test Test Test vTest Test",
                    'maintainance': 2,
                    'unittesting': 0,
                    'rework': 3,
                    'total': 5
                },
                {
                    'tasks':"Test Test Test Test Test Test Test Test Test Test vTest Test",
                    'maintainance': 2,
                    'unittesting': 0,
                    'rework': 3,
                    'total': 5
                },
                {
                    'tasks':"Test Test Test Test vTest Test",
                    'maintainance': 2,
                    'unittesting': 0,
                    'rework': 3,
                    'total': 5
                },
                {
                    'tasks':"Test Test Test Test Test Test Test Test vTest Test",
                    'maintainance': 2,
                    'unittesting': 0,
                    'rework': 3,
                    'total': 5
                },
            ],
            tableHeading: [
                "tasks", 
                "maintainance", 
                "unittesting",
                "rework",
                "total",
            ],
            filterOpen: false,
            date: new Date().toJSON().slice(0,10).replace(/-/g,'/')
        }
        return initialState;
    }

    componentDidMount() {
        //getAllProjects(this.postAllProjectName);
        let getToken;
		if (sessionStorage.getItem("access_token")) {
			getToken = JSON.parse(sessionStorage.getItem("access_token"));
			this.setState(
				{
					allProjectName: getToken.userDetails.project
				}
			);
		} else {
			alert("Login With Your Credentials!");
		}
    }

    postAllProjectName = (response) => {
        //console.log(response.data);
        this.setState({
            ...this.state,
            allProjectName: response.data
        })    
    }

    handleChange = (event) => {
        console.log(event.target.value)
        // let dropdownData = JSON.parse(event.target.value)
        event.preventDefault();
        const { name, value } = event.target;    
        switch (name) {
            case 'project':
                let projectData = JSON.parse(event.target.value)
                //getRoleByProject(this.postAllRolesName, projectData.id)
                this.setState({
                    ...this.state,
                    allRoleName: projectData.roles,
                    project: event.target.value,
                    projectName: projectData.name,
                    isDisabled: false
                })
                break;
            case 'role':
                let roleData = JSON.parse(event.target.value)
                // const roles = this.state.roleName;
                // roles[0] = roleData.name.toUpperCase();
                this.setState({
                    ...this.state,
                    role: event.target.value,
                    roleName: roleData.name,
                });
                //this.addTableData(this.state.projectName);
                break;
            case 'types':
                this.setState({
                    ...this.state,
                    types: event.target.value,
                })
            default:
                break;
        }
    
        this.setState({
            [name]: value
        });
    }

    postAllRolesName = (response) => {
        this.setState({
            ...this.state,
            allRoleName: response.data,
        })
    }
    
    // addTableData = (projectName) => {

    //     let userData = JSON.parse(sessionStorage.getItem('access_token'));
    //     let data = userData.userDetails
    //     console.log(data.username);
        
    //     getPlannedEffortsByUser(this.postFetchPlannedData, data.username, "gp", false)
    // }

    filterClicked = () => {
        this.setState({
            ...this.state,
            filterOpen: this.state.filterOpen ? false : true
        })
    }

    handleDateChange = (date) => {
        dateFormatter(this.getformattedDate,date)
    }

    getformattedDate = (formatDate) => {
        this.setState({
            ...this.state,
            date: formatDate
        })
    }

    filterSaveClicked = (event) => {
        event.preventDefault();
        const filter = {
            'date': this.state.date,
            'projects': this.state.projectName,
            'role': this.state.roleName,
            'type': this.state.types
        }

        console.log(filter);
        
        this.setState({
            ...this.state,
            tableView: true,
            tableHeadingDev: [
                'attendance',
                'analysis',
                'implementation',
                'rework',
                'review',
                'documentation',
                'testing',
                'kt',
                'others',
                'total',
                'notes'
            ],
            tableHeadingQA: [
                'attendance',
                'rework',
                'review',
                'documentation',
                'testing',
                'kt',
                'others',
                'total',
                'notes'
            ],
            tableData: [
                {
                    'attendance': "Full Day",
                    'rework': 1,
                    'review': 2,
                    'documentation': 0,
                    'testing': 3,
                    'kt': 2,
                    'others': 1,
                    'total': 9,
                    'notes': 'Test'
                },
                {
                    'attendance': "Full Day",
                    'rework': 1,
                    'review': 2,
                    'documentation': 0,
                    'testing': 3,
                    'kt': 2,
                    'others': 1,
                    'total': 9,
                    'notes': 'Test'
                },
                {
                    'attendance': "Full Day",
                    'rework': 1,
                    'review': 2,
                    'documentation': 0,
                    'testing': 3,
                    'kt': 2,
                    'others': 1,
                    'total': 9,
                    'notes': 'Test'
                },
                {
                    'attendance': "Full Day",
                    'rework': 1,
                    'review': 2,
                    'documentation': 0,
                    'testing': 3,
                    'kt': 2,
                    'others': 1,
                    'total': 9,
                    'notes': 'Test'
                },
                {
                    'attendance': "Full Day",
                    'rework': 1,
                    'review': 2,
                    'documentation': 0,
                    'testing': 3,
                    'kt': 2,
                    'others': 1,
                    'total': 9,
                    'notes': 'Test'
                },
            ]
        })
    }

    addNewRecordClicked = (event) => {
        event.preventDefault();
        this.setState ({
            ...this.state,
            openForAdd: true
        })
    }

    handleClose = () => {
        this.setState ({
            ...this.state,
            openForAdd: false
        })
    }

    render() {

        let inputs = []

        inputs.push(
            <FilterTimeSheet
                key = "FilterTimeSheet" 
                allProjectName = {this.state.allProjectName}
                allRoleName = {this.state.allRoleName}
                project = {this.state.project}
                role = {this.state.role}
                types = {this.state.type}
                isDisabled = {this.state.isDisabled}
                date = {this.state.date}
                roleName = {this.state.roleName}
                projectName = {this.state.projectName}
                typeName = {this.state.typeName}
                handleDateChange = {this.handleDateChange}
                handleChange = {this.handleChange}
                filterSaveClicked = {this.filterSaveClicked}
            />
        )

        return(
            <React.Fragment>
                
                <Paper className = "Filter-Form">
                    <Container maxWidth="lg" >
                        <div style = {{textAlign: 'center', fontSize: '17px', fontWeight: '700'}} >
                            {
                                this.state.filterOpen ? 
                                <div>
                                    <p style = {{color: '#2b1a6f'}}>Enter Details <CloseIcon style = {{float: 'right'}} onClick = {this.filterClicked} /></p>
                                    
                                </div> 
                                : 
                                <div><p onClick = {this.filterClicked} style = {{color: '#2b1a6f'}}>Click here to Filter</p></div>
                            }
                        </div>
                        {this.state.filterOpen ? inputs : <React.Fragment />}
                        
                    </Container>
                </Paper>
               {
                    this.state.tableView 
                    ? 
                    <Container maxWidth = 'lg'>
                        <div className = "Heading">
                            <p>Time Sheet <div style = {{float: 'right'}} onClick = {this.addNewRecordClicked} ><PostAddIcon style = {{float: 'right'}} titleAccess = "Add New Record" />Add New Record</div></p>
                        </div>
                        <Paper style = {{width: '95%', overflowX: 'auto',maxHeight: '60vh'}}>
                            <TableData 
                                tableHeading = {this.state.roleName === 'dev' ? this.state.tableHeadingDev : this.state.tableHeadingQA}
                                tableRows = {this.state.tableData}
                                isNoAction = {true}
                                isIndex = {true}
                                
                            />
                        </Paper>
                    </Container>
                    :
                    <React.Fragment />
                }
                
                {/* <Modal 
                    open = {this.state.openForEdit} 
                    handleClose = {this.handleCloseEdit} >
                        <ConfirmationMessage 
                            message = "Are you sure you want to deactivate the user"
                            primaryClicked = {this.primaryClicked}
                            secondaryClicked = {this.secondaryClicked} />
                </Modal> */}
                <Modal 
                    open = {this.state.openForAdd} 
                    handleClose = {this.handleClose} >
                        <ConfirmationMessage
                            message = "Are you sure you want to deactivate the user"
                            primaryClicked = {this.primaryClicked}
                            secondaryClicked = {this.secondaryClicked} />
                </Modal>
            </React.Fragment>
        )
    }
}

export default DailyTimeSheet;