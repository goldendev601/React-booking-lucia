import {Switch, withStyles} from "@material-ui/core";
import {colors} from "../../../styles/colors";
import React from "react";

const CustomSwitch = withStyles((theme) => ({
    root: {
        width: 40,
        height: 20,
        padding: 0,
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(22px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: colors.brand,
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: colors.brand,
            border: '6px solid #fff',
        },
    },
    thumb: {
        marginTop: '1px',
        width: 16,
        height: 16,
    },
    track: {
        borderRadius: 26 / 2,
        border: '1px solid #CCCCCC',
        backgroundColor: '#CCCCCC',
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

export default CustomSwitch;
