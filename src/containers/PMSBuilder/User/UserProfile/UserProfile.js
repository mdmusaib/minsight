import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import './UserProfile.css'

class UserProfile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = (props) => {
        const initialState = {
            username: '',
            roles: [],
            projects: [],
            email: '',
            numberProjects: ''
        }
        return initialState;
    }

    componentDidMount () {
        let userData = JSON.parse(sessionStorage.getItem('access_token'));
        let data = userData.userDetails
        let projects = this.state.projects
        this.setState({
            numberProjects: data.project.length
        })
        
        data.project.map( (projData, index) => {
            this.getRolesName(projData,index)
            return projects.push(projData.name)
            
        })

        this.setState({
            username: data.username,
            // role: data.role,
            projects: projects,
            email: data.email
        })
    }

    getRolesName = (data, index) => {
        let roles = this.state.roles
        let roleDetails = []
        if(data.roles !== undefined) {
            data.roles.length === 0
            ? roleDetails.push(null)
            : data.roles.forEach( roleData => {
                roleDetails.push(roleData.name);
            }) 
            console.log(roleDetails);
            
            roles[index] = roleDetails
            // this.setState({
            //     ...this.state,
            //     roles: roles
            // })  
        }    
    }
    
    render() {
        let userData = JSON.parse(sessionStorage.getItem('access_token'));
        let data = userData.userDetails;

        let inputs = []

        for(let index = 0; index < this.state.numberProjects; index++){
            inputs.push(
                <React.Fragment key = {index}>
                    <Grid item xs={6}>
                        <Typography>
                            <label className = 'Label'>Projects - {Number(index +1)}:</label>
                            <span className = 'Value'>{this.state.projects[index]}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            <label className = 'Label'>Roles - {this.state.projects[index]}:</label>
                            <span className = 'Value'>{String(this.state.roles[index])}</span>
                        </Typography>
                    </Grid>
                </React.Fragment>      
            );
        }

        return (
            <Container maxWidth="md" style = {{margin: '10vh 0'}}>
                <div style = {{textAlign: 'center', fontSize: '17px', fontWeight: '700'}}>
                    <p>User Details</p>
                </div>
                <hr></hr>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Typography>
                            <label className = 'Label'>Username:</label>
                            <span className = 'Value'>{data.username}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            <label className = 'Label'>Email:</label>
                            <span className = 'Value'>{data.email}</span>
                        </Typography>
                    </Grid>
                    {inputs}
                    
                </Grid>
            </Container>
        );
    }
}

export default UserProfile;