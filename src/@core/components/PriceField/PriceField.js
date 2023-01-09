import React from "react";
import {TextField} from "@material-ui/core";
import NumberFormat from 'react-number-format';

const NumberFormatCustom = (props) => {
    const { inputRef, name, value, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            value={value}
            decimalSeparator="."
            decimalScale={2}
            isNumericString
            allowNegative={false}
        />
    );
}

const PriceField = ({formik, name, label, placeholder, width, ...rest}) => {
    return (
        <TextField
            {...rest}
            style={{width: width || '380px'}}
            id={name}
            name={name}
            label={label}
            placeholder={placeholder || ''}
            value={formik.values[name]}
            onChange={formik.handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            InputLabelProps={{shrink: true}}
            InputProps={{
                inputComponent: NumberFormatCustom,
                value: formik.values[name],
                name: name,
                onChange: formik.handleChange,
            }}
        />
    );
}

export default PriceField;