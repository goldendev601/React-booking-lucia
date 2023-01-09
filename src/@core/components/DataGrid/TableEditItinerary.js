import React, {useState} from "react";
import {FormControlLabel, IconButton, makeStyles, Menu, MenuItem} from "@material-ui/core";
import {MoreVert, Plus, EditPencil, AddSquare, Trash, ShareAndroid} from "iconoir-react";
import {colors} from "styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {
    clearDelete,
    deleteItinerary,
    itinerariesSelector,
    setItineraryId,
    cloneItineraryInformation
} from "redux/features/itineraries/itinerariesSlice";
import AlertDialog from "../AlertDialog/AlertDialog";
import {NotificationHandler, ShareItineraryDialog} from "@core/components";
import {setCategoryFormOpen} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {useHistory} from "react-router-dom";
import {clearShareCode} from "redux/features/shareCode/shareCodeSlice";

const useStyles = makeStyles(() => ({
    iconMargin: {
        marginRight: '15px',
        marginBottom: '5px'
    }
}));

const TableEditItinerary = ({index}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [openAlert, setOpenAlert] = useState(false);

    const {isDeletedSuccess, isDeletedError, errorMessage} = useSelector(itinerariesSelector);

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
        dispatch(setItineraryId(null));
        dispatch(clearShareCode());
    };

    const handleEditClick = (event) => {
        handleOpenClick(event);
        dispatch(setItineraryId(index));
    }

    const deleteSelectedItinerary = () => {
        dispatch(deleteItinerary(index));
        handleOpenAlert();
    }

    const addNewBooking = () => {
        dispatch(setCategoryFormOpen(true));
    }

    const cloneItinerary = () => {
        const apiPayload = {
            itineraryId: index,
        }
        dispatch(cloneItineraryInformation(apiPayload));
    }

    const openItinerary = () => {
        history.push(`/itinerary-details/${index}`);
    }

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
                handleClick={deleteSelectedItinerary}
                type="remove"
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
                <MenuItem onClick={addNewBooking}><Plus className={classes.iconMargin}/>Add booking</MenuItem>
                <MenuItem onClick={openItinerary}><EditPencil className={classes.iconMargin}/>Edit itinerary</MenuItem>
                <MenuItem onClick={cloneItinerary}><AddSquare className={classes.iconMargin}/>Clone itinerary</MenuItem>
                <MenuItem onClick={handleShareItinerary}><ShareAndroid className={classes.iconMargin}/>Share Client</MenuItem>
                <MenuItem onClick={handleOpenAlert}><Trash className={classes.iconMargin}/>Delete itinerary</MenuItem>
            </Menu>
        </NotificationHandler>
    );
};

export default React.memo(TableEditItinerary);
