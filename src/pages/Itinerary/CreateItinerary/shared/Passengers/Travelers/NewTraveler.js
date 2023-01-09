import React from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {NavArrowDown, Trash} from "iconoir-react";
import {colors} from "styles/colors";

const selectOptions = [
    {name: 'Type 1', value: 1},
    {name: 'Type 2', value: 2},
    {name: 'Type 3', value: 3},
];

const NewTraveler = ({formik, values, handleRemoveClick, index, handleInputChange, main}) => {
    return (
        <div style={{display: 'flex'}}>
            <TextField
                style={{width: '450px'}}
                id="name"
                name="name"
                label="Name Passenger"
                placeholder="Placeholder"
                value={main ? formik.values.namePassenger : values.namePassenger}
                onChange={main ? formik.handleChange : (e) => handleInputChange(e, index)}
                error={main && formik.touched.namePassenger && Boolean(formik.errors.namePassenger)}
                InputLabelProps={{shrink: true}}
            />
            <FormControl style={{marginLeft: '20px',width: '280px'}}>
                <InputLabel shrink={true} id="select-payment">Type</InputLabel>
                <Select
                    labelId="select-type"
                    id="passengerTypeId"
                    name="passengerTypeId"
                    value={main ? formik.values.passengerTypeId : values.passengerTypeId}
                    onChange={main ? formik.handleChange : (e) => handleInputChange(e, index)}
                    IconComponent={NavArrowDown}
                >
                    {selectOptions.map((option, index) => {
                        return <MenuItem key={index} value={option.value}>{option.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            {!main && values?.length !== 1 &&
            <IconButton style={{
                marginTop: '25px',
                padding: '0 5px 0 5px',
                position: 'absolute',
                right: '5px'
            }} onClick={handleRemoveClick}>
                <Trash color={colors.brand} width={'25px'}/>
            </IconButton>}
        </div>
    );
}

const MemoizedNewPassenger = React.memo(NewTraveler);

export default MemoizedNewPassenger;