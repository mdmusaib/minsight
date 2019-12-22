import React from 'react'
import './Modal.css'
import Modal from '@material-ui/core/Modal';

const modal = (props) => {
    
    // handleClose = (props) => {
    //     this.props.handleClose();
    // }

    return(
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={props.open}
            onClose={props.handleClose}
        >
            <div 
                className = {props.FormatModal ? 'Format-Modal' : 'Modal'}
                style={{
                        transform: props.open ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.open ? '1' : '0',
                    }} >
                {props.children}
            </div>
        </Modal>
    )
}

export default modal;