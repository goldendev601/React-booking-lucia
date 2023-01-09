import React from 'react';
import {Button} from "@core/components";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import styled from "styled-components";
import {makeStyles, Typography} from "@material-ui/core";
import {InfoEmpty, Trash} from "iconoir-react";
import {colors} from "styles/colors";
import {capitalizeFirstLetter} from "../../../utils";

const DialogActions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`
const useStyles = makeStyles(() => ({
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertContent: {
        marginTop: '20px',
        textAlign: 'center'
    },
    alertName: {
        marginTop: '70px'
    },
    icon: {
      position: 'absolute',
        top: '25px',
    },
    paper: {
        width: '550px !important',
        height: '380px !important',
    },
}));

const AlertDialog = ({open, alertDescription, type, handleClose, handleClick, name}) => {
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            classes={{paper: classes.paper}}

        >
            <DialogContent className={classes.dialogContent}>
                {type === 'discard' && <InfoEmpty className={classes.icon} style={{marginTop: '10px'}}  width="60px" height="60px" color={colors.brand}/>}
                {type === 'remove' && <Trash className={classes.icon} width="60px" height="60px" color={colors.brand}/>}
                    <Typography className={classes.alertName} variant="h5" component="h5">
                        {type === 'discard' && 'Discard Changes'}
                        {type === 'remove' && `Remove ${capitalizeFirstLetter(name) || 'Itinerary'}?`}
                    </Typography>
                <DialogContentText className={classes.alertContent} id="alert-dialog-description">
                    {type === 'discard' && 'Are you sure you want to discard the newest changes? This can not be undone.'}
                    {type === 'remove' && `Are you sure you want to delete selected ${name || 'itinerary'}? This can not be undone.`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    $outlined
                    $width="50%"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleClick}
                    $primary
                    $width="50%"
                >
                    {type === 'discard' && 'Yes, discard'}
                    {type === 'remove' && 'Yes, delete'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog;