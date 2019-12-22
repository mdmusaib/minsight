import Axios, { handleErrorResponse } from "./../axios";

export function getPlannedEffortsByUser(
	callback,
	userName,
	projectName,
	role,
	release
) {
	//console.log('userName',userName,'projectName',projectName,'isAdmin',isAdmin,
	let obj = { username: userName, projectKey: projectName, role: role,release:release };
	Axios.get(
		`/PlannedEfforts/getPlannedEfforts?userObject=${JSON.stringify(obj)}`
	)
		.then(response => {
			callback(response);
		})
		.catch(error => {
			handleErrorResponse(error);
		});
}

export function getReleaseDetails(callback){
	let board_id=21;
	Axios.get(`/Releases/fetchSprints?board_id=${board_id}`)
	.then(response=>{
		callback(response)
	})
	.catch(error =>{
		handleErrorResponse(error);
	})
}

export function updatePlannedEffort(callback, savedData) {
	console.log(savedData, "saved");
	Axios.put(`/PlannedEfforts/updatePlannedEffort`, savedData)
		.then(response => {
			callback(response);
		})
		.catch(error => {
			handleErrorResponse(error);
		});
}

export function getActualEffortsByUser(
	callback,
	userName,
	projectName,
	isAdmin
) {
	//console.log('userName',userName,'projectName',projectName,'isAdmin',isAdmin,
	let obj = { username: userName, projectKey: projectName, isAdmin: isAdmin };
	Axios.get(`/ActualEfforts/getActualEfforts?userObject=${JSON.stringify(obj)}`)
		.then(response => {
			callback(response);
		})
		.catch(error => {
			handleErrorResponse(error);
		});
}
