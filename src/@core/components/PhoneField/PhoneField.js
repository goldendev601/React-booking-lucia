import React from "react";
import './style.css'
import PhoneInput from 'react-phone-number-input'

const PhoneField = ({formik, name, label, placeholder, width, ...rest}) => {    
    return (
        <PhoneInput
            {...rest}
            style={{width: width || '380px'}}
            id={name}
            name={name}
            label={label}
            placeholder={placeholder || 'Placeholder'}
            defaultCountry="US"
            value={formik.values[name]}
            onChange={(newVal) => formik.setFieldValue(name, newVal)}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            InputLabelProps={{shrink: true}}
        />
    );
}

export default PhoneField;