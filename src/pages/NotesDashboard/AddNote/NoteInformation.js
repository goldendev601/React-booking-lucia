import React from "react";
import {Typography} from "@material-ui/core";
import {
    FlexContainer,
    ItineraryFormContainer,
    Loading,
    SelectField,
    TextField,
    RichEdit,
} from "@core/components";
import {useSelector, useDispatch} from "react-redux";
import {addItineraryStyles} from "styles/muiStyles";
import {bookingsSelector} from "redux/features/itineraries/bookings/bookingsSlice";

const NoteInformation = ({formik}) => {
    const {isFetching} = useSelector(bookingsSelector);
    const dispatch = useDispatch();

    const classes = addItineraryStyles();

    const selectOptions = [
        {name: 'Low', value: 1},
        {name: 'High', value: 2},
    ];
    return (
        <Loading isFetching={isFetching}>
            <ItineraryFormContainer>
                <FlexContainer>
                    <FlexContainer $column $spacing>
                        <Typography component={'div'} variant='body2'>Details</Typography>
                        <TextField
                            formik={formik}
                            label="Title (*)"
                            name="title"
                            placeholder="Select a Name"
                        />
                        {formik.touched.title && formik.errors.title && <div className={classes.validationErrorNotification}>{formik.errors.title}</div>}
                        {/* <SelectField
                            formik={formik}
                            label="Priority (*)"
                            name="priorityId"
                            options={selectOptions}
                            width="100%"
                        />
                        {formik.touched.priorityId && formik.errors.priorityId && <div className={classes.validationErrorNotification}>{formik.errors.priorityId}</div>} */}
                    </FlexContainer>
                    <FlexContainer $row $spaceevenly style={{width: '440px', marginTop: '40px'}}>
                        <div className={classes.notesDiv}>
                            <RichEdit
                                formik={formik}
                                label="Notes"
                                name="notes"
                                placeholder="Enter notes"
                            />    
                        </div>
                        {/* <TextField
                            formik={formik}
                            label="Notes"
                            name="notes"
                            placeholder="Enter notes"
                        /> */}
                    </FlexContainer>
                </FlexContainer>
            </ItineraryFormContainer>
        </Loading>
    );
}

export default NoteInformation;
