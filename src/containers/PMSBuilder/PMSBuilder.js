import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Toolbar  from './../Navigation/Toolbar/Toolbar';
import ListRolesAndProject from '../Admin/RoleAndProjects/ListRolesAndProject/ListRolesAndProject';
import UserManagement from '../Admin/AdminDashboard/UserManagement';
import PlannedEfforts from './User/PlannedEfforts/PlannedEfforts';
import ActualEfforts from './User/ActualEfforts/ActualEfforts';
import DailyTimeSheet from './User/DailyTimeSheet/DailyTImeSheet';

class PMSBuilder extends React.Component {
    render() {
        return(
            <React.Fragment>
                <Toolbar />
                <Switch>
                    <Route path = "/admin-dashboard" component = {UserManagement} />
                    <Route path = "/role-project" component = {ListRolesAndProject} />
                    <Route path = "/planned-efforts" component = {PlannedEfforts} />
                    <Route path = "/actual-efforts" component = {ActualEfforts} />
                    <Route path = "/time-sheet" component = {DailyTimeSheet} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default PMSBuilder;