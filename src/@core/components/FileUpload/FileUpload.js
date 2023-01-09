import {StepByStepDialog} from "../Dialog";
import React from "react";
import {createFileUploadTabsDock} from "./fileUploadTabsDock";
import {useDispatch, useSelector} from "react-redux";
import {dialogFormsStateSelector, setFileUploadOpen } from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {useFormik} from "formik";
import {
    addItineraryBookingPicture,
    addItineraryPicture,
    picturesSelector, removeLastPicture,
    deleteItineraryBookingPicture,
    deleteItineraryPicture,
    removePicture, addSupplierPicture
} from "redux/features/pictures/picturesSlice";
import {bookingFormSelector} from "redux/features/dialogForms/bookingFormSlice";
import {itinerariesSelector} from "redux/features/itineraries/itinerariesSlice";
import {bookingsSelector} from "redux/features/itineraries/bookings/bookingsSlice";
import {suppliersSelector} from "redux/features/suppliers/suppliersSlice";


const FileUpload = () => {
    const dispatch = useDispatch();
    const {pictureUploadOpen} = useSelector(dialogFormsStateSelector);
    const {edit, editPicture} = useSelector(dialogFormsStateSelector);
    const {category} = useSelector(bookingFormSelector);
    const {itineraryId} = useSelector(itinerariesSelector);
    const {supplierId} = useSelector(suppliersSelector);
    const {booking} = useSelector(bookingsSelector);
    const {pictures} = useSelector(picturesSelector);
    const {suppliersFormOpen} = useSelector(dialogFormsStateSelector);

    const formik = useFormik({
        initialValues: {
            query: '',
            url: '',
            imageFiles: [],
            picturesCount: '',
        },
    });

    const closePictureUpload = () => {
        dispatch(setFileUploadOpen(false));
    }

    const cancelPictureUpload = () => {
        dispatch(removeLastPicture());
        dispatch(setFileUploadOpen(false));
    }

    const uploadPictures = () => {
        const pictureToUpload = pictures[pictures.length - 1];
        const picturesArray = [...pictures];
        if (edit && editPicture.id) {
            if (category) {
                const apiPayload = {
                    itineraryId: itineraryId,
                    bookingId: booking?.id,
                    pictureId: editPicture.id,
                    bookingCategory: category,
                }
                dispatch(deleteItineraryBookingPicture(apiPayload));
                dispatch(removePicture(picturesArray));
            } else {
                const apiPayload = {
                    itineraryId: itineraryId,
                    pictureId: editPicture.id,
                }
                dispatch(deleteItineraryPicture(apiPayload));
                dispatch(removePicture(picturesArray));
            }
        }
        if (edit && pictureToUpload?.imageFile) {
            if (suppliersFormOpen) {
                const formData = new FormData();
                formData.append("image_url[]", pictureToUpload?.imageFile);
                const picturePayload = {
                    supplierId: supplierId,
                    images: formData,
                }
                dispatch(addSupplierPicture(picturePayload));

            } else {
                if (category) {
                    const formData = new FormData();
                    formData.append("image_url[]", pictureToUpload?.imageFile);
    
                    const picturePayload = {
                        itineraryId: itineraryId,
                        bookingId: booking?.id,
                        bookingCategory: category,
                        images: formData,
                    }
                    dispatch(addItineraryBookingPicture(picturePayload));
                    closePictureUpload();
                } else {
                    const formData = new FormData();
                    formData.append("image_url[]", pictureToUpload?.imageFile);
                    const picturePayload = {
                        itineraryId: itineraryId,
                        images: formData,
                    }
                    dispatch(addItineraryPicture(picturePayload));
                }
            }
        } else {

        }
        closePictureUpload();
    }

    return (
        <StepByStepDialog
            description="Upload picture"
            id="upload-picture"
            createTabsDock={createFileUploadTabsDock}
            open={pictureUploadOpen}
            alertType="discard"
            unlockTabs={true}
            formik={formik}
            closePictureUpload={closePictureUpload}
            uploadPictures={uploadPictures}
            cancelPictureUpload={cancelPictureUpload}
        />
    );
}

export default FileUpload;