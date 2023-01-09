import React from "react";
import {Typography} from "@material-ui/core";
import {
    FlexContainer,
    ItineraryFormContainer,
    Loading,
    SelectField,
    SwitchLucia,
    TextField,
    RichEdit,
    AutocompleteNT
} from "@core/components";
import {useSelector, useDispatch} from "react-redux";
import {addItineraryStyles} from "styles/muiStyles";
import {bookingsSelector} from "redux/features/itineraries/bookings/bookingsSlice";
import { autocompleteNotes, notesSelector } from "redux/features/notes/notesSlice";
import { notesLookup } from "redux/features/suppliers/suppliersSlice";

const OtherInformation = ({formik}) => {
    const {isFetching} = useSelector(bookingsSelector);
    const dispatch = useDispatch();

    const classes = addItineraryStyles();
    const {noteList} = useSelector(notesSelector);
    

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
                        <AutocompleteNT
                            options={noteList || []}
                            formik={formik}
                            name="title"
                            label="Title (*)"
                            placeholder="Enter the Title"
                            width="380px"
                            labelMb="7px"
                            onChange={(e, value) => {
                                if (value) {
                                    formik.setFieldValue('title', value.description) 
                                } else {
                                    formik.setFieldValue('title', '')
                                }
                                
                            }}
                            onKeyDown={(e) => {
                                if (e.target.value) {
                                    dispatch(autocompleteNotes({search: e.target.value}))
                                }
                            }}
                            onBlur={(e) => {
                                setTimeout(() => {
                                    if (e.target.value) {
                                        dispatch(notesLookup({search: e.target.value}))
                                        formik.setFieldValue('title', e.target.value) 
                                    }
                                }, 500)
                            }}
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
                        <SwitchLucia
                            name="saveToLibrary"
                            value={formik.values.saveToLibrary}
                            onChangeHandler={formik.handleChange}
                            placeholder="Save note to library"
                        />
                    </FlexContainer>
                    <FlexContainer $row $spaceevenly style={{width: '440px', marginTop: '40px'}}>

                       <div className={classes.notesDiv}>
                            <RichEdit
                                formik={formik}
                                label="Notes"
                                name="notes"
                                placeholder="Enter Notes"
                            />    
                        </div> 
                    </FlexContainer>
                </FlexContainer>
            </ItineraryFormContainer>
        </Loading>
    );
}

export default OtherInformation;
