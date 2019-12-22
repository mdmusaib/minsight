import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import './ListRolesAndProject.css'
import Modal from './../../../../components/UiElements/Modal/Modal';
import TableData from './../../../../components/UiElements/Table/Table';
import AddProject from '../AddProject/AddProject';
import { getAllProjects } from '../../../../api/admin';

class ListRolesAndProject extends React.Component {

	constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = (props) => {
        const initialState = {
			tableHeading: ['name'],
			tableData: [
				{Project_Name: 'test 1', Roles_Assigned: 'test 11'},
				{Project_Name: 'test 2', Roles_Assigned: 'test 22'},
				{Project_Name: 'test 3', Roles_Assigned: 'test 33'},
				{Project_Name: 'test 4', Roles_Assigned: 'test 44'},

            ],
            openForEdit: false,
            openForAdd: false,
            projectName: '',
            rolesAssigned: [],
            projectDetails: [],
            projectData: []
        }
        return initialState;
    }

    componentDidMount() {
        getAllProjects(this.postAllProjectDetails)
    }

    postAllProjectDetails = (response) => {
        this.setState({
            ...this.state,
            projectData: response.data
        })
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            openForEdit: false,
            openForAdd: false
        })
    }

    closeModal = (action) => {
        this.setState({
            ...this.state,
            openForEdit: action,
            openForAdd: action
        })
        getAllProjects(this.postAllProjectDetails)
    }

    editClicked = (event, rowData) => {
        event.preventDefault();
        //console.log(rowData,'[[][]')
        this.setState({
            ...this.state,
            openForEdit: true,
            projectDetails: rowData 
        })
    }

    addNewProject = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            openForAdd: true,
        })
    }

    render() {
        
        return(
            <React.Fragment>
                <div className = "Table-Action">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        //className={classes.button}
                        onClick = {this.addNewProject}
                    >Add New Project</Button>
                </div>
                <Paper style = {{width: '95%', overflowX: 'auto', marginTop:'10vh'}}>
                    <TableData 
                        tableHeading = {this.state.tableHeading}
                        tableRows = {this.state.projectData}
                        isAction = {true}
                        editClicked = {this.editClicked}
                    />
                </Paper>
                <Modal 
                    open = {this.state.openForEdit}
                    handleClose = {this.handleClose}
                >
                    <AddProject
                        closeModal = {this.closeModal}
                        projectDetails = {this.state.projectDetails}
                        isEdit = {true}
                        modalHeading = 'Edit Project'
                    />
                </Modal>
                <Modal 
                    open = {this.state.openForAdd}
                    handleClose = {this.handleClose}
                >
                    <AddProject
                        closeModal = {this.closeModal}
                        modalHeading = 'Add Project'
                    />
                </Modal>
            </React.Fragment>
        );
    }
}

export default ListRolesAndProject