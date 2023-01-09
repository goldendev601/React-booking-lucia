import React, { useState } from "react";
import { Typography, Popover, Grid, makeStyles } from "@material-ui/core";
import NotesIcon from '../../../../../assets/notes.png';


const CardSupplierPopover = ({ supplier, address, phone }) => {

    const useStyles = makeStyles(() => ({
        popoverDiv: {
            backgroundColor: '#FFFFFF',
            width: '530px',
            padding: '40px'
        },
        popoverInstruction: {
            color: '#BA886E',
            fontFamily: 'Poppins',
            fontSize: '20px',
            fontWeight: '500',
            lineHeight: '24px',
            letterSpacing: '0.05em'
        },
        notesIcon: {
            width: '10px'
        },
        policyIcon: {
            width: '8px'
        },
        cardPhoneAddressDiv: {
            textAlign: 'left'
        },
        cardNote: {
            color: '#242424',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontSize: '12px',
            padding: '25px 0px 0px 0px',
            fontWeight: '300',
            lineHeight: '20px',
        },
        cardNoteDiv: {
            textAlign: 'left'
        },
        cardSupplierName: {
            color: '#BA886E',
            fontSize: '16px',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            lineHeight: '24px',
            fontWeight: '600',
            padding: '10px 10px 10px 0px',
        },
        cardPhoneAddress: {
            color: '#242424',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontSize: '14px',
            padding: '10px 0px 10px 0px',
            fontWweight: 'normal',
            lineHeight: '24px',
        },
    }));

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className={classes.notesIconWrapper}>
            <img src={NotesIcon} alt="notesIcon" className={classes.notesIcon} aria-describedby={id} variant="contained" onClick={handleClick} />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <div className={classes.popoverDiv}>
                    <Typography className={classes.popoverInstruction}>
                        Provider Info
                    </Typography>
                    <div style={{marginTop: '10px'}}>
                        <div className={classes.cardPhoneAddressDiv}>
                            {
                                supplier && supplier.name && (
                                    <Typography variant="h5" component="h5" className={classes.cardSupplierName}>
                                        {supplier.name}
                                    </Typography>
                                )
                            }

                            <Typography variant="h5" component="h5" className={classes.cardPhoneAddress}>
                                {address}{address && phone && ','} {phone}
                            </Typography>
                        </div>

                        <div className={classes.cardPhoneAddressDiv} style={{ display: 'flex' }}>

                            {
                                supplier && supplier.website && (
                                    <Typography variant="h5" component="h5" className={classes.cardSupplierName}>
                                        {supplier.website}
                                    </Typography>
                                )
                            }

                        </div>
                    </div>
                </div>
            </Popover>
        </div>
    );
}

export default CardSupplierPopover;
