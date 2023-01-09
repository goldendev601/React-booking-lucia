import React, {useCallback, useState} from 'react';
import {FormControlLabel, IconButton, makeStyles, Menu, MenuItem} from "@material-ui/core";
import {MoreVert, EditPencil, Trash } from "iconoir-react";
import {colors} from "styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {
    clearDelete,
    deleteTraveler,
    travelersSelector,
    setTravelerId,
    setEdit,
    fetchTraveler
} from "redux/features/travelers/travelersSlice";
import AlertDialog from "../AlertDialog/AlertDialog";
import {NotificationHandler, ShareItineraryDialog} from "@core/components";
import {clearShareCode} from "redux/features/shareCode/shareCodeSlice";
import {EditTraveler} from "pages/Traveler/CreateTraveler/AddTraveler";
import {
    dialogFormsStateSelector,
    setTravelerFormOpen,
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";


const useStyles = makeStyles(() => ({
    iconMargin: {
        marginRight: '15px',
        marginBottom: '5px'
    }
}));

const TableEditTraveler = ({index}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openAlert, setOpenAlert] = useState(false);

    const {travelerMultiFormOpen} = useSelector(dialogFormsStateSelector);

    const {isDeletedSuccess, isDeletedError, errorMessage, travelers, travelerId, isEdit} = useSelector(travelersSelector);

    const [shareItineraryOpen, setShareItineraryOpen] = useState(false);

    const handleShareItinerary = () => {
        setAnchorEl(null);
        setShareItineraryOpen(prevState => !prevState)
        dispatch(clearShareCode());
    };

    const handleOpenAlert = () => setOpenAlert(prevState => !prevState);

    const handleOpenClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        dispatch(setTravelerId(null));
        dispatch(clearShareCode());
    };

    const handleEditClick = (event) => {
        handleOpenClick(event);
        dispatch(setTravelerId(index));
    }

    const deleteSelectedTraveler = () => {
        dispatch(deleteTraveler(index));
        handleOpenAlert();
    }

    const handleClickOpen = useCallback((tId) => {
        dispatch(setEdit(true));
        dispatch(setTravelerFormOpen(true));
        dispatch(fetchTraveler(tId));
    }, [dispatch]);

    return (
        <NotificationHandler
            clearState={clearDelete}
            isSuccess={isDeletedSuccess}
            isError={isDeletedError}
            errorMessage={errorMessage}
            successMessage="Itinerary is successfully deleted"
            closeDialogs={true}
        >
            {shareItineraryOpen && <ShareItineraryDialog handleShareItinerary={handleShareItinerary} shareItineraryOpen={shareItineraryOpen}/>}
            <AlertDialog
                open={openAlert}
                handleClose={handleOpenAlert}
                handleClick={deleteSelectedTraveler}
                type="remove"
                name="Traveler"
            />
            <FormControlLabel
                control={
                    <IconButton
                        color="secondary"
                        aria-label="row-action"
                        onClick={handleEditClick}
                    >
                        <MoreVert width={'24px'} style={{color: colors.brand}}/>
                    </IconButton>

                }
             />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{margin: '50px 0 0 -55px'}}
            >
                {/* <MenuItem onClick={addNewBooking}><Plus className={classes.iconMargin}/>Add booking</MenuItem> */}
                <MenuItem onClick={(e) => handleClickOpen(index)}><EditPencil className={classes.iconMargin}/>Edit traveler</MenuItem>
                {<EditTraveler/> && travelerMultiFormOpen && travelerId === index && React.cloneElement(<EditTraveler/>, {open: travelerMultiFormOpen && isEdit})}
                {/* <MenuItem onClick={handleShareItinerary}><ShareAndroid className={classes.iconMargin}/>Share Client</MenuItem> */}
                {
                    travelers.data.find(traveler => traveler.id === index) && travelers.data.find(traveler => traveler.id === index).itinerariesCount === 0 && (
                        <MenuItem onClick={handleOpenAlert}><Trash className={classes.iconMargin}/>Delete traveler</MenuItem>
                    )
                }
            </Menu>
        </NotificationHandler>
    );
};

export default React.memo(TableEditTraveler);
