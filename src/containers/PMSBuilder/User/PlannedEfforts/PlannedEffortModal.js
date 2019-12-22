import React, { Component } from "react";
import MuiContainer from "@material-ui/core/Container";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./PlannedEfforts.css";
import { Paper } from "@material-ui/core";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { TimePicker} from '@progress/kendo-react-dateinputs'
import '@progress/kendo-react-intl'
const format = 'HH:mm';
class PlannedEffortModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listRoleNames: [],
			roleNames: [],
			projectName: "",
			selectedDate: new Date("2014-08-18T21:11:54")
		};
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});

		this.props.editedRow[0][event.target.name] = Number(event.target.value);
	};

	handleChangeDate=(event)=>{
		let filterTime=new Date(event.target.value);
		let hrs=filterTime.getHours();
		let mins=filterTime.getMinutes();
		let convertHrToMins=parseInt(hrs)*60+parseInt(mins);
		console.log(convertHrToMins/60)
		this.props.editedRow[0][event.target.name] = convertHrToMins;
		
	}

	onDateChange = (date, label) => {
		this.setState({ selectedDate: date });
		this.props.editedRow[0][label] = moment(date).format("YYYY-MM-DD");
	};

	render() {		
		//console.log(this.props.modalHeading[0]['jiraNo']);
		
		return (
			<MuiContainer maxWidth="lg" style = {{padding: 0}}>
				<div className="modal-heading">
					<p>{this.props.modalHeading}{this.props.editedRow[0]['jira_task_no']}</p>
				</div>
				<Form className="form-container">
					<Paper style = {{boxShadow: 'none'}}>
						<Container className="modal-container">
							<Row className="form-layout">
								
									{this.props.tableHeading.map((label, index) => (
										<Col xs lg="4">
										<Form.Group
											controlId="formBasic.ControlSelect1"
											border
											key={index}
											className="label"
										>
											<Form.Label>
												{label === "totalHours" ? "" : label}
											</Form.Label>
											{label.includes("Date") ? (
												<MuiPickersUtilsProvider utils={DateFnsUtils}>
													<Grid container justify="space-around">
														<KeyboardDatePicker
															format="dd/MM/yyyy"
															margin="normal"
															id="date-picker-dialog"
															value={
																new Date(this.props.editedRow[0][label]) ||
																this.state.selectedDate
															}
															onChange={date => this.onDateChange(date, label)}
															KeyboardButtonProps={{
																"aria-label": "change date"
															}}
														/>
													</Grid>
												</MuiPickersUtilsProvider>
											) : label === "totalHours" ? (
												<React.Fragment></React.Fragment>
											) : label === "#" || label === "jira_task_no" ?
											
											<Form.Control
													type="text"
													placeholder={label}
													className="input-field"
													name={label}
													disabled={
														label === "#" || label === "jira_task_no" ? true : false
													}
													onChange={this.handleChange}
													value={this.props.editedRow[0][label]}
													noValidate
												/>:
											(
												<TimePicker
												formatPlaceholder={{ hour: 'h', minute: 'm' }}
												format= "HH:mm"
												name={label}
												  onChange={this.handleChangeDate}
											  />
												
											)}


										</Form.Group>
										</Col>
									))}
								
							</Row>
						</Container>
					</Paper>
					<div className="button-container">
						<div className="Add-Button">
							<Button
								variant="primary"
								style={{ margin: "5px" }}
								onClick={this.props.handleClose}
								type="submit"
							>
								Close
							</Button>
						</div>
						<div className="Add-Button">
							<Button
								variant={this.props.backBtnDisable ? "secondary" : "primary"}
								style={{ margin: "5px" }}
								onClick={this.props.renderPreviousRow}
								type="back"
								disabled={this.props.backBtnDisable}
							>
								Back
							</Button>
							<Button
								variant={this.props.nextBtnDisable ? "secondary" : "primary"}
								style={{ margin: "5px" }}
								onClick={this.props.renderNextRow}
								type="next"
								disabled={this.props.nextBtnDisable}
							>
								Next
							</Button>
						</div>
					</div>
				</Form>
			</MuiContainer>
		);
	}
}

export default PlannedEffortModal;
