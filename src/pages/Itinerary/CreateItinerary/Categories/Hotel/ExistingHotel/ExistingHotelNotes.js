import {TextField, Typography} from "@material-ui/core";
import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import{addItineraryStyles} from "styles/muiStyles";
import DialogActions from "../../../../../../@core/components/Dialog/DialogActions";

const validationSchema = yup.object({
    notes: yup
        .string('Enter type'),
});

const ExistingHotelNotes = ({handleStateChange, nextStep, handleCloseDialogs}) => {
    const classes = addItineraryStyles();
    const formik = useFormik({
        initialValues: {
            notes: '',
        },
        validationSchema: validationSchema,
        validateOnMount: true,
        onSubmit: (values) => {
            handleStateChange(values);
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <div className={`${classes.spacing} ${classes.formPadding}`}>
                    <Typography component={'div'} variant='body2'>NOTES ABOUT HOTEL</Typography>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <TextField
                            fullWidth
                            multiline={true}
                            id="notes"
                            name="notes"
                            label="Notes"
                            placeholder='Placeholder'
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                            error={formik.touched.notes && Boolean(formik.errors.notes)}
                            InputLabelProps={{shrink: true}}
                        />
                    </div>
                </div>
            </div>
            <DialogActions handleCloseDialogs={handleCloseDialogs}/>
        </form>
    )
}

export default ExistingHotelNotes;
