import React, {useState} from "react";
import { Typography, Popover, Grid, makeStyles } from "@material-ui/core";
import NotesIcon from '../../../../../assets/notes.png';


const CardNotePopover = ({ notes }) => {

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
        }
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
                        Notes
                    </Typography>
                    <div style={{display: 'flex'}}>
                        {
                            notes !== "" && (
                                <div className={classes.cardNoteDiv}>
                                    <Typography variant="h5" component="h5" className={classes.cardNote}>
                                        <Typography component="p" dangerouslySetInnerHTML={{__html: notes}} />
                                    </Typography>
                                </div>
                            )
                        }
                    </div>
                </div>
            </Popover>
        </div>
    );
}

export default CardNotePopover;
