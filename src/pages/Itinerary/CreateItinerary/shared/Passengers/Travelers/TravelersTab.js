import {makeStyles, TextField, Typography} from "@material-ui/core";
import React from "react";
import {FieldArray, FormikProvider, getIn} from "formik";
import {Trash} from "iconoir-react";
import IconButton from "@material-ui/core/IconButton";
import {addItineraryStyles} from "styles/muiStyles";
import {colors} from "styles/colors";
import {AddNewButton, NotificationHandler} from "@core/components";
import {useDispatch, useSelector} from "react-redux";
import {
    clearPassengerDeleted,
    deleteItineraryPassenger,
    itinerariesSelector
} from "redux/features/itineraries/itinerariesSlice";
import {
    dialogFormsStateSelector,
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";

const useStyles = makeStyles(() => ({
    selectFormControl: {
        width: '290px'
    },
    passengerInput: {
        width: '100%'
    },
    inputsContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteButton: {
        marginTop: '25px',
        padding: '0 5px 0 5px'
    }
}))

const TravelersTab = ({formik}) => {
    const classes = addItineraryStyles();
    const travelersClasses = useStyles();
    const dispatch = useDispatch();
    const {
        isPassengerDeletedSuccess,
        isPassengerDeletedError,
        errorMessage
    } = useSelector(itinerariesSelector);

    const {edit} = useSelector(dialogFormsStateSelector);

    const deletePassenger = (remove, index, passenger) => {
        if (edit) {
            const {id, itineraryId} = passenger;
            const apiPayload = {
                itineraryId: itineraryId,
                passengerId: id,
            }
            dispatch(deleteItineraryPassenger(apiPayload));
            remove(index);
        } else {
            remove(index);
        }
    }

    // const selectOptions = [
    //     {name: 'Adult', value: 1},
    //     {name: 'Child', value: 2},
    //     {name: 'Baby', value: 3},
    // ];

    return (
        <NotificationHandler
            clearState={clearPassengerDeleted}
            isSuccess={isPassengerDeletedSuccess}
            isError={isPassengerDeletedError}
            errorMessage={errorMessage}
            successMessage="Passenger is successfully deleted"
        >
            <FormikProvider value={formik}>
                <div className={`${classes.spacing} ${classes.formPadding}`}>
                    <Typography component={'div'} variant='body2'>PASSENGERS INFORMATION</Typography>
                    <FieldArray name="passengers">
                        {({remove, push}) => (
                            <React.Fragment>
                                {formik.values.passengers.length > 0 &&
                                formik.values.passengers.map((passenger, index) => (
                                    <div key={index} className={travelersClasses.inputsContainer}>
                                        <TextField
                                            className={travelersClasses.passengerInput}
                                            name={`passengers.${index}.name`}
                                            label="Name Passenger"
                                            placeholder='Enter the passenger name'
                                            value={formik.values.passengers[index].name}
                                            onChange={formik.handleChange}
                                            error={Boolean(getIn(formik.touched, `passengers[${index}].name`) && getIn(formik.errors, `passengers[${index}].name`))}
                                            InputLabelProps={{shrink: true}}
                                        />
                                        {/* <FormControl className={travelersClasses.selectFormControl}>
                                            <InputLabel shrink={true} id="passengerTypeId">Type</InputLabel>
                                            <Select
                                                labelId="passengerTypeId"
                                                id="passengerTypeId"
                                                name="passengerTypeId"
                                                value={formik.values.passengers[index].passengerTypeId}
                                                onChange={formik.handleChange(`passengers[${index}].passengerTypeId`)}
                                                error={Boolean(getIn(formik.touched, `passengers[${index}].passengerTypeId`) && getIn(formik.errors, `passengers[${index}].passengerTypeId`))}
                                                IconComponent={NavArrowDown}
                                                placeholder="Select option"
                                            >
                                                {selectOptions.map((option, index) => {
                                                    return (
                                                        <MenuItem
                                                            key={index}
                                                            value={option.value}
                                                        >
                                                            {option.name}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl> */}
                                        <IconButton
                                            className={travelersClasses.deleteButton}
                                            onClick={() => deletePassenger(remove, index, passenger)}
                                        >
                                            <Trash color={colors.brand} width="25px"/>
                                        </IconButton>
                                    </div>
                                ))}
                                <AddNewButton
                                    placeholder="Add new passenger"
                                    values={{
                                        name: '',
                                        passengerTypeId: 1,
                                    }}
                                    push={push}
                                />
                            </React.Fragment>
                        )}
                    </FieldArray>
                </div>
            </FormikProvider>
        </NotificationHandler>
    )
}

export default TravelersTab;
