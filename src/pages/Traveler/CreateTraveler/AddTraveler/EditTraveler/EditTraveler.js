import React, {useEffect} from "react";
import {editTravelerTabsDock} from "./EditTravelerTabsDock";
import {useDispatch, useSelector} from "react-redux";
import {travelersSelector, fetchTravelers, addTravelerDocument} from "redux/features/travelers/travelersSlice";
import {createErrorMessage, convertDate, dateToMyDate} from "utils";
import {useSnackbar} from 'react-simple-snackbar'
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {
    clearTravelerUpdated,
    updateTravelerInformation
} from "redux/features/travelers/travelersSlice";
import {
    setEditTab
} from "redux/features/dialogForms/travelerFormSlice";
import {
    dialogFormsStateSelector,
    setEdit,
    setTravelerFormOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {StepByStepDialog} from "@core/components";
import {useFormik} from "formik";
import * as yup from "yup";


const validationSchema = yup.object({
    name: yup
        .string('Enter full name')
        .required('full name is required'),
    phone: yup
        .string()
        .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value)),
    abstract_note: yup
        .string('Enter abstract note'),
});

const EditTraveler = ({open}) => {
    const dispatch = useDispatch();

    const {traveler, errorMessage, travelerId, isTravelerUpdated, isTravelerUpdatedError} = useSelector(travelersSelector);
    const {edit} = useSelector(dialogFormsStateSelector)

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            emails: [],
            abstract_note: '',
            birthday: '',
            address: '',
            image: null,
            document: []
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let data = {...values};
            const formData = new FormData();
            formData.append('name', data.name)
            if (data.phone) {
                formData.append('phone', data.phone)
            }
            if (data.abstract_note) {
                formData.append('abstract_note', data.abstract_note)
            }
            if (data.birthday) {
                formData.append('birthday', convertDate(data.birthday))
            }
            formData.append('address', data.address)
            if (data.image) {
                formData.append('image', data.image);
            }
            var emails = data.emails;
            for(let index = 0; index < emails.length; index ++ ) {
                formData.append(`emails[${index}]`, emails[index])
            }
            dispatch(updateTravelerInformation({
                travelerId: travelerId,
                data: formData,
            }));
        }
    });

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    useEffect(() => {
        if (isTravelerUpdated) {
            dispatch(setEdit(false));
            dispatch(setTravelerFormOpen(false));
            dispatch(fetchTravelers());
            dispatch(setEditTab(null));
        }
    }, [dispatch, isTravelerUpdated]);

    useEffect(() => {
        if (traveler) {
            const editTraveler = traveler;
            const emails = traveler.emails.map((value) => { return value.email });
            const birthday = traveler.birthday ? dateToMyDate(traveler.birthday) : null;
            formik.setValues({
                ...editTraveler,
                emails: emails,
                birthday: birthday
            })
        }
    }, [travelerId, traveler])


    useEffect(() => {
        if (isTravelerUpdatedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearTravelerUpdated());
        }
        if (isTravelerUpdated) {
            console.log(formik.values);

            const formData = new FormData();
            var documents = formik.values?.document;
            if (documents && documents.length > 0) {
                for(let index = 0; index < documents.length; index ++ ) {
                    formData.append(`document[${index}]`, documents[index])
                }
                const apiPayload = {
                    travelerId: travelerId,
                    data: formData,
                }
                dispatch(addTravelerDocument(apiPayload));
            }

            openSnackbarSuccess(createErrorMessage('Traveler has been updated'));
            dispatch(clearTravelerUpdated());

        }
    }, [dispatch, errorMessage, isTravelerUpdated, isTravelerUpdatedError, openSnackbarError, openSnackbarSuccess]);


    return (
        <form id="editTraveler" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Edit Traveler"
                id="edit-traveler"
                createTabsDock={editTravelerTabsDock}
                open={open}
                alertType="discard"
                formik={formik}
                unlockTabs={true}
                formId="EditTraveler"
            />
        </form>
    );
}

export default EditTraveler;
