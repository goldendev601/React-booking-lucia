import React from "react";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import {EyeEmpty} from "iconoir-react";
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


const PasswordField = ({formik, name, label, placeholder, handleClickShowPassword, showPassword, width, ...rest}) => {
    const classes = useStyles();
    return (
        <TextField
            {...rest}
            // style={{width: width || '320px'}}
            id={name}
            name={name}
            label={label}
            placeholder={placeholder || 'Enter your password'}
            type={showPassword[name] ? "text" : "password"}
            value={formik.values[name]}
            onChange={formik.handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            InputLabelProps={{shrink: true}}
            className={classes.textField}
            InputProps={{
                className: classes.input,
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            size='small'
                            onClick={() => handleClickShowPassword(name)}
                        >
                            <EyeEmpty width='23px' color='white'/>
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
}
    

    
export default PasswordField;