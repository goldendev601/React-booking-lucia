import {Plus} from "iconoir-react";
import {colors} from "styles/colors";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'start',
        marginTop: '5px',
        padding: '0'
    },
    placeholder: {
        marginLeft: '5px'
    }
}));

const AddNewButton = ({push, values, placeholder}) => {
    const classes = useStyles();

    return (
        <IconButton
            className={classes.root}
            disableRipple={true}
            aria-label="add-new"
            onClick={() => push(values)}
        >
            <Plus width={'20px'} color={colors.brand}/>
            <span className={`span-small ${classes.placeholder}`}>{placeholder}</span>
        </IconButton>
    );
}

export default AddNewButton;