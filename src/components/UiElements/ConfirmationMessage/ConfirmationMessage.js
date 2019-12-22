import React from 'react'
import './ConfirmationMessage.css'
import Button from '@material-ui/core/Button';

const confirmationMessage = (props) => {
    return (
        <div className = 'Confirmation'>
            <p>{props.message}</p>
            <div>
            {/* <Button btnType="AssignLater" clicked={props.assignLater}>
            <img className = {classes.CloseImage} src = {CrossSymbol} alt="Close" />
            NO</Button>
            <Button btnType="AssignNow" clicked = {props.assignNow}>
            <img className = {classes.SelectImage} src = {SelectSymbol} alt="Select" />
            YES</Button> */}
                <Button variant="outlined" onClick = {props.primaryClicked} color="primary">
                    Yes
                </Button>
                <Button variant="outlined" onClick = {props.secondaryClicked} color="secondary">
                    No
                </Button>
            </div>
        </div>
    );
};

export default confirmationMessage;