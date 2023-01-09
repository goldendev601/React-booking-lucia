import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from "iconoir-react";
import { colors } from "styles/colors";
import { Label } from "@core/components";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { Autocomplete } from "@material-ui/lab";
import { InputAdornment, TextField } from "@material-ui/core";

const AutocompleteStyles = makeStyles(({
    endAdornment: {
        display: 'none'
    },
    paper: {
        boxShadow: 'none',
        border: `0.05em solid rgba(186, 136, 110, 0.4)`
    },
    input: {
        marginBottom: '8px',
    },
    inputRoot: {
        paddingRight: '0 !important'
    }
}))

const handleRenderOption = (option, { inputValue }) => {
    const matches = match(option.description, inputValue);
    const parts = parse(option.description, matches);

    const highlightStyle = {
        fontWeight: 700,        
    }

    return (
        <div className={'autocompleteAM autocompleteAM-hover'}>
            <img src={option.imageUrl} style={{paddingLeft: '10px', paddingRight: '10px', width: '35px'}} alt="img" />
            {parts.map((part, index) => (
                <span key={index} className={'brand-color'}
                    style={part.highlight ? highlightStyle : { fontWeight: '300' }}>
                    {part.text}
                </span>
            ))}
        </div>
    );
};

// const defaultFilterOptions = createFilterOptions();

const LuciaAutoComplete = ({ options, name, placeholder, width, height, label, labelMb, formik, iconEnd, value }) => {
    const autocompleteStyles = AutocompleteStyles();

    return (
        <React.Fragment>
            <div>
                {label && <Label mb={labelMb}>{label}</Label>}
                <Autocomplete
                    freeSolo  
                    id={name}
                    name={name}
                    options={options}
                    placeholder={placeholder || ' '}
                    classes={autocompleteStyles}
                    value={value}
                    renderInput={params => (
                        <div style={{ display: 'flex' }}>
                            <TextField
                                name={name}
                                id={name}
                                {...params}
                                placeholder={placeholder || ' '}
                                InputLabelProps={{ style: { fontSize: '14px' } }}
                                style={{ width: '472px', height: height }}                                
                                InputProps={{
                                    classes: {
                                        input: autocompleteStyles.input
                                    },
                                    ...params.InputProps,
                                    startAdornment: (
                                        <React.Fragment>
                                            <InputAdornment position="start">
                                                <Search width="25px" className={autocompleteStyles.input} color={colors.brand} />
                                            </InputAdornment>
                                            {params.InputProps.startAdornment}
                                        </React.Fragment>
                                    ),
                                    endAdornment: iconEnd
                                }}
                            />
                        </div>
                    )}
                    onChange={(e, value) => {
                        if (value) {
                            formik.setFieldValue(name, value.description)
                        } else {
                            formik.setFieldValue(name, '')
                        }
                    }}
                    onBlur={(e) => {
                        formik.setFieldValue(name, e.target.value)
                    }}
                    getOptionLabel={(o) => (typeof o === "string" ? o : "")}
                    renderOption={(option, state) => handleRenderOption(option, state)}
                />
            </div>
        </React.Fragment>
    )
}

export default LuciaAutoComplete;
