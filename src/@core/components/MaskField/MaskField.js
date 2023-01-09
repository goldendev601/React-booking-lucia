import React from "react";
import {TextField} from "@material-ui/core";
import InputMask from 'react-input-mask'

const Mask = ({mask, ...rest}) => <InputMask {...rest} mask={mask} maskChar=" "/>

const MaskField = ({formik, name, label, placeholder, width, mask, ...rest}) => {
    return (
        <TextField
            {...rest}
            style={{width: width || '380px'}}
            id={name}
            name={name}
            label={label}
            placeholder={placeholder || 'Placeholder'}
            value={formik.values[name]}
            onChange={formik.handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            InputLabelProps={{shrink: true}}
            InputProps={{
                inputComponent: Mask,
                value: formik.values[name],
                onChange: formik.handleChange,
            }}
            inputProps={{mask: mask}}
        />
    );
}

export default MaskField;