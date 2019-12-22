import Axios, {handleErrorResponse} from './../axios';


export function getAllRoles(callback,projectID) {
    Axios.get(`/roles/${projectID}`)
        .then( response => {
            callback(response);
        })
        .catch( error => {
            handleErrorResponse(error);
        });
}

export function addUserData(callback,userData) {
    Axios.post(`/users`,userData)
        .then( response => {
            callback(response);
        })
        .catch( (error,status) => {
            console.log(status)
            handleErrorResponse(error);
        });
}

export async function updateProjectNameInUsers(callback,projectId){
    if(projectId !== null && projectId !== undefined){
        Axios.get(`/users?filter={"where":{"project.id":{"like":"${projectId.id}" }}}`)
        .then(response=>{
            callback(response,projectId)
        })
        .catch((error,stx,tr)=>{
            console.log(error,stx,tr)
        })
    }
   
}
export function putUserDetails(userId,datas) {
    Axios.patch(`/users/${userId}`,datas)
        .then( response => {
           console.log(response)
        })
        .catch( error => {
            handleErrorResponse(error);
        })
}
export function getRoleByProject(callback,projectID) {
    Axios.get(`/projects/${projectID}/roles`)
        .then( response => {
            callback(response);
        })
        .catch( error => {
            handleErrorResponse(error);
        });
}

export function getAllRolesForAdmin(callback) {
    Axios.get(`/roles`)
        .then( response => {
            callback(response);
        })
        .catch( error => {
            handleErrorResponse(error);
        });
}

export function getAllProjects(callback) {
    Axios.get(`/projects`)
        .then( response => {
            callback(response);
        })
        .catch( error => {
            handleErrorResponse(error);
        })
}

export function getAllUsers(callback) {
    Axios.get(`/users?filter={"where":{"username":{"neq":"admin"}}}`)
        .then( responsne => {
            callback(responsne);
        })
        .catch( error => {
            handleErrorResponse(error);
            
        });
}

export function getUserById(callback, userId) {
    Axios.get(`/users/${userId}`)
        .then( response => {
            callback(response);
        })
        .catch( error => {
            handleErrorResponse(error);
        })
}

export function addProjects(callback, data) {
    Axios.post(`/projects/`,data)
        .then( response => {
            callback(response);
        })
        .catch( error => {
            handleErrorResponse(error);
        })
} 

export function editProjects(callback, data) {
    Axios.put(`/projects/`,data)
        .then( response => {
            callback(response);
        })
        .catch( error => {
            handleErrorResponse(error);
        })
} 

export function changeUserStatus(callback, userName, data) {
    Axios.post(`/users/update?where[username]=${userName}`, data)
        .then(response => {
            callback(response)
        })
        .catch( error => {
            handleErrorResponse(error);
        })
}

export function updateUserDetails(callback, userID, data) {
    Axios.put(`/users/${userID}`, data)
        .then(response => {
            callback(response)
        })
        .catch( error => {
            handleErrorResponse(error);
        })
}

export function deleteRoleById(callback, id){
    Axios.delete(`roles/${id}`)
    .then(response => {
        callback(response)
    })
    .catch( error => {
        handleErrorResponse(error);
    })
}

export function updateRolesById(callback,data){
    Axios.post(`roles/`,data)
    .then(response => {
        callback(response)
    })
    .catch( error => {
        handleErrorResponse(error);
    })
}