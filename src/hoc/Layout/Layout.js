import React from 'react'
import Grid from '@material-ui/core/Grid';
import Sidebar from './../../containers/Navigation/Sidebar/Sidebar';

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    };

    getInitialState = () => {
        const initialState = {
            username: null,
            userProfile: ['planned-efforts', 'actual-efforts', 'daily-efforts', 'time-sheet'],
            adminProfile: ['admin-dashboard', 'role-project']
        }
        return initialState;
    }

    componentDidMount () {
        const token = JSON.parse(sessionStorage.getItem('access_token'));
        if( token !== null ) 
            this.setState({
                ...this.state,
                username: token.userDetails.username
        });        
    }
    

    render() {
        return(   
            <Grid container>
                <Grid item xs={2} >
                    {
                        <Sidebar sidebarList = { this.state.username === 'admin' ? this.state.adminProfile : this.state.userProfile } />
                    }
                    
                </Grid>
                <Grid item xs = {10}>
                    <main>
                        {this.props.children}
                    </main>
                </Grid>
            </Grid>   
        )
    }
}

export default Layout;