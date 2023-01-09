import React, {useState} from "react";
import { Typography, Popover, Grid, makeStyles } from "@material-ui/core";
import { WarningCircledOutline } from "iconoir-react";
import styled from "styled-components";


const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;


const FlightPassenger = ({ passenger }) => {

    const useStyles = makeStyles(() => ({
        passengerPopIcon: {
            marginLeft: '10px',
            alignItems: 'center',
            marginTop: '5px'
        },
        popoverDiv: {
            backgroundColor: '#FFFFFF',
            width: 236,
            padding: '20px'
        },
        popoverInstruction: {
            color: '#BA886E',
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: '600',
            lineHeight: '34px'
        },
        popoverLabel: {
            color: '#333333',
            fontFamily: 'Poppins',
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '34px',
            letterSpacing: '1px'
        },
        popoverValue: {
            color: '#333333',
            fontFamily: 'Poppins',
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '34px',
            letterSpacing: '1px',
            marginLeft: '10px'
        },
    }));
    
    const classes = useStyles();

    const [expand, setExpand] = useState(true);
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
        <Grid container>
            <Grid item sm={3} xs={3} style={{ textAlign: 'left' }}>
                <div style={{display: 'flex'}}>
                    <Typography component="p" style={{ color: '#BA886E', paddingTop: '1px', lineHeight: '25px' }}>{passenger.name}</Typography>
                    <WarningCircledOutline width="10px" className={classes.passengerPopIcon} aria-describedby={id} variant="contained" color={'#BDBDBD'} onClick={handleClick} />
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
                                {passenger.name}
                            </Typography>
                            <div style={{display: 'flex'}}>
                                <Typography className={classes.popoverLabel}>
                                    Frequent Flyer
                                </Typography>
                                <Typography className={classes.popoverValue}>
                                    #{passenger.frequentFlyerNumber}
                                </Typography>
                            </div>
                        </div>
                    </Popover>
                </div>
            </Grid>
            <Grid item sm={4} xs={4} style={{ textAlign: 'left' }}>
                <Typography component="p" style={{ color: '#262630', paddingTop: '1px', lineHeight: '25px' }}>{passenger.ticketNumber}</Typography>
            </Grid>
            <Grid item sm={3} xs={3} style={{ textAlign: 'left' }}>
                <Typography component="p" style={{ color: '#262630', paddingTop: '1px', lineHeight: '25px' }}>{passenger.class}</Typography>
            </Grid>
            <Grid item sm={2} xs={2} style={{ textAlign: 'left' }}>
                <Typography component="p" style={{ color: '#262630', paddingTop: '1px', lineHeight: '25px' }}>{passenger.seat}</Typography>
            </Grid>
        </Grid>
    );
}

export default FlightPassenger;
