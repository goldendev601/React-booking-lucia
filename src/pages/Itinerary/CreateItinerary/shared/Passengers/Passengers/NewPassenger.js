import {TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Trash} from "iconoir-react";
import {colors} from "../../../../../../styles/colors";
import React from "react";

const NewPassenger = ({formik, values, handleRemoveClick, index, handleInputChange, main}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <TextField
                style={{width: '200px'}}
                id="name"
                name="name"
                label="Name Passenger"
                placeholder='Placeholder'
                value={main ? formik.values.name : values.name}
                onChange={main ? formik.handleChange : (e) => handleInputChange(e, index)}
                error={main && formik.touched.name && Boolean(formik.errors.name)}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                style={{width: '100px'}}
                id="seat"
                name="seat"
                label="Seat"
                placeholder='Ex: B4'
                value={main ? formik.values.seat : values.seat}
                onChange={main ? formik.handleChange : (e) => handleInputChange(e, index)}
                error={main && formik.touched.seat && Boolean(formik.errors.seat)}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                style={{width: '100px'}}
                id="class"
                name="class"
                label="Class"
                placeholder='Placeholder'
                value={main ? formik.values.class : values.class}
                onChange={main ? formik.handleChange : (e) => handleInputChange(e, index)}
                error={main && formik.touched.class && Boolean(formik.errors.class)}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                style={{width: '158px'}}
                id="frequent_flyer_number"
                name="frequent_flyer_number"
                label="Freq. Flyer No."
                placeholder='Placeholder'
                value={main ? formik.values.frequent_flyer_number : values.frequent_flyer_number}
                onChange={main ? formik.handleChange : (e) => handleInputChange(e, index)}
                error={main && formik.touched.frequent_flyer_number && Boolean(formik.errors.frequent_flyer_number)}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                style={{width: '130px', marginRight: main && '46px'}}
                id="ticket_number"
                name="ticket_number"
                label="Ticket No."
                placeholder='Placeholder'
                value={main ? formik.values.ticket_number : values.ticket_number}
                onChange={main ? formik.handleChange : (e) => handleInputChange(e, index)}
                error={main && formik.touched.ticket_number && Boolean(formik.errors.ticket_number)}
                InputLabelProps={{shrink: true}}
            />
            {!main && values?.length !== 1 &&
            <IconButton style={{
                marginTop: '25px',
                padding: '0 5px 0 5px'
            }} onClick={handleRemoveClick}>
                <Trash color={colors.brand} width={'25px'}/>
            </IconButton>}
        </div>
    );
}

const MemoizedNewPassenger = React.memo(NewPassenger);

export default MemoizedNewPassenger;