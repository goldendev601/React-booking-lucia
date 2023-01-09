import {TextField, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {FieldArray, FormikProvider} from "formik";
import {Trash} from "iconoir-react";
import IconButton from "@material-ui/core/IconButton";
import {addItineraryStyles} from "styles/muiStyles";
import {colors} from "styles/colors";
import {AddNewButton, Loading, SwitchLucia} from "@core/components";
import {useDispatch, useSelector} from "react-redux";
import {
    bookingsSelector,
    deleteItineraryBookingPassenger,
} from "redux/features/itineraries/bookings/bookingsSlice";
import {removeObjProperties} from "utils";
import {bookingFormSelector, setPassengers} from "redux/features/dialogForms/bookingFormSlice";
import {
    clearItineraryPassengersSuccess,
    getItineraryPassengers,
    itinerariesSelector,
    itineraryPassengersSelector
} from "redux/features/itineraries/itinerariesSlice";

const HotelPassengers = ({formik, edit}) => {
    const classes = addItineraryStyles();
    const [autocomplete, setAutocomplete] = useState(false);
    const dispatch = useDispatch();

    const {category, passengersBeforeAutocomplete} = useSelector(bookingFormSelector);
    const {itineraryId, itineraryPassengersIsFetching, itineraryPassengersIsSuccess} = useSelector(itinerariesSelector);
    const itineraryPassengers = useSelector(itineraryPassengersSelector);
    const {booking} = useSelector(bookingsSelector);

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
            } else if (passengersBeforeAutocomplete) {
                formik.setFieldValue('passengers', passengersBeforeAutocomplete);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit, autocomplete, dispatch, itineraryId]);

    useEffect(() => {
        if (itineraryPassengersIsSuccess && itineraryPassengers && autocomplete) {
            const passengers = removeObjProperties(itineraryPassengers, ['name']);
            passengers.forEach((passenger) => {
                passenger.room = '';
            });
            formik.setFieldValue('passengers', [
                ...passengers
            ]);
            dispatch(clearItineraryPassengersSuccess());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itineraryPassengersIsSuccess, autocomplete, itineraryPassengers]);

    return (
        <Loading isFetching={itineraryPassengersIsFetching}>
            <FormikProvider value={formik}>
                <div className={`${classes.spacing} ${classes.formPadding}`}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography component={'div'} variant='body2'>PASSENGERS INFORMATION</Typography>
                        {!edit &&
                        <SwitchLucia
                            value={autocomplete}
                            placeholder="Autocomplete passengers"
                            onChangeHandler={autocompleteHandler}
                        />
                        }
                    </div>
                    <div style={{width: '800px'}}
                         className={`${classes.passengers} ${classes.spacing}`}>
                        <FieldArray name="passengers">
                            {({remove, push}) => (
                                <React.Fragment>
                                    {formik.values.passengers.length > 0 &&
                                    formik.values.passengers.map((passenger, index) => (
                                        <div key={index}
                                             style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <TextField
                                                style={{width: '440px'}}
                                                name={`passengers[${index}].name`}
                                                label="Name Passenger"
                                                placeholder='Placeholder'
                                                value={formik.values.passengers[index].name}
                                                onChange={formik.handleChange}
                                                error={formik.touched[`passengers[${index}].name`] && Boolean(formik.errors[`passengers[${index}].name`])}
                                                InputLabelProps={{shrink: true}}
                                            />
                                            <TextField
                                                style={{width: '280px'}}
                                                name={`passengers[${index}].room`}
                                                label="Select Room"
                                                placeholder='Placeholder'
                                                value={formik.values.passengers[index].room}
                                                onChange={formik.handleChange}
                                                error={formik.touched[`passengers[${index}].room`] && Boolean(formik.errors[`passengers[${index}].room`])}
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
                                            room: '',
                                        }}
                                        push={push}
                                        placeholder="Add new passenger"
                                    />
                                </React.Fragment>
                            )}
                        </FieldArray>
                    </div>
                </div>
            </FormikProvider>
        </Loading>
    )
}

export default HotelPassengers;
