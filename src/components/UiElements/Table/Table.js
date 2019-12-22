import React from "react";
import "./Table.css";
import TableContainer from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import moment from "moment";

class Table extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState(props);
	}

	getInitialState = props => {
		const initialState = {
			tableRows: props.tableRows,
			tableHeading: props.tableHeading,
			isAction: props.isAction,
			isStatus: props.isStatus,
			status: props.status,
			isIndex: props.isIndex,
			isNoAction: props.isNoAction
		};
		return initialState;
	};

	static getDerivedStateFromProps(nextProps) {
		return nextProps;
	}

	editClicked = (event, index1) => {
		this.props.editClicked(event, index1);
	};

	statusChanged = (event, index) => {
		this.props.statusChanged(event, index);
	};

	render() {
		return (
			<TableContainer size="small"  stickyHeader aria-label="sticky table">
				{/* <Table></Table> */}
				<TableHead>
					<TableRow>
						{this.state.isAction ? (
							<TableCell align="center">ACTION</TableCell>
						) : (
							<React.Fragment></React.Fragment>
						)}
						{this.state.tableHeading.map((data, index) => {
							return (
								<TableCell key={index} align="center">
									{data.toUpperCase()}
								</TableCell>
							);
						})}
						{this.state.isStatus ? (
							<TableCell align="left">Status</TableCell>
						) : (
							<React.Fragment></React.Fragment>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{this.state.tableRows.map((row, index1) => {
						return (
							<TableRow key={index1} hover>
								{this.state.isAction && row.status === "active" ? (
									<TableCell key={index1} align="center">
										<Tooltip
											title="Edit Project"
											onClick={event => this.editClicked(event, row)}
										>
											<IconButton aria-label="edit">
												<EditIcon color="primary" />
											</IconButton>
										</Tooltip>
									</TableCell>
								) : this.state.isAction ? (
									<TableCell key={index1} align="center">
										<Tooltip
											title="Edit Project"
											onClick={event => this.editClicked(event, row)}
										>
											<IconButton aria-label="edit">
												<EditIcon color="primary" />
											</IconButton>
										</Tooltip>
									</TableCell>
								) : this.state.isNoAction ? (
									<React.Fragment></React.Fragment>
								) : (
									<TableCell key={index1} align="center">
										<Tooltip title="Edit Project">
											<IconButton aria-label="edit">
												<EditIcon color="disabled" />
											</IconButton>
										</Tooltip>
									</TableCell>
								)}
								{this.state.tableHeading.map((data, index) => {
									return (
										<React.Fragment key = {index}>
											{data.includes("Date") ? (
												<TableCell
													key={index}
													align="center"
													className="row-text"
												>
													{row[data]
														? moment(row[data]).format("DD-MM-YYYY")
														: ""}
												</TableCell>
											) : (
												<TableCell key={index} align="center">
													{row[data] ? String(row[data]) : null}
												</TableCell>
											)}
										</React.Fragment>
									);
								})}
								{this.state.isStatus ? (
									<TableCell align="left">
										<FormControlLabel
											value={row.status}
											control={
												<Switch
													checked={row.status === "inactive" ? false : true}
													onChange={event => this.statusChanged(event, row)}
													value={row.status === "inactive" ? false : true}
													color={
														row.status === "deactivate"
															? "secondary"
															: "primary"
													}
													inputProps={{ "aria-label": "primary checkbox" }}
												/>
											}
											label={row.status}
											labelPlacement="end"
										/>
									</TableCell>
								) : (
									<React.Fragment></React.Fragment>
								)}
							</TableRow>
						);
					})}
				</TableBody>
			</TableContainer>
		);
	}
}

export default Table;
