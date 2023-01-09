import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {NavArrowDown} from "iconoir-react";

const SelectField = ({
                         formik,
                         name,
                         label,
                         width,
                         options,
                         constants,
                         styledItem,
                         fieldArrayName,
                         index,
                         propertyName,
                         error,
                         ...rest
                     }) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        if (index !== undefined) {
            setValue(formik.values[fieldArrayName][index][propertyName]);
        } else {
            setValue(formik.values[name])
        }
    }, [fieldArrayName, formik.values, index, name, propertyName]);

    return (
        <FormControl style={{width: width || '180px'}} variant={rest.variant ? rest.variant : null}>
            <InputLabel shrink={true} id={name}>{label}</InputLabel>
            <Select
                {...rest}
                id={name}
                name={name}
                defaultValue={null}
                value={value}
                onChange={formik.handleChange}
                IconComponent={NavArrowDown}
                error={index !== undefined ? error
                    : formik.touched[name] && Boolean(formik.errors[name])
                }
                MenuProps={{
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                    },
                    getContentAnchorEl: null
                }}
            >
                {options && options.map((option, index) => {
                    return (
                        <MenuItem
                            classes={styledItem}
                            key={index}
                            value={constants ? option.id : option.value}
                        >
                            {constants ? option.description : option.name}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    );
}

export default SelectField;