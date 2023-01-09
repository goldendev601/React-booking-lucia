import React from "react";
import HotelInformation from "./HotelInformation";
import HotelPictures from "./HotelPictures";
import HotelNotes from "./HotelNotes";
import HotelCancelationPolicy from "./HotelCancelationPolicy";
import ProviderInformation from "../../shared/ProviderInformation/ProviderInformation";
import HotelAmenities from "./HotelAmenities";
import Rooms from "./Rooms/Rooms";

export const createHotelTabsDock = (handleStateChange, setImages, nextStep, setCompleteStatus, edit, formik) => {
    const notesFieldNames = ['Description', 'cancellationPolicy'];
    return {
        'MAIN':
            <HotelInformation
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        'HOTEL':
            <ProviderInformation
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        'ROOM(S)':
            <Rooms
                edit={edit}
                formik={formik}
            />,
        AMENITIES:
            <HotelAmenities
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                edit={edit}
                formik={formik}
            />,
        IMAGES:
            <HotelPictures
                handleStateChange={setImages}
                nextStep={nextStep}
                max={6}
                edit={edit}
                formik={formik}
            />,
        'DETAILS':
            <HotelNotes
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                fieldNames={notesFieldNames}
                edit={edit}
                formik={formik}
            />,
        'CANCELLATION POLICY':
            <HotelCancelationPolicy
                handleStateChange={handleStateChange}
                nextStep={nextStep}
                fieldNames={notesFieldNames}
                edit={edit}
                formik={formik}
            />,
    }
}