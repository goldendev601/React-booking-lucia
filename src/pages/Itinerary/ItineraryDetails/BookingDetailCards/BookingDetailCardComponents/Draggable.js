import React from "react";
import {ReactComponent as Drag} from "assets/icons/drag.svg";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(({
    draggable: {
        position: 'absolute',
        left: '-36px',
        top: '1px',
        cursor: 'pointer'
    },
}));

export const Draggable = ({dragHandleProps}) => {
    const classes = useStyles();
    return (
        <div {...dragHandleProps}>
            <Drag className={classes.draggable}/>
        </div>
    );
}