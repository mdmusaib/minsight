import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TableData from './../../../../components/UiElements/Table/Table';
import Form from 'react-bootstrap/form'
import { getAllProjects, getRoleByProject } from './../../../../api/admin';
import Modal from './../../../../components/UiElements/Modal/Modal'
import { getPlannedEffortsByUser, getActualEffortsByUser } from '../../../../api/user';

class ActualEfforts extends React.Component {

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
            isDisabled: true,
            
            roleName: '',
            projectName: '',
            // ----For Table----- 
            tableHeadingQA: [],
            tableHeadingDev: [],
            tableDataDev: [],
            tableDataQA: [],
            // tableHeadingDev: [
            //     "Retrieving data. Wait a few seconds and try to cut or copy again.", 
            //     "FIXING / IMPLEMENTING(Hours)", 
            //     "KT(Hours)",
            //     "CODE REVIEW(Hours)",
            //     "REWORK(Hours)",
            //     "START DATE(dd-mmm-yy)",
            //     "END DATE(dd-mmm-yy)",
            //     "TOTAL HOURS"
            // ],
            
            // tableHeadingQA: [
            //     "TEST CASE PREP(Hours)",
            //     "TESTING(Hours)",
            //     "RE TESTING(Hours)",
            //     "KT(Hours)",
            //     "START DATE(dd-mmm-yy)",
            //     "END DATE(dd-mmm-yy)",
            //     "RE OPENED DATE(dd-mmm-yy)",
            //     "QA COMPLETE   DATE(dd-mmm-yy)",
            //     "UAT COMPLETE DATE(dd-mmm-yy)",
            //     "PROD COMPLETE  DATE(dd-mmmyy)",
            //     "TOTAL HOURS"
            // ],
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
            this.setState({
                allProjectName:getToken.userDetails.project
            },()=>console.log(this.state.allProjectName))
        }       
        else{
            alert('Login With Your Credentials!');
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
        let dropdownData = JSON.parse(event.target.value)
        event.preventDefault();
        const { name, value } = event.target;    
        switch (name) {
            case 'project':
                let data = JSON.parse(event.target.value)
                console.log(data)
                
                this.setState({
                    ...this.state,
                    allRoleName:data.roles,
                    project: event.target.value,
                    projectName: dropdownData.name,
                    isDisabled: false
                },()=>console.log(this.state.allRoleName))
                break;
            case 'role':
                    // this.state.allProjectName.map(item=>{
                    //     item.roles
                    // })
                this.setState({
                    ...this.state,
                    role: event.target.value,
                    roleName: dropdownData.name
                })
                this.addTableData(this.state.projectName);
                break;
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
    
    addTableData = (projectName) => {

        let userData = JSON.parse(sessionStorage.getItem('access_token'));
        let data = userData.userDetails
        console.log(data.username);
        
        getActualEffortsByUser(this.postFetchPlannedData, data.username, "gp", false)
    }

    postFetchPlannedData = (response) => {
        let tableDataDev = this.state.tableDataDev;
        let tableDataQA = this.state.tableDataQA;
        this.setState({
            tableHeadingDev: [
                "jiraNo",
                "analysisAndDocumentation",
                "implementation",
                "kt",
                "codeReview",
                "rework",
                "startDate",
                "endDate",
                "totalHours"
            ],
            tableHeadingQA: [
                "jiraNo",
                "testCasePrep",
                "testing",
                "reTesting",
                "kt",
                "startDate",
                "endDate",
                "reOpenedDate" ,
                "qaCompleteDate",
                "uatCompleteDate",
                "prodCompleteDate",
                "totalHours"
            ],
        })
        console.log(response.data.actualEfforts);
        response.data.actualEfforts.map((data, index) => {
            console.log(data.devEffort,'.....');
            tableDataDev.push(data.devEffort)
            tableDataQA.push(data.qaEffort)
            this.setState({
                tableDataDev: tableDataDev,
                tableDataQA: tableDataQA,
            });
        });
        this.addJiraNumber(response);
    }

    addJiraNumber = (response) => {
        let tableDataDev = this.state.tableDataDev;
        let tableDataQA = this.state.tableDataQA;
        tableDataDev.forEach((data, index) => {
            response.data.plndEfforts.map((dataPl, index1) => {
                if(index === index1) {
                    data.jiraNo = dataPl.jiraNo 
                }
            })
        })
        tableDataQA.forEach((data, index) => {
            response.data.plndEfforts.map((dataPl, index1) => {
                if(index === index1) {
                    data.jiraNo = dataPl.jiraNo 
                }
            })
        })
        this.setState({
            tableDataDev: tableDataDev,
            tableDataQA: tableDataQA
        })
    }


    editClicked = (event, index) => {
        
    }

    render() {
        return(
            <React.Fragment>
                
                <Container maxWidth="sm" style = {{marginTop: '1vh'}}>
                    <div style = {{textAlign: 'center', fontSize: '17px', fontWeight: '700'}}>
                        <p>Actual Efforts</p>
                    </div>
                    <hr></hr>
                    <Row className="justify-content-md-center">
                    <Col xs lg="4">
                        <Form.Group controlId="formBasic.ControlSelect6">
                            <Form.Group controlId="formBasic.ControlSelect5">
                                <Form.Label>Projects</Form.Label>
                                <Form.Control size = 'sm' name = 'project' as="select" onChange = {(event) => this.handleChange(event)} value = {this.state.project}>
                                    <option defaultValue>--Select--</option>
                                    {this.state.allProjectName.map( data => {  
                                        return <option key = {data.id} value = {JSON.stringify(data)}>{data.name}</option>      
                                    })}
                                </Form.Control>        
                            </Form.Group>      
                        </Form.Group>
                    </Col>
                    <Col xs lg="4">
                        <Form.Group controlId="formBasic.ControlSelect6">
                            <Form.Group controlId="formBasic.ControlSelect5">
                                <Form.Label>Roles</Form.Label>
                                <Form.Control size = 'sm' name = 'role' as="select" onChange = {this.handleChange} value = {this.state.role} disabled = {this.state.isDisabled}>
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
                   
                <Container maxWidth = 'lg' style = {{ padding: '0'}}>
                    <Paper style = {{overflowX: 'auto',maxHeight: '60vh'}}>
                        <TableData 
                            tableHeading = {this.state.roleName === 'Developer' ? this.state.tableHeadingDev : this.state.tableHeadingQA}
                            tableRows = {this.state.roleName === 'Developer' ? this.state.tableDataDev : this.state.tableDataQA}
                            isIndex = {this.state.roleName ? true : false}
                            isNoAction = {this.state.roleName ? true : false}
                            
                        />
                    </Paper>
                </Container>
                {/* <Modal 
                    open = {this.state.openForEdit} 
                    handleClose = {this.handleCloseEdit} >
                        <ConfirmationMessage 
                            message = "Are you sure you want to deactivate the user"
                            primaryClicked = {this.primaryClicked}
                            secondaryClicked = {this.secondaryClicked} />
                </Modal>
                <Modal 
                    open = {this.state.openForAdd} 
                    handleClose = {this.handleCloseAdd} >
                        <ConfirmationMessage 
                            message = "Are you sure you want to deactivate the user"
                            primaryClicked = {this.primaryClicked}
                            secondaryClicked = {this.secondaryClicked} />
                </Modal> */}
            </React.Fragment>
        )
    }
}

export default ActualEfforts;