import {Grid, makeStyles, TextField} from "@material-ui/core";
import React, {useEffect} from "react";
import {FieldArray, FormikProvider, getIn} from "formik";
import {Plus, Trash} from "iconoir-react";
import IconButton from "@material-ui/core/IconButton";
import {addItineraryStyles} from "styles/muiStyles";
import {colors} from "styles/colors";
import {SelectField, RoomPictures, AutocompleteBT} from "@core/components";
import {useDispatch, useSelector} from "react-redux";
import {
    bookingsSelector, removeRoomImage,
} from "redux/features/itineraries/bookings/bookingsSlice";
import {constantsSelector, getBeddingTypes, getCurrencyTypes} from "redux/features/constants/constantsSlice";
import Typography from "@material-ui/core/Typography";
import {deleteHotelRoom} from "redux/features/rooms/roomsSlice";

const useStyles = makeStyles(() => ({
    addNew: {
        display: 'flex',
        justifyContent: 'space-between',
        border: `1px solid ${colors.brand}`,
        borderRadius: '0px',
        width: '115px',
        height: '40px',
        alignSelf: 'flex-end',
        marginBottom: '30px'
    },
    label: {
        width: '100%',
    },
    placeholder: {
        marginLeft: '5px'
    },
    rooms: {
        display: 'flex',
        flexDirection: 'column',
    },
    roomDescription: {
        marginRight: '28px',
    },
    activeRoom: {
        color: colors.brand,
        padding: '10px',
        backgroundColor: "white",
        border: `1px solid ${colors.brand}`,
        borderRadius: '0px',
        minWidth: '110px',
        height: '40px'
    },
    room: {
        color: 'white',
        backgroundColor: colors.brand,
        borderRadius: '0px',
        minWidth: '110px',
        height: '40px'
    },
    roomsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    existingRooms: {
        display: 'flex',
        "& > button:not(:last-child)": {
            marginRight: '10px',
        }
    },
    inputLabelRoot: {
        width: '226px',
    }
}));

const Rooms = ({formik, edit}) => {
    const classes = addItineraryStyles();
    const rooms = useStyles();
    const dispatch = useDispatch();

    const {booking} = useSelector(bookingsSelector);
    const {currencyTypes, beddingTypes} = useSelector(constantsSelector);

    // console.log(beddingTypes);

    const deleteRoom = (remove, index, room) => {
        if (edit && room.hasOwnProperty('id')) {
            const {id} = room;
            const apiPayload = {
                itineraryId: booking?.itineraryId,
                bookingId: booking?.id,
                hotelRoomId: id,
            }
            remove(index);
            dispatch(removeRoomImage(index))
            dispatch(deleteHotelRoom(apiPayload));
        } else {
            remove(index);
            dispatch(removeRoomImage(index))
        }
    }

    useEffect(() => {
        if (!currencyTypes) {
            dispatch(getCurrencyTypes());
        }
        if (!beddingTypes) {
            dispatch(getBeddingTypes());
        }
    }, [beddingTypes, currencyTypes, dispatch]);
    return (
        <FormikProvider value={formik}>
            <div className={`${classes.formPadding} ${classes.rooms}`}>
                <div
                    className={`${rooms.rooms} ${classes.spacing}`}>
                    <Typography component={'div'} variant='body2'>ROOM INFORMATION</Typography>
                    <FieldArray name="rooms">
                        {({remove, push}) => (
                            <React.Fragment>
                                {formik.values.rooms.length > 0 &&
                                formik.values.rooms.map((room, roomIndex) => {
                                    return (
                                        <Grid container justify="space-between">
                                            <div style={{width: '380px'}}>
                                                <Grid container>
                                                    <Grid item className={classes.spacing}>
                                                        <TextField
                                                            style={{width: '100%'}}
                                                            name={`rooms[${roomIndex}].roomType`}
                                                            label="Room Type"
                                                            placeholder='Enter Room Type'
                                                            value={formik.values.rooms[roomIndex].roomType}
                                                            onChange={formik.handleChange}
                                                            error={Boolean(getIn(formik.touched, `rooms[${roomIndex}].roomType`) && getIn(formik.errors, `rooms[${roomIndex}].roomType`))}
                                                            InputLabelProps={{shrink: true}}
                                                        />
                                                        {/* <SelectField
                                                            formik={formik}
                                                            label="Bedding"
                                                            name={`rooms[${roomIndex}].beddingTypeId`}
                                                            options={beddingTypes}
                                                            width="380px"
                                                            index={roomIndex}
                                                            fieldArrayName="rooms"
                                                            propertyName="beddingTypeId"
                                                            error={Boolean(getIn(formik.touched, `rooms[${roomIndex}].beddingTypeId`) && getIn(formik.errors, `rooms[${roomIndex}].beddingTypeId`))}
                                                            constants
                                                        /> */}
                                                        <AutocompleteBT
                                                            options={beddingTypes}
                                                            formik={formik}
                                                            name={`rooms[${roomIndex}].beddingType`}
                                                            value={formik.values.rooms[roomIndex].beddingType}
                                                            label="Bedding"
                                                            placeholder="Enter Bedding Type"
                                                            width="380px"
                                                            labelMb="7px"
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div style={{width: '380px'}}>
                                                <Grid container className={classes.spacing}>
                                                    <Grid container justify="space-between">
                                                        <TextField
                                                            style={{width: '220px'}}
                                                            name={`rooms[${roomIndex}].roomRate`}
                                                            label="Nightly Rate"
                                                            placeholder='Enter the Rate per Night'
                                                            value={formik.values.rooms[roomIndex].roomRate || ''}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched[`rooms[${roomIndex}].roomRate`] && Boolean(formik.errors[`rooms[${roomIndex}].roomRate`])}
                                                            InputLabelProps={{shrink: true}}
                                                            type="number"
                                                            inputProps={{min: 0}}
                                                        />
                                                        <SelectField
                                                            formik={formik}
                                                            label="Currency"
                                                            name={`rooms[${roomIndex}].currencyId`}
                                                            options={currencyTypes}
                                                            width="140px"
                                                            index={roomIndex}
                                                            fieldArrayName="rooms"
                                                            propertyName="currencyId"
                                                            constants
                                                        />
                                                    </Grid>
                                                    <Grid container justify="space-between">
                                                        <Grid item>
                                                            <TextField
                                                                style={{width: '220px'}}
                                                                name={`rooms[${roomIndex}].guestName`}
                                                                label="Reserved Under"
                                                                placeholder='Enter Guest Name(s)'
                                                                value={formik.values.rooms[roomIndex].guestName || ''}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched[`rooms[${roomIndex}].guestName`] && Boolean(formik.errors[`rooms[${roomIndex}].guestName`])}
                                                                InputLabelProps={{
                                                                    shrink: true, classes: {
                                                                        root: rooms.inputLabelRoot
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField
                                                                style={{width: '140px'}}
                                                                name={`rooms[${roomIndex}].numberOfGuests`}
                                                                label="Reserved for"
                                                                placeholder='Enter No. of Guests'
                                                                value={formik.values.rooms[roomIndex].numberOfGuests || ''}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched[`rooms[${roomIndex}].numberOfGuests`] && Boolean(formik.errors[`rooms[${roomIndex}].numberOfGuests`])}
                                                                InputLabelProps={{
                                                                    shrink: true, classes: {
                                                                        root: rooms.inputLabelRoot
                                                                    }
                                                                }}
                                                                type="number"
                                                                inputProps={{min: 0}}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div style={{width: '100%', marginTop: '32px'}}>
                                                <Grid container className={classes.spacing}>
                                                    <Grid container justify="space-between">
                                                        <Grid item sm={8}>
                                                            <TextField
                                                                className={rooms.roomDescription}
                                                                name={`rooms[${roomIndex}].roomDescription`}
                                                                label="Room Description"
                                                                placeholder='Enter a Room Description'
                                                                value={formik.values.rooms[roomIndex].roomDescription || ''}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched[`rooms[${roomIndex}].roomDescription`] && Boolean(formik.errors[`rooms[${roomIndex}].roomDescription`])}
                                                                InputLabelProps={{shrink: true}}
                                                                multiline={true}
                                                                fullWidth
                                                            />
                                                        </Grid>
                                                        <Grid item sm={4}>
                                                            <RoomPictures index={roomIndex} formik={formik} name={`rooms[${roomIndex}].imageUrl`} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            
                                            <div style={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: '20px'
                                            }}>
                                                <IconButton
                                                    style={{padding: '0'}}
                                                    disableRipple={true}
                                                    onClick={() => deleteRoom(remove, roomIndex, formik.values.rooms[roomIndex])}
                                                >
                                                    <Trash color={colors.brand} width={'20px'}/>
                                                    <span style={{marginLeft: '5px'}} className={'span-small'}>Remove this Room</span>
                                                </IconButton>
                                                {formik.values.rooms.length - 1 === roomIndex &&
                                                <IconButton
                                                    disableRipple={true}
                                                    aria-label="add-new"
                                                    style={{padding: '0'}}
                                                    onClick={() => push({
                                                        roomType: '',
                                                        beddingType: '',
                                                        guestName: '',
                                                        roomRate: 0,
                                                        currencyId: 144,
                                                        roomDescription: '',
                                                        numberOfGuests: 0
                                                    })}
                                                >
                                                    <Plus width={'20px'} color={colors.brand}/>
                                                    <span style={{marginLeft: '5px'}}
                                                          className={'span-small'}>Add New Room</span>
                                                </IconButton>}
                                            </div>
                                        </Grid>
                                    );
                                })}
                                {formik.values.rooms.length === 0 &&
                                <IconButton
                                    disableRipple={true}
                                    style={{display: 'flex', justifyContent: 'flex-start'}}
                                    aria-label="add-new"
                                    onClick={() => push({
                                        roomType: '',
                                        beddingType: '',
                                        guestName: '',
                                        roomRate: 0,
                                        currencyId: 144,
                                        roomDescription: '',
                                        numberOfGuests: 0
                                    })}
                                >
                                    <Plus width={'20px'} color={colors.brand}/>
                                    <Typography style={{color: colors.brand}} component={'div'} variant='body2'>
                                        Add new room
                                    </Typography>
                                </IconButton>}
                            </React.Fragment>
                        )}
                    </FieldArray>
                </div>
            </div>
        </FormikProvider>
    );
}

export default Rooms;
