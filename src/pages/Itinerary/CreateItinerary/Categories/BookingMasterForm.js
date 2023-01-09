import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    dialogFormsStateSelector, setBookingFormOpen,
    setCategoryFormOpen, setEdit
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {
    bookingFormSelector,
    setBookingFormData,
    setBookingFormStep,
    setBookingImages, setBookingStatusCompletion
} from "redux/features/dialogForms/bookingFormSlice";
import CategoryDialog from "./CategoryDialog";
import bookingCategorySelector from "./bookingSelector";
import {clearItineraryUpdated, itinerariesSelector} from "redux/features/itineraries/itinerariesSlice";
import {createErrorMessage, snakeNestedKeys} from "utils";
import {NotificationHandler} from "@core/components";
import {
    bookingsSelector,
    clearState, getHotelAmenities, getItineraryBookingPassengers, getItineraryBookingSegments
} from "redux/features/itineraries/bookings/bookingsSlice";
import EditSupplierDialog from "../../../SuppliersDashboard/EditSupplier/EditSupplierDialog";
import EditItineraryAbstract from "../AddItinerary/EditItinerary/EditItineraryAbstract/EditItineraryAbstract";
import UploadDocument from "../AddItinerary/EditItinerary/UploadDocument/UploadDocument";
import ImportBooking from "../AddItinerary/EditItinerary/ImportBooking/ImportBooking";
import EditDeadlineDialog from "../../../MyRequest/EditDeadline/EditDeadlineDialog";
import EditItineraryInformation from "../AddItinerary/EditItinerary/EditItineraryInformation/EditItineraryInformation";
import EditItineraryTravelers from "../AddItinerary/EditItinerary/EditItineraryTravelers/EditItineraryTravelers";
import EditItineraryTasks from "../AddItinerary/EditItinerary/EditItineraryTasks/EditItineraryTasks";
import {useSnackbar} from 'react-simple-snackbar'
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {addItineraryBookingPicture, clearPicturesState, picturesSelector} from "redux/features/pictures/picturesSlice";
import {clearHotelRoomsFlags, roomsSelector} from "redux/features/rooms/roomsSlice";

const BookingMasterForm = () => {
    const dispatch = useDispatch();
    const {categoryFormOpen, bookingFormOpen, edit} = useSelector(dialogFormsStateSelector);
    const {itineraryId} = useSelector(itinerariesSelector);
    const {
        isSuccess,
        isError,
        errorMessage,
        booking,
        isPassengerUpdateSuccess,
        isPassengerUpdateError,
        isPassengerDeletedSuccess,
        isPassengerDeletedError,
        isPassengerAddedSuccess,
        isPassengerAddedError,
    } = useSelector(bookingsSelector);
    
    const {hotelRoomsFlags, hotelRoomsErrorMessage} = useSelector(roomsSelector);

    const {
        isHotelRoomDeletedSuccess,
        isHotelRoomDeletedError,
        isHotelRoomAddedSuccess,
        isHotelRoomAddedError,
        isHotelRoomUpdatedSuccess,
        isHotelRoomUpdatedError,
    } = hotelRoomsFlags;
    
    const {
        editSupplierOpen,
        editItineraryAbstractOpen,
        editItineraryInformationOpen,
        editItineraryPictureOpen,
        editItineraryTravelersOpen,
        editItineraryTasksOpen,
        fileUploadOpen,
        importBookingOpen,
        deadlineMultiFormOpen
    } = useSelector(dialogFormsStateSelector)
    const {id} = booking || {};

    const {step, category, bookingData} = useSelector(bookingFormSelector);
    const {pictures} = useSelector(picturesSelector);

    const bookingsThatHasPassengers = ['hotels', 'cruises', 'flights', 'transports'];
    const bookingsThatHasSegments = ['flights'];
    const bookingsThatHasAmenities = ['hotels'];

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const [apiPayload, setApiPayload] = useState({
        itineraryId: '',
        bookingCategory: '',
        api: '',
        bookingId: ''
    });

    const nextStep = useCallback(() => {
        dispatch(setBookingFormStep());
    }, [dispatch]);

    const handleStateChange = useCallback((values) => {
        dispatch(setBookingFormData(values));
    }, [dispatch]);

    const setImages = useCallback((values) => {
        dispatch(setBookingImages(values));
    }, [dispatch]);

    const setBookingCompletion = useCallback(() => {
        dispatch(setBookingStatusCompletion());
    }, [dispatch]);

    useEffect(() => {
        setApiPayload({
            itineraryId: itineraryId,
            bookingCategory: category,
            data: snakeNestedKeys(bookingData),
            bookingId: id,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, category, categoryFormOpen, bookingData]);

    useEffect(() => {
        if (isSuccess) {
            if (category) {
                if (bookingsThatHasPassengers.some(word => category.includes(word))) {
                    dispatch(getItineraryBookingPassengers({
                        itineraryId: itineraryId,
                        bookingId: id,
                        bookingCategory: category,
                    }));
                }
                if (bookingsThatHasAmenities.some(word => category.includes(word))) {
                    dispatch(getHotelAmenities({
                        itineraryId: itineraryId,
                        bookingId: id,
                        bookingCategory: category,
                    }));
                }
                if (bookingsThatHasSegments.some(word => category.includes(word))) {
                    dispatch(getItineraryBookingSegments({
                        itineraryId: itineraryId,
                        bookingId: id,
                        bookingCategory: category,
                    }));
                }
            }
            dispatch(clearItineraryUpdated());
            if (!edit && pictures && pictures.length !== 0 && category !== 'others') {
                const formData = new FormData();
                pictures.forEach((picture) => {
                    formData.append("image_url[]", picture.imageFile);
                });
                const picturePayload = {
                    itineraryId: itineraryId,
                    bookingId: id,
                    bookingCategory: category,
                    images: formData,
                }
                dispatch(addItineraryBookingPicture(picturePayload));
                // dispatch(clearState());
                dispatch(clearPicturesState());
            }
            dispatch(clearState());
        }
        dispatch(setCategoryFormOpen(false));
        dispatch(setBookingFormOpen(false));
        dispatch(clearPicturesState());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    const bookingProps = {
        open: bookingFormOpen,
        handleStateChange: handleStateChange,
        setBookingStatusCompletion: setBookingCompletion,
        nextStep: nextStep,
        step: step,
        setImages: setImages,
        alertType: "discard",
        unlockTabs: edit || false,
        edit: edit,
        apiPayload: apiPayload
    }
    
    useEffect(() => {
        dispatch(setEdit(false));
    }, [dispatch]);
 
    useEffect(() => {
        if (isPassengerDeletedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isPassengerDeletedSuccess) {
            openSnackbarSuccess('Passenger is successfully deleted');
            dispatch(clearState());
        }

        if (isPassengerUpdateError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isPassengerUpdateSuccess) {
            openSnackbarSuccess('Passengers is successfully updated');
            dispatch(clearState());
        }

        if (isPassengerAddedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isPassengerAddedSuccess) {
            openSnackbarSuccess('Passengers is successfully added');
            dispatch(clearState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPassengerDeletedError, isPassengerDeletedSuccess, isPassengerUpdateError, isPassengerUpdateSuccess, isPassengerAddedSuccess, isPassengerAddedError]);

    useEffect(() => {
        if (isHotelRoomDeletedError) {
            openSnackbarError(createErrorMessage(hotelRoomsErrorMessage));
            dispatch(clearHotelRoomsFlags());
        }

        if (isHotelRoomDeletedSuccess) {
            openSnackbarSuccess('Hotel room is successfully deleted');
            dispatch(clearHotelRoomsFlags());
        }

        if (isHotelRoomUpdatedError) {
            openSnackbarError(createErrorMessage(hotelRoomsErrorMessage));
            dispatch(clearHotelRoomsFlags());
        }

        if (isHotelRoomUpdatedSuccess) {
            openSnackbarSuccess('Hotel rooms is successfully updated');
            dispatch(clearHotelRoomsFlags());
        }

        if (isHotelRoomAddedError) {
            openSnackbarError(createErrorMessage(hotelRoomsErrorMessage));
            dispatch(clearHotelRoomsFlags());
        }

        if (isHotelRoomAddedSuccess) {
            openSnackbarSuccess('Hotel rooms is successfully added');
            dispatch(clearHotelRoomsFlags());
        }
    }, [dispatch, errorMessage, hotelRoomsErrorMessage, isHotelRoomAddedError, isHotelRoomAddedSuccess, isHotelRoomDeletedError, isHotelRoomDeletedSuccess, isHotelRoomUpdatedError, isHotelRoomUpdatedSuccess, openSnackbarError, openSnackbarSuccess]);
    
    return (
        <NotificationHandler
            isError={isError}
            isSuccess={isSuccess}
            clearState={clearState}
            successMessage={`Booking is successfully ${edit ? 'updated' : 'added'}`}
            errorMessage={errorMessage}
            closeDialogs={false}
        >
            {categoryFormOpen && !edit && <CategoryDialog/>}
            {bookingFormOpen && bookingCategorySelector(category, bookingProps)}
            {editSupplierOpen && <EditSupplierDialog alertType="discard" step={step} open={editSupplierOpen}/>}
            {editItineraryAbstractOpen &&
            <EditItineraryAbstract alertType="discard" step={step} open={editItineraryAbstractOpen}/>}
            {editItineraryInformationOpen &&
            <EditItineraryInformation nextStep={nextStep} alertType="discard" step={step} unlockTabs={true} open={editItineraryInformationOpen}/>}
            {editItineraryPictureOpen &&
            <EditItineraryInformation nextStep={nextStep} alertType="discard" step={2} open={editItineraryPictureOpen}/>}
            {editItineraryTravelersOpen &&
            <EditItineraryTravelers alertType="discard" step={step} open={editItineraryTravelersOpen}/>}
            {editItineraryTasksOpen &&
            <EditItineraryTasks alertType="discard" step={step} open={editItineraryTasksOpen}/>}
            {fileUploadOpen &&
            <UploadDocument alertType="discard" step={step} open={fileUploadOpen}/>
            }
            {importBookingOpen &&
            <ImportBooking alertType="discard" step={step} open={importBookingOpen}/>
            }
            {deadlineMultiFormOpen &&
            <EditDeadlineDialog alertType="discard" step={step} open={deadlineMultiFormOpen}/>
            }
        </NotificationHandler>
    );
}

export default BookingMasterForm;
