import {StepByStepDialog} from "../Dialog";
import React from "react";
import {createPictureUploadTabsDock} from "./pictureUploadTabsDock";
import {useDispatch, useSelector} from "react-redux";
import {dialogFormsStateSelector, setRoomPictureUploadOpen } from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {useFormik} from "formik";
import { setRoomImage, removeImage} from "redux/features/itineraries/bookings/bookingsSlice";

const PictureUpload = () => {
    const dispatch = useDispatch();
    const {roomPictureUploadOpen} = useSelector(dialogFormsStateSelector);

    const formik = useFormik({
        initialValues: {
            query: '',
            url: '',
            imageFiles: [],
            picturesCount: '',
        },
    });

    const closePictureUpload = () => {
        dispatch(setRoomPictureUploadOpen(false));
    }

    const cancelPictureUpload = () => {
        dispatch(removeImage());
        dispatch(setRoomPictureUploadOpen(false));
    }

    const uploadPictures = () => {
        dispatch(setRoomImage())
        closePictureUpload();
    }

    return (
        <StepByStepDialog
            description="Upload room picture"
            id="upload-picture"
            createTabsDock={createPictureUploadTabsDock}
            open={roomPictureUploadOpen}
            alertType="discard"
            unlockTabs={true}
            formik={formik}
            closePictureUpload={closePictureUpload}
            uploadPictures={uploadPictures}
            cancelPictureUpload={cancelPictureUpload}
        />
    );
}

export default PictureUpload;