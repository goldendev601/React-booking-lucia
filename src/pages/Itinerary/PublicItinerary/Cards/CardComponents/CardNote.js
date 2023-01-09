import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    cardNote: {
        color: '#242424',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontSize: '14px',
        padding: '10px 0px 10px 0px',
        fontWeight: 'normal',
        lineHeight: '24px',
    },
    cardNoteDiv: {
        textAlign: 'left'
    }
});

const CardNote = ({notes}) => {
    const classes = useStyles()
    return (
        <div className={classes.cardNoteDiv}>
            <Typography variant="h5" component="h5" className={classes.cardNote}>
                {notes && <Typography component="p" dangerouslySetInnerHTML={{__html: notes}} />} 
            </Typography>
        </div>
    );
}

export default CardNote;