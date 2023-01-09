import React, {useEffect, useState} from "react";
import {InputAdornment, TextField} from "@material-ui/core";
import {colors} from "styles/colors";

const TextFieldInput = ({formik, name, label, placeholder, width, startIcon, endIcon, ...rest}) => {
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

    return (
        <TextField
            style={{width: width || '380px'}}
            id={name}
            name={name}
            label={label}
            placeholder={placeholder || 'Placeholder'}
            value={formik.values[name] || ''}
            onChange={formik.handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            InputLabelProps={{shrink: true}}
            InputProps={icon}
            {...rest}
        />
    )
}


export default TextFieldInput;