import React, {useEffect, useState} from "react";
import {Typography, TextField} from "@material-ui/core";
import {FieldArray, FormikProvider} from "formik";
import {Trash} from "iconoir-react";
import IconButton from "@material-ui/core/IconButton";
import {addItineraryStyles} from "styles/muiStyles";
import {colors} from "styles/colors";
import {AddNewButton, Loading, SwitchLucia} from "@core/components";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {
    bookingsSelector,
    deleteItineraryBookingCabin,
} from "redux/features/itineraries/bookings/bookingsSlice";
import {bookingFormSelector, setCabins} from "redux/features/dialogForms/bookingFormSlice";
import {removeObjProperties} from "utils";
import {
    itinerariesSelector
} from "redux/features/itineraries/itinerariesSlice";

const ContainerCruiseCabin = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CruiseCabin = ({formik, edit}) => {
    const classes = addItineraryStyles();

    const dispatch = useDispatch();

    const {category} = useSelector(bookingFormSelector);
    const {booking} = useSelector(bookingsSelector);
    const {itineraryId} = useSelector(itinerariesSelector);

    useEffect(() => {
        formik.values.cabins = [
            {
                cabinCategory: '',
                beddingType: '',
                guestName: '',
                numberOfGuests: 0,
                confirmationReference: ''
            }
        ]
    }, []);


    const deleteCabin = (remove, index, cabin) => {
        if (edit && cabin.hasOwnProperty('id')) {
            const {id} = cabin;
            const apiPayload = {
                itineraryId: booking?.itineraryId,
                bookingId: booking?.id,
                cabinId: id,
                bookingCategory: category,
            }
            dispatch(deleteItineraryBookingCabin(apiPayload));
            remove(index);
        } else {
            remove(index);
        }
    }

    useEffect(() => {
        if (!edit) {
            dispatch(setCabins(formik.values.cabins));
        }
    }, [edit, dispatch, formik.values.cabins]);

    return (
        <FormikProvider value={formik}>
            <div style={{ width: 380, paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px' }}>
                <Typography variant="h2" style={{ fontSize: '14px', fontFamily: 'Raleway', color: '#242424', fontWeight: '600' }}>
                    CABIN INFORMATION
                </Typography>
            </div>
            <FieldArray name="cabins">
                {({ remove, push }) => {
                    return (
                    <React.Fragment>
                        {formik.values.cabins.length > 0 &&
                            formik.values.cabins.map((cabin, index) => {
                                return (
                                <>
                                    <React.Fragment key={index}>
                                        <div className={`${classes.information} ${classes.formPadding}`}>
                                            <div style={{ width: 380 }}>
                                                <div className={classes.spacing}>
                                                    <TextField
                                                        style={{width: '380px'}}
                                                        name={`cabins.${index}.cabinCategory`}
                                                        label="Cabin Category"
                                                        placeholder='Enter Cabin Category'
                                                        value={formik.values.cabins[index].cabinCategory}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched[`cabins[${index}].cabinCategory`] && Boolean(formik.errors[`cabins[${index}].cabinCategory`])}
                                                        InputLabelProps={{shrink: true}}
                                                    />
                                                </div>
                                                <div className={classes.spacing} style={{marginTop: '20px'}}>
                                                    <TextField
                                                        style={{width: '380px'}}
                                                        name={`cabins.${index}.beddingType`}
                                                        label="Bedding"
                                                        placeholder='Select Type'
                                                        value={formik.values.cabins[index].beddingType}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched[`cabins[${index}].beddingType`] && Boolean(formik.errors[`cabins[${index}].beddingType`])}
                                                        InputLabelProps={{shrink: true}}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ width: 380 }}>
                                                <div className={classes.spacing} style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <StyledContainer>
                                                        <TextField
                                                            style={{width: '380px'}}
                                                            name={`cabins.${index}.confirmationReference`}
                                                            label="Confirmation Reference"
                                                            placeholder='Enter confirmation'
                                                            value={formik.values.cabins[index].confirmationReference}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched[`cabins[${index}].confirmationReference`] && Boolean(formik.errors[`cabins[${index}].confirmationReference`])}
                                                            InputLabelProps={{shrink: true}}
                                                        />
                                                    </StyledContainer>
                                                    <StyledContainer>
                                                        <div>
                                                            <TextField
                                                                style={{width: '170px'}}
                                                                name={`cabins.${index}.guestName`}
                                                                label="Guest Name Reserve"
                                                                placeholder='Enter full name'
                                                                value={formik.values.cabins[index].guestName}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched[`cabins[${index}].guestName`] && Boolean(formik.errors[`cabins[${index}].guestName`])}
                                                                InputLabelProps={{shrink: true}}
                                                            />
                                                        </div>
                                                        <div>
                                                            <TextField
                                                                style={{width: '170px'}}
                                                                name={`cabins.${index}.numberOfGuests`}
                                                                label="Number Of Guests"
                                                                placeholder='Enter number'
                                                                value={formik.values.cabins[index].numberOfGuests}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched[`cabins[${index}].numberOfGuests`] && Boolean(formik.errors[`cabins[${index}].numberOfGuests`])}
                                                                InputLabelProps={{shrink: true}}
                                                            />
                                                        </div>
                                                        
                                                    </StyledContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginTop: '20px'
                                    }}>
                                        {formik.values.cabins.length > 1 &&
                                            <IconButton
                                                style={{paddingLeft: '30px', paddingRight: '30px'}}
                                                disableRipple={true}
                                                onClick={() => deleteCabin(remove, index, formik.values.cabins[index])}
                                            >
                                                <Trash color={colors.brand} width={'20px'}/>
                                                <span style={{marginLeft: '5px'}} className={'span-small'}>Remove this Cabin</span>
                                            </IconButton>
                                        }
                                        {formik.values.cabins.length - 1 === index &&
                                            <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                                                <AddNewButton
                                                    values={{
                                                        cabinCategory: '',
                                                        beddingType: '',
                                                        guestName: '',
                                                        numberOfGuests: 0,
                                                        confirmationReference: ''
                                                    }}
                                                    push={push}
                                                    placeholder="Add New cabin"
                                                />
                                            </div>
                                        }
                                    </div>
                                </>
                            )})
                        }
                        
                    </React.Fragment>
                )}}
            </FieldArray>
        </FormikProvider>
    )
}

export default CruiseCabin;
