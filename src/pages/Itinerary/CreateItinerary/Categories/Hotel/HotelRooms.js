import {TextField, Typography} from "@material-ui/core";
import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import {Plus} from "iconoir-react";
import IconButton from "@material-ui/core/IconButton";
import {Counter, DialogActions} from "@core/components";
import {addItineraryStyles} from "styles/muiStyles";
import {colors} from "styles/colors";

const validationSchema = yup.object({
    roomName: yup
        .string('Enter room name')
        .required('Room name is required'),
    type: yup
        .string('Enter type')
        .required('Type is required'),
});

const HotelRooms = ({handleStateChange, nextStep, handleCloseDialogs}) => {
    const classes = addItineraryStyles();
    const formik = useFormik({
        initialValues: {
            roomName: '',
            type: '',
            capacity: 1,
        },
        validationSchema: validationSchema,
        validateOnMount: true,
        onSubmit: (values) => {
            handleStateChange(values);
            nextStep();
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <div className={`${classes.spacing} ${classes.formPadding}`}>
                    <Typography component={'div'} variant='body2'>PASSENGERS INFORMATION</Typography>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}>
                        <TextField
                            style={{width: '300px'}}
                            id="roomName"
                            name="roomName"
                            label="Name Room"
                            placeholder='Placeholder'
                            value={formik.values.roomName}
                            onChange={formik.handleChange}
                            error={formik.touched.roomName && Boolean(formik.errors.roomName)}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            style={{width: '300px'}}
                            id="type"
                            name="type"
                            label="Type"
                            placeholder='Placeholder'
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            InputLabelProps={{shrink: true}}
                        />
                        <Counter
                            name="capacity"
                            formik={formik}
                            label="Capacity"
                        />
                        <IconButton style={{
                            justifyContent: 'end',
                            marginTop: '5px',
                            padding: '0'
                        }} disableRipple={true} aria-label="delete">
                            <Plus width={'20px'} color={colors.brand}/>
                            <span style={{marginLeft: '5px'}} className='span-small'>Add new room</span>
                        </IconButton>
                    </div>
                </div>
            </div>
            <DialogActions handleCloseDialogs={handleCloseDialogs}/>
        </form>
    )
}

export default HotelRooms;
