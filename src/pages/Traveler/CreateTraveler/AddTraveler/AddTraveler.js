import React, {useEffect} from "react";
import {createTravelerTabsDock} from "./travelerTabsDock";
import {useDispatch, useSelector} from "react-redux";
import {addTraveler, travelersSelector, clearState, addTravelerDocument} from "redux/features/travelers/travelersSlice";
import {createErrorMessage, convertDate} from "utils";
import {useSnackbar} from 'react-simple-snackbar'
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {
    resetTravelerState, setEditTab
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

const AddTraveler = ({open}) => {
    const dispatch = useDispatch();

    const {edit} = useSelector(dialogFormsStateSelector)
    const {traveler, addedSuccess, addedError, errorMessage, start} = useSelector(travelersSelector);

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
            formData.append('phone', data.phone)
            formData.append('abstract_note', data.abstract_note)
            formData.append('birthday', convertDate(data.birthday))
            formData.append('address', data.address)
            formData.append('image', data.image)

            var emails = data.emails;
            for(let index = 0; index < emails.length; index ++ ) {
                formData.append(`emails[${index}]`, emails[index])
            }
            dispatch(addTraveler(formData));
        }
    });

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    useEffect(() => {
        dispatch(setEdit(false));
        dispatch(setEditTab(null));
    }, [dispatch]);

    useEffect(() => {
        if (!edit) {
            if (addedError) {
                openSnackbarError(createErrorMessage(errorMessage));
                dispatch(clearState());
                dispatch(resetTravelerState());
            }
            if (addedSuccess && !edit) {

                console.log(formik.values);

                const formData = new FormData();
                var documents = formik.values?.document;
                if (documents.length > 0) {
                    for(let index = 0; index < documents.length; index ++ ) {
                        formData.append(`document[${index}]`, documents[index])
                    }
                    const apiPayload = {
                        travelerId: traveler.id,
                        data: formData,
                    }
                    dispatch(addTravelerDocument(apiPayload));
                }
                
                openSnackbarSuccess('The new traveller has been created successfully!');
                dispatch(clearState());
                setTimeout(() => dispatch(setTravelerFormOpen(false)), 200);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addedError, addedSuccess, edit]);

    return (
        <form id="addTraveler" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Add Traveler"
                id="add-traveler"
                createTabsDock={createTravelerTabsDock}
                open={open}
                alertType="discard"
                formik={formik}
                unlockTabs={true}
                formId="AddTraveler"
            />
        </form>
    );
}

export default AddTraveler;
