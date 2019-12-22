import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TableData from "./../../../../components/UiElements/Table/Table";
import Form from "react-bootstrap/form";
import { getAllProjects, getRoleByProject } from "./../../../../api/admin";
import Modal from "./../../../../components/UiElements/Modal/Modal";
import {
	getPlannedEffortsByUser,
	updatePlannedEffort,
	getReleaseDetails
} from "../../../../api/user";
import Button from "@material-ui/core/Button";
import PlannedEffortModal from "./PlannedEffortModal";
import "./PlannedEfforts.css";

class PlannedEfforts extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState = props => {
		const initialState = {
			allProjectName: [],
			allRoleName: [],
			allReleaseName:[],
			project: "",
			role: "",
			release:"",
			isDisabled: true,
			id: [],
			roleName: "",
			userRoles: [],
			finalResult: [],
			projectName: "",
			// ----For Table-----
			tableHeadingQA: [],
			tableHeadingDev: [],
			tableDataDev: [],
			tableDataQA: [],
			backBtnDisable: false,
			nextBtnDisable: false,
			plannedEffortData: [],
			openForEdit: false
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
		};
		return initialState;
	};

	componentDidMount() {
		this.viewUserList();
	}

	viewUserList = () => {
		let getToken;
		if (sessionStorage.getItem("access_token")) {
			getToken = JSON.parse(sessionStorage.getItem("access_token"));
			this.setState(
				{
					allProjectName: getToken.userDetails.project
				},
				() => console.log(this.state.allProjectName)
			);

				// release no  api
				getReleaseDetails(this.handleRelaseApi);
				

		} else {
			alert("Login With Your Credentials!");
		}
	};

	// postAllProjectName = response => {
	// 	this.setState({
	// 		...this.state,
	// 		allProjectName: response.data
	// 	});
	// };

	handleRelaseApi=(response)=>{
		if(response.data.sprintsByBoard){
			this.setState({
				allReleaseName:response.data.sprintsByBoard,
			},()=>console.log(response.data.sprintsByBoard))
		}
	}

	handleChange = event => {
		let dropdownData = JSON.parse(event.target.value);
		event.preventDefault();
		const { name, value } = event.target;
		switch (name) {
			case "project":
				let data = JSON.parse(event.target.value);
				// getRoleByProject(this.postAllRolesName, data.id);
				this.setState({
					...this.state,
					allRoleName: data.roles,
					project: event.target.value,
					projectName: dropdownData.name,
					isDisabled: false
				});
				break;
			case "role":
				const roles = this.state.userRoles;
				roles[0] = dropdownData.name.toUpperCase();
				this.setState({
					...this.state,
					role: event.target.value,
					roleName: dropdownData.name,
					userRoles: roles
				});
				break;
			default:
				break;
		}

		this.setState({
			[name]: value
		});
	};
	handleChangeRelase=(event)=>{
		console.log(event.target.value);
				this.addTableData(this.state.projectName,event.target.value);
	}
	postAllRolesName = response => {
		this.setState({
			...this.state,
			allRoleName: response.data
		});
	};

	addTableData = (projectName,release) => {
		let userData = JSON.parse(sessionStorage.getItem("access_token"));
		let data = userData.userDetails;
		console.log(data.username);

		getPlannedEffortsByUser(
			this.postFetchPlannedData,
			data.username,
			projectName,
			JSON.parse(this.state.role).name,
			release
		);
	};

	postFetchPlannedData = response => {
		let tableDataDev = this.state.tableDataDev;
		let tableDataQA = this.state.tableDataQA;
		let plannedData = this.state.plannedEffortData;
		this.setState({
			tableHeadingDev: [
				"#",
				"jira_task_no",
				"analysisAndDocumentation",
				"implementation",
				"kt",
				"codeReview",
				"rework",
				"startDate",
				"endDate",
				"unitTest",
				"totalHours"
			],
			tableHeadingQA: [
				"#",
				"jira_task_no",
				"testCasePrep",
				"testing",
				"reTesting",
				"kt",
				"startDate",
				"endDate",
				"reOpenedDate",
				"qaCompleteDate",
				"uatCompleteDate",
				"prodCompleteDate",
				"totalHours"
			]
		});
		tableDataDev = [];
		tableDataQA = [];
		console.log(response.data.plndEfforts);
		response.data.plndEfforts.map((data, index) => {
			data.devEffort["#"] = index + 1;
			data.qaEffort["#"] = index + 1;
			data["userroles"] = this.state.userRoles;
			plannedData.push(data);
			tableDataDev.push(data.devEffort);
			tableDataQA.push(data.qaEffort);
			this.setState({
				plannedEffortData: plannedData,
				tableDataDev: tableDataDev,
				tableDataQA: tableDataQA
			});
		});
		this.addJiraNumber(response);
	};

	addJiraNumber = response => {
		let tableDataDev = this.state.tableDataDev;
		let tableDataQA = this.state.tableDataQA;
		tableDataDev.forEach((data, index) => {
			response.data.plndEfforts.map((dataPl, index1) => {
				if (index === index1) {
					data.jira_task_no = dataPl.jira_task_no;
				}
			});
		});
		tableDataQA.forEach((data, index) => {
			response.data.plndEfforts.map((dataPl, index1) => {
				if (index === index1) {
					data.jira_task_no = dataPl.jira_task_no;
				}
			});
		});
		this.setState({
			tableDataDev: tableDataDev,
			tableDataQA: tableDataQA
		});
	};

	editClicked = (event, rowId) => {
		event.preventDefault();
		const row =
			this.state.roleName === "dev"
				? this.state.tableDataDev.filter(data => data.jira_task_no === rowId.jira_task_no)
				: this.state.tableDataQA.filter(data => data.jira_task_no === rowId.jira_task_no);
		if (
			this.state.tableDataDev.length + 1 !== row[0]["#"] ||
			this.state.tableDataQA.length + 1 !== row[0]["#"]
		) {
			this.setState({ backBtnDisable: false, nextBtnDisable: false });
		}
		this.setState({
			openForEdit: true,
			editedRow: row
		});
		console.log('========',row);
		
	};

	handleClose = () => {
		this.setState({
			openForEdit: false
		});
	};

	renderNextRow = event => {
		event.preventDefault();
		let id = this.state.editedRow[0]["#"];
		let rowId = ++id;
		const nextData =
			this.state.roleName === "dev"
				? this.state.tableDataDev.filter(data => parseInt(data["#"]) === rowId)
				: this.state.tableDataQA.filter(data => parseInt(data["#"]) === rowId);
		if (
			this.state.tableDataDev.length + 1 === rowId ||
			this.state.tableDataQA.length + 1 === rowId
		) {
			return this.setState({ nextBtnDisable: true });
		}
		this.setState({ editedRow: nextData });
	};

	renderPreviousRow = event => {
		event.preventDefault();
		let id = this.state.editedRow[0]["#"];
		--id;
		const previousData =
			this.state.roleName === "dev"
				? this.state.tableDataDev.filter(data => parseInt(data["#"]) === id)
				: this.state.tableDataQA.filter(data => parseInt(data["#"]) === id);
		if (id === 0) {
			return this.setState({ backBtnDisable: true });
		}
		this.setState({ editedRow: previousData, nextBtnDisable: false });
	};

	saveTable = event => {
		event.preventDefault();
		const savedData = this.state.finalResult;
		const finalData = this.state.plannedEffortData;
		let plannedEffortObj = this.state.plannedEffortObject;
		finalData.map(data => {
			plannedEffortObj = {
				userroles: this.state.userRoles,
				projectKey: data.projectKey
			};

			this.state.roleName === "dev"
				? savedData.push({
						jira_task_no: data.jira_task_no,
						plandEffortId: data.id,
						devEffort: {
							jira_task_no: data.jira_task_no,
							analysisAndDocumentation:
								data.devEffort["analysisAndDocumentation"],
							implementation: data.devEffort["implementation"],
							unitTest: data.devEffort["unitTest"],
							kt: data.devEffort["kt"],
							codeReview: data.devEffort["codeReview"],
							rework: data.devEffort["rework"],
							startDate: data.devEffort["startDate"],
							endDate: data.devEffort["endDate"]
						},
						qaEffort: {}
				  })
				: savedData.push({
						jira_task_no: data.jira_task_no,
						plandEffortId: data.id,
						devEffort: {},
						qaEffort: {
							jira_task_no: data.jira_task_no,
							testCasePrep: data.qaEffort["testCasePrep"],
							testing: data.qaEffort["testing"],
							reTesting: data.qaEffort["reTesting"],
							kt: data.qaEffort["kt"],
							startDate: data.qaEffort["startDate"],
							endDate: data.qaEffort["endDate"],
							reOpenedDate: data.qaEffort["reOpenedDate"],
							qaCompleteDate: data.qaEffort["qaCompleteDate"],
							uatCompleteDate: data.qaEffort["uatCompleteDate"],
							prodCompleteDate: data.qaEffort["prodCompleteDate"]
						}
				  });
		});
		plannedEffortObj["effortsByJira"] = savedData;
		updatePlannedEffort(this.updatedData, plannedEffortObj);
		this.setState({ updatePlannedEffortData: plannedEffortObj });
		console.log(plannedEffortObj, "final");
	};

	updatedData = response => {
		console.log(response, "final response");
	};

	render() {
		return (
			<React.Fragment>
				
				<Container maxWidth="sm" style={{ marginTop: "1vh" }}>
					<div style={{ textAlign: "center", fontSize: "17px", fontWeight: "700" }}>
						<p>Planned Efforts</p>
					</div>
					<hr></hr>
					<Row className="justify-content-md-center">
						<Col xs lg="4">
							<Form.Group controlId="formBasic.ControlSelect6">
								<Form.Group controlId="formBasic.ControlSelect5">
									<Form.Label>Projects</Form.Label>
									<Form.Control
										name="project"
										as="select"
										onChange={event => this.handleChange(event)}
										value={this.state.project}
										size = 'sm'
									>
										<option defaultValue>--Select--</option>
										{this.state.allProjectName.map(data => {
											return (
												<option key={data.id} value={JSON.stringify(data)}>
													{data.name}
												</option>
											);
										})}
									</Form.Control>
								</Form.Group>
							</Form.Group>
						</Col>
						<Col xs lg="4">
							<Form.Group controlId="formBasic.ControlSelect6">
								<Form.Group controlId="formBasic.ControlSelect5">
									<Form.Label>Roles</Form.Label>
									<Form.Control
										name="role"
										as="select"
										onChange={this.handleChange}
										disabled={this.state.isDisabled}
										size = 'sm'
									>
										<option defaultValue>--Select--</option>
										{this.state.allRoleName ? (
											this.state.allRoleName.map(data => {
												return (
													<option key={data.id} value={JSON.stringify(data)}>
														{data.name}
													</option>
												);
											})
										) : (
											<React.Fragment />
										)}
									</Form.Control>
								</Form.Group>
							</Form.Group>
						</Col>
					{/* release dropdown */}
					<Col xs lg="4">
							<Form.Group controlId="formBasic.ControlSelect6">
								<Form.Group controlId="formBasic.ControlSelect5">
									<Form.Label>Release</Form.Label>
									<Form.Control
										name="release"
										as="select"
										onChange={event => this.handleChangeRelase(event)}
										size = 'sm'
										value={this.state.release}
										disabled={this.state.isDisabled}
									>
										<option defaultValue>--Select--</option>
										{this.state.allReleaseName.map(data => {
											return (
												<option key={data} value={data}>
													{data}
												</option>
											);
										})}
									</Form.Control>
								</Form.Group>
							</Form.Group>
						</Col>
					</Row>
				</Container>
				
				<Container maxWidth="lg" style = {{ padding: '0'}}>
					<Paper style={{ overflowX: "auto", maxHeight: "60vh" }}>
						<TableData
							tableHeading={
								this.state.roleName === "dev"
									? this.state.tableHeadingDev
									: this.state.tableHeadingQA
							}
							tableRows={
								this.state.roleName === "dev"
									? this.state.tableDataDev
									: this.state.tableDataQA
							}
							isAction={this.state.roleName ? true : false}
							editClicked={this.editClicked}
							isIndex={this.state.roleName ? true : false}
						/>
					</Paper>
					<div className="update-btn">
						<Button
							variant="contained"
							color="primary"
							style={{ margin: "5px" }}
							onClick={this.saveTable}
							type="submit"
						>
							Save All
						</Button>
					</div>
				</Container>
				<Modal open={this.state.openForEdit} handleClose={this.handleClose} FormatModal = "Format-Modal">  
					<PlannedEffortModal
						modalHeading = "Edit -> "
						handleClose={this.handleClose}
						tableHeading={
							this.state.roleName === "dev"
								? this.state.tableHeadingDev
								: this.state.tableHeadingQA
						}
						tableRows={
							this.state.roleName === "dev"
								? this.state.tableDataDev
								: this.state.tableDataQA
						}
						editedRow={this.state.editedRow}
						renderNextRow={this.renderNextRow}
						renderPreviousRow={this.renderPreviousRow}
						backBtnDisable={this.state.backBtnDisable}
						nextBtnDisable={this.state.nextBtnDisable}
					/>
				</Modal>
				
			</React.Fragment>
		);
	}
}

export default PlannedEfforts;
