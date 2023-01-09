import React, {useEffect, useState} from "react";
import { Typography} from "@material-ui/core";
import { AutocompleteAM } from "@core/components";
import {FieldArray, FormikProvider} from "formik";
import {Plus, Trash} from "iconoir-react";
import IconButton from "@material-ui/core/IconButton";
import {addItineraryStyles} from "styles/muiStyles";
import {colors} from "styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {
    bookingsSelector, clearState, deleteHotelAmenity,
} from "redux/features/itineraries/bookings/bookingsSlice";
import {createErrorMessage} from "utils";
import {useSnackbar} from 'react-simple-snackbar'
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import { constantsSelector } from "redux/features/constants/constantsSlice";

const HotelAmenities = ({formik, edit}) => {
    const classes = addItineraryStyles();
    const dispatch = useDispatch();

    const { amenities } = useSelector(constantsSelector);


    const {
        booking, isAmenityUpdateSuccess,
        isAmenityUpdateError,
        isAmenityAddedSuccess,
        isAmenityAddedError,
        isAmenityDeletedSuccess,
        isAmenityDeletedError, errorMessage
    } = useSelector(bookingsSelector);

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);
    const [showAllAmenities, setShowAllAmenities] = useState(true);

    const deleteAmenity = (remove, index, amenity) => {
        if (edit && amenity.hasOwnProperty('id')) {
            const {id} = amenity;
            const apiPayload = {
                itineraryId: booking?.itineraryId,
                bookingId: booking?.id,
                hotelAmenityId: id,
            }
            dispatch(deleteHotelAmenity(apiPayload));
            remove(index);
        } else {
            remove(index);
        }
    }

    const addAllVirtuosoAmenities = (push) => {
        const currentAmenities = formik.values.amenities;
        amenities.map((amenity, index) => {            
            if (amenity.important && (currentAmenities.findIndex((currentAmenity) => currentAmenity.amenity === amenity.description) === -1)) {
                push({
                    amenity: amenity.description
                })
            }
        });
        setShowAllAmenities(false);
    }

    useEffect(() => {
        if (edit) {
            if (isAmenityDeletedError) {
                openSnackbarError(createErrorMessage(errorMessage));
                dispatch(clearState());
            }

            if (isAmenityDeletedSuccess) {
                openSnackbarSuccess('Amenity is successfully deleted');
                dispatch(clearState());
            }

            if (isAmenityUpdateError) {
                openSnackbarError(createErrorMessage(errorMessage));
                dispatch(clearState());
            }

            if (isAmenityUpdateSuccess) {
                openSnackbarSuccess('Amenities is successfully updated');
                dispatch(clearState());
            }

            if (isAmenityAddedError) {
                openSnackbarError(createErrorMessage(errorMessage));
                dispatch(clearState());
            }

            if (isAmenityAddedSuccess) {
                openSnackbarSuccess('Amenities is successfully added');
                dispatch(clearState());
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit, isAmenityDeletedError, isAmenityDeletedSuccess, isAmenityUpdateError, isAmenityUpdateSuccess, isAmenityAddedError, isAmenityAddedSuccess]);

    return (
        <FormikProvider value={formik}>
            <div className={`${classes.spacing} ${classes.formPadding}`}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography component={'div'} variant='body2'>INCLUDED AMENITIES</Typography>
                </div>
                
                <FieldArray name="amenities">
                    {({remove, push}) => (
                        <React.Fragment>
                            {showAllAmenities > 0 &&
                                <div style={{display: 'flex', justifyContent: 'space-between', float: 'right', marginTop: 0}}>
                                    <IconButton style={{
                                            justifyContent: 'end',
                                            marginTop: '5px',
                                            padding: '0'
                                        }}
                                        disableRipple={true}
                                        aria-label="add-all-virtuoso-amenities"
                                        onClick={() => addAllVirtuosoAmenities(push)}
                                    >
                                        <Plus width={'20px'} color={colors.brand}/>
                                        <span style={{marginLeft: '5px'}}
                                            className='span-small'>
                                            Add Virtuoso Amenities
                                        </span>
                                    </IconButton>
                                </div>
                            }
                            {formik.values.amenities?.length > 0 &&
                            formik.values.amenities.map((amenity, index) => (
                                <div key={index}
                                     style={{display: 'flex'}}>
                                        <AutocompleteAM                                            
                                            formik={formik}
                                            options={amenities}
                                            name={`amenities[${index}].amenity`}
                                            label="Amenity Type"
                                            placeholder='Enter Amenity Type'
                                            value={formik.values.amenities[index].amenity}
                                            onChange={formik.handleChange}
                                            error={formik.touched[`amenities[${index}].amenity`] && Boolean(formik.errors[`amenities[${index}].amenity`])}
                                            InputLabelProps={{shrink: true}}  
                                        />

                                    {/* <TextField
                                        style={{width: '440px'}}
                                        name={`amenities[${index}].amenity`}
                                        label="Amenity Name"
                                        placeholder='Enter amenity name'
                                        value={formik.values.amenities[index].amenity}
                                        onChange={formik.handleChange}
                                        error={formik.touched[`amenities[${index}].amenity`] && Boolean(formik.errors[`amenities[${index}].amenity`])}
                                        InputLabelProps={{shrink: true}}
                                    /> */}

                                    <IconButton style={{
                                        marginTop: '25px',
                                        padding: '0 5px 0 5px'
                                    }} onClick={() => deleteAmenity(remove, index, amenity)}>
                                        <Trash color={colors.brand} width={'25px'}/>
                                    </IconButton>
                                </div>
                            ))}
                            <IconButton style={{
                                justifyContent: 'end',
                                marginTop: '5px',
                                padding: '0'
                            }}
                                        disableRipple={true}
                                        aria-label="add-amenity"
                                        onClick={() => push({
                                            amenity: '',
                                        })}
                            >
                                <Plus width={'20px'} color={colors.brand}/>
                                <span style={{marginLeft: '5px'}}
                                      className='span-small'>Add New Amenity</span>
                            </IconButton>
                        </React.Fragment>
                    )}
                </FieldArray>
            </div>
        </FormikProvider>
    )
}

export default HotelAmenities;
