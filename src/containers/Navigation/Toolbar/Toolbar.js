import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolbarNav from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './Toolbar.css'
import { withRouter } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import Modal from './../../../components/UiElements/Modal/Modal'
import UserProfile from './../../PMSBuilder/User/UserProfile/UserProfile'

class Toolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        let userData = JSON.parse(sessionStorage.getItem('access_token')) ? JSON.parse(sessionStorage.getItem('access_token')) : this.props.history.push('/login');
        let data = userData ? userData.userDetails : null        
        this.setState({
            userDetails: data
        })
    }

    getInitialState = (props) => {
        const initialState = {
            
                username: '',
                role: '',
                project: '',
                email: '',
                openForProfile: false,
                userDetails: []

        }
        return initialState;
    }

    logoutClicked = (event) => {
        event.preventDefault();
        sessionStorage.removeItem('access_token');
        this.props.history.push('/login');
    }

    userIconClicked = () => {
        this.setState({
            ...this.state,
            openForProfile: true
        })
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            openForProfile: false
        })
    }

    render() {
      
        return(
            <React.Fragment>
                <AppBar position="static" style ={{ backgroundColor: '#0e56e6' }} >
                    <ToolbarNav style = {{ minHeight: '3pc' }} >
                        <Typography style = {{ color: 'white' }} >
                            {this.state.userDetails ? this.state.userDetails.email : this.props.history.push('/login')}
                        </Typography>
                        {
                            this.state.userDetails.username !== 'admin'
                            ?
                            <AccountBoxOutlinedIcon fontSize = 'large' style = {{ position: 'absolute', right: '10%' }} titleAccess = "User Profile" onClick = {this.userIconClicked} />
                            :
                            <React.Fragment></React.Fragment>
                        }
                        <ExitToAppIcon fontSize = 'large' style = {{ position: 'absolute', right: '5%' }} onClick = {this.logoutClicked} titleAccess = "Logout"  />
                    </ToolbarNav>
                </AppBar>
                <Modal 
                    open = {this.state.openForProfile}
                    handleClose = {this.handleClose}
                >
                    <UserProfile />   
                </Modal>
            </React.Fragment>
            
        );
    }
}

export default withRouter(Toolbar);