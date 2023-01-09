import {Switch} from "../Switch";
import {makeStyles, Typography} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex'
    },
    typography: {
        fontWeight: '300',
        marginLeft: '20px',
        display: 'flex',
        alignItems: 'center'
    }
}));

export const SwitchLucia = ({name, value, placeholder, onChangeHandler, disabled}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Switch name={name || ''} checked={value} value={value} onChange={onChangeHandler} disabled={disabled}/>
            <Typography
                className={classes.typography}
                component={'div'} variant='body2'
            >
                {placeholder}
            </Typography>
        </div>
    )
}