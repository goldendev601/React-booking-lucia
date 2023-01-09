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
    deleteItineraryBookingPassenger,
} from "redux/features/itineraries/bookings/bookingsSlice";
import {bookingFormSelector, setPassengers} from "redux/features/dialogForms/bookingFormSlice";
import {removeObjProperties} from "utils";
import {
    clearItineraryPassengersSuccess,
    getItineraryPassengers,
    itinerariesSelector, itineraryPassengersSelector
} from "redux/features/itineraries/itinerariesSlice";

const ContainerCruiseCabin = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const CruiseCabinBk = ({formik, edit}) => {
    const classes = addItineraryStyles();

    const [autocomplete, setAutocomplete] = useState(false);
    const dispatch = useDispatch();

    const {category, passengersBeforeAutocomplete} = useSelector(bookingFormSelector);
    const {booking} = useSelector(bookingsSelector);
    const {itineraryId, itineraryPassengersIsFetching, itineraryPassengersIsSuccess} = useSelector(itinerariesSelector);
    const itineraryPassengers = useSelector(itineraryPassengersSelector);

    const autocompleteHandler = () => setAutocomplete(prev => !prev);

    const deletePassenger = (remove, index, passenger) => {
        if (edit && passenger.hasOwnProperty('id')) {
            const {id} = passenger;
            const apiPayload = {
                itineraryId: booking?.itineraryId,
                bookingId: booking?.id,
                passengerId: id,
                bookingCategory: category,
            }
            dispatch(deleteItineraryBookingPassenger(apiPayload));
            remove(index);
        } else {
            remove(index);
        }
    }

    useEffect(() => {
        if (!edit && !autocomplete) {
            dispatch(setPassengers(formik.values.passengers));
        }
    }, [edit, dispatch, autocomplete, formik.values.passengers]);

    useEffect(() => {
        if (!edit) {
            if (autocomplete) {
                dispatch(getItineraryPassengers(itineraryId));
            } else if(passengersBeforeAutocomplete) {
                formik.setFieldValue('passengers', passengersBeforeAutocomplete);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autocomplete, dispatch, itineraryId]);

    useEffect(() => {
        if (itineraryPassengersIsSuccess && itineraryPassengers && autocomplete) {
            const passengers = removeObjProperties(itineraryPassengers, ['name']);
            passengers.forEach((passenger) => {
                passenger.cabin = '';
                passenger.cabinCategory = '';
                passenger.ticketNumber = '';
            });
            formik.setFieldValue('passengers', passengers);
            dispatch(clearItineraryPassengersSuccess());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itineraryPassengersIsSuccess]);

    return (
        <Loading isFetching={itineraryPassengersIsFetching}>
            <FormikProvider value={formik}>
                <div>
                    <div className={`${classes.spacing} ${classes.formPadding}`}>
                        <ContainerCruiseCabin>
                            <Typography component={'div'} variant='body2'>CABIN INFORMATION</Typography>
                            {/* {!edit &&
                            <SwitchLucia
                                value={autocomplete}
                                placeholder="Autocomplete passengers"
                                onChangeHandler={autocompleteHandler}
                            />} */}
                        </ContainerCruiseCabin>
                        <ContainerCruiseCabin>
                            <div style={{width: '850px'}}
                                 className={`${classes.passengers} ${classes.spacing}`}>
                                <FieldArray name="passengers">
                                    {({remove, push}) => (
                                        <React.Fragment>
                                            {formik.values.passengers?.length > 0 &&
                                            formik.values.passengers.map((passenger, index) => (
                                                <div key={index}
                                                     style={{display: 'flex', justifyContent: 'space-between'}}>
                                                    <TextField
                                                        style={{width: '250px'}}
                                                        name={`passengers.${index}.name`}
                                                        label="Passenger Name"
                                                        placeholder='Placeholder'
                                                        value={formik.values.passengers[index].name}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched[`passengers[${index}].name`] && Boolean(formik.errors[`passengers[${index}].name`])}
                                                        InputLabelProps={{shrink: true}}
                                                    />
                                                    <TextField
                                                        style={{width: '170px'}}
                                                        name={`passengers.${index}.cabin`}
                                                        label="Cabin"
                                                        placeholder='Ex: B4'
                                                        value={formik.values.passengers[index].cabin}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched[`passengers[${index}].cabin`] && Boolean(formik.errors[`passengers[${index}].cabin`])}
                                                        InputLabelProps={{shrink: true}}
                                                    />
                                                    <TextField
                                                        style={{width: '170px'}}
                                                        name={`passengers.${index}.cabinCategory`}
                                                        label="Category"
                                                        placeholder='Enter category'
                                                        value={formik.values.passengers[index].cabinCategory}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched[`passengers[${index}].cabinCategory`] && Boolean(formik.errors[`passengers[${index}].cabinCategory`])}
                                                        InputLabelProps={{shrink: true}}
                                                    />
                                                    <TextField
                                                        style={{width: '100px'}}
                                                        name={`passengers.${index}.ticketNumber`}
                                                        label="Ticket"
                                                        placeholder='Enter ticket'
                                                        value={formik.values.passengers[index].ticketNumber}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched[`passengers[${index}].ticketNumber`] && Boolean(formik.errors[`passengers[${index}].ticketNumber`])}
                                                        InputLabelProps={{shrink: true}}
                                                    />
                                                    <IconButton style={{
                                                        marginTop: '25px',
                                                        padding: '0 5px 0 5px'
                                                    }} onClick={() => deletePassenger(remove, index, passenger)}>
                                                        <Trash color={colors.brand} width={'25px'}/>
                                                    </IconButton>
                                                </div>
                                            ))}
                                            <AddNewButton
                                                values={{
                                                    name: '',
                                                    cabin: '',
                                                    cabinCategory: '',
                                                    ticketNumber: ''
                                                }}
                                                push={push}
                                                placeholder="Add New Cabin"
                                            />
                                        </React.Fragment>
                                    )}
                                </FieldArray>
                            </div>
                        </ContainerCruiseCabin>
                    </div>
                </div>
            </FormikProvider>
        </Loading>
    )
}

export default CruiseCabinBk;
