import React, {useEffect, useState} from "react";
import {InputAdornment, TextField} from "@material-ui/core";
import {colors} from "styles/colors";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(() => ({
    textField: {
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: 0,
        marginTop: 12,
        fontWeight: 500,
        color: '#FFF',
        backgroundColor: '#C4C4C418', 
    },
    input: {
        height: '50px', 
        paddingLeft: 24,
        paddingRight: 24,
        color: '#FFF',
    }
}));

const AuthTextFieldInput = ({formik, name, label, placeholder, width, startIcon, endIcon, ...rest}) => {
    const [icon, setIcon] = useState({});

    const iconSelector = (startIcon, endIcon) => {
        if (startIcon) {
            setIcon({
                startAdornment: (
                    <InputAdornment position="start">
                        {React.cloneElement(startIcon, {color: colors.brand, width: '22px'})}
                    </InputAdornment>
                ),
            });
        }
        if (endIcon) {
            setIcon({
                endAdornment: (
                    <InputAdornment position="end">
                        {React.cloneElement(endIcon, {color: colors.brand, width: '22px'})}
                    </InputAdornment>
                )
            });
        }
    }

    useEffect(() => {
        iconSelector(startIcon, endIcon);
    }, [endIcon, startIcon]);

    const classes = useStyles();


    return (
        <TextField
            {...rest}
            style={{width: width || '380px'}}
            id={name}
            name={name}
            label={label}
            placeholder={placeholder || 'Placeholder'}
            value={formik.values[name] || ''}
            onChange={formik.handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            InputLabelProps={{shrink: true}}
            className={classes.textField}
            InputProps={{
                className: classes.input,
                icon
            }}
        />
    )
}


export default AuthTextFieldInput;